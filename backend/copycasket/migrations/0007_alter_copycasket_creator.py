# Generated by Django 4.0.3 on 2022-05-04 15:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('copycasket', '0006_alter_copycasket_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='copycasket',
            name='creator',
            field=models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.SET_DEFAULT, to=settings.AUTH_USER_MODEL),
        ),
    ]