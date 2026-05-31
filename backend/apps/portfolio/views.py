from __future__ import annotations

from drf_spectacular.utils import extend_schema
from rest_framework import permissions, viewsets

from .models import (
    Achievement,
    Certification,
    Experience,
    Project,
    SkillCategory,
)
from .serializers import (
    AchievementSerializer,
    CertificationSerializer,
    ExperienceSerializer,
    ProjectSerializer,
    SkillCategorySerializer,
)


class ReadOnlyMixin:
    permission_classes = (permissions.AllowAny,)
    http_method_names = ("get", "head", "options")


@extend_schema(tags=["Portfolio"])
class SkillCategoryViewSet(ReadOnlyMixin, viewsets.ReadOnlyModelViewSet):
    """List skill categories with nested skills."""

    queryset = SkillCategory.objects.prefetch_related("skills").all()
    serializer_class = SkillCategorySerializer
    lookup_field = "slug"


@extend_schema(tags=["Portfolio"])
class ExperienceViewSet(ReadOnlyMixin, viewsets.ReadOnlyModelViewSet):
    """List work experience, ordered chronologically (most recent first)."""

    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


@extend_schema(tags=["Portfolio"])
class ProjectViewSet(ReadOnlyMixin, viewsets.ReadOnlyModelViewSet):
    """List projects (case studies)."""

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = "slug"
    filterset_fields = ("category", "featured")
    search_fields = ("title", "tagline", "description")


@extend_schema(tags=["Portfolio"])
class CertificationViewSet(ReadOnlyMixin, viewsets.ReadOnlyModelViewSet):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer


@extend_schema(tags=["Portfolio"])
class AchievementViewSet(ReadOnlyMixin, viewsets.ReadOnlyModelViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer
