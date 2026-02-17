import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TeacherService {
    private apiUrl = `${environment.apiUrl}/teacher`;

    constructor(private http: HttpClient) { }

    getAssignedGrades(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/grades`);
    }

    getMarksByGrade(gradeId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/marks/${gradeId}`);
    }

    addMark(markData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/marks`, markData);
    }
}
