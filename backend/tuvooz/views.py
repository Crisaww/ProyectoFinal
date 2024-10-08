from django.forms import ValidationError
from django.shortcuts import get_object_or_404, render
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
from django.core.validators import validate_email
from django.contrib.auth.password_validation import validate_password
from django.http import JsonResponse



# Create your views here.

class IniciarSesion(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Obtener el email del request
        email = request.data.get('email')
        password = request.data.get('password')

        # Verificar si el usuario existe
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Usuario no registrado'}, status=status.HTTP_404_NOT_FOUND)

        # Verificar la contraseña
        if not user.check_password(password):
            return Response({'error': 'Contraseña incorrecta'}, status=status.HTTP_401_UNAUTHORIZED)

        # Generar los tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)
class Registro(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        
        if User.objects.filter(email=request.data.get('email')).exists():
            return Response({'error': 'El usuario ya se encuentra registrado'}, status=status.HTTP_401_UNAUTHORIZED)
        
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(serializer.validated_data['password'])
            user.save()
            
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            
            self.send_welcome_email(request.data.get('email'))
            
            return Response({
                'refresh': refresh_token,
                'access': access_token
            }, status=status.HTTP_201_CREATED)
        if 'username' in serializer.errors and serializer.errors['username'][0].code == 'unique':
            return Response({'error': 'El nombre de usuario ya está en uso. Por favor, elige otro.'},
                            status=status.HTTP_226_IM_USED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def send_welcome_email(self, to_email):
        def send_email():
            subject = 'Bienvenid@ a Tu Vooz'
            from_email = settings.EMAIL_HOST_USER
            text_content = 'Gracias por registrarte en Tu Vooz.'
            html_content = render_to_string('correoRegistro.html', {'subject': subject, 'message': text_content})

            email = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
            email.attach_alternative(html_content, "text/html")
            email.send()
        
        email_thread = threading.Thread(target=send_email)
        email_thread.start()

class Perfil(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = {
            'username': user.username,
            'date_joined': user.date_joined.strftime('%Y-%m-%d'),
        }
        return Response(data, status=status.HTTP_200_OK)

    def patch(self, request):
        user = request.user
        new_username = request.data.get('username')
        changes_made = False

        if new_username and new_username != user.username:
            if User.objects.filter(username=new_username).exists():
                return Response(
                    {'error': 'El nombre de usuario ya está en uso.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            user.username = new_username
            changes_made = True

        if changes_made:
            user.save()
            self.send_update_email(user, new_username)
            return Response(
                {'message': 'Datos de usuario actualizados correctamente.'},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {'message': 'No se realizaron cambios en el perfil.'},
                status=status.HTTP_200_OK
            )

    def send_update_email(self, user, new_username):
        def send_email():
            subject = 'Actualización de perfil en Tu Vooz'
            from_email = settings.EMAIL_HOST_USER
            to = user.email
            text_content = 'Tu perfil en Tu Vooz ha sido actualizado.'
            context = {
                'user': user,
                'nuevo_username': new_username if new_username else None,
            }
            html_content = render_to_string('correoActualizacionPerfil.html', context)

            email = EmailMultiAlternatives(subject, text_content, from_email, [to])
            email.attach_alternative(html_content, "text/html")
            email.send()

        email_thread = threading.Thread(target=send_email)
        email_thread.start()
class CambiarContrasenna(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        # Verificar que todos los campos necesarios estén presentes
        if not current_password or not new_password or not confirm_password:
            return Response({"error": "Todos los campos de contraseña son requeridos."}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar la contraseña actual
        if not user.check_password(current_password):
            return Response({"error": "La contraseña actual es incorrecta."}, status=status.HTTP_400_BAD_REQUEST)
         # Verificar que la nueva contraseña no sea igual a la actual
        if current_password == new_password:
            return Response({"error": "La nueva contraseña no puede ser la misma que la actual."}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar que las nuevas contraseñas coincidan
        if new_password != confirm_password:
            return Response({"error": "Las nuevas contraseñas no coinciden."}, status=status.HTTP_400_BAD_REQUEST)

        # Validar la nueva contraseña
        try:
            validate_password(new_password, user)
        except ValidationError as e:
            # Retornar un mensaje de error claro para cada caso de validación
            errores = list(e.messages)
            if any('too similar to the username' in error for error in errores):
                return Response({"error": "La contraseña es demasiado similar al nombre de usuario."}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"error": errores}, status=status.HTTP_400_BAD_REQUEST)

        # Cambiar la contraseña
        user.set_password(new_password)
        user.save()

        # Generar nuevos tokens JWT
        refresh_token = RefreshToken.for_user(user)

        return Response({
            "success": "Contraseña cambiada exitosamente.",
            "access": str(refresh_token.access_token),
            "refresh": str(refresh_token)
        }, status=status.HTTP_200_OK)

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
            #frontend_url = 'http://127.0.0.1:5502'
            frontend_url = 'http://tuvooz.com'

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
            return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)

        
class RestablecerContrasena(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
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
class LogoutView(APIView):
    def post(self, request):
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
class EliminarCuenta(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        # Acceder al usuario autenticado
        user = request.user
        
        # Eliminar el usuario
        user.delete()
        
        # Respuesta de confirmación
        return Response({"message": "Cuenta eliminada correctamente."}, status=status.HTTP_204_NO_CONTENT)
    

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


def error_404_view(request):
    return JsonResponse({'error': 'este es un error 404'}, status=404)