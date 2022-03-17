from django.db import models

COPY_TYPE_CHOICES = [
    ("jk", "Joke"),
    ("cd", "Code"),
    ("in", "Information"),
    ("as", "ASCII"),
    ("us", "Unspecified"),
]


class CopyCasket(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, blank=False)
    author = models.CharField(
        max_length=30, blank=False
    )  # TODO Implement custom users and make this FK
    creation_date = models.DateTimeField(auto_now_add=True)
    type = models.CharField(
        max_length=2,
        default="us",
        choices=COPY_TYPE_CHOICES,
    )
    content = models.TextField(blank=True)

    def __str__(self):
        return self.title

    def update(self, **kwargs):
        for key, val in kwargs.items():
            if val is None:
                val = getattr(self, key)
            setattr(self, key, val)
        self.save()
