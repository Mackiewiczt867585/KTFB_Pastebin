from django.apps import apps
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CopyCasket, CustomUser


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

    readonly_fields = ["creation_date"]

    fieldsets = (
        ("Login data", {"fields": ("email", "password")}),
        (
            "Basic info",
            {"fields": ("username", "first_name", "creation_date", "organisation")},
        ),
    )


app = apps.get_app_config("graphql_auth")

for model_name, model in app.models.items():
    admin.site.register(model)
