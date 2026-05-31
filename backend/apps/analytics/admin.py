from django.contrib import admin

from .models import AnalyticsEvent, DailyMetric


@admin.register(AnalyticsEvent)
class AnalyticsEventAdmin(admin.ModelAdmin):
    list_display = ("event", "path", "created_at")
    list_filter = ("event", "created_at")
    search_fields = ("path", "user_agent")
    ordering = ("-created_at",)
    readonly_fields = tuple(f.name for f in AnalyticsEvent._meta.fields)


@admin.register(DailyMetric)
class DailyMetricAdmin(admin.ModelAdmin):
    list_display = ("date", "page_views", "resume_downloads", "contact_submits", "project_views")
    ordering = ("-date",)
