import graphene
from graphene_django import DjangoObjectType
from kanban.models import WorkProject, KanbanBoard
from appusers.models import AppUsers


class ProjectType(DjangoObjectType):
    class Meta:
        model = WorkProject
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = AppUsers
        fields = '__all__'


class KanbanType(DjangoObjectType):
    class Meta:
        model = KanbanBoard
        fields = '__all__'


class Query(graphene.ObjectType):
    all_kanban = graphene.List(KanbanType)

    def resolve_all_kanban(root, info):
        return KanbanBoard.object.all()


schema = graphene.Schema(query=Query)
