import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DatatransferService } from 'src/app/services/datatransfer.service';

@Component({
  selector: 'app-login',
  standalone : true, 
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private datatransfer = inject(DatatransferService);

  private authService = inject(AuthService);
  private router = inject(Router);
 
  readonly year = new Date().getFullYear();
 
  form: FormGroup = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
 
  loading = false;
  showPassword = false;
  errorMessage = '';
 
  get f(): FormGroup['controls'] { return this.form.controls; }
 
  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl.touched);
  }
 
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
 
    this.loading = true;
    this.errorMessage = '';
    const { email, password } = this.form.value as { email: string; password: string };
 
    this.authService.login(email, password).pipe(
      finalize(() => (this.loading = false))
    ).subscribe({
      next: (res) => {
        console.log("login api res--",res )
        this.datatransfer.setData(res)
        this.router.navigate(['/workspace/dashboard'])
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.message ??
          (err?.status === 401 ? 'Invalid email or password.' : 'Something went wrong. Please try again.');
      }
    });
  }
}
