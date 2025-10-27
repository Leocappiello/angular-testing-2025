import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

// export const AuthGuard: CanActivateFn = () => {
//   const auth = inject(AuthService);
//   const router = inject(Router);
//   return auth.fetchUser().pipe(
//     map(user => !!user || !!auth.user),
//     catchError(() => {
//       router.navigate(['/login']);
//       return of(false);
//     })
//   );
// };

// export const AuthGuard: CanActivateFn = () => {
//   const auth = inject(AuthService);
//   const router = inject(Router);

//   return auth.fetchUser().pipe(
//     map(user => {
//       if (user) return true;
//       router.navigate(['/']);
//       return false;
//     }),
//     catchError(() => {
//       router.navigate(['/']);
//       return of(false);
//     })
//   );
// };

import { take } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Si ya tenemos usuario cargado, no volvemos a golpear /auth/me
  if (auth.user) return of(true);

  return auth.fetchUser().pipe(
    take(1),
    map(user => {
      if (user) return true;
      router.navigateByUrl('/');
      return false;
    }),
    catchError(() => {
      router.navigateByUrl('/');
      return of(false);
    })
  );
};
