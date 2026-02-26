from rest_framework import serializers

from .models import CompanyAnalytics, CompanyGalleryImage, CompanyProfile


class CompanyGalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyGalleryImage
        fields = ["id", "image_url", "caption", "order", "created_at"]
        read_only_fields = ["id", "created_at"]


class CompanyProfileSerializer(serializers.ModelSerializer):
    gallery_images = CompanyGalleryImageSerializer(many=True, read_only=True)

    class Meta:
        model = CompanyProfile
        fields = [
            "id",
            "name",
            "description",
            "website",
            "logo_url",
            "location",
            "culture_values",
            "mission",
            "created_at",
            "updated_at",
            "gallery_images",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class CompanyAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyAnalytics
        fields = [
            "id",
            "date",
            "views",
            "clicks",
            "shortlists",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

