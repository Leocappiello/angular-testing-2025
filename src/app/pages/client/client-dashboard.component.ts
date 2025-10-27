// src/app/pages/client/client-dashboard.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    date: ['', Validators.required],
    time: ['', Validators.required],
    petName: ['', Validators.required],
    service: ['Consulta General', Validators.required],
    description: ['']
  });

  times: string[] = [
    '08:00','09:00','10:00','11:00','12:00',
    '13:00','14:00','15:00','16:00','17:00','18:00','19:00'
  ];

  submit(): void {
    if (this.form.invalid) return;
    const value = this.form.value;
    // TODO: enviar el formulario a tu API o lo que corresponda
    console.log('Reserva enviada:', value);
    // opcional: this.form.reset({ service: 'Consulta General' });
  }
}
