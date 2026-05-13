import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LnFooterComponent } from 'src/app/landing/components/footer/ln-footer/ln-footer.component';
import { LnNavbarComponent } from 'src/app/landing/components/navbar/ln-navbar/ln-navbar.component';
import { LnPricingComponent } from 'src/app/landing/components/pricing/ln-pricing/ln-pricing.component';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [
    CommonModule,
    LnNavbarComponent,
    LnPricingComponent,
    LnFooterComponent,
  ],
  templateUrl: './pricing-page.component.html',
  styleUrls: ['./pricing-page.component.scss']
})
export class PricingPageComponent {

}
