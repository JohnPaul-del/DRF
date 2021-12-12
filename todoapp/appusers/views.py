from rest_framework.viewsets import ModelViewSet
from .models import AppUsers
from .serializer import AppUserSerializer


class AppUserViewSet(ModelViewSet):
    queryset = AppUsers.objects.all()
    serializer_class = AppUserSerializer
