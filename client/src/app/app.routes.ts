import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export class AppRoutes { // Should be exported as routes const, but in standalone it's usually `routes`
}

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['Admin'] }
    },
    {
        path: 'teacher',
        component: TeacherDashboardComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['Teacher', 'Admin'] }
    },
    {
        path: 'student',
        component: StudentDashboardComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['Student', 'Admin'] }
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
