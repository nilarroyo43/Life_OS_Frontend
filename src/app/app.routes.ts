import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { CategoryDetail } from './components/category-detail/category-detail';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'workspace/:id', component: CategoryDetail },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];