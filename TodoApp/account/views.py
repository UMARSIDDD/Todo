from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.contrib.auth import authenticate,logout
from rest_framework import  status
from rest_framework.views import APIView
# from account.models import User
from rest_framework.response import Response
from account.serializers import ResgisterSerializer,LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated


#generate token manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),    
        'access': str(refresh.access_token),
    }

class RegistrationView(APIView):
    def post(self,request):
        serializer=ResgisterSerializer(data=request.data)   
        if serializer.is_valid():
            user=serializer.save()
            token=get_tokens_for_user(user)
            return Response({'token':token,'msg':"Register Successfull"},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        

class LoginView(APIView):
    def post(self,request):
        serializer=LoginSerializer(data=request.data)
        if serializer.is_valid():
            email=serializer.data.get('email')   
            password=serializer.data.get('password')
            # print(password)  
            user=authenticate(email=email,password=password) 
            print(user)
            if user is not None:
                token=get_tokens_for_user(user)
                return Response({'token':token,'msg':"login Successfull", 'id':user.id },status=status.HTTP_200_OK)
            else:
                return Response({'msg':"Error in Email or password"},status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors ,status=status.HTTP_400_BAD_REQUEST)
    