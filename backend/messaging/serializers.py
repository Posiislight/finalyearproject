from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Thread, Message

User = get_user_model()


class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.SerializerMethodField()
    is_mine = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'thread', 'sender', 'sender_name', 'content', 'is_read', 'is_mine', 'created_at']
        read_only_fields = ['sender', 'is_read', 'created_at']

    def get_sender_name(self, obj):
        return f"{obj.sender.first_name} {obj.sender.last_name}".strip() or obj.sender.username

    def get_is_mine(self, obj):
        request = self.context.get('request')
        if request:
            return obj.sender == request.user
        return False


class ThreadSerializer(serializers.ModelSerializer):
    other_user_name = serializers.SerializerMethodField()
    other_user_initials = serializers.SerializerMethodField()
    other_user_role = serializers.SerializerMethodField()
    latest_message = serializers.SerializerMethodField()
    unread_count = serializers.SerializerMethodField()

    class Meta:
        model = Thread
        fields = [
            'id', 'job_seeker', 'employer',
            'other_user_name', 'other_user_initials', 'other_user_role',
            'latest_message', 'unread_count',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']

    def _get_other_user(self, obj):
        request = self.context.get('request')
        if request and request.user == obj.job_seeker:
            return obj.employer
        return obj.job_seeker

    def get_other_user_name(self, obj):
        other = self._get_other_user(obj)
        if other.is_employer and hasattr(other, 'employer_profile'):
            return other.employer_profile.company_name or f"{other.first_name} {other.last_name}".strip() or other.username
        return f"{other.first_name} {other.last_name}".strip() or other.username

    def get_other_user_initials(self, obj):
        other = self._get_other_user(obj)
        if other.is_employer and hasattr(other, 'employer_profile') and other.employer_profile.company_name:
            words = other.employer_profile.company_name.split()[:2]
            return "".join(w[0].upper() for w in words)
        first = (other.first_name or "?")[0].upper()
        last = (other.last_name or "?")[0].upper()
        return f"{first}{last}"

    def get_other_user_role(self, obj):
        other = self._get_other_user(obj)
        if other.is_employer:
            return "Employer"
        return "Job Seeker"

    def get_latest_message(self, obj):
        message = obj.messages.last()
        if message:
            return MessageSerializer(message, context=self.context).data
        return None

    def get_unread_count(self, obj):
        request = self.context.get('request')
        if request:
            return obj.messages.filter(is_read=False).exclude(sender=request.user).count()
        return 0
