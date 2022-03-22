from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from copycasket.models import CopyCasket, CustomUser


@admin.register(CopyCasket)
class CopyCasketAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "title",
        "author",
        "creation_date",
        "type",
        "content",
    ]


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = [
        "username",
        "email",
        "first_name",
    ]

    readonly_fields = ['creation_date']

    fieldsets = (
        ("Login data", {'fields': ('email', 'password')}),
        ("Basic info", {'fields': ('username', 'first_name', 'creation_date', 'organisation')})

    )

