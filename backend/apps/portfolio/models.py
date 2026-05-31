from __future__ import annotations

from django.db import models
from django.utils.text import slugify


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SkillCategory(TimestampedModel):
    name = models.CharField(max_length=64, unique=True)
    slug = models.SlugField(max_length=64, unique=True, blank=True)
    description = models.CharField(max_length=255, blank=True, default="")
    icon = models.CharField(max_length=32, blank=True, default="")
    order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ("order", "name")
        verbose_name_plural = "Skill categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name


class Skill(TimestampedModel):
    class Level(models.TextChoices):
        EXPERT = "expert", "Expert"
        ADVANCED = "advanced", "Advanced"
        PROFICIENT = "proficient", "Proficient"
        FAMILIAR = "familiar", "Familiar"

    category = models.ForeignKey(
        SkillCategory, on_delete=models.CASCADE, related_name="skills",
    )
    name = models.CharField(max_length=64)
    level = models.CharField(max_length=16, choices=Level.choices, default=Level.PROFICIENT)
    years = models.PositiveIntegerField(null=True, blank=True)
    order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ("category__order", "order", "name")
        unique_together = (("category", "name"),)

    def __str__(self) -> str:
        return f"{self.name} ({self.get_level_display()})"


class Experience(TimestampedModel):
    class EmploymentType(models.TextChoices):
        FULL_TIME = "full_time", "Full-time"
        CONTRACT = "contract", "Contract"
        INTERNSHIP = "internship", "Internship"

    company = models.CharField(max_length=120)
    company_url = models.URLField(blank=True, default="")
    role = models.CharField(max_length=120)
    location = models.CharField(max_length=120)
    employment_type = models.CharField(
        max_length=16,
        choices=EmploymentType.choices,
        default=EmploymentType.FULL_TIME,
    )
    summary = models.TextField()
    responsibilities = models.JSONField(default=list, blank=True)
    achievements = models.JSONField(default=list, blank=True)
    technologies = models.JSONField(default=list, blank=True)

    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    order = models.IntegerField(default=0, db_index=True)

    class Meta:
        ordering = ("-is_current", "-start_date", "order")

    def __str__(self) -> str:
        return f"{self.role} @ {self.company}"


class Project(TimestampedModel):
    class Category(models.TextChoices):
        PLATFORM = "platform", "Platform"
        AI_ML = "ai_ml", "AI / ML"
        MICROSERVICES = "microservices", "Microservices"
        DEV_TOOLS = "dev_tools", "Developer Tools"
        WEB_APP = "web_app", "Web App"

    title = models.CharField(max_length=160)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    tagline = models.CharField(max_length=200, blank=True, default="")
    description = models.TextField()
    architecture = models.TextField(blank=True, default="")
    role = models.CharField(max_length=120, blank=True, default="")
    year = models.CharField(max_length=16, blank=True, default="")
    category = models.CharField(
        max_length=24, choices=Category.choices, default=Category.PLATFORM,
    )

    challenges = models.JSONField(default=list, blank=True)
    solutions = models.JSONField(default=list, blank=True)
    impact = models.JSONField(default=list, blank=True)
    technologies = models.JSONField(default=list, blank=True)

    github_url = models.URLField(blank=True, default="")
    demo_url = models.URLField(blank=True, default="")
    case_study_url = models.URLField(blank=True, default="")
    cover_image = models.ImageField(upload_to="projects/", null=True, blank=True)

    featured = models.BooleanField(default=False, db_index=True)
    order = models.IntegerField(default=0, db_index=True)

    class Meta:
        ordering = ("-featured", "order", "-created_at")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)[:200]
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title


class Certification(TimestampedModel):
    name = models.CharField(max_length=160)
    issuer = models.CharField(max_length=120)
    issued_on = models.DateField()
    expires_on = models.DateField(null=True, blank=True)
    credential_id = models.CharField(max_length=120, blank=True, default="")
    credential_url = models.URLField(blank=True, default="")
    description = models.TextField(blank=True, default="")

    class Meta:
        ordering = ("-issued_on",)

    def __str__(self) -> str:
        return f"{self.name} — {self.issuer}"


class Achievement(TimestampedModel):
    title = models.CharField(max_length=160)
    issuer = models.CharField(max_length=120)
    awarded_on = models.DateField()
    description = models.TextField()
    icon = models.CharField(max_length=32, blank=True, default="Award")
    order = models.IntegerField(default=0, db_index=True)

    class Meta:
        ordering = ("order", "-awarded_on")

    def __str__(self) -> str:
        return f"{self.title} ({self.issuer})"
