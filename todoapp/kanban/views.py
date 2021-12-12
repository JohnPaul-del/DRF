from django.shortcuts import render
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer, AdminRenderer, StaticHTMLRenderer, TemplateHTMLRenderer
from rest_framework.viewsets import ModelViewSet
from .serializer import WorkProjectSerializer, KanbanBoardSerializer
from .models import WorkProject, KanbanBoard


class WorkProjectViewSet(ModelViewSet):
    queryset = WorkProject.objects.all()
    serializer_class = WorkProjectSerializer


class KanbanBoardViewSet(ModelViewSet):
    queryset = KanbanBoard.objects.all()
    serializer_class = KanbanBoardSerializer

    def perform_create(self, serializer):
        serializer.save(element_status=True)
