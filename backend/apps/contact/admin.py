from django.contrib import admin

from .models import ContactMessage, ContactStatus


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("name", "email", "subject", "message")
    readonly_fields = (
        "ip_address",
        "user_agent",
        "referer",
        "created_at",
        "updated_at",
    )
    list_per_page = 25
    ordering = ("-created_at",)
    actions = ("mark_replied", "mark_archived", "mark_spam")

    @admin.action(description="Mark selected as replied")
    def mark_replied(self, _request, queryset):
        queryset.update(status=ContactStatus.REPLIED)

    @admin.action(description="Mark selected as archived")
    def mark_archived(self, _request, queryset):
        queryset.update(status=ContactStatus.ARCHIVED)

    @admin.action(description="Mark selected as spam")
    def mark_spam(self, _request, queryset):
        queryset.update(status=ContactStatus.SPAM)
