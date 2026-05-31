from __future__ import annotations

from django.db import models


class ContactStatus(models.TextChoices):
    NEW = "new", "New"
    READ = "read", "Read"
    REPLIED = "replied", "Replied"
    ARCHIVED = "archived", "Archived"
    SPAM = "spam", "Spam"


class ContactMessage(models.Model):
    """A message submitted from the public contact form."""

    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=160)
    message = models.TextField()

    status = models.CharField(
        max_length=16,
        choices=ContactStatus.choices,
        default=ContactStatus.NEW,
        db_index=True,
    )

    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=512, blank=True, default="")
    referer = models.CharField(max_length=512, blank=True, default="")

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)
        indexes = [
            models.Index(fields=("email",)),
            models.Index(fields=("status", "-created_at")),
        ]
        verbose_name = "Contact message"
        verbose_name_plural = "Contact messages"

    def __str__(self) -> str:
        return f"{self.name} <{self.email}> — {self.subject}"
