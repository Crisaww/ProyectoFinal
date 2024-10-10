from unittest import mock
import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from threading import Thread
from django.contrib.auth.models import User

#Testing registro de usuario
@pytest.mark.django_db
def test_registro():
    client = APIClient()
    
    # Datos de registro
    url = reverse('registroUsuario')  # Ajusta el nombre de la ruta según tu configuración
    data = {
        'username': 'Dylan',
        'email': 'cristianfns11@gmail.com',
        'password': 'Crisaww11*',
    }
    
    response = client.post(url, data)
    
    assert response.status_code == status.HTTP_201_CREATED
    assert 'access' in response.data
    assert 'refresh' in response.data
    
#Testing  inicio de sesion usuario
@pytest.mark.django_db
def test_iniciar_sesion():
    client = APIClient()
    
    # Crear un usuario de prueba
    user = User.objects.create_user(username='Crisaww', email='test@cristianfns11.com', password='Crisaww11*')
    
    # Intentar iniciar sesión
    url = reverse('iniciarSesion')  # Ajusta el nombre de la ruta según tu configuración
    response = client.post(url, {'email': 'test@cristianfns11.com', 'password': 'Crisaww11*'})
    
    # Verificar el estado de la respuesta
    assert response.status_code == status.HTTP_200_OK
    assert 'access' in response.data
    assert 'refresh' in response.data
    
#Testing enviar correo electronico
@pytest.mark.django_db
@mock.patch('django.core.mail.EmailMultiAlternatives.send')
def test_send_email(mock_send_email, settings):
    client = APIClient()
    settings.EMAIL_HOST_USER = 'test@tuvooz.com'

    # Datos de prueba
    url = reverse('registroUsuario')
    data = {
        'username': 'Dylan',
        'email': 'cristianfns11@gmail.com',
        'password': 'Crisaww11'
    }

    # Realizar la solicitud de registro
    response = client.post(url, data, format='json')

    # Asegurar que la respuesta sea exitosa
    assert response.status_code == 201

    # Verificar que la función de envío de correo fue llamada
    print("Mock send email call args:", mock_send_email.call_args)  # Debugging line
    mock_send_email.assert_called_once()
    
    # Testing cambio de contraseña
@pytest.mark.django_db
def test_cambiar_contrasena_correcta():
    client = APIClient()

    # Crear un usuario de prueba
    user = User.objects.create_user(username='Crisaww', email='test@cristianfns11.com', password='Crisaww11*')
    client.force_authenticate(user=user)

    # Definir la URL y los datos para la prueba
    url = reverse('CambiarContrasenna')  # Ajusta el nombre de la ruta según tu configuración
    data = {
        'current_password': 'Crisaww11*',
        'new_password': 'NewPassword123!',
        'confirm_password': 'NewPassword123!'
    }

    # Realizar la solicitud de cambio de contraseña
    response = client.post(url, data)

    # Verificar el estado de la respuesta y tokens de JWT
    assert response.status_code == status.HTTP_200_OK
    assert 'success' in response.data
    assert 'access' in response.data
    assert 'refresh' in response.data

    # Verificar que la contraseña se ha cambiado correctamente
    user.refresh_from_db()
    assert user.check_password('NewPassword123!')
    
    # Testing que verifica que la contraseña ha sido cambiada
@pytest.mark.django_db
def test_verificar_cambio_contrasena():
    client = APIClient()

    # Crear un usuario de prueba
    user = User.objects.create_user(username='Crisaww', email='test@cristianfns11.com', password='Crisaww11*')
    client.force_authenticate(user=user)

    # Definir la URL y los datos para la prueba
    url = reverse('CambiarContrasenna')  # Ajusta el nombre de la ruta según tu configuración
    data = {
        'current_password': 'Crisaww11*',
        'new_password': 'NewPassword123!',
        'confirm_password': 'NewPassword123!'
    }

    # Realizar la solicitud de cambio de contraseña
    response = client.post(url, data)

    # Verificar que el cambio fue exitoso
    assert response.status_code == status.HTTP_200_OK
    assert 'success' in response.data

    # Verificar que NO puede iniciar sesión con la contraseña anterior
    login_url = reverse('iniciarSesion')  # Ajusta el nombre de la ruta según tu configuración
    old_password_response = client.post(login_url, {
        'email': 'test@cristianfns11.com', 
        'password': 'Crisaww11*'  # Contraseña anterior
    })
    assert old_password_response.status_code == status.HTTP_401_UNAUTHORIZED  # Debería fallar

    # Verificar que SÍ puede iniciar sesión con la nueva contraseña
    new_password_response = client.post(login_url, {
        'email': 'test@cristianfns11.com', 
        'password': 'NewPassword123!'  # Contraseña nueva
    })
    assert new_password_response.status_code == status.HTTP_200_OK  # Debería ser exitoso
    assert 'access' in new_password_response.data
    assert 'refresh' in new_password_response.data






    