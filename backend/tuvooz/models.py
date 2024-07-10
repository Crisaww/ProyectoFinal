from django.db import models

# Create your models here.

class Usuario(models.Model):
    
    nombres_completos = models.CharField(max_length=200)
    correo = models.CharField(max_length=200)
    contrasenna = models.CharField(max_length=13)
    confirmacion_contrasenna = models.CharField(max_length=13)
    rol = models.IntegerField()
    #estado = models.IntegerField()

    def __str__(self):
        return self.nombres_completos
    
class Categoria(models.Model):
    
    nombre_categoria = models.CharField(max_length=40)
    activo = 'Activo'
    inactivo = 'Inactivo'
    
    estado_tipo_categoria = [
        (activo, 'Activo'),
        (inactivo, 'inactivo'),   
    ]
    estado_cetegoria = models.CharField(choices=estado_tipo_categoria, max_length=60)
    
    def __str__(self):
        return self.nombre_categoria
    
