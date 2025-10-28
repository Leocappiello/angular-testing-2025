import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AdminService } from '../../core/services/admin.service';

interface PetAdmin {
  id: string;
  name: string;
  specie: string;
  clientId: string;
  active: boolean;
  createdAt: string;
  notes: any[];
}

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Component({
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule],
  standalone: true,
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  displayedColumns: string[] = ['id','name','specie'];
  dataSource = new MatTableDataSource<PetAdmin>([]);
  meta: Meta = { total: 0, page: 1, limit: 10, totalPages: 0 };

  pageSize = 10;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loading = false;

  constructor(
    private adminSvc: AdminService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPage();
  }

  pageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPage();
  }

  private loadPage() {
    this.loading = true;
    const page = this.pageIndex + 1;
    this.adminSvc.getPets(page, this.pageSize).subscribe({
      next: (resp) => {
        this.dataSource.data = resp.data;
        this.meta = resp.meta;
        this.loading = false;
      },
      error: () => {
        this.snack.open('Error al cargar mascotas', 'Cerrar',{duration:3000});
        this.loading = false;
      }
    });
  }

onToggleActive(el: PetAdmin) {
  const newState = !el.active;
  // this.adminSvc.updatePetActive(el.id, newState).subscribe({
  //   next: () => {
  //     el.active = newState;
  //     this.snack.open('Estado actualizado', 'OK', { duration: 2000 });
  //   },
  //   error: () => {
  //     this.snack.open('Error al actualizar', 'Cerrar', { duration: 3000 });
  //   }
  // });
  }
}
