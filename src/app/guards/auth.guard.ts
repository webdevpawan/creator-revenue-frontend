import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';
export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const http = inject(HttpClient);

  return http.get('http://localhost:5000/me', {
    withCredentials: true
  }).pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
