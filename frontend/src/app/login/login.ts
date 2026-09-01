import { Component } from '@angular/core';
import { Userservice } from '../services/userservice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  loginform: FormGroup;
  loginError: boolean = false;
  showPassword: boolean = false;

  constructor(
    private userservice: Userservice,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.loginform.invalid) return;
    const { email, password } = this.loginform.value;
    const loginuser = this.userservice.login(email, password);
    if (loginuser) {
      this.loginError = false;
      this.userservice.setuser(loginuser);
      this.router.navigate(['/dashboard']);
    } else {
      this.loginError = true;
    }
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
