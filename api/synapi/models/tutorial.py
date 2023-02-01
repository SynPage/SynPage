from django.db import models


class Tutorial(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    target_site = models.URLField()


class Step(models.Model):
    tutorial_id = models.ForeignKey(Tutorial, related_name='steps', on_delete=models.CASCADE)
    index = models.IntegerField()
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ['tutorial_id', 'index']
        unique_together = ['tutorial_id', 'index']


class Action(models.Model):
    class ActionType(models.TextChoices):
        NG = ''
        LC = 'Left Click'
        RC = 'Right Click'
        LDC = 'Left Double Click'
        RDC = 'Right Double Click'
        EN = 'Enter'

    step_id = models.ForeignKey(Step, related_name='actions', on_delete=models.CASCADE)
    index = models.IntegerField()
    description = models.CharField(max_length=250)

    action_type = models.CharField(max_length=50, choices=ActionType.choices, default=ActionType.NG)
    action_target = models.CharField(max_length=250, blank=True)
    action_content = models.CharField(max_length=250, blank=True)

    class Meta:
        ordering = ['step_id', 'index']
        unique_together = ['step_id', 'index']
