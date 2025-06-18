import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adopcion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adopcion.component.html',
  styleUrl: './adopcion.component.css'
})
export class AdopcionComponent {

  dogs = [
    { image: './mix/perro_ejem.jpg', name: 'Paco', breed: 'Labrador', age: 5 },
    { image: './mix/perro_ejem.jpg', name: 'Negu', breed: 'Pug', age: 2 },
    { image: './mix/perro_ejem.jpg', name: 'Blanqui', breed: 'Shih Tzu', age: 6 },
    { image: './mix/perro_ejem.jpg', name: 'Paco', breed: 'Labrador', age: 5 },
    { image: './mix/perro_ejem.jpg', name: 'Negu', breed: 'Pug', age: 2 },
    { image: './mix/perro_ejem.jpg', name: 'Blanqui', breed: 'Shih Tzu', age: 6 },
  ];

  constructor(private router: Router, /* private dogService: DogService */) {}

  viewDetails(dog: any) {
   /*  this.dogService.setSelectedDog(dog); */
    this.router.navigate(['/dog-details']);
  }

  shareDetails(dog: any) {
    const dogDetails = `Conoce a ${dog.name}, un ${dog.breed} de ${dog.age} años.`;
    navigator.share({
      title: 'Ficha de Adopción',
      text: dogDetails,
      url: window.location.href
    }).catch((error) => console.log('Error al compartir:', error));
  }

}
