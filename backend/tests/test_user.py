from unittest import mock
import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from threading import Thread
from django.contrib.auth.models import User

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





    