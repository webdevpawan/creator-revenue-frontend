import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { RegisterPayload } from 'src/app/models';
 
/** Confirm-password cross-field validator */
function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const pw  = group.get('password')?.value;
  const cpw = group.get('confirmPassword')?.value;
  return pw && cpw && pw !== cpw ? { passwordMismatch: true } : null;
}
@Component({
  selector: 'app-signup',
  standalone : true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);
 
  readonly year = new Date().getFullYear();
  readonly strengthBars = [0, 1, 2, 3];
 
  form: FormGroup = this.fb.group(
    {
      name:            ['', [Validators.required, Validators.minLength(2)]],
      email:           ['', [Validators.required, Validators.email]],
      password:        ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatchValidator }
  );
 
  loading = false;
  showPassword = false;
  errorMessage = '';
  successMessage = '';
 
  get f(): FormGroup['controls'] { return this.form.controls; }
 
  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl.touched);
  }
 
  get isConfirmInvalid(): boolean {
    const ctrl  = this.form.get('confirmPassword');
    const dirty = ctrl?.touched;
    return !!(dirty && (ctrl?.errors?.['required'] || this.form.errors?.['passwordMismatch']));
  }
 
  /** 0–4 strength score */
  get passwordStrength(): number {
    const pw: string = this.f['password'].value ?? '';
    let score = 0;
    if (pw.length >= 6)  score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw) || /[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  }
 
  get strengthColor(): string {
    const s = this.passwordStrength;
    if (s <= 1) return 'bg-red-400';
    if (s === 2) return 'bg-amber-400';
    if (s === 3) return 'bg-emerald-400';
    return 'bg-emerald-500';
  }
 
  get strengthTextColor(): string {
    const s = this.passwordStrength;
    if (s <= 1) return 'text-red-500';
    if (s === 2) return 'text-amber-500';
    return 'text-emerald-600';
  }
 
  get strengthLabel(): string {
    const labels = ['Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return labels[this.passwordStrength] ?? '';
  }
 
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
 
    this.loading = true;
    this.errorMessage = '';
 
    const payload: RegisterPayload = {
      name:     this.f['name'].value as string,
      email:    this.f['email'].value as string,
      password: this.f['password'].value as string,
    };
 
    this.authService.register(payload).pipe(
      finalize(() => (this.loading = false))
    ).subscribe({
      next: (res) => {
        console.log("register api res---", res)
        this.successMessage = 'Account created!';
        this.toastService.show('Account created! Please sign in.', 'success');
        setTimeout(() => this.router.navigate(['/auth/login']), 1500);
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.message ??
          (err?.status === 409
            ? 'An account with this email already exists.'
            : 'Registration failed. Please try again.');
      }
    });
  }
}