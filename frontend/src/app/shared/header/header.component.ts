
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],  
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

  export class HeaderComponent {
    isMenuOpen = false;
  
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  
    closeMenu() {
      this.isMenuOpen = false;
    }
  
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const isOutsideClick = !target.closest('.navbar');
      if (isOutsideClick) {
        this.isMenuOpen = false;
      }
    }
  }
