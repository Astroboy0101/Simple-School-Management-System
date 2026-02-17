import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StudentService } from '../../services/student.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
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
