from __future__ import annotations

import re

from rest_framework import serializers

from .models import ContactMessage


URL_RE = re.compile(r"https?://", re.IGNORECASE)


class ContactMessageSerializer(serializers.ModelSerializer):
    """Public-facing serializer for submitting a contact message."""

    honeypot = serializers.CharField(
        required=False, allow_blank=True, write_only=True,
    )

    class Meta:
        model = ContactMessage
        fields = ("id", "name", "email", "subject", "message", "honeypot")
        read_only_fields = ("id",)
        extra_kwargs = {
            "name": {"min_length": 2, "max_length": 120},
            "subject": {"min_length": 3, "max_length": 160},
            "message": {"min_length": 20, "max_length": 4000},
        }

    def validate_honeypot(self, value: str) -> str:
        if value:
            raise serializers.ValidationError("Bot detected.")
        return value

    def validate_message(self, value: str) -> str:
        # Light spam guard: cap on URL count
        urls = URL_RE.findall(value)
        if len(urls) > 3:
            raise serializers.ValidationError(
                "Too many links in message — please contact me by email directly."
            )
        return value

    def create(self, validated_data):
        validated_data.pop("honeypot", None)
        return super().create(validated_data)


class ContactMessageAdminSerializer(serializers.ModelSerializer):
    """Authenticated read serializer used by the admin API."""

    class Meta:
        model = ContactMessage
        fields = "__all__"
        read_only_fields = (
            "id",
            "ip_address",
            "user_agent",
            "referer",
            "created_at",
            "updated_at",
        )
