from django.db import models


class Tutorial(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50)
    targetSite = models.URLField()


class TutorialStep(models.Model):
    index = models.IntegerField()
    name = models.CharField(max_length=50)
    tutorial_id = models.ForeignKey(Tutorial, related_name='steps', on_delete=models.CASCADE)

    class Meta:
        ordering = ['tutorial_id', 'index']
        unique_together = ['index', 'tutorial_id']


class TutorialTextBox(models.Model):
    step_id = models.ForeignKey(TutorialStep, related_name='textboxes', on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    targetSelector = models.CharField(max_length=100)