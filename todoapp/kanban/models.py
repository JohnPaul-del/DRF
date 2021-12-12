from django.db import models
from appusers.models import AppUsers


class WorkProject(models.Model):
    name = models.CharField(max_length=64)
    project_id = models.PositiveIntegerField()
    project_users = models.ManyToManyField(AppUsers)

    class Meta:
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'


class KanbanBoard(models.Model):
    project = models.ForeignKey(
        WorkProject,
        on_delete=models.CASCADE)
    creator = models.ForeignKey(
        AppUsers,
        on_delete=models.RESTRICT
    )
    element_title = models.CharField(max_length=64)
    element_description = models.TextField()
    element_status = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Task'
        verbose_name_plural = 'Tasks'
