from django.urls import path

from .views import AnalyticsEventListView, AnalyticsSummaryView, TrackEventView

app_name = "analytics"

urlpatterns = [
    path("events/", TrackEventView.as_view(), name="track-event"),
    path("events/admin/", AnalyticsEventListView.as_view(), name="admin-events"),
    path("summary/", AnalyticsSummaryView.as_view(), name="summary"),
]
