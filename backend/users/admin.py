from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from .models import User, JobSeekerProfile, EmployerProfile


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    """
    Expose the custom User model with additional role flags.
    """

    fieldsets = DjangoUserAdmin.fieldsets + (
        ("Roles", {"fields": ("is_job_seeker", "is_employer")}),
    )
    list_display = DjangoUserAdmin.list_display + (
        "is_job_seeker",
        "is_employer",
    )


@admin.register(JobSeekerProfile)
class JobSeekerProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "location", "is_active")
    search_fields = ("user__username", "user__email", "location")


@admin.register(EmployerProfile)
class EmployerProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "company_name", "location", "is_active")
    search_fields = ("user__username", "user__email", "company_name", "location")

