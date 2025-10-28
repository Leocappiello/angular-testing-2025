// src/app/core/services/models.ts
export interface Pet {
  id: string;
  name: string;
  species: string;
  breed?: string;
  notes?: string;
  clientId: string;
}

export interface CreatePet {
  name: string;
  species: string;
  breed?: string;
  notes?: string;
  clientId: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  petId: string;
  service: string;
  description?: string;
  datetime: string; // ISO
}

export interface CreateAppointment {
  clientId: string;
  petId: string;
  service: string;
  description?: string;
  datetime: string; // ISO
}
