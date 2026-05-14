// src/app/landing/components/pricing/ln-pricing.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

declare var Razorpay: any;

export interface PricingPlan {
  id: string;
  name: string;
  badge: string | null;
  badgeGradient: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  ctaLabel: string;
  ctaStyle: 'primary' | 'dark' | 'outline';
  highlighted: boolean;
  dark: boolean;
  features: { text: string; included: boolean; highlight: boolean }[];
}

export interface ComparisonRow {
  feature: string;
  free: string | boolean;
  pro: string | boolean;
  creatorPlus: string | boolean;
  tooltip: string | null;
}

export interface FaqItem {
  question: string;
  answer: string;
  open: boolean;
}

@Component({
  selector: 'ln-pricing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ln-pricing.component.html',
  // ONLY styles that Tailwind cannot express — keep this tiny
  styles: [`
    .toggle-thumb { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1); }
    .faq-body     { max-height: 0; overflow: hidden; transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1); }
    .faq-body.open { max-height: 320px; }
    .dot-grid {
      background-image: radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px);
      background-size: 28px 28px;
    }
    @keyframes pulseDot { 0%,100%{opacity:1} 50%{opacity:.4} }
    .pulse-dot { animation: pulseDot 2s ease-in-out infinite; }
    @keyframes floatOrb { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
    .orb-1 { animation: floatOrb 9s ease-in-out infinite; }
    .orb-2 { animation: floatOrb 11s ease-in-out infinite 2s; }
  `],
})
export class LnPricingComponent {
  private http = inject(HttpClient);
  private router = inject(Router);


  isYearly = false;

  metrics = [
    { value: '12k+', label: 'Active Creators', icon: '👥' },
    { value: '₹4.2Cr', label: 'Revenue Tracked', icon: '💰' },
    { value: '98%', label: 'Satisfaction', icon: '⭐' },
    { value: '< 5 min', label: 'Avg. Setup Time', icon: '⚡' },
  ];

  plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free',
      badge: null,
      badgeGradient: '',
      description: 'Perfect for creators just getting started with affiliate tracking.',
      monthlyPrice: 0,
      yearlyPrice: 0,
      ctaLabel: 'Start for Free',
      ctaStyle: 'outline',
      highlighted: false,
      dark: false,
      features: [
        { text: 'Up to 3 tracking links', included: true, highlight: false },
        { text: 'Basic revenue dashboard', included: true, highlight: false },
        { text: '1 campaign at a time', included: true, highlight: false },
        { text: 'CSV export (monthly)', included: true, highlight: false },
        { text: 'Email support', included: true, highlight: false },
        { text: 'Advanced analytics', included: false, highlight: false },
        { text: 'Razorpay integration', included: false, highlight: false },
        { text: 'Unlimited campaigns', included: false, highlight: false },
        { text: 'Priority support', included: false, highlight: false },
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      badge: 'Most Popular',
      badgeGradient: 'from-indigo-500 to-violet-500',
      description: 'For growing creators who need deeper analytics and unlimited tracking.',
      monthlyPrice: 199,
      yearlyPrice: 1999,
      ctaLabel: 'Upgrade with Razorpay',
      ctaStyle: 'primary',
      highlighted: true,
      dark: false,
      features: [
        { text: 'Unlimited tracking links', included: true, highlight: true },
        { text: 'Full revenue analytics', included: true, highlight: true },
        { text: 'Unlimited campaigns', included: true, highlight: true },
        { text: 'CSV export (anytime)', included: true, highlight: false },
        { text: 'Razorpay integration', included: true, highlight: true },
        { text: 'Conversion funnels', included: true, highlight: false },
        { text: 'Campaign comparison', included: true, highlight: false },
        { text: 'Priority email support', included: true, highlight: false },
        { text: 'White-label reports', included: false, highlight: false },
      ],
    },
    {
      id: 'creator-plus',
      name: 'Creator Plus',
      badge: 'Best Value',
      badgeGradient: 'from-violet-600 to-purple-700',
      description: 'For professional creators and agencies managing multiple brands.',
      monthlyPrice: 499,
      yearlyPrice: 4999,
      ctaLabel: 'Upgrade with Razorpay',
      ctaStyle: 'dark',
      highlighted: false,
      dark: true,
      features: [
        { text: 'Everything in Pro', included: true, highlight: true },
        { text: 'White-label reports', included: true, highlight: true },
        { text: 'Team access (5 seats)', included: true, highlight: true },
        { text: 'API access', included: true, highlight: false },
        { text: 'Custom domain links', included: true, highlight: false },
        { text: 'Dedicated account manager', included: true, highlight: true },
        { text: 'Bulk CSV import', included: true, highlight: false },
        { text: 'SLA uptime guarantee', included: true, highlight: false },
        { text: 'Custom integrations', included: true, highlight: false },
      ],
    },
  ];

  comparisonRows: ComparisonRow[] = [
    { feature: 'Tracking links', free: '3 links', pro: 'Unlimited', creatorPlus: 'Unlimited', tooltip: null },
    { feature: 'Active campaigns', free: '1', pro: 'Unlimited', creatorPlus: 'Unlimited', tooltip: null },
    { feature: 'Revenue dashboard', free: 'Basic', pro: 'Advanced', creatorPlus: 'Advanced', tooltip: null },
    { feature: 'CSV export', free: 'Monthly', pro: 'Anytime', creatorPlus: 'Anytime + bulk', tooltip: null },
    { feature: 'Razorpay integration', free: false, pro: true, creatorPlus: true, tooltip: 'Accept and reconcile Razorpay payouts' },
    { feature: 'Conversion funnels', free: false, pro: true, creatorPlus: true, tooltip: null },
    { feature: 'White-label reports', free: false, pro: false, creatorPlus: true, tooltip: 'Remove CreatorEarn branding' },
    { feature: 'Team seats', free: '1', pro: '1', creatorPlus: '5 seats', tooltip: null },
    { feature: 'API access', free: false, pro: false, creatorPlus: true, tooltip: null },
    { feature: 'Priority support', free: false, pro: true, creatorPlus: true, tooltip: null },
    { feature: 'Dedicated manager', free: false, pro: false, creatorPlus: true, tooltip: null },
    { feature: 'SLA uptime guarantee', free: false, pro: false, creatorPlus: true, tooltip: null },
  ];

  faqs: FaqItem[] = [
    { question: 'Is there a free trial for paid plans?', answer: 'Yes! Every paid plan comes with a 14-day free trial — no credit card required. You get full access to all Pro features during the trial. Cancel anytime before it ends and you won\'t be charged.', open: false },
    { question: 'Can I cancel my subscription anytime?', answer: 'Absolutely. No lock-in contracts or cancellation fees. Cancel from your account settings at any time. Your access continues until the end of your billing period, then you move to the Free plan.', open: false },
    { question: 'How does payout tracking work?', answer: 'CreatorEarn tracks clicks via unique short links. When someone clicks and purchases, the conversion is recorded in real-time. You can also import historical data via CSV from ShareASale, CJ Affiliate, ClickBank, and more.', open: false },
    { question: 'Is Razorpay supported for payments?', answer: 'Yes. All paid plans are processed through Razorpay — India\'s most trusted gateway. We support UPI, credit/debit cards, net banking, and EMI. Pro and Creator Plus users can also connect Razorpay accounts to reconcile payout data inside the dashboard.', open: false },
    { question: 'Can I export my data and reports?', answer: 'Free users can export once per month. Pro and Creator Plus users can export anytime in CSV or PDF. Creator Plus also includes bulk export, white-label reports, and scheduled email delivery.', open: false },
    { question: 'What happens to my data if I downgrade?', answer: 'Your historical data is always preserved — we never delete it. Downgrading to Free removes access to advanced features, but your data remains. Upgrading again restores full access immediately.', open: false },
  ];

  trustBadges = [
    { type: 'shield', label: '256-bit SSL' },
    { type: 'lock', label: 'PCI Compliant' },
    { type: 'clock', label: 'Cancel Anytime' },
    { type: 'star', label: '4.9 / 5 Rating' },
  ];

  toggleBilling(yearly: boolean): void { this.isYearly = yearly; }

  toggleFaq(i: number): void { this.faqs[i].open = !this.faqs[i].open; }

  getDisplayPrice(plan: PricingPlan): number {
    return this.isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  }

  getSavings(plan: PricingPlan): number {
    if (!plan.monthlyPrice) return 0;
    return Math.round(((plan.monthlyPrice - plan.yearlyPrice) / plan.monthlyPrice) * 100);
  }

  compVal(v: string | boolean): 'check' | 'cross' | 'text' {
    if (v === true) return 'check';
    if (v === false) return 'cross';
    return 'text';
  }

  trackByIndex(i: number): number { return i; }
  trackByPlanId(_: number, p: PricingPlan): string { return p.id; }
  trackByFeature(_: number, r: ComparisonRow): string { return r.feature; }

  payNow(plan: PricingPlan): void {
    if (plan.monthlyPrice === 0) {
      return;
    }

    const user = localStorage.getItem('userDetails');

    if (!user) {
      localStorage.setItem('selectedPlan', JSON.stringify(plan));
      this.router.navigate(['/login'], { queryParams: { redirect: '/pricing' } });
      return;
    }

    this.http.post<any>(
      `${environment.apiUrl}/api/payment/create-order`,
      {
        amount: this.isYearly ? plan.yearlyPrice : plan.monthlyPrice,
        plan: plan.name
      }
    ).subscribe({
      next: (res) => {
        const options = {
          key: res.key,
          amount: res.order.amount,
          currency: 'INR',
          name: 'Creator Revenue',
          description: `${plan.name} Plan`,
          order_id: res.order.id,

          handler: (response: any) => {
            this.http.post(
              `${environment.apiUrl}/api/payment/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan: plan.id
              }
            ).subscribe({
              next: (verifyRes) => {
                console.log('Payment verified', verifyRes);
                alert('Payment Successful & Verified!');
              },
              error: (err) => {
                console.error('Payment verification failed', err);
                alert('Payment verification failed. Please contact support.');
              }
            });
          },

          prefill: {
            name: 'Creator',
            email: 'creator@example.com'
          },
          theme: {
            color: '#4f46e5'
          }
        };

        const razorpay = new Razorpay(options);
        razorpay.open();
      },
      error: (err) => {
        console.error('Order creation failed', err);
      }
    });
  }
}