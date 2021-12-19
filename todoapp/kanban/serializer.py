from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, StringRelatedField
from appusers.serializer import AppUserSerializer
from .models import WorkProject, KanbanBoard


class WorkProjectSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = WorkProject
        fields = ('name', 'project_users')


class KanbanBoardSerializer(ModelSerializer):
    user = AppUserSerializer

    class Meta:
        model = KanbanBoard
        fields = ('project', 'creator', 'element_title', 'element_description', 'element_status')
