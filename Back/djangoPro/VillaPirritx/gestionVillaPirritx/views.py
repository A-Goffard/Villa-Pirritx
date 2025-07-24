# views.py
# Las vistas manejan las peticiones HTTP y devuelven respuestas

from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.core.mail import send_mail
from django.conf import settings
from .models import Animal, Evento, Protectora, FotoAnimal
from .serializers import (
    AnimalSerializer, AnimalSimpleSerializer, EventoSerializer, 
    ProtectoraSerializer, SolicitudAdopcionSerializer, FotoAnimalSerializer
)


class AnimalViewSet(viewsets.ModelViewSet):
    """
    ViewSet para manejar operaciones CRUD de animales
    GET /api/animales/ - Lista todos los animales
    GET /api/animales/{id}/ - Obtiene un animal específico
    POST /api/animales/ - Crea un nuevo animal (solo admin)
    PUT /api/animales/{id}/ - Actualiza un animal (solo admin)
    DELETE /api/animales/{id}/ - Elimina un animal (solo admin)
    """
    queryset = Animal.objects.filter(visible=True)
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        """Usar serializer simple para la lista, completo para detalles"""
        if self.action == 'list':
            return AnimalSimpleSerializer
        return AnimalSerializer
    
    def get_queryset(self):
        """Filtrar animales según parámetros de búsqueda"""
        queryset = Animal.objects.filter(visible=True)
        
        # Filtros opcionales
        estado = self.request.query_params.get('estado', None)
        tipo_animal = self.request.query_params.get('tipo_animal', None)
        tamaño = self.request.query_params.get('tamaño', None)
        edad_min = self.request.query_params.get('edad_min', None)
        edad_max = self.request.query_params.get('edad_max', None)
        urgente = self.request.query_params.get('urgente', None)
        
        if estado:
            queryset = queryset.filter(estado=estado)
        if tipo_animal:
            queryset = queryset.filter(tipo_animal=tipo_animal)
        if tamaño:
            queryset = queryset.filter(tamaño=tamaño)
        if edad_min:
            queryset = queryset.filter(edad__gte=edad_min)
        if edad_max:
            queryset = queryset.filter(edad__lte=edad_max)
        if urgente:
            queryset = queryset.filter(urgente=True)
            
        return queryset.order_by('-urgente', '-created_at')
    
    @action(detail=False, methods=['get'])
    def disponibles(self, request):
        """Endpoint especial para obtener solo animales disponibles"""
        animales = Animal.objects.filter(estado='disponible', visible=True)
        serializer = AnimalSimpleSerializer(animales, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def urgentes(self, request):
        """Endpoint para animales que necesitan adopción urgente"""
        animales = Animal.objects.filter(urgente=True, estado='disponible', visible=True)
        serializer = AnimalSimpleSerializer(animales, many=True)
        return Response(serializer.data)


class EventoViewSet(viewsets.ModelViewSet):
    """ViewSet para manejar eventos"""
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        """Ordenar eventos por fecha"""
        return Evento.objects.all().order_by('fecha_evento')
    
    @action(detail=False, methods=['get'])
    def proximos(self, request):
        """Obtener eventos próximos"""
        from django.utils import timezone
        eventos = Evento.objects.filter(fecha_evento__gte=timezone.now().date())
        serializer = EventoSerializer(eventos, many=True)
        return Response(serializer.data)


class ProtectoraViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet para información de la protectora (solo lectura)"""
    queryset = Protectora.objects.all()
    serializer_class = ProtectoraSerializer


class SolicitudAdopcionView(viewsets.GenericViewSet):
    """ViewSet para manejar solicitudes de adopción"""
    
    @action(detail=False, methods=['post'])
    def crear(self, request):
        """Crear una nueva solicitud de adopción"""
        serializer = SolicitudAdopcionSerializer(data=request.data)
        
        if serializer.is_valid():
            # Obtener datos validados
            datos = serializer.validated_data
            animal = Animal.objects.get(id=datos['animal_id'])
            
            # Aquí puedes guardar la solicitud en una base de datos
            # o enviar un email a los administradores
            
            # Enviar email (opcional)
            try:
                mensaje = f"""
Nueva solicitud de adopción:

Animal: {animal.nombre} (ID: {animal.id})
Solicitante: {datos['nombre']} {datos['apellidos']}
Email: {datos['email']}
Teléfono: {datos['telefono']}
Dirección: {datos['direccion']}
Experiencia: {datos.get('experiencia', 'No especificada')}
Motivación: {datos['motivacion']}
Otros animales: {'Sí' if datos['otros_animales'] else 'No'}
Espacio vivienda: {datos['espacio_vivienda']}
                """
                
                # Descomentar cuando configures email
                # send_mail(
                #     f'Nueva solicitud de adopción para {animal.nombre}',
                #     mensaje,
                #     'noreply@villapirritx.com',
                #     ['admin@villapirritx.com'],
                #     fail_silently=False,
                # )
                
            except Exception as e:
                pass  # No fallar si el email no se puede enviar
            
            return Response({
                'mensaje': 'Solicitud de adopción enviada correctamente',
                'animal': animal.nombre
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
