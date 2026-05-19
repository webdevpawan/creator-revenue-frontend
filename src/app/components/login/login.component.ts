declare const google: any;

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DatatransferService } from 'src/app/services/datatransfer.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

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

  ngOnInit(): void {

    google.accounts.id.initialize({
      client_id: '901346557734-g3cvrncso9pd621fbjqbk3cclu2uuamh.apps.googleusercontent.com',
      callback: (response: any) => this.handleGoogleLogin(response)
    });

    google.accounts.id.renderButton(
      document.getElementById('google-btn'),
      {
        theme: 'outline',
        size: 'large',
        width: Math.min(window.innerWidth - 60, 320),
        shape: 'pill'
      }
    );
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

        if (savedPlan) {
          this.router.navigate(['/pricing'], { queryParams: { autoPayment: 'true' } });
          return;
        }

        this.router.navigate(['/workspace/dashboard']);
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.message ??
          (err?.status === 401 ? 'Invalid email or password.' : 'Something went wrong. Please try again.');
      }
    });
  }

  handleGoogleLogin(response: any) {

    console.log(response);

    this.http.post(
      `${environment.apiUrl}/api/auth/google`,
      {
        token: response.credential
      }
    ).subscribe((res: any) => {
      localStorage.setItem("userDetails", JSON.stringify(res));
      console.log(res);
      this.router.navigate(['/workspace/dashboard']);
    });
  }
}