from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import JobSeekerProfile, EmployerProfile, Skill, Experience


User = get_user_model()


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "name", "level"]
        read_only_fields = ["id"]


class ExperienceSerializer(serializers.ModelSerializer):
    duration = serializers.SerializerMethodField()

    class Meta:
        model = Experience
        fields = [
            "id", "role", "company", "start_date", "end_date",
            "is_current", "duration",
        ]
        read_only_fields = ["id"]

    def get_duration(self, obj):
        from datetime import date
        end = date.today() if obj.is_current else (obj.end_date or date.today())
        months = (end.year - obj.start_date.year) * 12 + end.month - obj.start_date.month
        years, remaining = divmod(months, 12)
        parts = []
        if years:
            parts.append(f"{years} yr{'s' if years > 1 else ''}")
        if remaining:
            parts.append(f"{remaining} mo")
        return " ".join(parts) or "< 1 mo"


class JobSeekerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSeekerProfile
        fields = [
            "id",
            "bio",
            "location",
            "profile_picture",
            "resume",
            "is_active",
        ]
        read_only_fields = ["id"]


class EmployerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployerProfile
        fields = [
            "id",
            "company_name",
            "bio",
            "location",
            "profile_picture",
            "company_website",
            "is_active",
        ]
        read_only_fields = ["id"]


class UserSerializer(serializers.ModelSerializer):
    job_seeker_profile = JobSeekerProfileSerializer(required=False)
    employer_profile = EmployerProfileSerializer(read_only=True)
    skills = SkillSerializer(many=True, read_only=True)
    experiences = ExperienceSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "is_job_seeker",
            "is_employer",
            "job_seeker_profile",
            "employer_profile",
            "skills",
            "experiences",
        ]
        read_only_fields = [
            "id",
            "is_job_seeker",
            "is_employer",
        ]

    def update(self, instance, validated_data):
        # Handle nested profile update
        profile_data = validated_data.pop("job_seeker_profile", None)
        instance = super().update(instance, validated_data)

        if profile_data and hasattr(instance, "job_seeker_profile"):
            profile = instance.job_seeker_profile
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()

        return instance


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer used for user registration.

    It creates the User instance, sets the appropriate role flags, and also
    creates the corresponding profile model.
    """

    password = serializers.CharField(write_only=True, min_length=8)
    user_type = serializers.ChoiceField(
        choices=[("job_seeker", "Job Seeker"), ("employer", "Employer")],
        write_only=True
    )

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "user_type"]
        read_only_fields = ["id"]

    def create(self, validated_data):
        user_type = validated_data.pop("user_type")
        password = validated_data.pop("password")

        # If username isn't provided, fall back to email for convenience.
        username = validated_data.get("username") or validated_data.get("email")
        validated_data.setdefault("username", username)

        user = User(**validated_data)
        user.set_password(password)

        if user_type == "job_seeker":
            user.is_job_seeker = True
        elif user_type == "employer":
            user.is_employer = True

        user.save()

        if user.is_job_seeker:
            JobSeekerProfile.objects.create(user=user)
        if user.is_employer:
            EmployerProfile.objects.create(user=user)

        return user
