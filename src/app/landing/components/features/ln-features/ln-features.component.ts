import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ln-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ln-features.component.html',
  styleUrls: ['./ln-features.component.scss']
})
export class LnFeaturesComponent {

  features: any[] = [
  {
    icon: 'revenue',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    title: 'Revenue Tracking',
    description:
      'See exactly how much each reel, story, and campaign earns.',
    tag: 'Core',
  },
  {
    icon: 'analytics',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    title: 'Conversion Analytics',
    description:
      'Track every click-to-purchase funnel and optimize conversions.',
  },
  {
    icon: 'lightning',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    title: 'Campaign Insights',
    description:
      'Identify your top-performing campaigns instantly.',
    tag: 'Popular',
  },
  {
    icon: 'upload',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    title: 'CSV Import',
    description:
      'Bulk import affiliate data from spreadsheets in seconds.',
  },
  {
    icon: 'link',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    title: 'Smart Link Tracking',
    description:
      'Generate branded short links and track clicks automatically.',
  },
  {
    icon: 'dashboard',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-500',
    title: 'Creator Analytics Dashboard',
    description:
      'Beautiful analytics dashboard for creators and brands.',
  },
];

}
