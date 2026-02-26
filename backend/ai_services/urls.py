from django.urls import path

from .views import (
    CandidateSummaryView,
    CoverLetterView,
    JobSeekerInsightsView,
    MatchScoreView,
    ResumeParseView,
    ResumeOptimizeView,
)

urlpatterns = [
    path("match-score/", MatchScoreView.as_view(), name="ai-match-score"),
    path("candidate-summary/", CandidateSummaryView.as_view(), name="ai-candidate-summary"),
    path("job-seeker-insights/", JobSeekerInsightsView.as_view(), name="ai-job-seeker-insights"),
    path("cover-letter/", CoverLetterView.as_view(), name="ai-cover-letter"),
    path("parse-resume/", ResumeParseView.as_view(), name="ai-parse-resume"),
    path("optimize-resume/", ResumeOptimizeView.as_view(), name="ai-optimize-resume"),
]
