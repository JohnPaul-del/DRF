from django.db import models


class AppUsers(models.Model):
    user_login = models.CharField(max_length=32)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    user_email = models.EmailField(max_length=64, unique=True)