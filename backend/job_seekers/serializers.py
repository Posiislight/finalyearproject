from rest_framework import serializers
from employers_jobs.models import JobPost
from users.serializers import EmployerProfileSerializer
from .models import JobApplication

class JobFeedSerializer(serializers.ModelSerializer):
    """
    Serializer for the Job Seeker's Job feed.
    Read-only serializer that fetches employer profile data 
    so the UI can display logos and company names.
    """
    company_name = serializers.CharField(source='employer.employer_profile.company_name', read_only=True)
    logo_color = serializers.SerializerMethodField()
    logo_initials = serializers.SerializerMethodField()

    class Meta:
        model = JobPost
        fields = [
            'id', 'title', 'company_name', 'logo_initials', 'logo_color',
            'location', 'salary', 'requirements', 'description', 
            'created_at'
        ]

    def get_logo_color(self, obj):
        colors = ['#2563eb', '#7c3aed', '#059669', '#dc2626', '#d97706', '#0891b2']
        # deterministically pick a color based on user ID
        return colors[obj.employer.id % len(colors)]
        
    def get_logo_initials(self, obj):
        try:
            name = obj.employer.employer_profile.company_name
            if name:
                return "".join([word[0].upper() for word in name.split()[:2]])
        except Exception:
            pass
        return "C"


class JobApplicationSerializer(serializers.ModelSerializer):
    job_post_details = JobFeedSerializer(source='job_post', read_only=True)

    class Meta:
        model = JobApplication
        fields = [
            'id', 'job_post', 'status', 'created_at', 'updated_at',
            'job_post_details' # Added for rendering the Applications UI list
        ]
        read_only_fields = ['id', 'status', 'created_at', 'updated_at']

    def create(self, validated_data):
        # job_seeker is injected by the view via perform_create
        return super().create(validated_data)
