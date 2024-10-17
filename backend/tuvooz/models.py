from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class UserExtend(AbstractUser):
    temaColor = models.CharField(max_length=10, default='light')
    tipo_voz = models.CharField(max_length=15, default='voz_masculina')

    groups = models.ManyToManyField(
        Group,
        related_name='tuvooz_userextend_groups',  # Cambia este nombre a uno único
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='tuvooz_userextend_permissions',  # Cambia este nombre a uno único
        blank=True,
    )
