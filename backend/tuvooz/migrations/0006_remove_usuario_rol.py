# Generated by Django 3.2.14 on 2024-07-24 14:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tuvooz', '0005_auto_20240711_1249'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usuario',
            name='rol',
        ),
    ]
