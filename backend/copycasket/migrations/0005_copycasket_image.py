# Generated by Django 4.0.3 on 2022-04-13 17:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('copycasket', '0004_copycasket_creator_copycasket_private'),
    ]

    operations = [
        migrations.AddField(
            model_name='copycasket',
            name='image',
            field=models.ImageField(null=True, upload_to='images/'),
        ),
    ]
