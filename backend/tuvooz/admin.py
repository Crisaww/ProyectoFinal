from django.contrib import admin

from .models import Categoria, Usuario

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Categoria)