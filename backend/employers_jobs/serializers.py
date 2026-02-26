from rest_framework import serializers

from .models import JobPost


class JobPostSerializer(serializers.ModelSerializer):
    employer = serializers.PrimaryKeyRelatedField(read_only=True)
    applications_count = serializers.SerializerMethodField()

    class Meta:
        model = JobPost
        fields = [
            'id',
            'employer',
            'title',
            'description',
            'requirements',
            'salary',
            'location',
            'status',
            'applications_count',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'employer', 'created_at', 'updated_at']

    def get_applications_count(self, obj):
        return obj.jobapplication_set.count()

