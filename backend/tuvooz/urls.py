from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from tuvooz import views

router_usuarios = routers.DefaultRouter()
router_usuarios.register(r'usuarios', views.UsuarioView)


router_categoria = routers.DefaultRouter()
router_categoria.register(r'categoria', views.CategoriaView)



urlpatterns = [
    path("docs/", include_docs_urls(title="TuVooz Api")),
    path("api/v1/", include(router_usuarios.urls)),
    path("api/v1/", include(router_categoria.urls)),
]
