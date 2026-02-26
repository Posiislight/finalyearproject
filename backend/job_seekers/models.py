from django.db import models
from django.conf import settings
from employers_jobs.models import JobPost

User = settings.AUTH_USER_MODEL

class JobApplication(models.Model):
    STATUS_CHOICES = (
        ('applied', 'Applied'),
        ('reviewing', 'Reviewing'),
        ('interviewing', 'Interviewing'),
        ('offered', 'Offered'),
        ('rejected', 'Rejected'),
    )

    job_seeker = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    job_post = models.ForeignKey(JobPost, on_delete=models.CASCADE, related_name='applications')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='applied')
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    cover_letter = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['job_seeker', 'job_post']

    def __str__(self):
        return f"{self.job_seeker} applied to {self.job_post}"


class DismissedJob(models.Model):
    """Tracks jobs the seeker has swiped left / skipped."""
    job_seeker = models.ForeignKey(User, on_delete=models.CASCADE, related_name='dismissed_jobs')
    job_post = models.ForeignKey(JobPost, on_delete=models.CASCADE, related_name='dismissals')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['job_seeker', 'job_post']

    def __str__(self):
        return f"{self.job_seeker} dismissed {self.job_post}"

