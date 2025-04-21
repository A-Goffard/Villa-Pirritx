import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})

export class ContactFormComponent {

  contactForm: FormGroup;
  messageSent = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      firstSurname: ['', Validators.required],
      secondSurname: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      observations: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      // Aquí es donde podrías enviar los datos a un servidor o servicio de correo electrónico.
      console.log('Datos del formulario:', formData);

      // Lógica para enviar el formulario por correo electrónico
      window.location.href = `mailto:aintzagoffard@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Nombre: ${formData.name}\nPrimer Apellido: ${formData.firstSurname}\nSegundo Apellido: ${formData.secondSurname}\nCorreo Electrónico: ${formData.email}\nTeléfono: ${formData.phone}\nAsunto: ${formData.subject}\nObservaciones: ${formData.observations}`
      )}`;

      this.messageSent = true;
      setTimeout(() => (this.messageSent = false), 3000); // Ocultar después de 3 segundos
    }
  }
}