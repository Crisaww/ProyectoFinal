from django.urls import path,include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers

from tiendaCrisMar import views

router=routers.DefaultRouter()
router.register(r'',views.clienteView,'/cliente')

urlpatterns=[
    
    path("api/v1/cliente/", include (router.urls)),
    path("docs/",include_docs_urls(title="Tienda API"))
    
]

#Genera para cada entidad = GET, POST, PUT, DELETE