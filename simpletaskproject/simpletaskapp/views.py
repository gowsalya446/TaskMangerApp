from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse
from .models import *
from .serializer import *
from rest_framework import status
import json




class TaskView(APIView):
    
    def get(self, request):
        try:
            taskdata = Task.objects.all()  
            serializer = TaskSerializer(taskdata, many=True) 
            return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def post(self, request):
        try:
            data = json.loads(request.body)  
            serializer = TaskSerializer(data=data) 
            if serializer.is_valid(): 
                serializer.save() 
                return JsonResponse({"message": "Task is created successfully"}, status=status.HTTP_201_CREATED)
            else:
                return JsonResponse({"message": "Task is not created", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class TaskByIdView(APIView):
    def put(self, request,task_id):
         task = Task.objects.filter(id=task_id).first()
         if task is None:
            return JsonResponse(
                {"message": "task not found."}, status=status.HTTP_404_NOT_FOUND
            )
         else:
             serializer = TaskSerializer(task,data=request.data) 
             if serializer.is_valid(): 
                serializer.save() 
                return JsonResponse({"message": "Task is updated successfully"}, status=status.HTTP_201_CREATED)
             else:
                return JsonResponse({"message": "Task is not updated", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
       
    def delete(self, request,task_id):
        task = Task.objects.filter(id=task_id).first()
        if task is None:
            return JsonResponse(
                {"message": "task not found."}, status=status.HTTP_404_NOT_FOUND
            )
        task.delete()
        return JsonResponse(
            {"msg": "delete task successfully"}, status=status.HTTP_204_NO_CONTENT
        )




