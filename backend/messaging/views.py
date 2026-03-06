from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Thread, Message
from .serializers import ThreadSerializer, MessageSerializer


class ThreadViewSet(viewsets.ModelViewSet):
    serializer_class = ThreadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Thread.objects.filter(
            Q(job_seeker=user) | Q(employer=user)
        ).distinct().order_by('-updated_at')

    def create(self, request, *args, **kwargs):
        """
        POST /messaging/threads/ — get or create a thread between two users.
        Expects: { "job_seeker": <id>, "employer": <id> }
        Returns the existing thread if one already exists (200),
        or creates a new one (201).
        """
        job_seeker_id = request.data.get('job_seeker')
        employer_id = request.data.get('employer')

        if not job_seeker_id or not employer_id:
            return Response(
                {"detail": "Both job_seeker and employer are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        thread, created = Thread.objects.get_or_create(
            job_seeker_id=job_seeker_id,
            employer_id=employer_id,
        )
        serializer = self.get_serializer(thread)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
        )

    @action(detail=True, methods=['get'])
    def messages(self, request, pk=None):
        """GET /messaging/threads/{id}/messages/ — list messages in a thread."""
        thread = self.get_object()
        messages = thread.messages.all().order_by('created_at')
        serializer = MessageSerializer(messages, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def send(self, request, pk=None):
        """POST /messaging/threads/{id}/send/ — send a message to this thread."""
        thread = self.get_object()
        content = request.data.get('content', '').strip()
        if not content:
            return Response(
                {"detail": "content is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        message = Message.objects.create(
            thread=thread,
            sender=request.user,
            content=content,
        )
        # Update thread timestamp
        thread.save()
        serializer = MessageSerializer(message, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        """POST /messaging/threads/{id}/mark_read/ — mark all messages as read."""
        thread = self.get_object()
        updated = thread.messages.filter(is_read=False).exclude(
            sender=request.user
        ).update(is_read=True)
        return Response({"marked_read": updated})


class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(
            Q(thread__job_seeker=user) | Q(thread__employer=user)
        ).distinct()

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)
