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
  registerError: string = '';

  save(form: NgForm) {
    if (form.valid) {
      this.userservice.register(this.user).subscribe({
        next: (res) => {
          alert('Registered successfully');
          form.resetForm();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          this.registerError = err.error?.errMsg || 'Registration failed. Please try again.';
        },
      });
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
