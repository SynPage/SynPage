from django.db import models

from models.TutorialComponent import TutorialComponent


class TutorialTextBox(TutorialComponent):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    targetSelector = models.CharField(max_length=100)
