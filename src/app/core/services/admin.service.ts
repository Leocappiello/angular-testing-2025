import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from './constants';

export interface Note {
  id: string;
  description: string;
  petId: string;
}

export interface PetAdmin {
  id: string;
  name: string;
  specie: string;
  clientId: string;
  active: boolean;
  createdAt: string;  // o Date si lo parseas
  notes: Note[];
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private base = '/api/admin';

  constructor(private http: HttpClient) {}



  getPets(page: number, limit: number): Observable<PaginatedResponse<PetAdmin>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<PaginatedResponse<PetAdmin>>(CONSTANTS.listPet, { params, withCredentials: true },);
  }

}
