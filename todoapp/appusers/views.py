from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins, permissions
from .models import AppUsers
from .serializer import AppUserSerializer


class AppUserViewSet(mixins.UpdateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, GenericViewSet):
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    permissions_classes = [permissions.IsAuthenticated]
    queryset = AppUsers.objects.all()
    serializer_class = AppUserSerializer
