import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MascotasService, Animal } from '../../services/mascotas.service';

@Component({
  selector: 'app-adopcion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adopcion.component.html',
  styleUrl: './adopcion.component.css'
})
export class AdopcionComponent implements OnInit {
  animales: Animal[] = [];
  loading = true;
  error = '';

  // Datos de ejemplo como fallback
  datosEjemplo: Animal[] = [
    { 
      id: 1, 
      nombre: 'Paco', 
      raza: 'Labrador', 
      edad: 5, 
      tipo_animal: 'perro',
      tamano: 'grande',
      sexo: 'macho',
      estado_adopcion: 'disponible',
      urgente: false,
      foto_principal: '/mix/perro_ejem.jpg',
      descripcion: 'Perro muy cariñoso y juguetón',
      esterilizado: true,
      vacunado: true,
      chip: true
    },
    { 
      id: 2, 
      nombre: 'Negu', 
      raza: 'Pug', 
      edad: 2, 
      tipo_animal: 'perro',
      tamano: 'pequeño',
      sexo: 'hembra',
      estado_adopcion: 'disponible',
      urgente: true,
      foto_principal: '/mix/perro_ejem.jpg',
      descripcion: 'Necesita familia urgente',
      esterilizado: true,
      vacunado: true,
      chip: true
    },
    { 
      id: 3, 
      nombre: 'Luna', 
      raza: 'Pastor Alemán', 
      edad: 3, 
      tipo_animal: 'perro',
      tamano: 'grande',
      sexo: 'hembra',
      estado_adopcion: 'disponible',
      urgente: false,
      foto_principal: '/mix/perro_ejem.jpg',
      descripcion: 'Muy obediente y leal',
      esterilizado: true,
      vacunado: true,
      chip: true
    }
  ];

  constructor(
    private router: Router, 
    private mascotasService: MascotasService
  ) {}

  ngOnInit() {
    this.cargarAnimales();
  }

  cargarAnimales() {
    this.loading = true;
    this.error = '';
    
    // AHORA SÍ USAMOS EL BACKEND! 🚀
    this.mascotasService.getAnimalesDisponibles().subscribe({
      next: (animales) => {
        console.log('Animales recibidos del backend:', animales);
        
        // Verificar que sea un array válido
        if (Array.isArray(animales) && animales.length > 0) {
          this.animales = animales;
          console.log('✅ Animales cargados desde API:', this.animales.length);
        } else {
          console.log('⚠️ No hay animales en el backend, usando datos de ejemplo');
          this.animales = this.datosEjemplo;
          this.error = 'Mostrando datos de ejemplo (no hay animales en el servidor)';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Error conectando con backend:', error);
        this.error = 'No se pudo conectar con el servidor. Mostrando datos de ejemplo.';
        this.animales = this.datosEjemplo;
        this.loading = false;
      }
    });
  }

  viewDetails(animal: Animal) {
    console.log('Ver detalles de:', animal.nombre);
    
    // TODO: Navegar a página de detalles
    // this.router.navigate(['/animal', animal.id]);
    alert(`¡Conoce más sobre ${animal.nombre}! (Próximamente página de detalles)`);
  }

  shareDetails(animal: Animal) {
    const animalDetails = `¡Conoce a ${animal.nombre}! Un ${animal.raza} de ${animal.edad} años busca familia. 
    
🏠 Villa Pirritx - Protectora de Animales
💖 Ayúdanos a difundir para encontrarle un hogar

#AdopcionResponsable #VillaPirritx #${animal.nombre}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Adopta a ${animal.nombre}`,
        text: animalDetails,
        url: window.location.href
      }).catch((error) => console.log('Error al compartir:', error));
    } else {
      // Fallback para navegadores que no soportan Web Share API
      this.copiarAlPortapapeles(animalDetails);
      alert('¡Información copiada al portapapeles! Compártela en tus redes sociales 📱');
    }
  }

  private copiarAlPortapapeles(texto: string) {
    navigator.clipboard.writeText(texto).catch(() => {
      // Fallback más antiguo
      const textArea = document.createElement('textarea');
      textArea.value = texto;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    });
  }

  // Método para aplicar filtros
  filtrarPorTipo(tipo: string) {
    this.loading = true;
    console.log('Filtrar por tipo:', tipo);
    
    // AHORA USAR LA API REAL! 🎯
    this.mascotasService.buscarAnimales({tipo_animal: tipo}).subscribe({
      next: (animales) => {
        console.log('Animales filtrados por tipo:', animales);
        this.animales = animales;
        this.loading = false;
        
        // Fallback a datos locales si no hay resultados
        if (animales.length === 0) {
          console.log('No hay animales de este tipo en el backend, usando filtro local');
          const animalesFiltrados = this.datosEjemplo.filter(animal => 
            animal.tipo_animal.toLowerCase() === tipo.toLowerCase()
          );
          this.animales = animalesFiltrados;
        }
      },
      error: (error) => {
        console.error('Error filtrando por tipo:', error);
        this.error = 'Error al filtrar. Usando datos locales.';
        
        // Fallback: filtrar datos locales
        const animalesFiltrados = this.datosEjemplo.filter(animal => 
          animal.tipo_animal.toLowerCase() === tipo.toLowerCase()
        );
        this.animales = animalesFiltrados;
        this.loading = false;
      }
    });
  }

  filtrarPorUrgencia() {
    this.loading = true;
    this.error = '';
    
    // USAR API PARA ANIMALES URGENTES! 🚨
    this.mascotasService.getAnimalesDisponibles().subscribe({
      next: (animales) => {
        // Filtrar solo los urgentes del resultado de la API
        const animalesUrgentes = animales.filter(animal => animal.urgente);
        console.log('Animales urgentes encontrados:', animalesUrgentes);
        
        this.animales = animalesUrgentes;
        this.loading = false;
        
        if (animalesUrgentes.length === 0) {
          // Si no hay urgentes en la API, verificar datos locales
          const urgentesLocales = this.datosEjemplo.filter((animal: Animal) => animal.urgente);
          if (urgentesLocales.length > 0) {
            this.animales = urgentesLocales;
            this.error = 'Mostrando datos de ejemplo (sin conexión con servidor)';
          } else {
            alert('¡Genial! No hay animales en situación urgente en este momento 😊');
            this.cargarAnimales(); // Volver a mostrar todos
          }
        }
      },
      error: (error) => {
        console.error('Error buscando animales urgentes:', error);
        // Fallback: usar datos locales
        const urgentesLocales = this.datosEjemplo.filter((animal: Animal) => animal.urgente);
        this.animales = urgentesLocales;
        this.error = 'Error de conexión. Mostrando datos de ejemplo.';
        this.loading = false;
        
        if (urgentesLocales.length === 0) {
          alert('¡Genial! No hay animales en situación urgente en este momento 😊');
          this.cargarAnimales();
        }
      }
    });
  }

}
