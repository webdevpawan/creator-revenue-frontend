// src/app/core/services/toast.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts$ = new BehaviorSubject<Toast[]>([]);
  toasts$ = this._toasts$.asObservable();

  show(message: string, type: Toast['type'] = 'success', duration = 3500): void {
    const id = Math.random().toString(36).slice(2);
    const toast: Toast = { id, message, type, duration };
    this._toasts$.next([...this._toasts$.value, toast]);
    setTimeout(() => this.dismiss(id), duration);
  }

  dismiss(id: string): void {
    this._toasts$.next(this._toasts$.value.filter(t => t.id !== id));
  }
}