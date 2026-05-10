// src/app/landing/landing.routes.ts
import { Routes } from '@angular/router';

export const landingRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing/landing.component').then(m => m.LandingComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home/home.component').then(m => m.HomeComponent),
      },
    ],
  },
];