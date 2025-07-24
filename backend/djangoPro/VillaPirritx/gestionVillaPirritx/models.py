from django.db import models


class Animal(models.Model):
    nombre = models.CharField(max_length=100)
    raza = models.CharField(max_length=100)
    edad = models.PositiveIntegerField()
    problemas_fisicos = models.TextField(blank=True)
    problemas_comportamiento = models.TextField(blank=True)
    def __str__(self):
        return self.nombre


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
