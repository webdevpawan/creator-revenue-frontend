import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ln-hero',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './ln-hero.component.html',
  styleUrls: ['./ln-hero.component.scss']
})
export class LnHeroComponent {
  

   avatars = [
    { initials: 'AK', color: 'linear-gradient(135deg,#818cf8,#6366f1)' },
    { initials: 'MJ', color: 'linear-gradient(135deg,#a78bfa,#8b5cf6)' },
    { initials: 'SC', color: 'linear-gradient(135deg,#67e8f9,#06b6d4)' },
    { initials: 'RL', color: 'linear-gradient(135deg,#86efac,#22c55e)' },
    { initials: 'TD', color: 'linear-gradient(135deg,#fca5a5,#ef4444)' },
  ];

}
