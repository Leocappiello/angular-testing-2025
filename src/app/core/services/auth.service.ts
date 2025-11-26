import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { CONSTANTS } from './constants';

interface Client {
  id: string;
  name: string;
  surname: string;
  adddress: string;
  dni: string;
  postalCode: string;
  pets: []
}

export interface User {
  email: string;
  role: 'ADMIN' | 'USER';
  token?: string;   // añade esta línea si usarás token
  client: Client
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  get user() {
    return this.userSubject.value;
  }

  init() {
    this.fetchUser().subscribe({
      next: user => this.userSubject.next(user),
      error: () => this.userSubject.next(null)
    });
  }

  //  login(credentials: { email: string; password: string }) {
  //   return this.http.post(CONSTANTS.login, credentials, { withCredentials: true }).pipe(
  //     tap(() => this.fetchUser())
  //   );
  // }

  login(credentials: { email: string; password: string }) {
    return this.http.post(CONSTANTS.login, credentials, { withCredentials: true }).pipe(
      tap(() => {
        this.fetchUser().subscribe(user => {
          if (user?.role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else if (user?.role === 'USER') {
            this.router.navigate(['/client']);
          }
        });
      })
    );
  }

  clearSession() {
    this.userSubject.next(null);
  }

  register(data: any) {
    return this.http.post(CONSTANTS.register, data, { withCredentials: true });
  }

  fetchUser() {
    return this.http.get<User>(CONSTANTS.me, { withCredentials: true }).pipe(
      tap(user => this.userSubject.next(user))
    );
  }

  logout() {
    this.http.post(CONSTANTS.logout, {}, { withCredentials: true }).subscribe(() => {
      this.userSubject.next(null);
      this.router.navigate(['/']);
    });
  }

  loginWithGoogle() {
    window.location.href = CONSTANTS.loginWithGoogle;
  }
}
