# Generated by Django 4.1.3 on 2022-12-21 02:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('synapi', '0009_rename_name_tutorialstep_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='tutorial',
            name='description',
            field=models.TextField(blank=True),
        ),
    ]