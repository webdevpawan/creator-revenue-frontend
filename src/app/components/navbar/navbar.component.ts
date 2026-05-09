import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter, map, startWith } from 'rxjs'
import { DatatransferService } from 'src/app/services/datatransfer.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private authService = inject(AuthService);
  private datatransfer = inject(DatatransferService);
  private router = inject(Router);
  userName: any;
  userInitials: any;



  ngOnInit(): void {

    this.datatransfer.getLoginData$.subscribe((data: any) => {
      this.userName = data?.name ?? 'Creator';
      this.userInitials = this.userName.slice(0, 2).toUpperCase();

    })

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
}
