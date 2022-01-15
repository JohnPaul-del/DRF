import requests
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from django_filters import rest_framework as filters
from django.http import HttpResponse
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework import generics
from .serializer import WorkProjectSerializer, KanbanBoardSerializer, WorkProjectSerializerShort
from .models import WorkProject, KanbanBoard


class ProjectsLimitPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = WorkProject
        fields = ['name']


class WorkProjectViewSet(ModelViewSet, generics.ListAPIVies):
    queryset = WorkProject.objects.all()
    serializer_class = WorkProjectSerializer
    pagination_class = ProjectsLimitPagination
    filterset_class = ProjectFilter

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return WorkProjectSerializerShort
        return WorkProjectSerializer


class KanbanLimitPagination(LimitOffsetPagination):
    default_limit = 10


class KanbanBoardViewSet(ModelViewSet):
    queryset = KanbanBoard.objects.all()
    serializer_class = KanbanBoardSerializer
    pagination_class = KanbanLimitPagination
    filterset_fields = ['project']

    def perform_create(self, serializer):
        serializer.save(element_status=True)

    def destroy(self, request, *args, **kwargs):
        kanban = self.get_object()
        kanban.is_active = False
        kanban.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


def test_token(request):
    response = requests.post('http://127.0.0.1:8000/api-token-auth/',
                             data={'username': 'admin', 'password': '1qaz'})
    html = "<html><body>token= %s.</body></html>" % response.json()
    return HttpResponse(html)