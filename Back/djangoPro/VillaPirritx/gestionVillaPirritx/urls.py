# urls.py de la app gestionVillaPirritx
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# El router de DRF automáticamente crea todas las URLs para nuestros ViewSets
router = DefaultRouter()
router.register(r'animales', views.AnimalViewSet)
router.register(r'eventos', views.EventoViewSet)
router.register(r'protectora', views.ProtectoraViewSet)
router.register(r'solicitudes-adopcion', views.SolicitudAdopcionView, basename='solicitudes-adopcion')

urlpatterns = [
    path('api/', include(router.urls)),
]

# Esto crea automáticamente estas URLs:
# GET /api/animales/ - Lista de animales
# GET /api/animales/{id}/ - Detalle de animal
# GET /api/animales/disponibles/ - Solo animales disponibles
# GET /api/animales/urgentes/ - Solo animales urgentes
# GET /api/eventos/ - Lista de eventos
# GET /api/eventos/proximos/ - Eventos próximos
# GET /api/protectora/ - Info de la protectora
# POST /api/solicitudes-adopcion/crear/ - Enviar solicitud de adopción
