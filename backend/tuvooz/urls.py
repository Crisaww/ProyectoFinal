from django.urls import path, include, re_path
from rest_framework import routers
from rest_framework.documentation import include_docs_urls

from .viewAI import synthesize
from tuvooz import views

router_usuarios = routers.DefaultRouter()
router_usuarios.register(r'usuario', views.UsuarioView)


router_categoria = routers.DefaultRouter()
router_categoria.register(r'categoria', views.CategoriaView)

router_palabraCategoria = routers.DefaultRouter()
router_palabraCategoria.register(r'palabraCategoria', views.palabraCategoriaView)

router_palabraFavorita = routers.DefaultRouter()
router_palabraFavorita.register(r'palabraFavorita', views.palabrasFavoritasView)





urlpatterns = [
    path("docs/", include_docs_urls(title="TuVooz Api")),
    path("api/v1/", include(router_usuarios.urls)),
    path("api/v1/", include(router_categoria.urls)),
    path("api/v1/", include(router_palabraCategoria.urls)),
    path("api/v1/", include(router_palabraFavorita.urls)),
    re_path('api/v1/iniciarSesion', views.iniciarSesion),
    re_path('api/v1/registro', views.registro),
    re_path('api/v1/perfil', views.perfil),
    path('synthesize/', synthesize, name='synthesize')
]
