from django.conf import settings
from django.db import models


class CompanyProfile(models.Model):
    owner = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="company_profile",
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    website = models.URLField(blank=True)
    logo_url = models.ImageField(upload_to="company_logos/", blank=True, null=True)
    location = models.CharField(max_length=255, blank=True)
    culture_values = models.TextField(blank=True)
    mission = models.TextField(blank=True)
    industry = models.CharField(max_length=100, blank=True)
    company_size = models.CharField(max_length=50, blank=True)
    founded_year = models.CharField(max_length=4, blank=True)
    funding_stage = models.CharField(max_length=50, blank=True)
    work_model = models.CharField(max_length=50, blank=True)
    contact_phone = models.CharField(max_length=20, blank=True)
    hr_email = models.EmailField(blank=True)
    brand_color = models.CharField(max_length=20, default="#2563eb", blank=True)
    cover_photo = models.ImageField(upload_to="company_covers/", blank=True, null=True)
    one_liner_pitch = models.CharField(max_length=255, blank=True)
    benefits = models.TextField(blank=True, help_text="Comma-separated list of active benefit labels")
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Company Profile"
        verbose_name_plural = "Company Profiles"

    def __str__(self) -> str:
        return self.name


class CompanyGalleryImage(models.Model):
    company = models.ForeignKey(
        CompanyProfile,
        on_delete=models.CASCADE,
        related_name="gallery_images",
    )
    image_url = models.URLField()
    caption = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "Company Gallery Image"
        verbose_name_plural = "Company Gallery Images"

    def __str__(self) -> str:
        return f"{self.company.name} - {self.caption or self.image_url}"


class CompanyAnalytics(models.Model):
    company = models.ForeignKey(
        CompanyProfile,
        on_delete=models.CASCADE,
        related_name="analytics",
    )
    date = models.DateField()
    views = models.PositiveIntegerField(default=0)
    clicks = models.PositiveIntegerField(default=0)
    shortlists = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("company", "date")
        ordering = ["-date"]
        verbose_name = "Company Analytics"
        verbose_name_plural = "Company Analytics"

    def __str__(self) -> str:
        return f"{self.company.name} - {self.date}"

class CompanyVerificationDocument(models.Model):
    company = models.ForeignKey(
        CompanyProfile,
        on_delete=models.CASCADE,
        related_name="verification_documents",
    )
    document = models.FileField(upload_to="company_documents/")
    filename = models.CharField(max_length=255)
    status = models.CharField(max_length=50, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Company Verification Document"
        verbose_name_plural = "Company Verification Documents"

    def __str__(self) -> str:
        return f"{self.company.name} - {self.filename}"


class TeamMember(models.Model):
    company = models.ForeignKey(
        CompanyProfile,
        on_delete=models.CASCADE,
        related_name="team_members",
    )
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    email = models.EmailField(blank=True)
    avatar_color = models.CharField(max_length=20, default="#2563eb", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["created_at"]
        verbose_name = "Team Member"
        verbose_name_plural = "Team Members"

    def __str__(self) -> str:
        return f"{self.name} - {self.role} ({self.company.name})"
