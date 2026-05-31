from __future__ import annotations

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from .models import ContactMessage


class ContactCreateTests(TestCase):
    def setUp(self) -> None:
        self.client = APIClient()
        self.url = "/api/contact/"

    def _valid_payload(self, **overrides):
        payload = {
            "name": "Jane Doe",
            "email": "jane@acme.com",
            "subject": "Senior backend role at Acme",
            "message": "Hi Pandiyarajan, we're hiring and would love to chat.",
        }
        payload.update(overrides)
        return payload

    def test_creates_message(self):
        resp = self.client.post(self.url, self._valid_payload(), format="json")
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(resp.data["status"], "received")
        self.assertEqual(ContactMessage.objects.count(), 1)

    def test_rejects_short_message(self):
        resp = self.client.post(
            self.url, self._valid_payload(message="too short"), format="json"
        )
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("message", resp.data)

    def test_honeypot_blocks_bots(self):
        resp = self.client.post(
            self.url, self._valid_payload(honeypot="hidden field"), format="json"
        )
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(ContactMessage.objects.count(), 0)
