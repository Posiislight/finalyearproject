from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings


class User(AbstractUser):
    """
    Custom user model.

    We extend Django's AbstractUser with simple role flags so the rest of the
    system can quickly determine whether a given account should behave as a
    job seeker, an employer, or both.
    """

    is_job_seeker = models.BooleanField(default=False)
    is_employer = models.BooleanField(default=False)

    def __str__(self) -> str:  # pragma: no cover - trivial
        return self.username or super().__str__()


class JobSeekerProfile(models.Model):
    """
    Additional profile information for job seeker accounts.
    """

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="job_seeker_profile",
    )
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=255, blank=True)
    profile_picture = models.ImageField(upload_to="profile_pictures/", blank=True, null=True)
    resume = models.FileField(upload_to="resumes/", blank=True, null=True)
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this job seeker is actively looking for opportunities.",
    )

    def __str__(self) -> str:  # pragma: no cover - trivial
        return f"JobSeekerProfile<{self.user}>"


class EmployerProfile(models.Model):
    """
    Additional profile information for employer accounts.
    """

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="employer_profile",
    )
    company_name = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=255, blank=True)
    profile_picture = models.URLField(blank=True)
    company_website = models.URLField(blank=True)
    is_active = models.BooleanField(
        default=True,
        help_text="Whether this employer is actively hiring.",
    )

    def __str__(self) -> str:  # pragma: no cover - trivial
        return f"EmployerProfile<{self.user}>"


class Skill(models.Model):
    """A skill belonging to a job seeker."""

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="skills",
    )
    name = models.CharField(max_length=100)
    level = models.IntegerField(
        default=50,
        help_text="Proficiency level from 0 to 100.",
    )

    class Meta:
        unique_together = ["user", "name"]
        ordering = ["-level"]

    def __str__(self) -> str:
        return f"{self.name} ({self.level}%)"


class Experience(models.Model):
    """A work experience entry for a job seeker."""

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="experiences",
    )
    role = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_current = models.BooleanField(default=False)

    class Meta:
        ordering = ["-start_date"]

    def __str__(self) -> str:
        return f"{self.role} at {self.company}"

