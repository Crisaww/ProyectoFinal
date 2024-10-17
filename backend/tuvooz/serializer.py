from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken  # Para manejar los tokens
from .models import UserExtend

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Hacer que el password sea write-only

    class Meta:
        model = UserExtend  # Usa tu modelo personalizado
        fields = ['id', 'username', 'email', 'password', 'temaColor']  # Incluye temaColor

    def create(self, validated_data):
        user = UserExtend(
            username=validated_data['username'],
            email=validated_data['email'],
            temaColor=validated_data.get('temaColor', 'light')  # Valor predeterminado
        )
        user.set_password(validated_data['password'])  # Usa set_password para encriptar
        user.save()
        return user

    def validate_username(self, value):
        if UserExtend.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nombre de usuario ya está en uso.")
        return value

    def validate_email(self, value):
        if UserExtend.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este correo electrónico ya está en uso.")
        return value
