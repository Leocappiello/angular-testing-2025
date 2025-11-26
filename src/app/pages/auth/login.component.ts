import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../environment';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

declare global {
  interface Window {
    onTurnstileSuccess: (token: string) => void;
    onTurnstileError: (error: any) => void;
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    turnstileToken: [''],
  });

  siteKey = environment.CAPTCHA_SITE_KEY;

  hide = true;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService) {
    window.onTurnstileSuccess = (token: string) => this.onTurnstileSuccess(token);
    window.onTurnstileError = (error: any) => this.onTurnstileError(error);
  }

  onTurnstileError(error: any) {
    console.log('ERROR:', error)
  }

  onTurnstileSuccess(token: string) {
    this.form.patchValue({ turnstileToken: token });
  }

  submit() {
    if (this.form.invalid || this.loading) return;

    this.loading = true;
    this.error = '';

    const creds = this.form.getRawValue();

    this.auth.login(creds).subscribe({
      next: () => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = 'Credenciales inválidas';
      },
    });
  }

   loginWithGoogle() {
    this.auth.loginWithGoogle();
  }
}