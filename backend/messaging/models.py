from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Thread(models.Model):
    job_seeker = models.ForeignKey(User, on_delete=models.CASCADE, related_name='job_seeker_threads')
    employer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='employer_threads')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['job_seeker', 'employer']

    def __str__(self):
        return f"Thread between {self.job_seeker} and {self.employer}"

class Message(models.Model):
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"Message from {self.sender} at {self.created_at}"
