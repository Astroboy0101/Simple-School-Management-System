import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatButtonModule, MatCardModule],
    template: `
    <div class="dashboard-container">
      <h1>Admin Dashboard</h1>
      
      <mat-card>
        <mat-card-header>
          <mat-card-title>Users</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="users" class="mat-elevation-z8">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef> Name </th>
              <td mat-cell *matCellDef="let user"> {{user.name}} </td>
            </ng-container>

            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef> Email </th>
              <td mat-cell *matCellDef="let user"> {{user.email}} </td>
            </ng-container>

            <ng-container matColumnDef="role">
              <th mat-header-cell *matHeaderCellDef> Role </th>
              <td mat-cell *matCellDef="let user"> {{user.role?.name || user.role}} </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>

      <div class="actions">
        <button mat-raised-button color="primary" (click)="logout()">Logout</button>
      </div>
    </div>
  `,
    styles: [`
    .dashboard-container { padding: 20px; }
    table { width: 100%; margin-top: 20px; }
    .actions { margin-top: 20px; }
  `]
})
export class AdminDashboardComponent implements OnInit {
    users: any[] = [];
    displayedColumns: string[] = ['name', 'email', 'role'];

    constructor(private http: HttpClient, private authService: AuthService) { }

    ngOnInit() {
        this.http.get<any[]>('http://localhost:5000/api/admin/users', {
            headers: { Authorization: `Bearer ${this.authService.getToken()}` }
        }).subscribe({
            next: (data) => this.users = data,
            error: (err) => console.error(err)
        });
    }

    logout() {
        this.authService.logout();
    }
}
