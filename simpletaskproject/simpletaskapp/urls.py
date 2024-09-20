from django.urls import path
from .views import *

urlpatterns = [
    path("task/",TaskView.as_view(),name="Task_crete"),
    path("task/<int:task_id>",TaskByIdView.as_view(),name="Task_update"),
   
    

]