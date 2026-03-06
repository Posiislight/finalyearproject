from django.urls import path

from .views import (
    CompanyAnalyticsEventView,
    CompanyAnalyticsSummaryView,
    CompanyGalleryImageDetailView,
    CompanyGalleryImageListCreateView,
    CurrentCompanyProfileView,
    CompanyVerificationDocumentListCreateView,
    CompanyVerificationDocumentDetailView,
    EmployerSidebarCountsView,
    TeamMemberListCreateView,
    TeamMemberDetailView,
)

app_name = "employers_company"

urlpatterns = [
    path("profile/", CurrentCompanyProfileView.as_view(), name="profile"),
    path(
        "gallery/",
        CompanyGalleryImageListCreateView.as_view(),
        name="gallery-list-create",
    ),
    path(
        "gallery/<int:pk>/",
        CompanyGalleryImageDetailView.as_view(),
        name="gallery-detail",
    ),
    path(
        "analytics/summary/",
        CompanyAnalyticsSummaryView.as_view(),
        name="analytics-summary",
    ),
    path(
        "analytics/event/",
        CompanyAnalyticsEventView.as_view(),
        name="analytics-event",
    ),
    path(
        "documents/",
        CompanyVerificationDocumentListCreateView.as_view(),
        name="document-list-create",
    ),
    path(
        "documents/<int:pk>/",
        CompanyVerificationDocumentDetailView.as_view(),
        name="document-detail",
    ),
    path(
        "sidebar-counts/",
        EmployerSidebarCountsView.as_view(),
        name="sidebar-counts",
    ),
    path(
        "team/",
        TeamMemberListCreateView.as_view(),
        name="team-list-create",
    ),
    path(
        "team/<int:pk>/",
        TeamMemberDetailView.as_view(),
        name="team-detail",
    ),
]

