import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard.component';
import { LoginComponent } from './pages/auth/login.component';
import { RegisterComponent } from './pages/auth/register.component';
import { ClientDashboardComponent } from './pages/client/client-dashboard.component';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // cliente
  {
    path: 'client',
    component: ClientDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'USER' } // <- antes tenías 'CLIENT'
  },

  // admin
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ADMIN' }
  },

  { path: '**', redirectTo: '' }
];
