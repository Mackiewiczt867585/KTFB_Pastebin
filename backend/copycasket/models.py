from django.conf import settings
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils import timezone

COPY_TYPE_CHOICES = [
    ("jk", "Joke"),
    ("cd", "Code"),
    ("in", "Information"),
    ("as", "ASCII"),
    ("us", "Unspecified"),
]

REPORT_TYPE_CHOICES = [
    ("us", "Unspecified"),
    ("hs", "Hate speech"),
    ("rc", "Racism"),
    ("pl", "Plagiarism"),
]


class CustomAccountManager(BaseUserManager):
    def create_superuser(
            self,
            email,
            username,
            first_name,
            password,
            **other_fields):

        other_fields.setdefault("is_staff", True)
        other_fields.setdefault("is_superuser", True)
        other_fields.setdefault("is_active", True)

        if other_fields.get("is_staff") is not True:
            raise ValueError("Superuser must be assigned all permissions.")
        if other_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must be assigned all permissions.")

        return self.create_user(
            email=email,
            username=username,
            first_name=first_name,
            password=password,
            **other_fields
        )

    def create_user(self,
                    email,
                    username,
                    first_name,
                    password,
                    **other_fields):
        if not email:
            raise ValueError("An email must be given to create an account.")
        if not username:
            raise ValueError("A username must be given to create an account")
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            username=username,
            first_name=first_name,
            **other_fields
        )
        user.set_password(password)
        user.save()
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, verbose_name="email")
    username = models.CharField(
        max_length=30,
        unique=True,
        verbose_name="username",
    )
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    creation_date = models.DateTimeField(default=timezone.now)
    organisation = models.CharField(max_length=150)

    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name"]

    objects = CustomAccountManager()

    def __str__(self):
        return self.username

    def update(self, **kwargs):
        for key, val in kwargs.items():
            if val is None:
                val = getattr(self, key)
            setattr(self, key, val)
        self.save()


class CopyCasket(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, blank=False, null=True)
    author = models.CharField(max_length=30, blank=False)
    creation_date = models.DateTimeField(auto_now_add=True)
    type = models.CharField(
        max_length=2,
        default="us",
        choices=COPY_TYPE_CHOICES,
    )
    content = models.TextField(blank=True)
    image = models.ImageField(upload_to="static/images/", null=True, blank=True)

    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_DEFAULT, default=1, null=True
    )
    private = models.BooleanField(default=False)
    likes = models.ManyToManyField(CustomUser, related_name="likes")

    @classmethod
    def get_default_pk(cls):
        exam, created = cls.objects.get_or_create(
            id=1, defaults=dict(title='this is not copy',author='anonnymous'))
        return exam.pk
    def __str__(self):
        return self.title

    def update(self, **kwargs):
        for key, val in kwargs.items():
            if val is None:
                val = getattr(self, key)
            setattr(self, key, val)
        self.save()

    def number_of_likes(self):
        return self.likes.count()


class Report(models.Model):
    id = models.AutoField(primary_key=True)
    copy = models.ForeignKey(CopyCasket, on_delete=models.CASCADE, default=CopyCasket.get_default_pk, related_name="copyReport")
    reason = models.CharField(
        max_length=2,
        default="us",
        choices=REPORT_TYPE_CHOICES,
    )
    note = models.TextField(blank=True, null=True)




class UserReport(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=False, default=1, related_name="userReport")
    reason = models.CharField(
        max_length=2,
        default="us",
        choices=REPORT_TYPE_CHOICES,
    )
    note = models.TextField(blank=True, null=True)
