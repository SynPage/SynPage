from django.db import models

from synapi.models.tutorial import Tutorial


class TutorialGenerationRecord(models.Model):
    class Status(models.TextChoices):
        Success = 'Success'
        Failed = 'Failed'

    question = models.TextField()
    openai_response = models.JSONField()
    status = Status
    error_message = models.TextField(null=True)
    tutorial = models.ForeignKey(Tutorial, related_name='record', on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField()
    finished_at = models.DateTimeField(auto_now_add=True)
