import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './login/login';
import { Register } from './register/register';
import { Dashboard } from './dashboard/dashboard';
import { TaskForm } from './task-form/task-form';
import { authGuard } from './guards/auth-guard';
import { noAuthGuard } from './guards/no-auth-guard';

const routes: Routes = [
  { path: '', component: Login, canActivate: [noAuthGuard] },
  { path: 'login', component: Login, canActivate: [noAuthGuard] },
  { path: 'register', component: Register, canActivate: [noAuthGuard] },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },

  {
    path: 'tasks/new',
    component: TaskForm,
    canActivate: [authGuard],
  },

  {
    path: 'tasks/edit/:id',
    component: TaskForm,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}