from django.shortcuts import render

from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView
from .models import User
from .api.serializers import UserSerializer
from django.http import JsonResponse
import json
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class UserView(ListAPIView):
    queryset = User.objects.all()
    serializer_class= UserSerializer

class UserDetailView (RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserCreateView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserUpdateView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class seeUser(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
