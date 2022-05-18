# Generated by Django 4.0.3 on 2022-05-18 12:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('copycasket', '0008_alter_report_copy'),
    ]

    operations = [
        migrations.AlterField(
            model_name='copycasket',
            name='title',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.CreateModel(
            name='UserReport',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('reason', models.CharField(choices=[('us', 'Unspecified'), ('hs', 'Hate speech'), ('rc', 'Racism'), ('pl', 'Plagiarism')], default='us', max_length=2)),
                ('note', models.TextField(blank=True, null=True)),
                ('user', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
