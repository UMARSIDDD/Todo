
from rest_framework.permissions import IsAuthenticated
from .models import Task,Category
from .serializers import TaskSerializer,CategorySerializer
from rest_framework.response import Response
from rest_framework import status
from account.models import User
from django.utils.timezone import now
from rest_framework.decorators import api_view, permission_classes


# Create your views here.
@api_view(['GET', 'POST'])
def TaskRequest(request):
    if request.method == "GET":
        task = Task.objects.all()
        serializer = TaskSerializer(task, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == "POST":
        try:
            user = User.objects.get(pk=request.data['user_id'])
        except User.DoesNotExist:
            return Response({'msg': 'userid is not valid'}, status=status.HTTP_400_BAD_REQUEST)
        category= request.data.get("category")

        data = {"user_id": user.id, 'task_name': request.data.get(
            "task_name"), 'description': request.data.get("description"),'category': category.lower()}
        serializer = TaskSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', "PUT", 'DELETE'])
def TaskEdit(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = TaskSerializer(task)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == "PUT":
        serialiazer = TaskSerializer(task, data=request.data)
        if serialiazer.is_valid():
            serialiazer.save() 
            return Response(serialiazer.data, status=status.HTTP_200_OK)
        return Response(serialiazer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        task.delete()
        return Response({"msg": "delete successfull"}, status=status.HTTP_204_NO_CONTENT)

# @permission_classes([IsAuthenticated])
@api_view(['GET'])
def User_task(request, uid):
    try:
        user = User.objects.get(pk=uid)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)
    task = Task.objects.filter(user_id=user.id)
    serializer = TaskSerializer(task, many=True)
    return Response(serializer.data, status=200)