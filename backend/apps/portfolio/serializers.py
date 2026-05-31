from __future__ import annotations

from rest_framework import serializers

from .models import (
    Achievement,
    Certification,
    Experience,
    Project,
    Skill,
    SkillCategory,
)


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ("id", "name", "level", "years", "order")


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = ("id", "name", "slug", "description", "icon", "order", "skills")


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = (
            "id",
            "company",
            "company_url",
            "role",
            "location",
            "employment_type",
            "summary",
            "responsibilities",
            "achievements",
            "technologies",
            "start_date",
            "end_date",
            "is_current",
            "order",
        )


class ProjectSerializer(serializers.ModelSerializer):
    cover_image = serializers.ImageField(read_only=True)

    class Meta:
        model = Project
        fields = (
            "id",
            "title",
            "slug",
            "tagline",
            "description",
            "architecture",
            "role",
            "year",
            "category",
            "challenges",
            "solutions",
            "impact",
            "technologies",
            "github_url",
            "demo_url",
            "case_study_url",
            "cover_image",
            "featured",
            "order",
        )


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = "__all__"


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = "__all__"
