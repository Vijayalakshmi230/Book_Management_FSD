import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Dashboard } from './dashboard/dashboard';
import { AuthGuard } from './auth-guard';
import { AddBooks } from './dashboard/add-books/add-books';
import { UpdateBooks } from './dashboard/update-books/update-books';
import { ViewBooks } from './dashboard/view-books/view-books';
import { DashboardLayout } from './dashboard/dashboard-layout/dashboard-layout';
import { Settings } from './dashboard/settings/settings';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: 'dashboard',
    component: DashboardLayout,
    canActivate: [AuthGuard],     // protect all dashboard pages
    children: [
      { path: '', component: Dashboard }, // /dashboard
      { path: 'add-book', component: AddBooks },
      { path: 'view-books', component: ViewBooks },
      { path: 'update-book/:id', component: UpdateBooks },
      { path: 'settings', component: Settings }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
