from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase
from mixer.backend.django import mixer
from .models import WorkProject
from appusers.models import AppUsers
from .views import WorkProjectViewSet


class ProjectViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/project')
        view = WorkProjectViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertSetEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        project = WorkProject.objects.create(name='Project 2')
        client = APIClient()
        response = client.get(f'/api/project/{project.id}')
        self.assertSetEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_quest(self):
        project = WorkProject.objects.create(name='Project 3')
        client = APIClient()
        response = client.edit(f'/api/project/{project.id}', {'name': 'Project 3 Edited'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class ProjectViewSetAPITestCase(APITestCase):

    def test_edit_admin(self):
        project = mixer.blend(WorkProject, name='Project 3')
        client = APIClient()
        admin = AppUsers.objects.create_superuser('admin2', 'test@gmail.ru', 'admin123456789')
        self.client.login(username='admin', password='admin123456789')
        response = self.client.put(f'/api/projects/{project.id}/', {'name': 'Project 3 edited'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = WorkProject.objects.get(id=project.id)
        self.assertEqual(project.name, 'Project 3 edited')
        client.logout()


class KanbanViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/kanban/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
