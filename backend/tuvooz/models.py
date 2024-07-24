from django.db import models

# Create your models here.

class Usuario(models.Model):
    
    nombres_completos = models.CharField(max_length=200)
    correo = models.CharField(max_length=200)
    contrasenna = models.CharField(max_length=13)
    confirmacion_contrasenna = models.CharField(max_length=13)
   # rol = models.IntegerField()
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
    estado_categoria = models.CharField(choices=estado_tipo_categoria, max_length=60)
    
    def __str__(self):
        return self.nombre_categoria

class palabraCategoria(models.Model):
    texto_palabras = models.CharField(max_length=40)
    #Se relaciona con categoria pq cada palabra es de una categoria diferente
    categoria = models.ForeignKey(Categoria, related_name='palabraCategoria', on_delete=models.PROTECT)
    
    activo = 'Activo'
    inactivo = 'Inactivo'
    
    estado_tipo_palabraCategoria = [
        (activo, 'Activo'),
        (inactivo, 'inactivo'),   
    ]
    estado_palabraCategoria = models.CharField(choices=estado_tipo_palabraCategoria, max_length=60)
    
    def __str__(self):
        return self.texto_palabras
    
class palabrasFavoritas(models.Model):
    
    usuario = models.ForeignKey(Usuario, related_name='palabrasFavoritas', on_delete=models.PROTECT)
    palabra_categoria = models.ForeignKey(palabraCategoria, related_name='palabrasFavoritas', on_delete=models.PROTECT)
    
    def __str__(self):
        return self.palabra_categoria
