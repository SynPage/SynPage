# Generated by Django 4.1.3 on 2023-03-30 03:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('synapi', '0004_step_target_website'),
    ]

    operations = [
        migrations.AlterField(
            model_name='action',
            name='type',
            field=models.CharField(choices=[('None', 'Ng'), ('Left Click', 'Lc'), ('Right Click', 'Rc'), ('Left Double Click', 'Ldc'), ('Right Double Click', 'Rdc'), ('Enter', 'En'), ('Input', 'In'), ('Scroll Up', 'Su'), ('Scroll Down', 'Sd')], default='None', max_length=50),
        ),
    ]