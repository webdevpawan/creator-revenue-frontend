import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ln-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ln-testimonials.component.html',
  styleUrls: ['./ln-testimonials.component.scss']
})
export class LnTestimonialsComponent {

    testimonials: any[] = [
    {
      name: 'Aria Kim',
      handle: '@ariakim.creates',
      avatar: 'AK',
      avatarColor: 'linear-gradient(135deg,#818cf8,#6366f1)',
      platform: 'Instagram',
      platformEmoji: '📸',
      followers: '184K followers',
      quote: "I was posting reels constantly but had no idea which ones were actually making me money. CreatorEarn showed me my top 3 campaigns were driving 87% of revenue. Game-changer.",
      metric: '+$3,200',
      metricLabel: 'revenue in first month',
    },
    {
      name: 'Marcus J.',
      handle: '@marcusfitlife',
      avatar: 'MJ',
      avatarColor: 'linear-gradient(135deg,#34d399,#10b981)',
      platform: 'Instagram',
      platformEmoji: '📸',
      followers: '92K followers',
      quote: "The link tracking alone is worth it. I used to manually count affiliate sales in spreadsheets. Now it's all automatic, real-time, and I can see which stories convert best.",
      metric: '4.2×',
      metricLabel: 'conversion rate improvement',
    },
    {
      name: 'Sofia Ramirez',
      handle: '@sofiacreates',
      avatar: 'SR',
      avatarColor: 'linear-gradient(135deg,#f9a8d4,#ec4899)',
      platform: 'TikTok',
      platformEmoji: '🎵',
      followers: '310K followers',
      quote: "Finally ditched my chaotic Google Sheets. The campaign insights feature told me my morning routine reels convert 3x better than haul videos. I shifted my content strategy immediately.",
      metric: '68%',
      metricLabel: 'increase in affiliate revenue',
    },
    {
      name: 'Tyler Dawson',
      handle: '@tylerdcreates',
      avatar: 'TD',
      avatarColor: 'linear-gradient(135deg,#fbbf24,#f59e0b)',
      platform: 'YouTube',
      platformEmoji: '▶️',
      followers: '47K subscribers',
      quote: "The CSV import saved me 6 hours of data cleanup. I imported 18 months of CJ Affiliate history in 30 seconds. The dashboard immediately showed me patterns I never saw before.",
      metric: '18 months',
      metricLabel: 'of data imported in 30 sec',
    },
    {
      name: 'Priya Nair',
      handle: '@priya.ugc',
      avatar: 'PN',
      avatarColor: 'linear-gradient(135deg,#67e8f9,#06b6d4)',
      platform: 'Instagram',
      platformEmoji: '📸',
      followers: 'UGC Creator',
      quote: "I pitch brands using my CreatorEarn report. It shows click-through rates, conversion data, and revenue per campaign. Clients love the transparency and I've landed 3 bigger deals.",
      metric: '3 brand deals',
      metricLabel: 'closed with data reports',
    },
    {
      name: 'Jae-won Oh',
      handle: '@jaetech',
      avatar: 'JO',
      avatarColor: 'linear-gradient(135deg,#a78bfa,#8b5cf6)',
      platform: 'TikTok',
      platformEmoji: '🎵',
      followers: '220K followers',
      quote: "The insight alerts are like having a data analyst on staff. It literally told me 'Reel7 has 12K clicks and $0 revenue — check your affiliate link.' The link was broken. Saved a campaign.",
      metric: '$1,800',
      metricLabel: 'saved from broken link alert',
    },
  ];

}
