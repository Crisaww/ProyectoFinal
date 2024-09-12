from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import  status
from .serializer import UserSerializer
import threading
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.template.loader import render_to_string
from django.utils.crypto import get_random_string
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
import jwt
from django.core.mail import send_mail
from datetime import datetime, timedelta
from django.shortcuts import render
# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny]) 
def iniciarSesion(request):
    user = get_object_or_404(User, email=request.data['email'])
    
    if not user.check_password(request.data['password']):
        return Response({'error': 'Contraseña incorrecta'}, status=status.HTTP_401_UNAUTHORIZED)
    
    refresh = RefreshToken.for_user(user)
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }, status=status.HTTP_200_OK)

    
#registro de usuario
@api_view(['POST'])
@permission_classes([AllowAny])
def registro(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        
        # Verificar si el usuario ya existe por email
        if User.objects.filter(email=request.data.get('email')).exists():
            return Response({'error': 'El usuario ya se encuentra registrado'}, status=status.HTTP_401_UNAUTHORIZED)
        
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(serializer.validated_data['password'])
            user.save()
            
            # Generar el token JWT
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            
            # Imprimir los tokens en la consola
            print(f"Access Token: {access_token}")
            print(f"Refresh Token: {refresh_token}")
            
            def send_email():
                subject = 'Bienvenid@ a Tu Vooz'
                from_email = settings.EMAIL_HOST_USER
                to = request.data.get('email')
                text_content = 'Gracias por registrarte en Tu Vooz.'
                html_content = render_to_string('correoRegistro.html', {'subject': subject, 'message': text_content})

                email = EmailMultiAlternatives(subject, text_content, from_email, [to])
                email.attach_alternative(html_content, "text/html")
                email.send()
            
            # Iniciar el envío del correo en un hilo separado
            email_thread = threading.Thread(target=send_email)
            email_thread.start()
   
            # Devolver el token JWT
            return Response({
                'refresh': refresh_token,
                'access': access_token
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#acceso al perfil

@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def perfil(request):
    
    user = request.user
    data = {
        'email': user.email,
        'username': user.username,
        'date_joined': user.date_joined.strftime('%Y-%m-%d'),
    }
    
    return Response(data, status=status.HTTP_200_OK)

#genera el token
def generate_password_reset_token(user):
    expiration_time = datetime.utcnow() + timedelta(hours=42)  # Token válido por 1 hora
    payload = {
        'user_id': user.id,
        'exp': expiration_time,
        'iat': datetime.utcnow(),
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token

#envia correo de olvide contraseña
@api_view(['POST'])
@permission_classes([AllowAny])
def olvide_contrasena(request):
    email = request.data.get('email')

    if not email:
        return Response({"error": "El correo electrónico es obligatorio."}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "No se encontró un usuario con ese correo electrónico."}, status=404)

    # Generar un token JWT temporal
    token = generate_password_reset_token(user)

    # Definir función para enviar el correo en un hilo separado
    def send_email_task():
        subject = 'Restablecer contraseña'
        from_email = settings.EMAIL_HOST_USER
        to = email
        text_content = 'Utilice el siguiente enlace para restablecer su contraseña: {reset_url}'.format(
            reset_url=f"{settings.FRONTEND_URL}/api/v1/restablecerContrasena/{token}/"
        )
        html_content = render_to_string('correoRestablecerContrasena.html', {
            'frontend_url': settings.FRONTEND_URL,
            'token': token
        })
        send_mail(
            subject,
            text_content,
            from_email,
            [to],
            html_message=html_content
        )

    # Iniciar el envío del correo en un hilo separado
    email_thread = threading.Thread(target=send_email_task)
    email_thread.start()

    return Response({"message": "Se ha enviado un enlace para restablecer la contraseña a su correo electrónico."})

#restablcer contraseña
@api_view(['GET', 'POST'])
def restablecerContrasena(request, token=None):
    if request.method == 'GET':
        # Mostrar un formulario para restablecer la contraseña
        return render(request, 'recuperarContrasena.html', {'token': token})
    
    if request.method == 'POST':
        # Procesar el restablecimiento de la contraseña
        new_password = request.data.get('new_password')
        if not new_password:
            return Response({"error": "Nueva contraseña es obligatoria."}, status=status.HTTP_400_BAD_REQUEST)

        # Aquí podrías agregar la lógica para validar el token y restablecer la contraseña

        return Response({"message": "Contraseña restablecida exitosamente."})
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def pagina_principal(request):
    # Devuelve un mensaje o un objeto JSON en lugar de renderizar una plantilla
    return Response({'message': 'Bienvenido a la página principal'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def miCuenta(request):
    return Response({'message': 'Bienvenido a la mi cuental'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def index_palabras_comunes(request):
    return Response({'message': 'Aquí están las palabras comunes'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def saludos(request):
    return Response({'message': 'Saludos!'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def animales(request):
    return Response({'message': 'Aquí están los animales'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def comoUsarTuvooz(request):
    return Response({'message': 'Cómo usar Tu Vooz'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def emociones(request):
    return Response({'message': 'Aquí están las emociones'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def preguntas(request):
    return Response({'message': 'Aquí están las preguntas'})