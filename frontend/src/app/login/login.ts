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

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.loginform.invalid) return;
    const { email, password } = this.loginform.value;
    this.userservice.login(email, password).subscribe({
      next: (res) => {
        this.loginError = false;
        this.userservice.settoken(res.token);

        const payload = JSON.parse(atob(res.token.split('.')[1]));
        this.userservice.setuser({ name: payload.name, email: payload.email, password: '' });

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log(err);
        this.loginError = true;
      },
    });
  }
}
