from django.db import models

from .Tutorial import Tutorial


class TutorialStep(models.Model):
    index = models.IntegerField()
    name = models.CharField(max_length=50)
    tutorial_id = models.ForeignKey(Tutorial, related_name='steps', on_delete=models.CASCADE)

    class Meta:
        ordering = ['tutorial_id', 'index']
        unique_together = ['index', 'tutorial_id']
