import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../models/iuser';
import { Userservice } from '../services/userservice';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  user: IUser | null = null;
  profileForm: FormGroup;
  isSaving = false;
  saveError = '';

  constructor(
    private userservice: Userservice,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.user = this.userservice.getuser();
    if (this.user) {
      this.profileForm.patchValue(this.user);
    }
  }

  cancel(): void {
    this.router.navigate(['/dashboard']);
  }

  save(): void {
    if (this.profileForm.invalid || this.isSaving) return;

    const token = this.userservice.gettoken();
    if (!token) return;

    const userId = JSON.parse(atob(token.split('.')[1])).id;
    this.isSaving = true;
    this.saveError = '';

    this.userservice.updateProfile(userId, this.profileForm.value).subscribe({
      next: (response) => {
        this.user = response.user;
        this.userservice.setuser({
          name: response.user.name,
          email: response.user.email,
          password: '',
        });
        this.isSaving = false;
        window.location.reload();
      },
      error: (error) => {
        this.saveError = error.error?.msg || 'Unable to save profile changes.';
        this.isSaving = false;
      },
    });
  }
}
