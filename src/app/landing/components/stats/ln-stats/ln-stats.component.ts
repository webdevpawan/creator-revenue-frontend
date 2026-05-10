import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ln-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ln-stats.component.html',
  styleUrls: ['./ln-stats.component.scss']
})
export class LnStatsComponent {

   stats: any[] = [
    {
      value: '$4.2M+',
      label: 'Revenue Tracked',
      sub: 'across all creator campaigns',
      icon: '💰',
      bg: 'bg-emerald-50',
      color: 'ring-1 ring-emerald-100',
    },
    {
      value: '2,400+',
      label: 'Active Creators',
      sub: 'Instagram, TikTok & YouTube',
      icon: '🎯',
      bg: 'bg-indigo-50',
      color: 'ring-1 ring-indigo-100',
    },
    {
      value: '98%',
      label: 'Accuracy Rate',
      sub: 'real-time conversion sync',
      icon: '📊',
      bg: 'bg-violet-50',
      color: 'ring-1 ring-violet-100',
    },
    {
      value: '3.8×',
      label: 'Avg. ROI Lift',
      sub: 'after 30 days of tracking',
      icon: '🚀',
      bg: 'bg-amber-50',
      color: 'ring-1 ring-amber-100',
    },
  ];
 
  brands = [
    { name: 'Instagram',   emoji: '📸' },
    { name: 'TikTok',      emoji: '🎵' },
    { name: 'YouTube',     emoji: '▶️' },
    { name: 'ShareASale',  emoji: '🔗' },
    { name: 'CJ Affiliate',emoji: '🤝' },
    { name: 'ClickBank',   emoji: '💳' },
  ];
}
