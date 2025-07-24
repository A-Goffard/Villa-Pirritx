# serializers.py
# Los serializers convierten los datos de Django a JSON y viceversa

from rest_framework import serializers
from .models import Animal, Evento, Protectora, FotoAnimal


class FotoAnimalSerializer(serializers.ModelSerializer):
    """Serializer para las fotos de animales"""
    class Meta:
        model = FotoAnimal
        fields = ['id', 'foto', 'descripcion', 'orden']


class AnimalSerializer(serializers.ModelSerializer):
    """Serializer para los animales"""
    fotos = FotoAnimalSerializer(many=True, read_only=True)
    
    class Meta:
        model = Animal
        fields = [
            'id', 'nombre', 'tipo_animal', 'raza', 'edad', 'tamaño', 'sexo',
            'descripcion', 'problemas_fisicos', 'problemas_comportamiento',
            'estado', 'fecha_ingreso', 'fecha_adopcion', 'esterilizado',
            'vacunado', 'chip', 'foto_principal', 'urgente', 'visible',
            'fotos', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class AnimalSimpleSerializer(serializers.ModelSerializer):
    """Serializer simplificado para listados"""
    class Meta:
        model = Animal
        fields = [
            'id', 'nombre', 'tipo_animal', 'raza', 'edad', 'tamaño',
            'estado', 'foto_principal', 'urgente'
        ]


class EventoSerializer(serializers.ModelSerializer):
    """Serializer para eventos"""
    class Meta:
        model = Evento
        fields = '__all__'


class ProtectoraSerializer(serializers.ModelSerializer):
    """Serializer para información de la protectora"""
    class Meta:
        model = Protectora
        fields = '__all__'


class SolicitudAdopcionSerializer(serializers.Serializer):
    """Serializer para solicitudes de adopción"""
    animal_id = serializers.IntegerField()
    nombre = serializers.CharField(max_length=100)
    apellidos = serializers.CharField(max_length=200)
    email = serializers.EmailField()
    telefono = serializers.CharField(max_length=15)
    direccion = serializers.CharField(max_length=300)
    experiencia = serializers.CharField(max_length=500, required=False)
    motivacion = serializers.CharField(max_length=500)
    otros_animales = serializers.BooleanField(default=False)
    espacio_vivienda = serializers.CharField(max_length=200)
    
    def validate_animal_id(self, value):
        """Validar que el animal existe y está disponible"""
        try:
            animal = Animal.objects.get(id=value)
            if animal.estado != 'disponible':
                raise serializers.ValidationError("Este animal ya no está disponible para adopción.")
        except Animal.DoesNotExist:
            raise serializers.ValidationError("Animal no encontrado.")
        return value
