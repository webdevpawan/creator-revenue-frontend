import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DatatransferService } from 'src/app/services/datatransfer.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private datatransfer = inject(DatatransferService);

  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly year = new Date().getFullYear();

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
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
      next: (res: any) => {
        console.log("login api res--", res);
        localStorage.setItem("userDetails", JSON.stringify(res));

        const savedPlan = localStorage.getItem('selectedPlan');
        const redirect = this.route.snapshot.queryParams['redirect'];

        if (savedPlan && redirect === '/pricing') {
          localStorage.removeItem('selectedPlan');
          this.router.navigate(['/pricing']);
          return; // ✅ stop here, don't navigate to dashboard
        }

        this.router.navigate(['/workspace/dashboard']); // default
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.message ??
          (err?.status === 401 ? 'Invalid email or password.' : 'Something went wrong. Please try again.');
      }
    });
  }
}
