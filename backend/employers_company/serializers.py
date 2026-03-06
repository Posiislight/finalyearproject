from rest_framework import serializers

from .models import CompanyAnalytics, CompanyGalleryImage, CompanyProfile, CompanyVerificationDocument, TeamMember


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ["id", "name", "role", "email", "avatar_color", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]

class CompanyVerificationDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyVerificationDocument
        fields = ["id", "document", "filename", "status", "created_at"]
        read_only_fields = ["id", "status", "created_at"]

class CompanyGalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyGalleryImage
        fields = ["id", "image_url", "caption", "order", "created_at"]
        read_only_fields = ["id", "created_at"]


class CompanyProfileSerializer(serializers.ModelSerializer):
    gallery_images = CompanyGalleryImageSerializer(many=True, read_only=True)
    team_members = TeamMemberSerializer(many=True, read_only=True)

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
            "industry",
            "company_size",
            "founded_year",
            "funding_stage",
            "work_model",
            "contact_phone",
            "hr_email",
            "brand_color",
            "cover_photo",
            "one_liner_pitch",
            "benefits",
            "is_verified",
            "created_at",
            "updated_at",
            "gallery_images",
            "team_members",
        ]
        read_only_fields = ["id", "is_verified", "created_at", "updated_at"]


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

