from django.conf import settings
from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth.views import LoginView
from rest_framework.documentation import include_docs_urls
from .viewAI import predict_text, synthesize
from tuvooz import views
from django.conf.urls.static import static
from .views import olvide_contrasena, CambiarContrasenna, Registro, IniciarSesion, Perfil, RestablecerContrasena, LogoutView, EliminarCuenta, error_404_view

urlpatterns = [
    
     # URLs para obtener y refrescar tokens JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Para obtener el token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Para refrescar el token
    
    # Documentación de la API
    path('docs/', include_docs_urls(title="TuVooz API")),
    
    # Rutas para tu API personalizada
    re_path('api/v1/registro', Registro.as_view(), name='registroUsuario'),
    re_path('api/v1/iniciarSesion', IniciarSesion.as_view(), name='iniciarSesion'),
    re_path('api/v1/perfil', Perfil.as_view(), name='accesoPerfil'),
    re_path('api/v1/olvideContrasena/', olvide_contrasena.as_view(), name='olvide-contrasena'),
    re_path('api/v1/restablecerContrasena', RestablecerContrasena.as_view(), name='restablecerContrasena'),
    re_path('api/v1/logout/', LogoutView.as_view(), name='logout'),
    re_path('cambiarContrasenna/', CambiarContrasenna.as_view(), name='CambiarContrasenna'),
    re_path('api/v1/eliminarcuenta', EliminarCuenta.as_view(), name='EliminarCuenta'),
    re_path('api/v1/error404/', error_404_view, name='error404'), 
    re_path('api/v1/perfil/actualizar-tema/', Perfil.as_view(), name='actualizarTema'),
    re_path('api/v1/perfil/actualizar-voz/', Perfil.as_view(), name='actualizarVoz'),

    # re_path('api/v1/actualizarUsername/', views.actualizar_username, name='actualizarUsername'),  # Nueva ruta
    
    # Ruta para sintetizar audio
    re_path('synthesize/', synthesize, name='synthesize'),
    re_path('predict_text/', predict_text, name='predict_text'),

    
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
    # path('cuenta/iniciarSesion.html', LoginView.as_view(template_name='tuVoozPrincipal/cuenta/iniciarSesion.html'), name='login'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

