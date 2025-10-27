// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../core/services/auth.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   form = this.fb.nonNullable.group({
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', [Validators.required]],
//   });

//   error = '';
//   loading = false;

//   constructor(
//     private fb: FormBuilder,
//     private auth: AuthService,
//     private router: Router
//   ) {}

//   submit() {
//     if (this.form.invalid || this.loading) {
//       this.form.markAllAsTouched();
//       return;
//     }

//     this.loading = true;

//     // Con nonNullable, getRawValue() devuelve { email: string; password: string }
//     const creds = this.form.getRawValue();

//     this.auth.login(creds).subscribe({
//       next: () => { this.loading = false; /* redirige dentro de AuthService */ },
//       error: () => {
//         this.loading = false;
//         this.error = 'Credenciales inválidas';
//       }
//     });
//   }
// }

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
  });

  hide = true;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService) {}
submit() {
  if (this.form.invalid || this.loading) return;

  this.loading = true;
  this.error = '';

  const creds = this.form.getRawValue();

  this.auth.login(creds).subscribe({
    next: () => (this.loading = false), // redirige dentro de AuthService
    error: () => {
      this.loading = false;
      this.error = 'Credenciales inválidas';
    }
  });
}

}
