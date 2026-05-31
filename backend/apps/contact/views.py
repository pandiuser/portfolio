from __future__ import annotations

import logging

from django.conf import settings
from django.core.mail import send_mail
from drf_spectacular.utils import OpenApiExample, extend_schema
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle

from .models import ContactMessage
from .serializers import ContactMessageAdminSerializer, ContactMessageSerializer

log = logging.getLogger(__name__)


def _client_ip(request) -> str | None:
    xff = request.META.get("HTTP_X_FORWARDED_FOR")
    if xff:
        return xff.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR")


@extend_schema(
    tags=["Contact"],
    summary="Submit a contact-form message",
    description=(
        "Public endpoint used by the portfolio contact form. "
        "Validates input, applies a honeypot + rate-limit, persists the message, "
        "and notifies the site owner by email."
    ),
    examples=[
        OpenApiExample(
            "Recruiter outreach",
            value={
                "name": "Jane Doe",
                "email": "jane@acme.com",
                "subject": "Senior Backend Engineer role at Acme",
                "message": (
                    "Hi Pandiyarajan, we're hiring senior backend engineers. "
                    "Would love to chat about our platform team."
                ),
            },
            request_only=True,
        ),
    ],
)
class ContactCreateView(generics.CreateAPIView):
    """POST /api/contact/ — public contact form endpoint."""

    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = (permissions.AllowAny,)
    throttle_classes = (ScopedRateThrottle,)
    throttle_scope = "contact"

    def perform_create(self, serializer):
        request = self.request
        instance = serializer.save(
            ip_address=_client_ip(request),
            user_agent=request.META.get("HTTP_USER_AGENT", "")[:512],
            referer=request.META.get("HTTP_REFERER", "")[:512],
        )

        # Fire-and-forget admin notification (don't fail the request on email errors)
        try:
            send_mail(
                subject=f"[Portfolio] New message: {instance.subject}",
                message=(
                    f"From: {instance.name} <{instance.email}>\n"
                    f"Sent at: {instance.created_at:%Y-%m-%d %H:%M %Z}\n\n"
                    f"{instance.message}"
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_NOTIFY_EMAIL],
                fail_silently=True,
            )
        except Exception:
            log.exception("Failed to send admin notification email")

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        response.data = {
            "id": response.data.get("id"),
            "status": "received",
            "message": "Thanks — I'll get back to you within 24 hours.",
        }
        response.status_code = status.HTTP_201_CREATED
        return Response(response.data, status=response.status_code)


@extend_schema(tags=["Contact (admin)"])
class ContactListView(generics.ListAPIView):
    """GET /api/contact/admin/ — authenticated list of submissions."""

    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageAdminSerializer
    permission_classes = (permissions.IsAdminUser,)
    filterset_fields = ("status",)
    search_fields = ("name", "email", "subject", "message")
    ordering_fields = ("created_at", "status")
