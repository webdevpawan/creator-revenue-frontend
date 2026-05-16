import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styles: [`
    a.active {
      color: #4338ca !important;
      background-color: #eef2ff !important;
    }
    a.active:hover {
      background-color: #eef2ff !important;
    }
  `]
})


export class SidebarComponent {

  @Output() closeRequested = new EventEmitter<void>();

  linkOptions = { exact: false };

  navItems: NavItem[] = [
    {
      label: 'Dashboard',
      route: '/workspace/dashboard',
      icon: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" class="w-5 h-5">
        <rect x="3" y="3" width="6" height="6" rx="1.5"/>
        <rect x="11" y="3" width="6" height="6" rx="1.5"/>
        <rect x="3" y="11" width="6" height="6" rx="1.5"/>
        <rect x="11" y="11" width="6" height="6" rx="1.5"/>
      </svg>`
    },
    {
      label: 'Links',
      route: '/workspace/links',
      icon: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" class="w-5 h-5">
        <path d="M7.5 12.5a4 4 0 005.66 0l2.83-2.83a4 4 0 00-5.66-5.66L9.5 4.83"/>
        <path d="M12.5 7.5a4 4 0 00-5.66 0L4.01 10.33a4 4 0 005.66 5.66L10.5 15.17"/>
      </svg>`
    },
    {
      label: 'Conversions',
      route: '/workspace/conversions',
      icon: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" class="w-5 h-5">
        <path d="M12 2C10 2 8.5 3.5 8.5 5.5c0 1 .4 1.9 1 2.5"/>
        <path d="M4 14s0-4 6-4 6 4 6 4"/>
        <circle cx="10" cy="8" r="3"/>
        <path d="M15 10l2 2-2 2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M17 12h-4" stroke-linecap="round"/>
      </svg>`
    }
  ];


  trackByRoute(index: number, item: NavItem) {
    return item.route;
  }

}


