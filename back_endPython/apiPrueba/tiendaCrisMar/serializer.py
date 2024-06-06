from rest_framework import serializers
#Se importa el módulo serializers

from .models import cliente
#Se importa la clase del modal


#Se crea una clase serializer por cada entidad
#La clase META dentro de un serializador sirve para proporcionar
#metadatos adicionales y configuraciones especificas para ese serializador.

class clienteSerializer(serializers.ModelSerializer):
#Agrega los campos necesarios a mostrar 
#si se desea agregar todos los campos se puede utilizar 
#la funcion __all__

    class Meta:
        model=cliente
        fields='__all__'
        #field={
        #    'id',
        #    'numero_identificación',
        #    'primer_nombre',
        #    'segundo_nombre',
        #    'primer_apellido',
        #    'segundo_apellido',
        #    'fecha_nacimiento',
        #    'telefono'
            
        #}