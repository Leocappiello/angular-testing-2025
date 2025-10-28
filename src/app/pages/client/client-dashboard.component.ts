// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
// import { AuthService } from '../../core/services/auth.service';

// import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatSelectModule } from '@angular/material/select';
// import { MatTableModule } from '@angular/material/table';
// import { MatTabsModule } from '@angular/material/tabs';
// import { firstValueFrom } from 'rxjs';
// import { AppointmentsService } from '../../core/services/appointments.service';
// import { PetService } from '../../core/services/pet.service';

// type Pet = {
//   id: string;
//   name: string;
//   species: string;
//   // breed?: string;
//   notes?: string;
// };

// @Component({
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatCardModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatNativeDateModule,
//     MatButtonModule,
//     MatIconModule,
//     MatSnackBarModule,
//     MatProgressBarModule,
//     MatOptionModule,
//     MatTabsModule,
//     MatProgressSpinnerModule,
//     MatTableModule,
//     MatDatepickerModule,
//     MatSelectModule
//   ],
//   standalone: true,
//   selector: 'app-client-dashboard',
//   templateUrl: './client-dashboard.component.html',
//   styleUrls: ['./client-dashboard.component.css']
// })
// export class ClientDashboardComponent implements OnInit {

//   clientId!: string;
//   pets: Pet[] = [];
//   petCols = ['name','species',/* 'breed', */'actions'];
//   loading = false;
//   loadingAppt = false;

//   // horarios de ejemplo
//   times = ['09:00','09:30','10:00','10:30','11:00','11:30','16:00','16:30','17:00'];

//   petForm = this.fb.group({
//     name: ['', [Validators.required, Validators.maxLength(50)]],
//     species: ['', Validators.required],
//     // breed: [''],
//     notes: ['']
//   });

//   apptForm = this.fb.group({
//     date: [null, Validators.required],
//     time: ['', Validators.required],
//     petId: ['', Validators.required],
//     service: ['Consulta General', Validators.required],
//     description: ['']
//   });

//   constructor(
//     private fb: FormBuilder,
//     private auth: AuthService,
//     private petsSvc: PetService,
//     private apptSvc: AppointmentsService,
//     private snack: MatSnackBar
//   ) {}

//   ngOnInit(): void {
//     const user = this.auth.user;
//     if (!user) throw new Error('Error gettint user');
//     this.pets = user.client.pets;
//   }

//   async loadPets() {
//     try {
//       this.pets = await firstValueFrom(this.petsSvc.listByClient(this.clientId));
//     } catch (e) {
//       this.snack.open('No se pudieron cargar las mascotas', 'Cerrar', { duration: 3000 });
//     }
//   }

//   async addPet() {
//     if (this.petForm.invalid) return;
//     this.loading = true;
//     try {
//       const payload = { ...this.petForm.value, clientId: this.clientId };
//       const created = await firstValueFrom(this.petsSvc.create(payload as any));
//       this.pets.unshift(created);
//       this.petForm.reset({ name: '', species: '', /* breed: '', */ notes: '' });
//       this.snack.open('Mascota agregada', 'OK', { duration: 2000 });
//     } catch {
//       this.snack.open('Error al agregar la mascota', 'Cerrar', { duration: 3000 });
//     } finally {
//       this.loading = false;
//     }
//   }

// async deletePet(pet: Pet) {
//   if (!confirm(`Eliminar a ${pet.name}?`)) return;
//   try {
//     await firstValueFrom(this.petsSvc.delete(pet.id));
//     this.pets = this.pets.filter(x => x.id !== pet.id);
//     this.snack.open('Mascota eliminada', 'OK', { duration: 2000 });
//   } catch {
//     this.snack.open('Error al eliminar', 'Cerrar', { duration: 3000 });
//   }
// }

//   private combineDateTime(d: Date, time: string) {
//     const [h, m] = time.split(':').map(Number);
//     const dt = new Date(d);
//     dt.setHours(h, m, 0, 0);
//     return dt.toISOString();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { firstValueFrom } from 'rxjs';
import { AppointmentsService } from '../../core/services/appointments.service';
import { PetService } from '../../core/services/pet.service';

type Pet = {
  id: string;
  name: string;
  species: string;
  notes?: string;
};

@Component({
  standalone: true,
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatOptionModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDatepickerModule,
    MatSelectModule
  ],
})
export class ClientDashboardComponent implements OnInit {
  clientId!: string;
  pets: Pet[] = [];
  petCols = ['name','species','actions'];
  loading = false;
  loadingAppt = false;

  // Horarios completos (ejemplo)
  allTimes: string[] = [
    '08:00','08:30','09:00','09:30','10:00','10:30',
    '11:00','11:30','12:00','12:30','13:00','13:30',
    '14:00','14:30','15:00','15:30','16:00','16:30',
    '17:00','17:30','18:00'
  ];
  availableTimes: string[] = [];
  occupiedTimes: string[] = [];

  minDate: Date = new Date();  // fecha mínima = hoy

  petForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    species: ['', Validators.required],
    notes: ['']
  });

  apptForm = this.fb.group({
    date: [null, Validators.required],
    time: ['', Validators.required],
    petId: ['', Validators.required],
    service: ['Consulta General', Validators.required],
    description: ['']
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private petsSvc: PetService,
    private apptSvc: AppointmentsService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    const user = this.auth.user;
    if (!user) {
      throw new Error('Error obteniendo usuario');
    }
    this.clientId = user.client.id;
    this.pets = user.client.pets || [];
  }

  futureDatesFilter = (d: Date | null): boolean => {
    if (!d) return false;
    const today = new Date();
    today.setHours(0,0,0,0);
    return d >= today;
  };

  onDateSelected(date: Date | null) {
    if (!date) {
      this.availableTimes = [];
      return;
    }
    this.loadingAppt = true;
    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD

    // this.apptSvc.getOccupiedTimes(this.clientId, dateStr).subscribe({
    //   next: (occupied: string[]) => {
    //     this.occupiedTimes = occupied;
    //     this.generateAvailableTimes();
    //     this.loadingAppt = false;
    //   },
    //   error: () => {
    //     this.snack.open('Error al obtener los horarios ocupados', 'Cerrar', { duration: 3000 });
    //     this.loadingAppt = false;
    //   }
    // });
  }

  private generateAvailableTimes() {
    this.availableTimes = this.allTimes.filter(t => !this.occupiedTimes.includes(t));
    // opcionalmente ordenar
    this.availableTimes.sort();
  }

  async addPet() {
    if (this.petForm.invalid) return;
    this.loading = true;
    try {
      const payload = { ...this.petForm.value, clientId: this.clientId };
      const created = await firstValueFrom(this.petsSvc.create(payload as any));
      this.pets.unshift(created);
      this.petForm.reset({ name: '', species: '', notes: '' });
      this.snack.open('Mascota agregada', 'OK', { duration: 2000 });
    } catch {
      this.snack.open('Error al agregar la mascota', 'Cerrar', { duration: 3000 });
    } finally {
      this.loading = false;
    }
  }

  async createAppointment() {
    if (this.apptForm.invalid) return;
    this.loadingAppt = true;
    try {
      const { date, time, petId, service, description } = this.apptForm.value;
      // const datetime = this.combineDateTime(date as Date, time as string);
      // await firstValueFrom(this.apptSvc.create({
      //   clientId: this.clientId,
      //   petId: petId as string,
      //   service: service as string,
      //   description: description as string,
      //   datetime
      // }));
      this.snack.open('Cita agendada', 'OK', { duration: 2500 });
      this.apptForm.reset({ date: null, time: '', petId: '', service: 'Consulta General', description: '' });
      this.availableTimes = [];
    } catch {
      this.snack.open('No se pudo agendar la cita', 'Cerrar', { duration: 3000 });
    } finally {
      this.loadingAppt = false;
    }
  }

  async deletePet(pet: Pet) {
    if (!confirm(`Eliminar a ${pet.name}?`)) return;
    try {
      await firstValueFrom(this.petsSvc.delete(pet.id));
      this.pets = this.pets.filter(x => x.id !== pet.id);
      this.snack.open('Mascota eliminada', 'OK', { duration: 2000 });
    } catch {
      this.snack.open('Error al eliminar', 'Cerrar', { duration: 3000 });
    }
  }

  private combineDateTime(d: Date, time: string): string {
    const [h, m] = time.split(':').map(Number);
    const dt = new Date(d);
    dt.setHours(h, m, 0, 0);
    return dt.toISOString();
  }
}

