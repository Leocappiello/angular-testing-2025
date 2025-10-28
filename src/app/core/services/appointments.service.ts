// import { HttpClient } from '@angular/common/http';
// import { Injectable, inject } from '@angular/core';

// @Injectable({ providedIn: 'root' })
// export class AppointmentsService {
//   private http = inject(HttpClient);

//   create(data: any) {
//     return this.http.post('/appointments', data, { withCredentials: true });
//   }

//   listAll() {
//     return this.http.get('/appointments', { withCredentials: true });
//   }
// }

// src/app/core/services/appointments.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateAppointment } from './models';

@Injectable({ providedIn: 'root' })
export class AppointmentsService {
  constructor(private http: HttpClient) {}

  create(body: CreateAppointment)/* : Observable<Appointment>  */{
    return;
    // return this.http.post<Appointment>(`${API_BASE}/appointments`, body);
  }

  // Útil si luego quieres listar turnos del cliente
  listByClient(clientId: string)/* : Observable<Appointment[]> */ {
    return;
    // return this.http.get<Appointment[]>(`${API_BASE}/clients/${clientId}/appointments`);
  }
}
