import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatProgressBarModule, MatSnackBarModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    address: ['', [Validators.required]],
    dni: ['', [Validators.required]],
    postalCode: ['', [Validators.required]]
  });

  hide = true;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  submit() {
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = '';

    const v = this.form.getRawValue();
    // adapta si tu backend espera otro shape
    const payload = {
      email: v.email,
      password: v.password,
      name: v.name,
      surname: v.surname,
      address: v.address,
      dni: v.dni,
      postalCode: v.postalCode
    };

    this.auth.register(payload).subscribe({
      next: () => {
        this.loading = false;
        this.snack.open('Cuenta creada. Inicia sesión para continuar.', 'OK', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loading = false;
        this.error = 'No pudimos crear tu cuenta. Intenta nuevamente.';
      }
    });
  }
}
