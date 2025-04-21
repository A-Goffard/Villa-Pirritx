import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adopcion-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './adopcion-form.component.html',
  styleUrl: './adopcion-form.component.css'
})

export class AdopcionFormComponent {
  adopciontForm: FormGroup;
  messageSent = false;
  imagePreviews: string[] = [];
  selectedImages: File[] = []; // Declarado correctamente

  constructor(private fb: FormBuilder) {
    this.adopciontForm = this.fb.group({
      nombreanimal: [''],
      tipoanimal: ['', Validators.required],
      edadanimal: [''],
      sexoanimal: [''],
      tiemporefugio: [''],
      urgenciaanimal: ['', Validators.required],
      descripcionanimal: ['', Validators.required],
      observacionesanimal: [''],
    });
  }

  onFilesChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const maxFiles = 5; // Máximo número de imágenes permitidas
      const maxSize = 5 * 1024 * 1024; // Tamaño máximo por imagen (5 MB)

      const files = Array.from(fileInput.files);
      if (files.length > maxFiles) {
        alert(`Solo puedes subir hasta ${maxFiles} imágenes.`);
        return;
      }

      const invalidFiles = files.filter(file => file.size > maxSize);
      if (invalidFiles.length > 0) {
        alert('Algunas imágenes exceden el tamaño máximo permitido (5 MB).');
        return;
      }

      this.selectedImages = files; // Guardar archivos seleccionados

      // Generar vistas previas de todas las imágenes seleccionadas
      this.imagePreviews = [];
      this.selectedImages.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  onSubmit(): void {
    if (this.adopciontForm.valid && this.selectedImages.length > 0) {
      const formData = new FormData();

      // Agregar los valores del formulario al FormData
      Object.entries(this.adopciontForm.value).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      // Agregar las imágenes al FormData
      this.selectedImages.forEach((file, index) => {
        formData.append(`imagenanimal${index + 1}`, file); // Usar archivos directamente
      });

      // Aquí enviarías los datos al servidor
      console.log('Datos del formulario (FormData):', formData);

      // Simular mensaje de éxito
      this.messageSent = true;
      setTimeout(() => (this.messageSent = false), 3000);
    } else {
      alert('Por favor, completa el formulario y selecciona al menos una imagen.');
    }
  }
}
