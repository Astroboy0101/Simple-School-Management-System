import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
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
