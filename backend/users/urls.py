from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import RegisterView, LoginView, MeView, SkillViewSet, ExperienceViewSet, ProfilePictureUploadView, ResumeUploadView, ChangePasswordView

router = DefaultRouter()
router.register(r"skills", SkillViewSet, basename="skill")
router.register(r"experiences", ExperienceViewSet, basename="experience")

urlpatterns = [
    path("register/", RegisterView.as_view(), name="user-register"),
    path("login/", LoginView.as_view(), name="user-login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("me/", MeView.as_view(), name="user-me"),
    path("me/profile-picture/", ProfilePictureUploadView.as_view(), name="profile-picture-upload"),
    path("me/resume/", ResumeUploadView.as_view(), name="resume-upload"),
    path("change-password/", ChangePasswordView.as_view(), name="change-password"),
    path("", include(router.urls)),
]
