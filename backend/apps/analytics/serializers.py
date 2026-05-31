from __future__ import annotations

from rest_framework import serializers

from .models import AnalyticsEvent, DailyMetric


class AnalyticsEventSerializer(serializers.ModelSerializer):
    event = serializers.ChoiceField(choices=AnalyticsEvent.EventType.choices)
    metadata = serializers.JSONField(required=False)

    class Meta:
        model = AnalyticsEvent
        fields = ("event", "path", "metadata")


class AnalyticsEventReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyticsEvent
        fields = "__all__"


class DailyMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyMetric
        fields = "__all__"


class AnalyticsSummarySerializer(serializers.Serializer):
    total_page_views = serializers.IntegerField()
    total_resume_downloads = serializers.IntegerField()
    total_contact_submits = serializers.IntegerField()
    last_30_days = DailyMetricSerializer(many=True)
