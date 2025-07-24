import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent {


  dogs = [
    { image: './mix/mercadillo.png', titulo: 'Mercadillo Solidario', lugar: 'leioa', fecha: '15/11/2024', horario: '10:00 a 14:00' },
    { image: './mix/mercadillo.png', titulo: 'Mercadillo Solidario', lugar: 'Lamiadko', fecha: '15/11/2024', horario: '10:00 a 14:00' },
    { image: './mix/mercadillo.png', titulo: 'Mercadillo Solidario', lugar: 'Astrabudua', fecha: '15/11/2024', horario: '10:00 a 14:00' },
    { image: './mix/mercadillo.png', titulo: 'Mercadillo Solidario', lugar: 'Sestao', fecha: '15/11/2024', horario: '10:00 a 14:00' },
    { image: './mix/mercadillo.png', titulo: 'Mercadillo Solidario', lugar: 'Portugalete', fecha: '15/11/2024', horario: '10:00 a 14:00' },
    { image: './mix/mercadillo.png', titulo: 'Mercadillo Solidario', lugar: 'Sondika', fecha: '15/11/2024', horario: '10:00 a 14:00' },

  ];

  constructor(private router: Router, /* private dogService: DogService */) {}

  shareDetails(dog: any) {
    const dogDetails = `Conoce a ${dog.name}, un ${dog.breed} de ${dog.age} años.`;
    navigator.share({
      title: 'Ficha de Adopción',
      text: dogDetails,
      url: window.location.href
    }).catch((error) => console.log('Error al compartir:', error));
  }

}
