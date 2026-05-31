from __future__ import annotations

import hashlib
from datetime import timedelta

from django.db.models import Sum
from django.utils import timezone
from drf_spectacular.utils import extend_schema
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import AnalyticsEvent, DailyMetric
from .serializers import (
    AnalyticsEventReadSerializer,
    AnalyticsEventSerializer,
    AnalyticsSummarySerializer,
)


def _hash_ip(ip: str | None) -> str:
    if not ip:
        return ""
    return hashlib.sha256(f"portfolio-salt::{ip}".encode()).hexdigest()[:32]


def _client_ip(request) -> str | None:
    xff = request.META.get("HTTP_X_FORWARDED_FOR")
    if xff:
        return xff.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR")


@extend_schema(tags=["Analytics"])
class TrackEventView(APIView):
    """POST /api/analytics/events/ — record a first-party analytics event."""

    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = AnalyticsEventSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        AnalyticsEvent.objects.create(
            event=serializer.validated_data["event"],
            path=serializer.validated_data.get("path", "")[:255],
            metadata=serializer.validated_data.get("metadata", {}),
            referer=request.META.get("HTTP_REFERER", "")[:512],
            user_agent=request.META.get("HTTP_USER_AGENT", "")[:512],
            ip_hash=_hash_ip(_client_ip(request)),
        )
        return Response({"status": "ok"}, status=status.HTTP_202_ACCEPTED)


@extend_schema(tags=["Analytics (admin)"])
class AnalyticsEventListView(generics.ListAPIView):
    """GET /api/analytics/events/admin/ — list raw events (admin only)."""

    queryset = AnalyticsEvent.objects.all()
    serializer_class = AnalyticsEventReadSerializer
    permission_classes = (permissions.IsAdminUser,)
    filterset_fields = ("event", "path")
    ordering_fields = ("created_at",)


@extend_schema(tags=["Analytics (admin)"], responses=AnalyticsSummarySerializer)
class AnalyticsSummaryView(APIView):
    """GET /api/analytics/summary/ — aggregated counters for the last 30 days."""

    permission_classes = (permissions.IsAdminUser,)

    def get(self, _request):
        thirty_days_ago = timezone.now().date() - timedelta(days=30)
        last_30 = DailyMetric.objects.filter(date__gte=thirty_days_ago).order_by("date")
        totals = last_30.aggregate(
            page_views=Sum("page_views"),
            resume_downloads=Sum("resume_downloads"),
            contact_submits=Sum("contact_submits"),
        )
        data = {
            "total_page_views": totals.get("page_views") or 0,
            "total_resume_downloads": totals.get("resume_downloads") or 0,
            "total_contact_submits": totals.get("contact_submits") or 0,
            "last_30_days": list(last_30.values()),
        }
        return Response(AnalyticsSummarySerializer(data).data)
