import { Component } from '@angular/core';
import { ContactFormComponent } from "../../components/contact-form/contact-form.component";


@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ ContactFormComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

}

