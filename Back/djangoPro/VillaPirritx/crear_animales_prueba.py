# Script para crear animales de prueba
# Este archivo va en: Back/djangoPro/VillaPirritx/crear_animales_prueba.py

import os
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'VillaPirritx.settings')
django.setup()

from gestionVillaPirritx.models import Animal
from django.utils import timezone

def crear_animales_prueba():
    """Crear algunos animales de prueba si no existen"""
    
    # Verificar si ya hay animales
    if Animal.objects.count() > 0:
        print(f"Ya hay {Animal.objects.count()} animales en la base de datos")
        return
    
    animales_prueba = [
        {
            'nombre': 'Paco',
            'tipo_animal': 'perro',
            'raza': 'Labrador',
            'edad': 5,
            'tamaño': 'grande',
            'sexo': 'macho',
            'descripcion': 'Paco es un perro muy cariñoso y juguetón. Le encanta estar con niños y es muy obediente.',
            'estado': 'disponible',
            'esterilizado': True,
            'vacunado': True,
            'chip': True,
            'urgente': False,
            'visible': True
        },
        {
            'nombre': 'Luna',
            'tipo_animal': 'perro',
            'raza': 'Pastor Alemán',
            'edad': 3,
            'tamaño': 'grande',
            'sexo': 'hembra',
            'descripcion': 'Luna es una perra muy inteligente y protectora. Ideal para familias con experiencia.',
            'estado': 'disponible',
            'esterilizado': True,
            'vacunado': True,
            'chip': True,
            'urgente': True,
            'visible': True
        },
        {
            'nombre': 'Negu',
            'tipo_animal': 'perro',
            'raza': 'Pug',
            'edad': 2,
            'tamaño': 'pequeño',
            'sexo': 'macho',
            'descripcion': 'Negu es un perrito muy simpático y sociable. Le gusta estar con otros perros.',
            'estado': 'disponible',
            'esterilizado': False,
            'vacunado': True,
            'chip': True,
            'urgente': False,
            'visible': True
        },
        {
            'nombre': 'Miau',
            'tipo_animal': 'gato',
            'raza': 'Mestizo',
            'edad': 1,
            'tamaño': 'pequeño',
            'sexo': 'hembra',
            'descripcion': 'Miau es una gatita muy cariñosa que busca un hogar tranquilo.',
            'estado': 'disponible',
            'esterilizado': True,
            'vacunado': True,
            'chip': False,
            'urgente': True,
            'visible': True
        },
        {
            'nombre': 'Rocky',
            'tipo_animal': 'perro',
            'raza': 'Mestizo',
            'edad': 7,
            'tamaño': 'mediano',
            'sexo': 'macho',
            'descripcion': 'Rocky es un perro senior muy tranquilo y cariñoso. Perfecto para personas mayores.',
            'estado': 'disponible',
            'esterilizado': True,
            'vacunado': True,
            'chip': True,
            'urgente': False,
            'visible': True
        }
    ]
    
    print("Creando animales de prueba...")
    
    for animal_data in animales_prueba:
        animal = Animal.objects.create(**animal_data)
        print(f"✅ Creado: {animal.nombre} ({animal.tipo_animal})")
    
    print(f"\n🎉 ¡Creados {len(animales_prueba)} animales de prueba!")
    print("Ahora puedes verlos en:")
    print("- Admin: http://127.0.0.1:8000/admin/")
    print("- API: http://127.0.0.1:8000/api/animales/")
    print("- Frontend: http://localhost:4200/adopcion")

if __name__ == '__main__':
    crear_animales_prueba()
