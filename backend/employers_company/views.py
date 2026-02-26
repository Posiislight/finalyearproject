from datetime import date, datetime

from django.db.models import Sum
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CompanyAnalytics, CompanyGalleryImage, CompanyProfile
from .serializers import (
    CompanyAnalyticsSerializer,
    CompanyGalleryImageSerializer,
    CompanyProfileSerializer,
)


class IsEmployerAuthenticated(permissions.IsAuthenticated):
    """
    Placeholder for employer-specific permission checks.
    For now, this behaves like IsAuthenticated but keeps the door open
    for role-based restrictions once EmployerProfile is available.
    """

    pass


class CurrentCompanyProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = CompanyProfileSerializer
    permission_classes = [IsEmployerAuthenticated]

    def get_object(self):
        user = self.request.user
        company, _ = CompanyProfile.objects.get_or_create(
            owner=user,
            defaults={
                "name": getattr(user, "username", "Company"),
            },
        )
        return company


class CompanyGalleryImageListCreateView(generics.ListCreateAPIView):
    serializer_class = CompanyGalleryImageSerializer
    permission_classes = [IsEmployerAuthenticated]

    def get_queryset(self):
        return CompanyGalleryImage.objects.filter(
            company__owner=self.request.user
        ).select_related("company")

    def perform_create(self, serializer):
        company = CompanyProfile.objects.get(owner=self.request.user)
        serializer.save(company=company)


class CompanyGalleryImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CompanyGalleryImageSerializer
    permission_classes = [IsEmployerAuthenticated]

    def get_queryset(self):
        return CompanyGalleryImage.objects.filter(
            company__owner=self.request.user
        ).select_related("company")


class CompanyAnalyticsSummaryView(APIView):
    permission_classes = [IsEmployerAuthenticated]

    def get(self, request):
        company = CompanyProfile.objects.filter(owner=request.user).first()
        if not company:
            return Response(
                {"detail": "Company profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        start_date_str = request.query_params.get("start_date")
        end_date_str = request.query_params.get("end_date")

        try:
            start = (
                datetime.strptime(start_date_str, "%Y-%m-%d").date()
                if start_date_str
                else None
            )
            end = (
                datetime.strptime(end_date_str, "%Y-%m-%d").date()
                if end_date_str
                else None
            )
        except ValueError:
            return Response(
                {"detail": "Invalid date format. Use YYYY-MM-DD."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        qs = CompanyAnalytics.objects.filter(company=company)
        if start:
            qs = qs.filter(date__gte=start)
        if end:
            qs = qs.filter(date__lte=end)

        aggregates = qs.aggregate(
            total_views=Sum("views"),
            total_clicks=Sum("clicks"),
            total_shortlists=Sum("shortlists"),
        )

        per_day = CompanyAnalyticsSerializer(qs, many=True).data

        return Response(
            {
                "company_id": company.id,
                "totals": {
                    "views": aggregates["total_views"] or 0,
                    "clicks": aggregates["total_clicks"] or 0,
                    "shortlists": aggregates["total_shortlists"] or 0,
                },
                "per_day": per_day,
            }
        )


class CompanyAnalyticsEventView(APIView):
    """
    Lightweight endpoint to record analytics events (views, clicks, shortlists).
    The frontend can call this whenever a relevant event occurs.
    """

    permission_classes = [IsEmployerAuthenticated]

    def post(self, request):
        company = CompanyProfile.objects.filter(owner=request.user).first()
        if not company:
            return Response(
                {"detail": "Company profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

        event_type = request.data.get("event_type")
        if event_type not in {"view", "click", "shortlist"}:
            return Response(
                {"detail": "event_type must be 'view', 'click', or 'shortlist'."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        today = date.today()
        analytics, _ = CompanyAnalytics.objects.get_or_create(
            company=company, date=today
        )

        if event_type == "view":
            analytics.views += 1
        elif event_type == "click":
            analytics.clicks += 1
        elif event_type == "shortlist":
            analytics.shortlists += 1

        analytics.save()

        return Response(
            CompanyAnalyticsSerializer(analytics).data,
            status=status.HTTP_200_OK,
        )

