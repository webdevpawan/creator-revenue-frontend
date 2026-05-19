import { Component, ChangeDetectorRef, Inject, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NavbarComponent, CommonModule],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  private cdr = inject(ChangeDetectorRef);
  sidebarOpen = false;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    this.cdr.detectChanges();
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
    this.cdr.detectChanges();

  }
}
