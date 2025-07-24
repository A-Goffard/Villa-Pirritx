import { Component } from '@angular/core';
import { AdopcionFormComponent } from "../../components/adopcion-form/adopcion-form.component";

@Component({
  selector: 'app-gestion-adopcion',
  standalone: true,
  imports: [AdopcionFormComponent],
  templateUrl: './gestion-adopcion.component.html',
  styleUrl: './gestion-adopcion.component.css'
})
export class GestionAdopcionComponent {

}
