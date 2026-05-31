from django.contrib import admin

from .models import (
    Achievement,
    Certification,
    Experience,
    Project,
    Skill,
    SkillCategory,
)


class SkillInline(admin.TabularInline):
    model = Skill
    extra = 0


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "order", "skill_count")
    prepopulated_fields = {"slug": ("name",)}
    inlines = (SkillInline,)
    ordering = ("order", "name")

    @admin.display(description="Skills")
    def skill_count(self, obj: SkillCategory) -> int:
        return obj.skills.count()


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("role", "company", "start_date", "end_date", "is_current")
    list_filter = ("is_current", "employment_type")
    search_fields = ("company", "role", "summary")
    ordering = ("-is_current", "-start_date")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "year", "featured", "order")
    list_filter = ("category", "featured")
    search_fields = ("title", "tagline", "description")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("-featured", "order")


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ("name", "issuer", "issued_on", "expires_on")
    list_filter = ("issuer",)
    search_fields = ("name", "issuer")


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ("title", "issuer", "awarded_on", "order")
    list_filter = ("issuer",)
    search_fields = ("title", "issuer", "description")
    ordering = ("order", "-awarded_on")
