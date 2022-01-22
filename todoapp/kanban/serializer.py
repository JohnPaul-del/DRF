from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, StringRelatedField
from appusers.serializer import AppUserSerializer
from .models import WorkProject, KanbanBoard


class WorkProjectSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = WorkProject
        fields = ('name', 'project_users', 'project_id', 'url')


class KanbanBoardSerializer(ModelSerializer):
    user = AppUserSerializer

    class Meta:
        model = KanbanBoard
        fields = ('project', 'creator', 'element_title', 'element_description', 'element_status')


class WorkProjectSerializerShort(ModelSerializer):

    # users = serializer.StringRelatedField(many=True)

    class Meta:
        model = WorkProject
        fields = ('project_id', 'name', 'project_users')
