from django.shortcuts import get_object_or_404
from django.contrib.auth import logout as django_logout
from django.utils import timezone
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
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework.views import APIView
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode

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


@permission_classes([AllowAny])
class olvide_contrasena(APIView):
    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
            token_generator = PasswordResetTokenGenerator()
            token = token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))

            # URL del frontend con el token y uid
            frontend_url = 'http://127.0.0.1:5502'

            # Renderizar la plantilla con el contexto adecuado
            html_content = render_to_string('correoRestablecerContrasena.html', {
                'user': user,
                'token': token,
                'uid': uid,
                'frontend_url': frontend_url
            })
            text_content = 'Por favor, usa un cliente de correo que soporte HTML para ver el contenido.'

            def send_email():
                email_message = EmailMultiAlternatives(
                    subject="Restablecer contraseña",
                    body=text_content,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to=[email]
                )
                email_message.attach_alternative(html_content, "text/html")
                email_message.send()

            # Enviar el correo en un hilo separado
            email_thread = threading.Thread(target=send_email)
            email_thread.start()

            return Response({"message": "Correo enviado con éxito."}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({"error": "Usuario no encontrado."}, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['POST'])
@permission_classes([AllowAny])
def restablecerContrasena(request):
    token = request.data.get('token')
    uidb64 = request.data.get('uid')
    new_password = request.data.get('new_password')

    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return Response({"error": "UID inválido."}, status=status.HTTP_400_BAD_REQUEST)

    # Verificar que el token sea válido
    token_generator = PasswordResetTokenGenerator()
    if not token_generator.check_token(user, token):
        return Response({"error": "Token inválido o expirado."}, status=status.HTTP_400_BAD_REQUEST)

    # Validar la nueva contraseña si es necesario (mínimo de caracteres, etc.)
    if len(new_password) < 8:
        return Response({"error": "La contraseña debe tener al menos 8 caracteres."}, status=status.HTTP_400_BAD_REQUEST)

    # Actualizar la contraseña del usuario
    user.set_password(new_password)
    user.save()

    return Response({"message": "Contraseña actualizada correctamente."}, status=status.HTTP_200_OK)

#cerrar sesion
@api_view(['POST'])
def logout(request):
    user = request.user
    if user.is_authenticated:
        # Actualizar last_login antes de cerrar sesión
        user.last_login = timezone.now()
        user.save()

        # Cerrar sesión
        django_logout(request)
        return Response({"message": "Sesión cerrada correctamente."}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "No estás autenticado."}, status=status.HTTP_400_BAD_REQUEST)


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