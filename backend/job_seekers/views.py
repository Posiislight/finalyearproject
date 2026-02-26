import re

from rest_framework import permissions, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from employers_jobs.models import JobPost
from .models import JobApplication, DismissedJob
from .serializers import JobFeedSerializer, JobApplicationSerializer


class IsJobSeeker(permissions.BasePermission):
    """
    Allows access only to job seekers.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_job_seeker)


def _build_user_keywords(user):
    """
    Build a set of lowercase keyword tokens from the user's profile:
      - skill names  (e.g. "React", "Python")
      - bio words    (e.g. "frontend developer" → {"frontend", "developer"})
      - experience role words (e.g. "Senior Backend Engineer" → {"senior", "backend", "engineer"})
    Short/common words (≤2 chars) are dropped to avoid false positives.
    """
    from users.models import Skill, Experience

    keywords = set()

    # Skills — keep multi-word skills as a single phrase AND split into words
    for name in Skill.objects.filter(user=user).values_list("name", flat=True):
        lower = name.strip().lower()
        if lower:
            keywords.add(lower)                     # e.g. "machine learning"
            keywords.update(lower.split())           # e.g. "machine", "learning"

    # Bio
    profile = getattr(user, "job_seeker_profile", None)
    if profile and profile.bio:
        keywords.update(profile.bio.lower().split())

    # Experience roles
    for role in Experience.objects.filter(user=user).values_list("role", flat=True):
        keywords.update(role.lower().split())

    # Drop very short / stopwords (a, an, at, of, …)
    stopwords = {"a", "an", "at", "of", "in", "to", "the", "and", "or", "for", "is", "it", "on", "by", "as", "i", "my", "me"}
    keywords = {w for w in keywords if len(w) > 2 and w not in stopwords}

    return keywords


def _score_job(job, keywords):
    """
    Score a single job against the user's keyword set.
    Returns a numeric relevance score (higher = better match).

    Scoring breakdown:
      - Title match:        +5  per keyword  (most important signal)
      - Requirements match: +3  per keyword
      - Description match:  +1  per keyword
    """
    title_text = (job.title or "").lower()
    req_text = (job.requirements or "").lower()
    desc_text = (job.description or "").lower()

    score = 0
    for kw in keywords:
        if kw in title_text:
            score += 5
        if kw in req_text:
            score += 3
        if kw in desc_text:
            score += 1
    return score


class JobFeedViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Provides an AI-ranked list of available jobs for job seekers.

    Ranking strategy (hybrid):
      1.  Try AI batch ranking — sends the user's profile + compact job list
          to OpenRouter in a single call and gets back a relevance-sorted list.
      2.  Fall back to keyword scoring if AI is unavailable or fails.
      3.  Fall back to newest-first if the user has no profile data.
    """
    serializer_class = JobFeedSerializer
    permission_classes = [permissions.IsAuthenticated, IsJobSeeker]

    def get_queryset(self):
        user = self.request.user

        # Exclude already-applied jobs
        applied_ids = JobApplication.objects.filter(
            job_seeker=user
        ).values_list("job_post_id", flat=True)

        # Exclude dismissed/skipped jobs
        dismissed_ids = DismissedJob.objects.filter(
            job_seeker=user
        ).values_list("job_post_id", flat=True)

        open_jobs = list(
            JobPost.objects.filter(status=JobPost.STATUS_OPEN)
            .exclude(id__in=applied_ids)
            .exclude(id__in=dismissed_ids)
            .order_by("-created_at")
        )

        if not open_jobs:
            return JobPost.objects.none()

        # Build user profile summary
        from users.models import Skill, Experience
        profile = getattr(user, "job_seeker_profile", None)
        user_skills = list(Skill.objects.filter(user=user).values_list("name", flat=True))
        user_exps = list(
            Experience.objects.filter(user=user).values_list("role", "company")[:5]
        )
        bio = profile.bio if profile else ""

        has_profile_data = bool(user_skills or bio or user_exps)

        if not has_profile_data:
            # No data to match on — chronological
            return JobPost.objects.filter(
                id__in=[j.id for j in open_jobs]
            ).order_by("-created_at")

        # --- Try AI-based ranking ---
        ranked_ids = self._ai_rank(user, profile, user_skills, user_exps, bio, open_jobs)

        if not ranked_ids:
            # AI failed — fall back to keyword scoring
            keywords = _build_user_keywords(user)
            scored = [(job, _score_job(job, keywords)) for job in open_jobs]
            scored.sort(key=lambda pair: (-pair[1], pair[0].created_at))
            ranked_ids = [job.id for job, _ in scored]

        if not ranked_ids:
            return JobPost.objects.none()

        from django.db.models import Case, When
        ordering = Case(*[When(id=pk, then=pos) for pos, pk in enumerate(ranked_ids)])
        return JobPost.objects.filter(id__in=ranked_ids).order_by(ordering)

    def _ai_rank(self, user, profile, user_skills, user_exps, bio, open_jobs):
        """
        Call OpenRouter once with all job summaries + user profile.
        Returns a list of job IDs sorted by relevance, or None on failure.
        """
        import logging
        logger = logging.getLogger(__name__)

        try:
            from ai_services.openrouter_client import chat_completion_json
        except ImportError:
            return None

        # Build compact job list (keep it short to stay within token limits)
        job_summaries = []
        for j in open_jobs[:40]:  # cap to avoid token overflow
            job_summaries.append(
                f"[{j.id}] {j.title} @ {j.location} — {j.requirements[:150]}"
            )
        jobs_text = "\n".join(job_summaries)

        profile_text = (
            f"Name: {user.first_name} {user.last_name}\n"
            f"Title: {bio}\n"
            f"Skills: {', '.join(user_skills) if user_skills else 'None'}\n"
            f"Experience: {'; '.join(f'{r} at {c}' for r, c in user_exps) if user_exps else 'None'}\n"
            f"Location: {profile.location if profile and profile.location else 'Not set'}"
        )

        messages = [
            {
                "role": "system",
                "content": (
                    "You are a job matching AI. Given a job seeker's profile and a list of "
                    "job postings, rank the jobs by relevance to the candidate. Consider:\n"
                    "1. Skill match — do the candidate's skills match the job requirements?\n"
                    "2. Role fit — does their experience align with the job title?\n"
                    "3. Location preference — prefer jobs near their location or remote.\n"
                    "4. Career progression — is this a logical next step?\n\n"
                    "Return ONLY valid JSON with one field:\n"
                    '- "ranked_ids": array of job IDs (integers) sorted from MOST to LEAST relevant.\n'
                    "Include ALL job IDs from the input. Do NOT include any text outside the JSON."
                ),
            },
            {
                "role": "user",
                "content": f"## Candidate Profile\n{profile_text}\n\n## Available Jobs\n{jobs_text}",
            },
        ]

        try:
            result = chat_completion_json(messages, max_tokens=1000)
            ranked = result.get("ranked_ids", [])
            # Validate — only keep IDs that exist in our job list
            valid_ids = {j.id for j in open_jobs}
            ranked = [int(r) for r in ranked if int(r) in valid_ids]

            # Append any jobs the AI missed (e.g. >40 jobs)
            remaining = [j.id for j in open_jobs if j.id not in set(ranked)]
            ranked.extend(remaining)

            logger.info("AI ranked %d jobs for user %s", len(ranked), user.id)
            return ranked
        except Exception as exc:
            logger.warning("AI ranking failed for user %s: %s", user.id, exc)
            return None


class JobApplicationViewSet(viewsets.ModelViewSet):
    """
    Allows a job seeker to apply for jobs and see their applications.
    Also allows employers to update the status of applications to their job posts.
    """
    serializer_class = JobApplicationSerializer

    def get_permissions(self):
        if self.action in ['update_status', 'retrieve', 'list', 'partial_update']:
            # We will handle granular access in get_queryset or inside the action
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticated(), IsJobSeeker()]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_employer:
            return JobApplication.objects.filter(job_post__employer=user).order_by('-created_at')
        return JobApplication.objects.filter(job_seeker=user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(job_seeker=self.request.user)

    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        application = self.get_object()
        if application.job_post.employer != request.user:
            return Response({"detail": "Not authorized to modify this application."}, status=403)
        
        new_status = request.data.get('status')
        if not new_status:
            return Response({"detail": "Status is required."}, status=400)
            
        application.status = new_status
        application.save()
        return Response({"status": "updated", "new_status": new_status})


from rest_framework.views import APIView
from rest_framework import status


class DismissJobView(APIView):
    """POST {job_post_id} to dismiss/skip a job so it never appears in the feed again."""
    permission_classes = [permissions.IsAuthenticated, IsJobSeeker]

    def post(self, request):
        job_post_id = request.data.get("job_post_id")
        if not job_post_id:
            return Response(
                {"detail": "job_post_id is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        DismissedJob.objects.get_or_create(
            job_seeker=request.user,
            job_post_id=job_post_id,
        )
        return Response({"detail": "Job dismissed."}, status=status.HTTP_201_CREATED)

