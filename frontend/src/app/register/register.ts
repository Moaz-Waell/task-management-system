import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser } from '../models/iuser';
import { Userservice } from '../services/userservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  constructor(
    private userservice: Userservice,
    private router: Router,
  ) {}
  user: IUser = { name: '', email: '', password: '' };
  showPassword: boolean = false;

  save(form: NgForm) {
    if (form.valid) {
      alert('Registered successfully');
      form.resetForm();
      this.router.navigate(['/login']);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
