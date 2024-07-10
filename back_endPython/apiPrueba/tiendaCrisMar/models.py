from django.db import models

# Create your models here.

#models.ChardField = Es para un campo de texto, es String en java.
#max_length = Indica la Longitud máxima del campo
#blank (true, false) = Indica que el campo hace valores nulos
#default indica el valor por defecto del campo

class cliente (models.Model):
    numero_documento=models.CharField(max_length=36)
    primer_nombre=models.CharField(max_length=30)
    segundo_nombre=models.CharField(max_length=30, blank=True)
    primer_apellido=models.CharField(max_length=30)
    segundo_apellido=models.CharField(max_length=30, blank=True)
    fecha_nacimiento=models.DateField()
    telefono=models.CharField(max_length=10)
    
    def __str__(self):
        return self.title