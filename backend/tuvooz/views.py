from django.shortcuts import render
from .models import Categoria, Usuario, palabraCategoria, palabrasFavoritas
from rest_framework import viewsets, filters
from .serializer import CategoriaSerializer, UsuarioSerializer, palabraCategoriaSerializer, palabrasFavoritasSerializer

# Create your views here.
class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields=['$nombres', '$correo']
    
class CategoriaView(viewsets.ModelViewSet):
    serializer_class = CategoriaSerializer
    queryset = Categoria.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields=['$nombre_categoria']
    
class palabraCategoriaView(viewsets.ModelViewSet):
    serializer_class = palabraCategoriaSerializer
    queryset = palabraCategoria.objects.all()
    filter_backends = [filters.SearchFilter]
    
    
class palabrasFavoritasView(viewsets.ModelViewSet):
    serializer_class = palabrasFavoritasSerializer
    queryset = palabrasFavoritas.objects.all()
    filter_backends = [filters.SearchFilter]
   