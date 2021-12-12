from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, StringRelatedField
from appusers.serializer import AppUserSerializer
from .models import WorkProject, KanbanBoard


class WorkProjectSerializer(ModelSerializer):
    class Meta:
        model = WorkProject
        fields = '__all__'


class KanbanBoardSerializer(ModelSerializer):
    user = AppUserSerializer()

    class Meta:
        model = KanbanBoard
        fields = '__all__'
