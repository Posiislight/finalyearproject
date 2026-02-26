from django.contrib import admin

from .models import JobPost


@admin.register(JobPost)
class JobPostAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
        'employer',
        'status',
        'location',
        'salary',
        'created_at',
    )
    list_filter = ('status', 'location', 'created_at')
    search_fields = ('title', 'description', 'requirements', 'employer__username')

