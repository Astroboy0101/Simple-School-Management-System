import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StudentService } from '../../services/student.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-student-dashboard',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule],
    template: `
    <div class="dashboard-container">
      <h1>Student Dashboard</h1>
      <button mat-raised-button color="warn" (click)="logout()">Logout</button>

      <mat-card class="mt-20">
        <mat-card-header>
          <mat-card-title>My Marks</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="marks" class="mat-elevation-z8">
            <ng-container matColumnDef="subject">
              <th mat-header-cell *matHeaderCellDef> Subject </th>
              <td mat-cell *matCellDef="let element"> {{element.subject?.name}} </td>
            </ng-container>

            <ng-container matColumnDef="marks">
              <th mat-header-cell *matHeaderCellDef> Marks </th>
              <td mat-cell *matCellDef="let element"> {{element.marks}} </td>
            </ng-container>

            <ng-container matColumnDef="teacher">
              <th mat-header-cell *matHeaderCellDef> Teacher </th>
              <td mat-cell *matCellDef="let element"> {{element.teacher?.name}} </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
    styles: [`
    .dashboard-container { padding: 20px; }
    .mt-20 { margin-top: 20px; }
    table { width: 100%; }
  `]
})
export class StudentDashboardComponent implements OnInit {
    marks: any[] = [];
    displayedColumns: string[] = ['subject', 'marks', 'teacher'];

    constructor(private studentService: StudentService, private authService: AuthService) { }

    ngOnInit() {
        this.studentService.getMyMarks().subscribe(data => this.marks = data);
    }

    logout() {
        this.authService.logout();
    }
}
