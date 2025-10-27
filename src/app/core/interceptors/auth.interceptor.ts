import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private router = inject(Router);
  private handling401 = false;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401) {
          // No actuar con 401 provenientes de login/logout
          const skip401 = req.url.includes('/auth/login') || req.url.includes('/auth/logout');
          if (!skip401 && !this.handling401) {
            this.handling401 = true;
            this.authService.clearSession();     // limpia estado, NO llama al backend
            // si ya estás en /login no redirijas
            if (this.router.url !== '/login') {
              this.router.navigateByUrl('/');
            }
            setTimeout(() => (this.handling401 = false));
          }
        }
        return throwError(() => err);
      })
    );
  }
}
