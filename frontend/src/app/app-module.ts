import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './navbar/navbar';
import { Sidebar } from './sidebar/sidebar';
import { Login } from './login/login';
import { Register } from './register/register';
import { Dashboard } from './dashboard/dashboard';
import { Profile } from './profile/profile';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskForm } from './task-form/task-form';
import { Tasklist } from './tasklist/tasklist';

import { Userservice } from './services/userservice';
import { Taskservice } from './services/taskservice';

@NgModule({
  declarations: [App, Navbar, Sidebar, Login, Register, Dashboard, Profile],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [provideBrowserGlobalErrorListeners(), Userservice],
  declarations: [
    App,
    Navbar,
    Sidebar,
    Login,
    Register,
    Dashboard,
    Tasklist,
    TaskForm
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    Userservice,
    Taskservice
  ],
  bootstrap: [App],
})
export class AppModule {}