// src/app/core/models/index.ts

export interface User {
  id: string;
  name?: string;
  email: string;
  avatar?: string;
}

export interface AuthResponse {
  token: string;
  user: string;
  name : string
}

export interface DashboardStats {
  totalClicks: number;
  totalRevenue: number;
  conversionRate: number;
  topCampaign: string;
  clicksChange: number;
  revenueChange: number;
  conversionChange: number;
}

export interface Campaign {
  id: string;
  name: string;
  clicks: number;
  revenue: number;
  conversions: number;
  shortUrl?: string;
  createdAt: string;
}

export interface ChartDataPoint {
  date: string;
  clicks: number;
  revenue: number;
}

export interface DashboardData {
  stats: {
    totalClicks: number;
    totalRevenue: number;
    conversionRate: number;
    topCampaign: string;
    clicksChange: number;
    revenueChange: number;
    conversionChange: number;
  };
  chartData: {
    date: string;
    clicks: number;
    revenue: number;
  }[];
  campaigns: {
    id: string;
    name: string;
    clicks: number;
    revenue: number;
    conversions: number;
    shortUrl: string;
    createdAt: string;
  }[];
  insights: Insight[];
}

export interface Insight {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
}

export interface Link {
  id: string;
  title: string;
  campaignName: string;
  productUrl: string;
  shortUrl: string;
  clicks: number;
  revenue: number;
  createdAt: string;
}

export interface CreateLinkPayload {
  productUrl: string;
  campaignName: string;
  title: string;
}

export interface Conversion {
  id: string;
  linkId: string;
  campaignName: string;
  amount: number;
  createdAt: string;
}

export interface AddConversionPayload {
  linkId: string;
  amount: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
}


export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
 
export interface RegisterResponse {
  message: string;
  user?: User;
}