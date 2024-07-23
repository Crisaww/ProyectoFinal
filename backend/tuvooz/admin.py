from django.contrib import admin

from .models import Categoria, Usuario, palabraCategoria, palabrasFavoritas

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Categoria)
admin.site.register(palabraCategoria)
admin.site.register(palabrasFavoritas)