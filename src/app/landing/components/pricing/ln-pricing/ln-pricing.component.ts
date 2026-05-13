// src/app/landing/components/pricing/ln-pricing.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface PricingPlan {
  id: string;
  name: string;
  badge: string | null;
  badgeColor: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: string;
  ctaLabel: string;
  ctaStyle: 'primary' | 'dark' | 'outline';
  highlighted: boolean;
  features: PricingFeature[];
}

export interface PricingFeature {
  text: string;
  included: boolean;
  highlight: boolean;
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

export interface TrustBadge {
  icon: string;
  label: string;
}

@Component({
  selector: 'ln-pricing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ln-pricing.component.html',
  styleUrls: ['./ln-pricing.component.scss'],
})
export class LnPricingComponent {
  isYearly = false;

  metrics = [
    { value: '12k+',     label: 'Active Creators',    icon: '👥' },
    { value: '₹4.2Cr',  label: 'Revenue Tracked',     icon: '💰' },
    { value: '98%',      label: 'Satisfaction Rate',   icon: '⭐' },
    { value: '< 5 min',  label: 'Avg. Setup Time',     icon: '⚡' },
  ];

  plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free',
      badge: null,
      badgeColor: '',
      description: 'Perfect for creators just getting started with affiliate tracking.',
      monthlyPrice: 0,
      yearlyPrice: 0,
      currency: '₹',
      ctaLabel: 'Start for Free',
      ctaStyle: 'outline',
      highlighted: false,
      features: [
        { text: 'Up to 3 tracking links',        included: true,  highlight: false },
        { text: 'Basic revenue dashboard',        included: true,  highlight: false },
        { text: '1 campaign at a time',           included: true,  highlight: false },
        { text: 'CSV export (monthly)',           included: true,  highlight: false },
        { text: 'Email support',                  included: true,  highlight: false },
        { text: 'Advanced analytics',             included: false, highlight: false },
        { text: 'Razorpay integration',           included: false, highlight: false },
        { text: 'Unlimited campaigns',            included: false, highlight: false },
        { text: 'Priority support',               included: false, highlight: false },
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      badge: 'Most Popular',
      badgeColor: 'indigo',
      description: 'For growing creators who need deeper analytics and unlimited tracking.',
      monthlyPrice: 999,
      yearlyPrice: 799,
      currency: '₹',
      ctaLabel: 'Upgrade with Razorpay',
      ctaStyle: 'primary',
      highlighted: true,
      features: [
        { text: 'Unlimited tracking links',       included: true,  highlight: true  },
        { text: 'Full revenue analytics',         included: true,  highlight: true  },
        { text: 'Unlimited campaigns',            included: true,  highlight: true  },
        { text: 'CSV export (anytime)',           included: true,  highlight: false },
        { text: 'Razorpay integration',           included: true,  highlight: true  },
        { text: 'Conversion funnels',             included: true,  highlight: false },
        { text: 'Campaign comparison',            included: true,  highlight: false },
        { text: 'Priority email support',         included: true,  highlight: false },
        { text: 'White-label reports',            included: false, highlight: false },
      ],
    },
    {
      id: 'creator-plus',
      name: 'Creator Plus',
      badge: 'Best Value',
      badgeColor: 'violet',
      description: 'For professional creators and agencies managing multiple brands.',
      monthlyPrice: 2499,
      yearlyPrice: 1999,
      currency: '₹',
      ctaLabel: 'Upgrade with Razorpay',
      ctaStyle: 'dark',
      highlighted: false,
      features: [
        { text: 'Everything in Pro',              included: true,  highlight: true  },
        { text: 'White-label reports',            included: true,  highlight: true  },
        { text: 'Team access (5 seats)',          included: true,  highlight: true  },
        { text: 'API access',                     included: true,  highlight: false },
        { text: 'Custom domain links',            included: true,  highlight: false },
        { text: 'Dedicated account manager',      included: true,  highlight: true  },
        { text: 'Bulk CSV import',                included: true,  highlight: false },
        { text: 'SLA uptime guarantee',           included: true,  highlight: false },
        { text: 'Custom integrations',            included: true,  highlight: false },
      ],
    },
  ];

  comparisonRows: ComparisonRow[] = [
    { feature: 'Tracking links',         free: '3 links',      pro: 'Unlimited',   creatorPlus: 'Unlimited',      tooltip: null },
    { feature: 'Active campaigns',       free: '1',            pro: 'Unlimited',   creatorPlus: 'Unlimited',      tooltip: null },
    { feature: 'Revenue dashboard',      free: 'Basic',        pro: 'Advanced',    creatorPlus: 'Advanced',       tooltip: null },
    { feature: 'CSV export',             free: 'Monthly',      pro: 'Anytime',     creatorPlus: 'Anytime + bulk', tooltip: null },
    { feature: 'Razorpay integration',   free: false,          pro: true,          creatorPlus: true,             tooltip: 'Accept and reconcile Razorpay payouts' },
    { feature: 'Conversion funnels',     free: false,          pro: true,          creatorPlus: true,             tooltip: null },
    { feature: 'Campaign comparison',    free: false,          pro: true,          creatorPlus: true,             tooltip: null },
    { feature: 'White-label reports',    free: false,          pro: false,         creatorPlus: true,             tooltip: 'Remove CreatorEarn branding from exports' },
    { feature: 'Team seats',             free: '1',            pro: '1',           creatorPlus: '5 seats',        tooltip: null },
    { feature: 'API access',             free: false,          pro: false,         creatorPlus: true,             tooltip: null },
    { feature: 'Custom domain links',    free: false,          pro: false,         creatorPlus: true,             tooltip: null },
    { feature: 'Priority support',       free: false,          pro: true,          creatorPlus: true,             tooltip: null },
    { feature: 'Dedicated manager',      free: false,          pro: false,         creatorPlus: true,             tooltip: null },
    { feature: 'SLA uptime guarantee',   free: false,          pro: false,         creatorPlus: true,             tooltip: null },
  ];

  faqs: FaqItem[] = [
    {
      question: 'Is there a free trial for paid plans?',
      answer: 'Yes! Every paid plan comes with a 14-day free trial — no credit card required. You get full access to all Pro features during the trial. Cancel anytime before the trial ends and you won\'t be charged a rupee.',
      open: false,
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Absolutely. There are no lock-in contracts or cancellation fees. You can cancel from your account settings at any time. Your access continues until the end of your current billing period, after which you\'ll be moved to the Free plan.',
      open: false,
    },
    {
      question: 'How does payout tracking work with affiliate platforms?',
      answer: 'CreatorEarn connects to affiliate networks via our link tracking system. When someone clicks your unique short link and makes a purchase, the conversion is recorded in real-time. You can also import historical data via CSV from platforms like ShareASale, CJ Affiliate, ClickBank, and more.',
      open: false,
    },
    {
      question: 'Is Razorpay supported for payments?',
      answer: 'Yes. All paid plans are processed securely through Razorpay — India\'s most trusted payment gateway. We support UPI, credit/debit cards, net banking, and EMI options. Pro and Creator Plus users can also connect their Razorpay accounts to reconcile payout data inside the dashboard.',
      open: false,
    },
    {
      question: 'Can I export my data and reports?',
      answer: 'Free users can export reports once per month. Pro and Creator Plus users can export anytime in CSV or PDF format. Creator Plus also includes bulk export, white-label reports (no CreatorEarn branding), and scheduled report delivery to your email.',
      open: false,
    },
    {
      question: 'What happens to my data if I downgrade?',
      answer: 'Your historical data is always preserved — we never delete it. If you downgrade to Free, you\'ll lose access to advanced features but can still view data from before the downgrade. Upgrading again restores full access immediately.',
      open: false,
    },
  ];

  trustBadges: TrustBadge[] = [
    { icon: 'shield',  label: '256-bit SSL' },
    { icon: 'lock',    label: 'PCI Compliant' },
    { icon: 'refresh', label: 'Cancel Anytime' },
    { icon: 'star',    label: '4.9 / 5 Rating' },
  ];

  toggleBilling(yearly: boolean): void {
    this.isYearly = yearly;
  }

  toggleFaq(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }

  getDisplayPrice(plan: PricingPlan): number {
    return this.isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  }

  getSavings(plan: PricingPlan): number {
    if (plan.monthlyPrice === 0) return 0;
    return Math.round(((plan.monthlyPrice - plan.yearlyPrice) / plan.monthlyPrice) * 100);
  }

  getComparisonValue(val: string | boolean): string {
    if (val === true)  return 'check';
    if (val === false) return 'cross';
    return 'text';
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByPlanId(index: number, plan: PricingPlan): string {
    return plan.id;
  }

  trackByFeature(index: number, row: ComparisonRow): string {
    return row.feature;
  }
}