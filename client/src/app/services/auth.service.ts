import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;

    constructor(private http: HttpClient, private router: Router) { }

    login(credentials: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
            tap(res => {
                if (res.token) {
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('role', res.role);
                    localStorage.setItem('userId', res.userId);
                }
            })
        );
    }

    register(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, userData);
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getRole(): string | null {
        return localStorage.getItem('role');
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
}
