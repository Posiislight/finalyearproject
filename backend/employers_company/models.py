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
    logo_url = models.URLField(blank=True)
    location = models.CharField(max_length=255, blank=True)
    culture_values = models.TextField(blank=True)
    mission = models.TextField(blank=True)
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

