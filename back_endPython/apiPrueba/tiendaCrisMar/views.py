from django.shortcuts import render
from rest_framework import viewsets
from .serializer import clienteSerializer
from .models import cliente


# Create your views here.

#Se crea la clase view por cada modelo
class clienteView(viewsets.ModelViewSet):
    serializer_class= clienteSerializer
    queryset=cliente.objects.all()
