from django.db import models


class Tutorial(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    target_site = models.URLField()


class Step(models.Model):
    index = models.IntegerField()
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    tutorial_id = models.ForeignKey(Tutorial, related_name='steps', on_delete=models.CASCADE)

    class Meta:
        ordering = ['tutorial_id', 'index']
        unique_together = ['index', 'tutorial_id']


class Action(models.Model):
    class MouseButton(models.TextChoices):
        NONE = ''
        LEFT = 'L'
        RIGHT = 'R'
        MIDDLE = 'M'
    
    class MouseAction(models.TextChoices):
        NONE = ''
        CLICK = 'CLICK'
        DOUBLE_CLICK = 'DBCLICK'

    step_id = models.ForeignKey(Step, related_name='actions', on_delete=models.CASCADE)
    index = models.IntegerField(null=True) # nullable temporarily until old data are migrated
    description = models.CharField(max_length=250)
    target_elem = models.CharField(max_length=100, blank=True)

    mouse_button = models.CharField(max_length=1, choices=MouseButton.choices, default=MouseButton.NONE)
    mouse_action = models.CharField(max_length=8, choices=MouseAction.choices, default=MouseAction.NONE)

    class Meta:
        ordering = ['step_id', 'index']
        unique_together = ['step_id', 'index']
