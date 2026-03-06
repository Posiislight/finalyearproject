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


# ---------------------------------------------------------------------------
# 7. AI Candidate Ranking (for Employers)
# ---------------------------------------------------------------------------

class CandidateRankView(APIView):
    """
    POST /api/v1/ai/rank-candidates/
    Body: { "job_post_id": 5 }

    Returns applicants ranked by AI relevance for the given job post:
    {
        "ranked_applicants": [
            {
                "application_id": 12,
                "match_score": 92,
                "reason": "Strong React and Node.js skills match requirements..."
            },
            ...
        ]
    }

    Falls back to keyword scoring if AI is unavailable.
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

        # Ensure the current user owns this job post
        if job.employer != request.user:
            return Response(
                {"detail": "Not authorized."},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Get all pending applications for this job
        applications = list(
            JobApplication.objects.filter(job_post=job)
            .select_related(
                "job_seeker",
                "job_seeker__job_seeker_profile",
            )
            .order_by("-created_at")
        )

        if not applications:
            return Response({"ranked_applicants": []})

        # Build candidate summaries for AI
        from users.models import Skill, Experience

        candidate_summaries = []
        for app in applications[:30]:  # Cap to avoid token overflow
            seeker = app.job_seeker
            profile = getattr(seeker, "job_seeker_profile", None)
            skills = list(
                Skill.objects.filter(user=seeker).values_list("name", flat=True)
            )
            exps = list(
                Experience.objects.filter(user=seeker).values_list("role", "company")[:3]
            )
            candidate_summaries.append(
                f"[{app.id}] {seeker.first_name} {seeker.last_name} | "
                f"Skills: {', '.join(skills) if skills else 'None'} | "
                f"Experience: {'; '.join(f'{r} at {c}' for r, c in exps) if exps else 'None'} | "
                f"Bio: {(profile.bio[:100] if profile and profile.bio else 'N/A')}"
            )

        candidates_text = "\n".join(candidate_summaries)

        job_text = (
            f"Title: {job.title}\n"
            f"Description: {job.description[:500] if job.description else 'N/A'}\n"
            f"Requirements: {job.requirements[:500] if job.requirements else 'N/A'}\n"
            f"Location: {job.location or 'Not specified'}\n"
        )

        messages = [
            {
                "role": "system",
                "content": (
                    "You are a recruitment AI. Given a job posting and a list of candidates "
                    "who applied, rank the candidates by how well they fit the role.\n\n"
                    "Consider:\n"
                    "1. Skill match — do the candidate's skills match the requirements?\n"
                    "2. Experience relevance — does their work history align?\n"
                    "3. Overall fit — bio, career trajectory, location.\n\n"
                    "Return ONLY valid JSON with one field:\n"
                    '- "ranked_applicants": array of objects, each with:\n'
                    '  - "application_id": integer (the ID in brackets)\n'
                    '  - "match_score": integer 0-100\n'
                    '  - "reason": 1-2 sentence explanation\n'
                    "Sort from HIGHEST to LOWEST match_score.\n"
                    "Include ALL candidates from the input.\n"
                    "Do NOT include markdown, code fences, or any other text."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"## Job Posting\n{job_text}\n\n"
                    f"## Candidates\n{candidates_text}"
                ),
            },
        ]

        try:
            result = chat_completion_json(messages, max_tokens=2000)
            ranked = result.get("ranked_applicants", [])

            # Validate — only keep application IDs that exist
            valid_ids = {app.id for app in applications}
            validated = [
                r for r in ranked
                if isinstance(r, dict) and int(r.get("application_id", 0)) in valid_ids
            ]

            # Append any candidates the AI missed
            ranked_ids = {int(r["application_id"]) for r in validated}
            for app in applications:
                if app.id not in ranked_ids:
                    validated.append({
                        "application_id": app.id,
                        "match_score": 50,
                        "reason": "AI ranking unavailable for this candidate.",
                    })

            return Response({"ranked_applicants": validated})

        except Exception as exc:
            logger.warning("AI candidate ranking failed: %s", exc)
            # Fallback: keyword scoring
            return Response({
                "ranked_applicants": self._keyword_fallback(job, applications)
            })

    def _keyword_fallback(self, job, applications):
        """Simple keyword-based ranking when AI is unavailable."""
        import re as _re
        from users.models import Skill, Experience

        job_keywords = set()
        for text in [job.title or "", job.requirements or "", job.description or ""]:
            words = _re.findall(r'\w+', text.lower())
            job_keywords.update(w for w in words if len(w) > 2)

        scored = []
        for app in applications:
            seeker = app.job_seeker
            profile = getattr(seeker, "job_seeker_profile", None)
            candidate_text = " ".join([
                " ".join(Skill.objects.filter(user=seeker).values_list("name", flat=True)),
                " ".join(Experience.objects.filter(user=seeker).values_list("role", flat=True)),
                (profile.bio if profile and profile.bio else ""),
            ]).lower()

            matches = sum(1 for kw in job_keywords if kw in candidate_text)
            score = min(100, int((matches / max(len(job_keywords), 1)) * 100))

            scored.append({
                "application_id": app.id,
                "match_score": score,
                "reason": f"Keyword match: {matches} of {len(job_keywords)} job keywords found in profile.",
            })

        scored.sort(key=lambda x: -x["match_score"])
        return scored


# ---------------------------------------------------------------------------
# 8. Employer Job Assistant
# ---------------------------------------------------------------------------

class EmployerJobAssistantView(APIView):
    """
    POST /api/v1/ai/generate-job-post/
    Body: { "title": "Senior Engineer", "requirements": "React...", "location": "London", "salary": "" }

    Returns a structured job payload using AI:
    {
        "description": "...",
        "ats_optimization": 92,
        "ats_tips": ["Add Node.js", ...],
        "salary_min": "$120k",
        "salary_max": "$150k"
    }
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        title = request.data.get("title", "")
        requirements = request.data.get("requirements", "")
        location = request.data.get("location", "")
        salary = request.data.get("salary", "")

        if not title:
            return Response(
                {"detail": "Job Title is required to use the AI Assistant."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Basic detail validation
        company_name = getattr(request.user, "employer_profile", None)
        if company_name:
            company_name = company_name.company_name
        else:
            company_name = "Our Company"

        messages = [
            {
                "role": "system",
                "content": (
                    "You are an expert technical recruiter and HR consultant AI. "
                    "Your goal is to help an employer write an attractive, high-converting "
                    "job description, while also analyzing the job posting for ATS (Applicant Tracking System) "
                    "optimization and providing market salary estimates.\n\n"
                    "Return ONLY valid JSON with exactly these fields:\n"
                    '- "description": A professionally written, exciting 3-4 paragraph job description based on the title and requirements.\n'
                    '- "ats_optimization": An integer from 0-100 indicating how well-written/optimised their initial title and requirements are.\n'
                    '- "ats_tips": An array of exactly 5 short, actionable tips (strings) to improve the job post\'s visibility to candidates and ATS software.\n'
                    '- "salary_min": Estimated minimum market salary string (e.g. "£40,000" or "$120k") based on the location and title.\n'
                    '- "salary_max": Estimated maximum market salary string.\n'
                    '- "salary_min_num": Estimated minimum market salary as a raw integer (e.g. 120000).\n'
                    '- "salary_max_num": Estimated maximum market salary as a raw integer (e.g. 150000).\n'
                    '- "salary_currency": The 3-letter currency code for the market salary (e.g. "USD", "GBP", "EUR", "CAD", "NGN").\n'
                    '- "salary_location": The geographic area or context the market salary is based on (e.g. "San Francisco, CA" or "Remote globally").\n\n'
                    "Do NOT include markdown formatting, code fences, or any other text outside the JSON block."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"## Job Information Provided by Employer\n"
                    f"Company: {company_name}\n"
                    f"Title: {title}\n"
                    f"Location: {location or 'Not specified'}\n"
                    f"Salary Range Input: {salary or 'Not specified'}\n"
                    f"Requirements: {requirements or 'None provided. Generate standard requirements for this title.'}\n"
                ),
            },
        ]

        try:
            result = chat_completion_json(messages, max_tokens=1500)
            return Response(result)
        except Exception as exc:
            logger.error("Job Generator AI error: %s", exc)
            return Response(
                {
                    "description": "AI generation is temporarily disabled. Please write a description manually.",
                    "ats_optimization": 0,
                    "ats_tips": ["AI temporarily unavailable"],
                    "salary_min": "N/A",
                    "salary_max": "N/A"
                },
                status=status.HTTP_200_OK,
            )


# ---------------------------------------------------------------------------
# 9. Employer Job Insights
# ---------------------------------------------------------------------------

class EmployerInsightsView(APIView):
    """
    GET /api/v1/ai/employer-insights/

    Returns AI-generated actionable insights for the employer based on their 
    current active jobs and applications.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        
        # Ensure the user is an employer
        company_profile = getattr(user, "employer_profile", None)
        if not company_profile:
            return Response(
                {"detail": "Must be an employer to access insights."},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Gather active/open jobs context
        open_jobs = JobPost.objects.filter(
            employer=user, 
            status='open'
        ).order_by("-created_at")[:5]

        # Get application counts for context
        jobs_context = []
        for job in open_jobs:
            app_count = job.applications.count()
            jobs_context.append(
                f"- Title: {job.title}\n"
                f"  Applications: {app_count}\n"
                f"  Requirements: {job.requirements[:100]}...\n"
                f"  Location: {job.location or 'Not specified'}"
            )
            
        jobs_text = "\n".join(jobs_context) if jobs_context else "No open jobs currently."

        messages = [
            {
                "role": "system",
                "content": (
                    "You are an expert technical recruiter and HR consultant AI. "
                    "Analyze an employer's current open job postings (and their application volume) "
                    "and generate exactly 3 highly actionable, specific insights to help them improve hiring. "
                    "If they have no jobs, give 3 general best-practice tips for posting a new job.\n\n"
                    "Return ONLY valid JSON containing an array of exactly 3 objects under the key 'insights'.\n"
                    "Each object MUST have these exact fields:\n"
                    "- 'icon_color': string (one of: 'red-500', 'yellow-400', 'orange-400', 'green-400', 'blue-400')\n"
                    "- 'title': string (short, punchy title, e.g. 'Optimize \"Frontend Developer\" Title')\n"
                    "- 'description_start': string (the first part of the sentence before the highlighted stat/metric)\n"
                    "- 'highlight_text': string (the specific stat or key phrase to highlight in blue, e.g. '18%')\n"
                    "- 'description_end': string (the rest of the sentence, if any)\n"
                    "- 'action_text': string (short button text, e.g. 'Apply Suggestion' or 'Update Job')\n"
                    "- 'action_icon': string (a loud material symbol icon name, e.g. 'arrow_forward', 'edit', 'refresh', 'auto_fix_high')\n\n"
                    "Do NOT include markdown, code fences, or any other text outside the JSON."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"## Employer Information\n"
                    f"Company: {getattr(company_profile, 'company_name', 'TechFlow Systems')}\n"
                    f"Industry: {getattr(company_profile, 'industry', 'Technology')}\n\n"
                    f"## Open Job Postings\n{jobs_text}\n"
                ),
            },
        ]

        try:
            result = chat_completion_json(messages, max_tokens=1500)
            return Response(result)
        except Exception as exc:
            logger.error("Employer insights AI error: %s", exc)
            
            # Fallback to hardcoded insights if AI fails
            fallback = {
                "insights": [
                    {
                        "icon_color": "red-500",
                        "title": "Optimize Job Titles",
                        "description_start": "Clearer job titles could increase qualified matches by ",
                        "highlight_text": "18%",
                        "description_end": ".",
                        "action_text": "Edit Titles",
                        "action_icon": "edit"
                    },
                    {
                        "icon_color": "yellow-400",
                        "title": "Salary Transparency Boost",
                        "description_start": "Adding a salary range typically improves response rates by ",
                        "highlight_text": "30%",
                        "description_end": ".",
                        "action_text": "Add Salaries",
                        "action_icon": "attach_money"
                    },
                    {
                        "icon_color": "orange-400",
                        "title": "Refresh Strategy",
                        "description_start": "Consider scheduling routine job bumps for ",
                        "highlight_text": "Monday mornings",
                        "description_end": " to maximize visibility.",
                        "action_text": "Refresh Analysis",
                        "action_icon": "refresh"
                    }
                ]
            }
            return Response(fallback, status=status.HTTP_200_OK)

