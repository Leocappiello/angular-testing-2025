// src/app/core/services/pets.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CONSTANTS } from './constants';

export interface Pet {
  id: string;
  name: string;
  species?: string;  // 'perro', 'gato', etc.
}


@Injectable({ providedIn: 'root' })
export class PetsService {
  constructor(private http: HttpClient) {}
  listMine(): Observable<Pet[]> { return this.http.get<Pet[]>(CONSTANTS.pet); }
  create(data: Partial<Pet>): Observable<Pet> { return this.http.post<Pet>(CONSTANTS.pet, data); }
}
