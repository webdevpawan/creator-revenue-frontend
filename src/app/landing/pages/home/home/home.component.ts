import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LnNavbarComponent } from 'src/app/landing/components/navbar/ln-navbar/ln-navbar.component';
import { LnHeroComponent } from 'src/app/landing/components/hero/ln-hero/ln-hero.component';
import { LnStatsComponent } from 'src/app/landing/components/stats/ln-stats/ln-stats.component';
import { LnFeaturesComponent } from 'src/app/landing/components/features/ln-features/ln-features.component';
import { LnDashboardPreviewComponent } from 'src/app/landing/components/dashboard-preview/ln-dashboard-preview/ln-dashboard-preview.component';
import { LnTestimonialsComponent } from 'src/app/landing/components/testimonials/ln-testimonials/ln-testimonials.component';
import { LnCtaComponent } from 'src/app/landing/components/cta/ln-cta/ln-cta.component';
import { LnFooterComponent } from 'src/app/landing/components/footer/ln-footer/ln-footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LnNavbarComponent,
    LnHeroComponent,
    LnStatsComponent,
    LnFeaturesComponent,
    LnDashboardPreviewComponent,
    LnTestimonialsComponent,
    LnCtaComponent,
    LnFooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
