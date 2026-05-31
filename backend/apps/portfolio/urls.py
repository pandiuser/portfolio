from rest_framework.routers import DefaultRouter

from .views import (
    AchievementViewSet,
    CertificationViewSet,
    ExperienceViewSet,
    ProjectViewSet,
    SkillCategoryViewSet,
)

app_name = "portfolio"

router = DefaultRouter()
router.register("skills", SkillCategoryViewSet, basename="skill-category")
router.register("experience", ExperienceViewSet, basename="experience")
router.register("projects", ProjectViewSet, basename="project")
router.register("certifications", CertificationViewSet, basename="certification")
router.register("achievements", AchievementViewSet, basename="achievement")

urlpatterns = router.urls
