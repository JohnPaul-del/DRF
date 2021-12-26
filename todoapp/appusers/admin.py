from django.contrib import admin
from .models import AppUsers
from django.contrib.auth.admin import UserAdmin
from django.conf import settings

admin.site.register(AppUsers, UserAdmin)
