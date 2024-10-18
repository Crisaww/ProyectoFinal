# Django imports
from django.http import JsonResponse
from django.utils.encoding import force_str, force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import PasswordResetTokenGenerator

# Existing imports from your code
from django.forms import ValidationError
from django.contrib.auth import get_user_model
from django.db.models import Q
from django.contrib.auth import logout as django_logout
from django.utils import timezone
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from rest_framework.views import APIView

# Standard library imports
import threading

# Local imports (asumiendo que estos archivos existen en tu proyecto)
from .serializer import UserSerializer
from .models import UserExtend as User

class IniciarSesion(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            identifier = request.data.get('identifier')
            password = request.data.get('password')
            
            print("Datos recibidos:", request.data)  # Para debug
            
            if not identifier or not password:
                return Response(
                    {'error': 'Credenciales incompletas'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            User = get_user_model()
            
            try:
                user = User.objects.get(
                    Q(email=identifier) | Q(username=identifier)
                )
            except User.DoesNotExist:
                return Response(
                    {'error': 'Usuario no encontrado'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            if not user.check_password(password):
                return Response(
                    {'error': 'Contraseña incorrecta'},
                    status=status.HTTP_401_UNAUTHORIZED
                )
                
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
            
        except Exception as e:
            print("Error:", str(e))  # Para debug
            return Response(
                {'error': 'Error interno del servidor'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
class Registro(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

             # Asignar la voz por defecto
            user.tipo_voz = 'es-US-Wavenet-B'  # Asignar la voz masculina por defecto
            user.save()  # Guardar los cambios en el usuario

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Envía el correo de bienvenida
            self.send_welcome_email(user.email)

            return Response({
                'refresh': refresh_token,
                'access': access_token
            }, status=status.HTTP_201_CREATED)

        # Manejando errores de validación específicos
        if 'username' in serializer.errors:
            return Response({'error': 'El nombre de usuario ya está en uso. Por favor, elige otro.'},
                            status=status.HTTP_400_BAD_REQUEST)

        if 'email' in serializer.errors:
            return Response({'error': 'El correo electrónico ya está en uso.'},
                            status=status.HTTP_400_BAD_REQUEST)

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
        return Response({
            'username': user.username,
            'tipo_voz': user.tipo_voz or 'es-US-Wavenet-B',  # Asignar voz por defecto si no hay
            'temaColor': user.temaColor or 'light',  # Asignar tema claro por defecto si no hay
        }, status=status.HTTP_200_OK)

    def patch(self, request):
        user = request.user
        new_username = request.data.get('username')
        new_tipo_voz = request.data.get('tipo_voz')  # Obtener el tipo de voz del request
        new_tema_color = request.data.get('temaColor')  # Obtener el tema del request
        changes_made = False

        try:
            # Validar y actualizar el nombre de usuario
            if new_username and new_username != user.username:
                if User.objects.filter(username=new_username).exists():
                    return Response({'error': 'El nombre de usuario ya está en uso.'}, status=status.HTTP_400_BAD_REQUEST)
                user.username = new_username
                changes_made = True

            # Validar y actualizar el tipo de voz
            if new_tipo_voz and new_tipo_voz != user.tipo_voz:
                if new_tipo_voz in ['es-US-Wavenet-B', 'es-US-Wavenet-A']:
                    user.tipo_voz = new_tipo_voz
                    changes_made = True

            # Validar y actualizar el tema de color
            if new_tema_color and new_tema_color in ['light', 'dark']:
                if new_tema_color != user.temaColor:
                    user.temaColor = new_tema_color
                    changes_made = True

            # Guardar todos los cambios al usuario
            if changes_made:
                user.save()
                self.send_update_email(user, new_username)
                return Response({'message': 'Datos de usuario actualizados correctamente.'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'No se realizaron cambios en el perfil.'}, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"Error en patch: {str(e)}")  # O usar logging
            return Response({'error': 'Error al guardar los cambios. Detalles: {}'.format(str(e))}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
            frontend_url = 'http://127.0.0.1:5502'
            #frontend_url = 'https://tuvooz.com'

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