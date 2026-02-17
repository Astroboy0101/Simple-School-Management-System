import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private apiUrl = `${environment.apiUrl}/admin`;

    constructor(private http: HttpClient) { }

    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/users`);
    }

    createSubject(subject: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/subjects`, subject);
    }

    createGrade(grade: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/grades`, grade);
    }

    getGrades(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/grades`);
    }

    assignTeacherToGrade(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/grades/assign-teacher`, data);
    }

    assignStudentToGrade(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/grades/assign-student`, data);
    }
}
