from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import JobPost
from .serializers import JobPostSerializer


class IsEmployerOwner(permissions.BasePermission):
    """
    Allows access only to the employer who owns the job post.
    """

    def has_object_permission(self, request, view, obj):
        return obj.employer == request.user


from rest_framework import permissions, viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend

class JobPostViewSet(viewsets.ModelViewSet):
    serializer_class = JobPostSerializer
    permission_classes = [permissions.IsAuthenticated, IsEmployerOwner]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['status', 'location']
    search_fields = ['title', 'description']

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return JobPost.objects.none()
        return JobPost.objects.filter(employer=user)

    def perform_create(self, serializer):
        serializer.save(employer=self.request.user)

    @action(detail=False, methods=['get'])
    def all_applicants(self, request):
        """
        Returns all applicants across all jobs for the current employer.
        """
        try:
            from job_seekers.models import JobApplication
            from job_seekers.serializers import JobApplicationSerializer
        except ImportError:
            return Response(
                {"detail": "JobApplication model/serializer not available."},
                status=501,
            )

        user = self.request.user
        applications = JobApplication.objects.filter(job_post__employer=user).order_by('-created_at')
        
        serializer = JobApplicationSerializer(applications, many=True)
        return Response(serializer.data)

