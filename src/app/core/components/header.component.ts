// // src/app/core/components/header.component.ts
// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { MatButtonModule } from '@angular/material/button';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { Router, RouterModule } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatToolbarModule,
//     MatButtonModule,
//     RouterModule
//   ],
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent {
//   constructor(public auth: AuthService, private router: Router) {}

//   logout() {
//     this.auth.logout();
//     this.router.navigate(['/']);
//   }
// }

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,        // <- NECESARIO para routerLink
    MatToolbarModule,    // <- NECESARIO para <mat-toolbar>
    MatButtonModule      // <- NECESARIO para mat-button
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthRoute = false;

  constructor(public auth: AuthService, private router: Router) {
    this.updateAuthRoute(this.router.url);
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => this.updateAuthRoute(e.urlAfterRedirects));
  }

  private updateAuthRoute(url: string) {
    this.isAuthRoute = /^\/(login|register)(\/|$)/.test(url);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
