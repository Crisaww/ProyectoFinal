# Generated by Django 3.2.14 on 2024-07-11 17:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tuvooz', '0004_auto_20240711_1112'),
    ]

    operations = [
        migrations.RenameField(
            model_name='palabracategoria',
            old_name='Categoria',
            new_name='categoria',
        ),
        migrations.RenameField(
            model_name='palabracategoria',
            old_name='palabras',
            new_name='texto_palabras',
        ),
        migrations.CreateModel(
            name='palabrasFavoritas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('palabra_categoria', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='palabrasFavoritas', to='tuvooz.palabracategoria')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='palabrasFavoritas', to='tuvooz.usuario')),
            ],
        ),
    ]
