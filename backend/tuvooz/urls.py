from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth.views import LoginView
from rest_framework.documentation import include_docs_urls
from .viewAI import synthesize
from tuvooz import views


urlpatterns = [
     # URLs para obtener y refrescar tokens JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Para obtener el token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Para refrescar el token
    
    # Documentación de la API
    path('docs/', include_docs_urls(title="TuVooz API")),
    
    # Rutas para tu API personalizada
    re_path('api/v1/iniciarSesion', views.iniciarSesion),
    re_path('api/v1/registro', views.registro),
    re_path('api/v1/perfil', views.perfil),
    
    # Ruta para sintetizar audio
    path('synthesize/', synthesize, name='synthesize'),
    
    # Rutas para manejar vistas protegidas
    path('tuVoozPrincipal/paginaPrincipal/', views.pagina_principal, name='pagina_principal'),
    path('tuVoozPrincipal/indexPalabrasComunes/', views.index_palabras_comunes, name='index_palabras_comunes'),
    path('tuVoozPrincipal/saludos/', views.saludos, name='saludos'),
    path('tuVoozPrincipal/animales/', views.animales, name='animales'),
    path('tuVoozPrincipal/comoUsarTuvooz/', views.comoUsarTuvooz, name='como_usar_tuvooz'),
    path('tuVoozPrincipal/emociones/', views.emociones, name='emociones'),
    path('tuVoozPrincipal/preguntas/', views.preguntas, name='preguntas'),
    path('tuVoozPrincipal/miCuenta/', views.miCuenta, name='miCUenta'),
    
    # Ruta para el login de la cuenta
    path('cuenta/iniciarSesion.html', LoginView.as_view(template_name='tuVoozPrincipal/cuenta/iniciarSesion.html'), name='login'),
]
