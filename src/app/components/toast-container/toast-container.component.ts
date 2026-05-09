import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss']
})
export class ToastContainerComponent {

  toastService = inject(ToastService);
  toasts$ = this.toastService.toasts$;

  trackById(index: number, toast: any): string {
    return toast.id;
  }
}
