import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-ln-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './ln-navbar.component.html',
   styles: [`
    header {
      background: rgba(255,255,255,0);
    }
    header.scrolled {
      background: rgba(255,255,255,0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(0,0,0,0.06);
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
  `]
})
export class LnNavbarComponent {

    isScrolled = signal(false);
  mobileOpen :boolean = false;
 
  navLinks = [
    { label: 'Features',     href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Pricing',      href: '#pricing' },
  ];
 
  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 24);
  }

}
