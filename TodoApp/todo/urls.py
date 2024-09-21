from django.urls import path
from . import views
from .views import TaskRequest,TaskEdit,User_task
urlpatterns = [
   path('',views.TaskRequest),
   path('edit/<int:pk>/',views.TaskEdit),
   path('user/<int:uid>/',views.User_task ,name='user')
]
