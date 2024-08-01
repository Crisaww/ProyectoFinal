from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import Categoria, Usuario, palabraCategoria, palabrasFavoritas
from rest_framework import viewsets, filters, status
from .serializer import CategoriaSerializer, UserSerializer, UsuarioSerializer, palabraCategoriaSerializer, palabrasFavoritasSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User


# Create your views here.

@api_view(['POST'])
def iniciarSesion(request):
    
    user = get_object_or_404(User, email=request.data['email'])
    
    if not user.check_password(request.data['password']):
        return Response({'error': 'Contraseña incorrecta'}, status=status.HTTP_401_UNAUTHORIZED)
    
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
     #aqui retorna el token
    return Response({"token": token.key}, status=status.HTTP_200_OK)
#registro de usuario
@api_view(['POST'])
def registro(request):
    serializer = UserSerializer(data=request.data)
    
    # Verificar si el usuario ya existe por email
    if User.objects.filter(email=request.data.get('email')).exists():
        return Response({'error': 'El usuario ya se encuentra registrado'}, status=status.HTTP_401_UNAUTHORIZED)
    
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(serializer.validated_data['password'])
        user.save()
        token = Token.objects.create(user=user)
       #aqui se genera el token
        return Response({'token': token.key}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#acceso al perfil
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def perfil(request):
    
    return Response("Usted está iniciando sesión con {}".format(request.user.email), status=status.HTTP_200_OK)


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
   