from django.db import models
from django.utils import timezone


class Animal(models.Model):
    TIPO_ANIMAL_CHOICES = [
        ('perro', 'Perro'),
        ('gato', 'Gato'),
        ('otro', 'Otro'),
    ]
    
    ESTADO_CHOICES = [
        ('disponible', 'Disponible'),
        ('reservado', 'Reservado'),
        ('adoptado', 'Adoptado'),
        ('en_tratamiento', 'En Tratamiento'),
    ]
    
    TAMAÑO_CHOICES = [
        ('pequeño', 'Pequeño'),
        ('mediano', 'Mediano'),
        ('grande', 'Grande'),
    ]
    
    # Información básica
    nombre = models.CharField(max_length=100)
    tipo_animal = models.CharField(max_length=20, choices=TIPO_ANIMAL_CHOICES, default='perro')
    raza = models.CharField(max_length=100)
    edad = models.PositiveIntegerField(help_text="Edad en años")
    tamaño = models.CharField(max_length=20, choices=TAMAÑO_CHOICES, default='mediano')
    sexo = models.CharField(max_length=10, choices=[('macho', 'Macho'), ('hembra', 'Hembra')], null=True, blank=True)
    
    # Descripción y características
    descripcion = models.TextField(blank=True, help_text="Descripción del carácter y personalidad")
    problemas_fisicos = models.TextField(blank=True)
    problemas_comportamiento = models.TextField(blank=True)
    
    # Estado y fechas
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='disponible')
    fecha_ingreso = models.DateField(default=timezone.now, null=True, blank=True)
    fecha_adopcion = models.DateField(null=True, blank=True)
    
    # Información médica
    esterilizado = models.BooleanField(default=False)
    vacunado = models.BooleanField(default=False)
    chip = models.BooleanField(default=False)
    
    # Fotos
    foto_principal = models.ImageField(upload_to='animales/', blank=True, null=True)
    
    # Campos adicionales
    urgente = models.BooleanField(default=False, help_text="Marcar si necesita adopción urgente")
    visible = models.BooleanField(default=True, help_text="Mostrar en la web")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    
    class Meta:
        ordering = ['-urgente', '-created_at']
        verbose_name = "Animal"
        verbose_name_plural = "Animales"
    
    def __str__(self):
        return f"{self.nombre} - {self.raza} ({self.estado})"


class FotoAnimal(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE, related_name='fotos')
    foto = models.ImageField(upload_to='animales/galeria/')
    descripcion = models.CharField(max_length=200, blank=True)
    orden = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['orden']
    
    def __str__(self):
        return f"Foto de {self.animal.nombre}"


class Evento(models.Model):
    TIPO_EVENTO_CHOICES = [
        ('adopcion', 'Adopción'),
        ('charla', 'Charla'),
        ('recaudacion', 'Recaudación'),
        ('otro', 'Otro'),
    ]

    tipo_evento = models.CharField(max_length=20, choices=TIPO_EVENTO_CHOICES)
    fecha_evento = models.DateField()
    lugar_evento = models.CharField(max_length=200)
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()

    def __str__(self):
        return f"{self.tipo_evento} en {self.lugar_evento} el {self.fecha_evento}"


class Protectora(models.Model):
    numero_telefono = models.CharField(max_length=15)
    correo_electronico = models.EmailField()
    cuenta_corriente = models.CharField(max_length=50)
    direccion_teaming = models.CharField(max_length=200)

    def __str__(self):
        return f"Protectora - {self.correo_electronico}"
