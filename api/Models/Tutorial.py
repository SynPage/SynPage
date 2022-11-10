from django.db import models


class Tutorial(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50)
    targetSite = models.URLField()
