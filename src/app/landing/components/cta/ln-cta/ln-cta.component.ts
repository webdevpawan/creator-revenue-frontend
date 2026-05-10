import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ln-cta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ln-cta.component.html',
  styles: [`
    .dot-grid-white {
      background-image: radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px);
      background-size: 24px 24px;
    }
  `]
})
export class LnCtaComponent {

  checklistItems = [
    'Free forever plan',
    'No credit card needed',
    'Setup in 5 minutes',
    'Export anytime',
    'Cancel anytime',
  ];

}
