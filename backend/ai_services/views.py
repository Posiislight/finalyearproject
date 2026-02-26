"""
AI-powered API views.

Each view calls the OpenRouter LLM to generate dynamic content that
replaces the hardcoded UI placeholders in the frontend.
"""

import logging

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from employers_jobs.models import JobPost
from job_seekers.models import JobApplication

from .openrouter_client import chat_completion, chat_completion_json

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# 1. Match Score
# ---------------------------------------------------------------------------

class MatchScoreView(APIView):
    """
    POST /api/v1/ai/match-score/
    Body: { "job_post_id": 5 }

    Returns: { "match_score": 85, "reason": "..." }
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        job_post_id = request.data.get("job_post_id")
        if not job_post_id:
            return Response(
                {"detail": "job_post_id is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            job = JobPost.objects.get(id=job_post_id)
        except JobPost.DoesNotExist:
            return Response(
                {"detail": "Job post not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Build rich user profile context
        user = request.user
        profile = getattr(user, "job_seeker_profile", None)

        from users.models import Skill, Experience
        skills = list(Skill.objects.filter(user=user).values_list("name", flat=True))
        experiences = list(
            Experience.objects.filter(user=user).values_list("role", "company")[:5]
        )

        user_context = (
            f"Name: {user.first_name} {user.last_name}\n"
            f"Bio/Title: {profile.bio if profile else 'Not set'}\n"
            f"Location: {profile.location if profile else 'Not set'}\n"
            f"Skills: {', '.join(skills) if skills else 'None listed'}\n"
            f"Experience: {'; '.join(f'{r} at {c}' for r, c in experiences) if experiences else 'None listed'}\n"
        )

        messages = [
            {
                "role": "system",
                "content": (
                    "You are a recruitment AI. Given a job seeker's profile "
                    "and a job posting, evaluate compatibility.\n\n"
                    "Return ONLY valid JSON with two fields:\n"
                    '- "match_score": an integer from 0-100\n'
                    '- "reason": a concise analysis (2-3 sentences) that mentions: '
                    "which skills align, the biggest gap, and one actionable tip. "
                    "Reference specific skill names. Be encouraging but honest.\n"
                    "Do NOT use bullet points or markdown. Do NOT wrap in code fences."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"## Job Seeker Profile\n{user_context}\n\n"
                    f"## Job Posting\n"
                    f"Title: {job.title}\n"
                    f"Description: {job.description}\n"
                    f"Requirements: {job.requirements}\n"
                    f"Location: {job.location}\n"
                    f"Salary: {job.salary}\n"
                ),
            },
        ]

        try:
            result = chat_completion_json(messages, max_tokens=2048)
            return Response(result)
        except Exception as exc:
            logger.error("Match score AI error: %s", exc)
            return Response(
                {"match_score": 75, "reason": "AI matching is temporarily unavailable."},
                status=status.HTTP_200_OK,
            )


# ---------------------------------------------------------------------------
# 2. Candidate Summary (for Employers)
# ---------------------------------------------------------------------------

class CandidateSummaryView(APIView):
    """
    POST /api/v1/ai/candidate-summary/
    Body: { "application_id": 12 }

    Returns: { "summary": "Alex is a strong contender..." }
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        application_id = request.data.get("application_id")
        if not application_id:
            return Response(
                {"detail": "application_id is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            application = JobApplication.objects.select_related(
                "job_seeker", "job_seeker__job_seeker_profile", "job_post"
            ).get(id=application_id)
        except JobApplication.DoesNotExist:
            return Response(
                {"detail": "Application not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Verify the current user is the employer who owns this job post
        if application.job_post.employer != request.user:
            return Response(
                {"detail": "Not authorized."},
                status=status.HTTP_403_FORBIDDEN,
            )

        candidate = application.job_seeker
        profile = getattr(candidate, "job_seeker_profile", None)
        job = application.job_post

        messages = [
            {
                "role": "system",
                "content": (
                    "You are a recruitment AI assistant. Given a candidate's profile and a "
                    "job posting they applied for, write a concise 3-4 sentence professional "
                    "summary highlighting their strengths and fit for the role. "
                    "Return ONLY valid JSON with one field:\n"
                    '- "summary": the summary text\n'
                    "Do NOT include markdown, code fences, or any other text."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"## Candidate\n"
                    f"Name: {candidate.first_name} {candidate.last_name}\n"
                    f"Bio: {profile.bio if profile else 'Not provided'}\n"
                    f"Location: {profile.location if profile else 'Not provided'}\n"
                    f"Cover Letter: {application.cover_letter or 'Not provided'}\n\n"
                    f"## Job Posting\n"
                    f"Title: {job.title}\n"
                    f"Description: {job.description}\n"
                    f"Requirements: {job.requirements}\n"
                ),
            },
        ]

        try:
            result = chat_completion_json(messages)
            return Response(result)
        except Exception as exc:
            logger.error("Candidate summary AI error: %s", exc)
            return Response(
                {"summary": "AI summary is temporarily unavailable for this candidate."},
                status=status.HTTP_200_OK,
            )


# ---------------------------------------------------------------------------
# 3. Job Seeker AI Insights
# ---------------------------------------------------------------------------

class JobSeekerInsightsView(APIView):
    """
    GET /api/v1/ai/job-seeker-insights/

    Returns: { "ats_score": 87, "gap_skills": [...], "trending_skills": [...], "courses": [...] }
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        profile = getattr(user, "job_seeker_profile", None)

        # Gather context about recent applications
        recent_apps = JobApplication.objects.filter(
            job_seeker=user
        ).select_related("job_post").order_by("-created_at")[:5]

        applied_jobs_text = "\n".join(
            f"- {app.job_post.title}: {app.job_post.requirements[:200]}"
            for app in recent_apps
        ) or "No recent applications."

        messages = [
            {
                "role": "system",
                "content": (
                    "You are a career advisor AI. Analyse a job seeker's profile and their "
                    "recent job applications. Return ONLY valid JSON with these fields:\n"
                    '- "ats_score": integer 0-100, how well-optimised their profile is for ATS systems\n'
                    '- "gap_skills": array of 3-5 skill strings they should learn\n'
                    '- "trending_skills": array of 3-5 trending skills in their industry\n'
                    '- "courses": array of 2-3 objects, each with "title", "provider", "duration", "match" fields\n'
                    "Do NOT include markdown, code fences, or any other text."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"## Job Seeker Profile\n"
                    f"Name: {user.first_name} {user.last_name}\n"
                    f"Bio: {profile.bio if profile else 'Not set'}\n"
                    f"Location: {profile.location if profile else 'Not set'}\n\n"
                    f"## Recent Job Applications\n{applied_jobs_text}\n"
                ),
            },
        ]

        try:
            result = chat_completion_json(messages, max_tokens=1500)
            return Response(result)
        except Exception as exc:
            logger.error("Job seeker insights AI error: %s", exc)
            return Response(
                {
                    "ats_score": 75,
                    "gap_skills": ["Unable to generate insights right now"],
                    "trending_skills": ["AI temporarily unavailable"],
                    "courses": [],
                },
                status=status.HTTP_200_OK,
            )


# ---------------------------------------------------------------------------
# 4. Cover Letter Generator
# ---------------------------------------------------------------------------

class CoverLetterView(APIView):
    """
    POST /api/v1/ai/cover-letter/
    Body: { "job_post_id": 5 }

    Returns: { "cover_letter": "Dear Hiring Manager..." }
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        job_post_id = request.data.get("job_post_id")
        if not job_post_id:
            return Response(
                {"detail": "job_post_id is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            job = JobPost.objects.get(id=job_post_id)
        except JobPost.DoesNotExist:
            return Response(
                {"detail": "Job post not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        user = request.user
        profile = getattr(user, "job_seeker_profile", None)

        messages = [
            {
                "role": "system",
                "content": (
                    "You are a professional cover letter writer. Write a compelling, "
                    "personalised cover letter for a job application. Keep it concise "
                    "(3-4 paragraphs). Return ONLY valid JSON with one field:\n"
                    '- "cover_letter": the full cover letter text\n'
                    "Do NOT include markdown, code fences, or any other text."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"## Applicant\n"
                    f"Name: {user.first_name} {user.last_name}\n"
                    f"Bio: {profile.bio if profile else 'Not provided'}\n"
                    f"Location: {profile.location if profile else 'Not provided'}\n\n"
                    f"## Job Posting\n"
                    f"Title: {job.title}\n"
                    f"Company: {getattr(job.employer, 'employer_profile', None) and job.employer.employer_profile.company_name or 'the company'}\n"
                    f"Description: {job.description}\n"
                    f"Requirements: {job.requirements}\n"
                ),
            },
        ]

        try:
            result = chat_completion_json(messages, max_tokens=1500)
            return Response(result)
        except Exception as exc:
            logger.error("Cover letter AI error: %s", exc)
            return Response(
                {
                    "cover_letter": (
                        f"Dear Hiring Manager,\n\n"
                        f"I am writing to express my interest in the {job.title} position. "
                        f"Unfortunately, the AI cover letter generator is currently unavailable. "
                        f"Please try again shortly.\n\n"
                        f"Best regards,\n{user.first_name} {user.last_name}"
                    )
                },
                status=status.HTTP_200_OK,
            )


# ---------------------------------------------------------------------------
# 5. Resume Parser (PDF → structured profile data)
# ---------------------------------------------------------------------------

class ResumeParseView(APIView):
    """
    POST /api/v1/ai/parse-resume/
    Body: multipart form with 'resume' file (PDF)

    Returns structured JSON extracted from the resume:
    {
        "first_name": "...", "last_name": "...", "bio": "...", "location": "...",
        "skills": [{"name": "...", "level": 70}, ...],
        "experiences": [{"role": "...", "company": "...", "start_date": "...", "end_date": "...", "is_current": false}, ...]
    }
    """
    permission_classes = [permissions.IsAuthenticated]

    def get_parsers(self):
        from rest_framework.parsers import MultiPartParser, FormParser
        return [MultiPartParser(), FormParser()]

    def post(self, request):
        file = request.FILES.get('resume')
        if not file:
            return Response(
                {"detail": "No resume file provided."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Extract text from PDF
        try:
            import PyPDF2
            import io
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(file.read()))
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() or ""
            text = text.strip()
            if not text:
                return Response(
                    {"detail": "Could not extract text from the PDF. Please try a different file."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as exc:
            logger.error("PDF parsing error: %s", exc)
            return Response(
                {"detail": "Failed to read the PDF file."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Truncate very long resumes to avoid token limits
        text = text[:6000]

        messages = [
            {
                "role": "system",
                "content": (
                    "You are a resume parser AI. Given the raw text extracted from a resume PDF, "
                    "extract structured profile data. Return ONLY valid JSON with these fields:\n"
                    '- "first_name": string\n'
                    '- "last_name": string\n'
                    '- "bio": string (a short professional title/headline, e.g. "Frontend Developer")\n'
                    '- "location": string (city, country if found, otherwise "")\n'
                    '- "skills": array of objects with "name" (string) and "level" (integer 10-100, estimate proficiency)\n'
                    '- "experiences": array of objects with "role" (string), "company" (string), '
                    '"start_date" (string YYYY-MM-DD, estimate if only year/month given), '
                    '"end_date" (string YYYY-MM-DD or null), "is_current" (boolean)\n'
                    "Extract at most 10 skills and 5 most recent experiences.\n"
                    "Do NOT include markdown, code fences, or any other text outside the JSON."
                ),
            },
            {
                "role": "user",
                "content": f"## Resume Text\n\n{text}",
            },
        ]

        try:
            result = chat_completion_json(messages, max_tokens=2000)
            # Also save the resume file to the user's profile
            file.seek(0)
            profile = getattr(request.user, 'job_seeker_profile', None)
            if profile:
                profile.resume = file
                profile.save()
            return Response(result)
        except Exception as exc:
            logger.error("Resume parse AI error: %s", exc)
            return Response(
                {"detail": "AI could not parse the resume. Please try the manual flow."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# ---------------------------------------------------------------------------
# 6. Resume Optimization Suggestions
# ---------------------------------------------------------------------------

class ResumeOptimizeView(APIView):
    """
    GET /api/v1/ai/optimize-resume/

    Returns AI suggestions for improving the resume based on recent applications:
    {
        "optimizations": [
            {"target_role": "...", "suggestions": ["...", ...], "ats_score": 85},
            ...
        ]
    }
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        profile = getattr(user, "job_seeker_profile", None)

        # Get user's skills
        from users.models import Skill, Experience
        user_skills = list(Skill.objects.filter(user=user).values_list("name", flat=True))
        user_experiences = list(
            Experience.objects.filter(user=user).values_list("role", "company")[:3]
        )

        # Get recent applied jobs for context
        recent_apps = JobApplication.objects.filter(
            job_seeker=user
        ).select_related("job_post").order_by("-created_at")[:5]

        if not recent_apps.exists():
            return Response({
                "optimizations": [],
                "message": "Apply to some jobs first so we can generate tailored suggestions."
            })

        jobs_text = "\n".join(
            f"- {app.job_post.title} at {getattr(app.job_post.employer.employer_profile, 'company_name', 'Unknown') if hasattr(app.job_post.employer, 'employer_profile') else 'Unknown'}: {app.job_post.requirements[:200]}"
            for app in recent_apps
        )

        messages = [
            {
                "role": "system",
                "content": (
                    "You are a career coach AI. Given a job seeker's profile and their recent "
                    "job applications, generate resume optimization suggestions for each applied role. "
                    "Return ONLY valid JSON with one field:\n"
                    '- "optimizations": array of objects, each with:\n'
                    '  - "target_role": the job title\n'
                    '  - "company": the company name\n'
                    '  - "ats_score": estimated ATS score (integer 0-100) for their current profile vs this role\n'
                    '  - "suggestions": array of 2-3 specific improvement strings\n'
                    "Generate for up to 3 most recent applications.\n"
                    "Do NOT include markdown, code fences, or any other text."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"## Job Seeker Profile\n"
                    f"Name: {user.first_name} {user.last_name}\n"
                    f"Bio: {profile.bio if profile else 'Not set'}\n"
                    f"Skills: {', '.join(user_skills) if user_skills else 'None listed'}\n"
                    f"Experience: {'; '.join(f'{r} at {c}' for r, c in user_experiences) if user_experiences else 'None listed'}\n\n"
                    f"## Recent Job Applications\n{jobs_text}\n"
                ),
            },
        ]

        try:
            result = chat_completion_json(messages, max_tokens=1500)
            return Response(result)
        except Exception as exc:
            logger.error("Resume optimize AI error: %s", exc)
            return Response(
                {
                    "optimizations": [],
                    "message": "AI optimization is temporarily unavailable.",
                },
                status=status.HTTP_200_OK,
            )
