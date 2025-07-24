import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Animal {
  id: number;
  nombre: string;
  tipo_animal: string;
  raza: string;
  edad: number;
  tamano: string;  // Sin ñ para evitar problemas de parsing
  sexo: string;
  descripcion: string;
  estado_adopcion: string;
  foto_principal: string;
  esterilizado: boolean;
  vacunado: boolean;
  chip: boolean;
  urgente: boolean;
}

export interface Evento {
  id: number;
  tipo_evento: string;
  fecha_evento: string;
  lugar_evento: string;
  hora_inicio: string;
  hora_fin: string;
}

@Injectable({
  providedIn: 'root'
})
export class MascotasService {
  private apiUrl = 'http://localhost:8000/api'; // Cambia por tu URL de Django

  constructor(private http: HttpClient) { }

  // Función para transformar respuesta de Django a formato Angular
  private transformarAnimal(animal: any): Animal {
    return {
      ...animal,
      tamano: animal.tamaño || animal.tamano,  // Mapear tamaño (Django) a tamano (Angular)
      estado_adopcion: animal.estado || animal.estado_adopcion
    };
  }

  // Función para procesar respuesta de la API
  private procesarRespuestaAnimales(response: any): Animal[] {
    console.log('Respuesta de API:', response);
    
    // Si la respuesta es directamente un array
    if (Array.isArray(response)) {
      return response.map((animal: any) => this.transformarAnimal(animal));
    }
    
    // Si la respuesta es un objeto con propiedad 'results' (paginación)
    if (response && response.results && Array.isArray(response.results)) {
      return response.results.map((animal: any) => this.transformarAnimal(animal));
    }
    
    // Si la respuesta es un objeto con datos anidados
    if (response && response.data && Array.isArray(response.data)) {
      return response.data.map((animal: any) => this.transformarAnimal(animal));
    }
    
    // Si no es un formato reconocido, devolver array vacío
    console.warn('Formato de respuesta no reconocido:', response);
    return [];
  }

  // Obtener todos los animales disponibles
  getAnimalesDisponibles(): Observable<Animal[]> {
    return this.http.get<any>(`${this.apiUrl}/animales/`)  // Quitar filtro estado hasta verificar
      .pipe(
        map(response => this.procesarRespuestaAnimales(response))
      );
  }

  // Obtener animal por ID
  getAnimalById(id: number): Observable<Animal> {
    return this.http.get<any>(`${this.apiUrl}/animales/${id}/`)
      .pipe(
        map(animal => this.transformarAnimal(animal))
      );
  }

  // Obtener eventos próximos
  getEventosProximos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/eventos/`);
  }

  // Crear solicitud de adopción
  crearSolicitudAdopcion(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/solicitudes-adopcion/`, datos);
  }

  // Buscar animales con filtros
  buscarAnimales(filtros: any): Observable<Animal[]> {
    let params = new URLSearchParams();
    
    if (filtros.tipo_animal) params.append('tipo_animal', filtros.tipo_animal);
    if (filtros.tamano) params.append('tamaño', filtros.tamano);  // Nota: Django usa 'tamaño' pero frontend 'tamano'
    if (filtros.edad_min) params.append('edad_min', filtros.edad_min);
    if (filtros.edad_max) params.append('edad_max', filtros.edad_max);
    
    return this.http.get<any>(`${this.apiUrl}/animales/?${params.toString()}`)
      .pipe(
        map(response => this.procesarRespuestaAnimales(response))
      );
  }
}
