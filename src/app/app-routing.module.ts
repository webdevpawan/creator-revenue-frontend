import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'signup',
        loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent)
      },
      { path: '', redirectTo: 'signup', pathMatch: 'full' }
    ]
  },
  {
    path: 'workspace',
    loadComponent: () => import('./components/shell/shell.component').then(m => m.ShellComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'links',
        loadComponent: () => import('./components/links/links.component').then(m => m.LinksComponent)
      },
      {
        path: 'conversions',
        loadComponent: () => import('./components/conversions/conversions.component').then(m => m.ConversionsComponent)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
