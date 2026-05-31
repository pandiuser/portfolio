from __future__ import annotations

from django.db import models


class AnalyticsEvent(models.Model):
    """Lightweight first-party analytics events emitted by the frontend."""

    class EventType(models.TextChoices):
        PAGE_VIEW = "page_view", "Page view"
        RESUME_DOWNLOAD = "resume_download", "Resume download"
        PROJECT_VIEW = "project_view", "Project view"
        CONTACT_SUBMIT = "contact_submit", "Contact submit"
        OUTBOUND_CLICK = "outbound_click", "Outbound click"

    event = models.CharField(max_length=32, choices=EventType.choices, db_index=True)
    path = models.CharField(max_length=255, blank=True, default="")
    referer = models.CharField(max_length=512, blank=True, default="")
    user_agent = models.CharField(max_length=512, blank=True, default="")
    ip_hash = models.CharField(max_length=64, blank=True, default="", db_index=True)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ("-created_at",)
        indexes = [
            models.Index(fields=("event", "-created_at")),
            models.Index(fields=("path", "-created_at")),
        ]

    def __str__(self) -> str:
        return f"{self.event} @ {self.created_at:%Y-%m-%d %H:%M}"


class DailyMetric(models.Model):
    """Pre-aggregated daily counters for dashboards (populated by a cron)."""

    date = models.DateField(unique=True, db_index=True)
    page_views = models.PositiveIntegerField(default=0)
    resume_downloads = models.PositiveIntegerField(default=0)
    contact_submits = models.PositiveIntegerField(default=0)
    project_views = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ("-date",)

    def __str__(self) -> str:
        return f"Metrics {self.date.isoformat()}"
