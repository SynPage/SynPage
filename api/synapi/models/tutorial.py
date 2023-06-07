from django.db import models


class Tutorial(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True)


class Step(models.Model):
    tutorial = models.ForeignKey(Tutorial, related_name='steps', on_delete=models.CASCADE)
    index = models.IntegerField()
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True)
    target_website = models.CharField(max_length=250, blank=True)

    class Meta:
        ordering = ['tutorial', 'index']
        unique_together = ['tutorial', 'index']


class Action(models.Model):
    class ActionType(models.TextChoices):
        NG = 'None'
        LC = 'Left Click'
        RC = 'Right Click'
        LDC = 'Left Double Click'
        RDC = 'Right Double Click'
        EN = 'Enter'
        IN = 'Input'
        SU = 'Scroll Up'
        SD = 'Scroll Down'

    step = models.ForeignKey(Step, related_name='actions', on_delete=models.CASCADE)
    index = models.IntegerField()
    description = models.CharField(max_length=250, blank=True)

    type = models.CharField(max_length=50, choices=ActionType.choices, default=ActionType.NG)
    target_element = models.CharField(max_length=250, blank=True)
    extras = models.CharField(max_length=250, null=True, blank=True)

    class Meta:
        ordering = ['step_id', 'index']
        unique_together = ['step_id', 'index']


class Recommendation(models.Model):
    tutorial_id = models.ForeignKey(Tutorial, related_name='recommendations', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    media = models.URLField()
    link = models.URLField()
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=250)

    class Meta:
        ordering = ['updated_at']
