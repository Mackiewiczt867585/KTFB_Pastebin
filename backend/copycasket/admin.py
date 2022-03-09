from django.contrib import admin
from copycasket.models import CopyCasket


@admin.register(CopyCasket)
class CopyCasketAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'title',
        'author',
        "creation_date",
        "type",
        "content",
    ]
