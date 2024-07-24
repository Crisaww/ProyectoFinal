from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Categoria, Usuario, palabraCategoria, palabrasFavoritas

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
 
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'
        
class palabraCategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = palabraCategoria
        fields = '__all__'
    
class palabrasFavoritasSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = palabrasFavoritas
        fields = '__all__'

        