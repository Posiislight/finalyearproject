from django.contrib import admin

from .models import CompanyAnalytics, CompanyGalleryImage, CompanyProfile


@admin.register(CompanyProfile)
class CompanyProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "owner", "location", "website")
    search_fields = ("name", "owner__username", "owner__email")


@admin.register(CompanyGalleryImage)
class CompanyGalleryImageAdmin(admin.ModelAdmin):
    list_display = ("company", "order", "caption")
    list_filter = ("company",)


@admin.register(CompanyAnalytics)
class CompanyAnalyticsAdmin(admin.ModelAdmin):
    list_display = ("company", "date", "views", "clicks", "shortlists")
    list_filter = ("company", "date")

