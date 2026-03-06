from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, viewsets, status
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Skill, Experience
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    SkillSerializer,
    ExperienceSerializer,
    ChangePasswordSerializer,
)


User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Extend the default JWT serializer so that the response also includes
    basic user information and role flags.
    """

    def validate(self, attrs):
        data = super().validate(attrs)
        data["user"] = UserSerializer(self.user).data
        return data


class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    """
    Endpoint for registering new users.
    """

    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer


class MeView(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update the currently authenticated user's profile.
    Supports PATCH for partial updates to user fields and nested profile.
    """

    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        """
        Explicit GET handler for clarity in API docs tools.
        """
        return super().get(request, *args, **kwargs)


class SkillViewSet(viewsets.ModelViewSet):
    """CRUD for the authenticated user's skills."""

    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Skill.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ExperienceViewSet(viewsets.ModelViewSet):
    """CRUD for the authenticated user's work experience."""

    serializer_class = ExperienceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Experience.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProfilePictureUploadView(generics.UpdateAPIView):
    """Upload a profile picture for the current user's job seeker profile."""

    permission_classes = [permissions.IsAuthenticated]

    def get_parsers(self):
        from rest_framework.parsers import MultiPartParser, FormParser
        return [MultiPartParser(), FormParser()]

    def patch(self, request, *args, **kwargs):
        profile = getattr(request.user, 'job_seeker_profile', None)
        if not profile:
            return Response(
                {"detail": "Job seeker profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        file = request.FILES.get('profile_picture')
        if not file:
            return Response(
                {"detail": "No file provided."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        profile.profile_picture = file
        profile.save()
        return Response({
            "detail": "Profile picture updated.",
            "profile_picture": request.build_absolute_uri(profile.profile_picture.url),
        })


class ResumeUploadView(generics.UpdateAPIView):
    """Upload a resume PDF for the current user's job seeker profile."""

    permission_classes = [permissions.IsAuthenticated]

    def get_parsers(self):
        from rest_framework.parsers import MultiPartParser, FormParser
        return [MultiPartParser(), FormParser()]

    def patch(self, request, *args, **kwargs):
        profile = getattr(request.user, 'job_seeker_profile', None)
        if not profile:
            return Response(
                {"detail": "Job seeker profile not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        file = request.FILES.get('resume')
        if not file:
            return Response(
                {"detail": "No file provided."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        profile.resume = file
        profile.save()
        return Response({
            "detail": "Resume uploaded.",
            "resume": request.build_absolute_uri(profile.resume.url),
            "resume_name": file.name,
        })


class ChangePasswordView(generics.UpdateAPIView):
    """
    Endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response(
                    {"old_password": ["Wrong password."]}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response(
                {"detail": "Password updated successfully."}, 
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
