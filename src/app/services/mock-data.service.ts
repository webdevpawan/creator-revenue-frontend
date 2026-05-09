import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Conversion, DashboardData, Link } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }

  getDashboard(): Observable<any> {
    return of({
      stats: {
        totalClicks: 48291,
        totalRevenue: 12840.50,
        conversionRate: 4.7,
        topCampaign: 'Summer Reel Series',
        clicksChange: 12.4,
        revenueChange: 18.2,
        conversionChange: -2.1
      },
      chartData: [
        { date: 'Apr 1', clicks: 1200, revenue: 320 },
        { date: 'Apr 5', clicks: 1850, revenue: 480 },
        { date: 'Apr 9', clicks: 1640, revenue: 390 },
        { date: 'Apr 13', clicks: 2100, revenue: 620 },
        { date: 'Apr 17', clicks: 2800, revenue: 880 },
        { date: 'Apr 21', clicks: 3100, revenue: 1040 },
        { date: 'Apr 25', clicks: 2750, revenue: 920 },
        { date: 'Apr 29', clicks: 3400, revenue: 1180 },
        { date: 'May 1', clicks: 3900, revenue: 1340 },
      ],
      campaigns: [
        { id: '1', name: 'Summer Reel Series', clicks: 18420, revenue: 5240.80, conversions: 246, shortUrl: 'crip.io/s1a', createdAt: '2024-04-01' },
        { id: '2', name: 'Fitness Journey Ep.3', clicks: 12100, revenue: 3190.00, conversions: 158, shortUrl: 'crip.io/fj3', createdAt: '2024-04-08' },
        { id: '3', name: 'Morning Routine', clicks: 9870, revenue: 2890.20, conversions: 131, shortUrl: 'crip.io/mr1', createdAt: '2024-04-12' },
        { id: '4', name: 'Product Haul April', clicks: 4920, revenue: 980.50, conversions: 42, shortUrl: 'crip.io/ph4', createdAt: '2024-04-18' },
        { id: '5', name: 'Reel3 – No Revenue', clicks: 2981, revenue: 0, conversions: 0, shortUrl: 'crip.io/r3z', createdAt: '2024-04-22' },
      ],
      insights: [
        { id: '1', type: 'success', title: 'Top Performer', description: 'Summer Reel Series is your highest-revenue campaign with $5,240 this month.' },
        { id: '2', type: 'warning', title: 'Clicks Without Revenue', description: 'Reel3 – No Revenue has 2,981 clicks but $0 in conversions. Consider optimizing your CTA.' },
        { id: '3', type: 'info', title: 'Conversion Trend', description: 'Your average conversion rate improved 18% week-over-week on short-form reels.' },
      ]
    }).pipe(delay(800));
  }

  getLinks(): Observable<Link[]> {
    return of([
      { id: '1', title: 'Summer Reel CTA', campaignName: 'Summer Reel Series', productUrl: 'https://shop.example.com/summer', shortUrl: 'crip.io/s1a', clicks: 18420, revenue: 5240.80, createdAt: '2024-04-01' },
      { id: '2', title: 'Fitness Program Link', campaignName: 'Fitness Journey Ep.3', productUrl: 'https://fitness.example.com/program', shortUrl: 'crip.io/fj3', clicks: 12100, revenue: 3190.00, createdAt: '2024-04-08' },
      { id: '3', title: 'Morning Routine Kit', campaignName: 'Morning Routine', productUrl: 'https://shop.example.com/morning-kit', shortUrl: 'crip.io/mr1', clicks: 9870, revenue: 2890.20, createdAt: '2024-04-12' },
    ]).pipe(delay(600));
  }

  getConversions(): Observable<Conversion[]> {
    return of([
      { id: '1', linkId: '1', campaignName: 'Summer Reel Series', amount: 49.99, createdAt: '2024-05-01T10:23:00Z' },
      { id: '2', linkId: '2', campaignName: 'Fitness Journey Ep.3', amount: 129.00, createdAt: '2024-05-01T09:14:00Z' },
      { id: '3', linkId: '1', campaignName: 'Summer Reel Series', amount: 49.99, createdAt: '2024-04-30T22:41:00Z' },
      { id: '4', linkId: '3', campaignName: 'Morning Routine', amount: 34.50, createdAt: '2024-04-30T18:05:00Z' },
      { id: '5', linkId: '2', campaignName: 'Fitness Journey Ep.3', amount: 129.00, createdAt: '2024-04-29T14:31:00Z' },
    ]).pipe(delay(500));
  }
}
