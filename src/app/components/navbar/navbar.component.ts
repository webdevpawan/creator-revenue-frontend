import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter, map, startWith } from 'rxjs'
import { DatatransferService } from 'src/app/services/datatransfer.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() menuToggled = new EventEmitter<void>();

  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private datatransfer = inject(DatatransferService);
  private router = inject(Router);
  userName: any;
  userInitials: any;
  showLogoutModal = false;



  ngOnInit(): void {

    const userDetails = localStorage.getItem("userDetails");
    const name = userDetails ? JSON.parse(userDetails) : null;

    this.userName = name?.name ?? 'Creator';
    this.userInitials = this.userName.slice(0, 2).toUpperCase();

  }




  private pageMap: Record<string, { title: string; subtitle: string }> = {
    '/dashboard': { title: 'Dashboard', subtitle: 'Your revenue overview' },
    '/links': { title: 'Links', subtitle: 'Manage tracking links' },
    '/conversions': { title: 'Conversions', subtitle: 'Track revenue events' },
  };

  pageTitle$ = this.router.events.pipe(
    filter(e => e instanceof NavigationEnd),
    map((e) => (e as NavigationEnd).urlAfterRedirects.split('?')[0]),
    startWith(this.router.url.split('?')[0]),  // 👈 emit current URL on subscribe
    map(url => this.pageMap[url]?.title ?? 'Dashboard')
  );

  pageSubtitle$ = this.router.events.pipe(
    filter(e => e instanceof NavigationEnd),
    map((e) => (e as NavigationEnd).urlAfterRedirects.split('?')[0]),
    startWith(this.router.url.split('?')[0]),  // 👈 same fix
    map(url => this.pageMap[url]?.subtitle ?? 'Your revenue overview')
  );

  logout(): void {
    this.authService.logout();
  }




  openLogoutModal(): void {
    this.showLogoutModal = true;
  }

  closeLogoutModal(): void {
    this.showLogoutModal = false;
  }

  confirmLogout(): void {
    this.http.post(`${environment.apiUrl}/api/auth/logout`, {}, { withCredentials: true }
    ).subscribe({
      next: () => {
        this.showLogoutModal = false;
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
