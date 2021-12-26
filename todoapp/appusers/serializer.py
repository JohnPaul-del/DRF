from rest_framework.serializers import HyperlinkedModelSerializer
from .models import AppUsers


class AppUserSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = AppUsers
        fields = ('id', 'username', 'first_name', 'last_name', 'email',)
