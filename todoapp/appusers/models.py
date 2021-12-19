from django.db import models
from django.contrib.auth.models import AbstractUser


class AppUsers(AbstractUser):
    email = models.EmailField(unique=True, blank=True)
