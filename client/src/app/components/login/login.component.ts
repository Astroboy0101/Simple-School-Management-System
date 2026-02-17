import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
// Material imports will be added here
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    error: string = '';

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value).subscribe({
                next: (res) => {
                    const role = this.authService.getRole();
                    if (role === 'Admin') this.router.navigate(['/admin']);
                    else if (role === 'Teacher') this.router.navigate(['/teacher']);
                    else if (role === 'Student') this.router.navigate(['/student']);
                },
                error: (err) => {
                    this.error = 'Invalid email or password';
                }
            });
        }
    }
}
