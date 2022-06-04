from django.db.models.functions import Now

from backend.copycasket.models import CopyCasket


def delete_expired():
    CopyCasket.objects.filter(expiration_date__lt=Now()).delete()