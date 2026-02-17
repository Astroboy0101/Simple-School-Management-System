import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-teacher-dashboard',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
    template: `
    <div class="dashboard-container">
      <h1>Teacher Dashboard</h1>
      <button mat-raised-button color="warn" (click)="logout()">Logout</button>

      <div class="content">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Assign Marks</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <form [formGroup]="markForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="fill">
                <mat-label>Student ID</mat-label>
                <input matInput formControlName="studentId">
              </mat-form-field>
              
              <mat-form-field appearance="fill">
                <mat-label>Subject ID</mat-label>
                <input matInput formControlName="subjectId">
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Grade ID</mat-label>
                <input matInput formControlName="gradeId">
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Marks</mat-label>
                <input matInput type="number" formControlName="marks">
              </mat-form-field>

              <button mat-raised-button color="primary" type="submit" [disabled]="markForm.invalid">Submit Mark</button>
            </form>
          </mat-card-content>
        </mat-card>

        <mat-card class="mt-20">
          <mat-card-header>
            <mat-card-title>My Classes</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div *ngFor="let grade of grades">
              <h3>{{grade.name}}</h3>
              <ul>
                <li *ngFor="let student of grade.students">{{student.name}}</li>
              </ul>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
    styles: [`
    .dashboard-container { padding: 20px; }
    .content { display: flex; gap: 20px; flex-wrap: wrap; margin-top: 20px; }
    mat-card { min-width: 300px; }
    mat-form-field { width: 100%; margin-bottom: 10px; }
    .mt-20 { margin-top: 20px; }
  `]
})
export class TeacherDashboardComponent implements OnInit {
    markForm: FormGroup;
    grades: any[] = [];

    constructor(
        private fb: FormBuilder,
        private teacherService: TeacherService,
        private authService: AuthService
    ) {
        this.markForm = this.fb.group({
            studentId: ['', Validators.required],
            subjectId: ['', Validators.required],
            gradeId: ['', Validators.required],
            marks: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.teacherService.getAssignedGrades().subscribe(data => this.grades = data);
    }

    onSubmit() {
        if (this.markForm.valid) {
            this.teacherService.addMark(this.markForm.value).subscribe(res => {
                alert('Mark assigned successfully');
                this.markForm.reset();
            }, err => alert('Error assigning mark'));
        }
    }

    logout() {
        this.authService.logout();
    }
}
