// src/app/core/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { AuthResponse, RegisterPayload, RegisterResponse, User } from '../models';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);


  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/api/auth/login`, { email, password }).pipe(
      catchError(err => throwError(() => err))
    );
  }

  register(payload: RegisterPayload): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.apiUrl}/api/auth/register`, payload).pipe(
      catchError(err => throwError(() => err))
    );
  }

  logout(): void {
    this.router.navigate(['/auth/login']);
  }



}