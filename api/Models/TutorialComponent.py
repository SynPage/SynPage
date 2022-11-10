from django.db import models

from models.TutorialStep import TutorialStep


class TutorialComponent(models.Model):
    step_id = models.ForeignKey(TutorialStep, on_delete=models.CASCADE)
