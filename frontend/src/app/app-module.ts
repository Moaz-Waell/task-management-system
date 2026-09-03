import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './navbar/navbar';
import { Sidebar } from './sidebar/sidebar';
import { Login } from './login/login';
import { Register } from './register/register';
import { Dashboard } from './dashboard/dashboard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Userservice } from './services/userservice';
import { Tasklist } from './tasklist/tasklist';

@NgModule({
  declarations: [App, Navbar, Sidebar, Login, Register, Dashboard, Tasklist],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [provideBrowserGlobalErrorListeners(), Userservice],
  bootstrap: [App],
})
export class AppModule {}
