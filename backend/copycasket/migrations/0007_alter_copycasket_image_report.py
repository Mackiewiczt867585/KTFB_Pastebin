# Generated by Django 4.0.3 on 2022-05-09 15:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("copycasket", "0006_alter_copycasket_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="copycasket",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="static/images/"),
        ),
        migrations.CreateModel(
            name="Report",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                (
                    "reason",
                    models.CharField(
                        choices=[
                            ("us", "Unspecified"),
                            ("hs", "Hate speech"),
                            ("rc", "Racism"),
                            ("pl", "Plagiarism"),
                        ],
                        default="us",
                        max_length=2,
                    ),
                ),
                ("note", models.TextField(blank=True, null=True)),
                (
                    "copy",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="copycasket.copycasket",
                    ),
                ),
            ],
        ),
    ]
