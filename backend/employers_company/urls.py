from django.urls import path

from .views import (
    CompanyAnalyticsEventView,
    CompanyAnalyticsSummaryView,
    CompanyGalleryImageDetailView,
    CompanyGalleryImageListCreateView,
    CurrentCompanyProfileView,
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
]

