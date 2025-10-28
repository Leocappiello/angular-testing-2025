// src/app/core/services/pet.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from './constants';
import { CreatePet, Pet } from './models';

@Injectable({ providedIn: 'root' })
export class PetService {
  constructor(private http: HttpClient) {}

  listByClient(clientId: string): Observable<Pet[]> {
    // Si tu backend usa querystring, cambia a: `${API_BASE}/pets?clientId=${clientId}`
    return this.http.get<Pet[]>(CONSTANTS.listPet, {withCredentials: true});
  }

  create(body: CreatePet): Observable<Pet> {
    return this.http.post<Pet>(CONSTANTS.createPet, body, {withCredentials: true});
  }

  delete(petId: string): Observable<void> {
    return this.http.delete<void>(`${CONSTANTS.deletePet}/${petId}`, {withCredentials: true});
  }
}
