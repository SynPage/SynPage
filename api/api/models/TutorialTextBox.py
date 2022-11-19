from django.db import models

from .TutorialStep import TutorialStep


class TutorialTextBox(models.Model):
    step_id = models.ForeignKey(TutorialStep, related_name='textboxes', on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    targetSelector = models.CharField(max_length=100)
