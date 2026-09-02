import { Component } from '@angular/core';
import { Userservice } from '../services/userservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  styleUrl: './sidebar.css',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  constructor(
    private userservice: Userservice,
    private router: Router,
  ) {}

  get currentUserName(): string {
    const user = this.userservice.getuser();
    return user ? user.name : '';
  }

  logout() {
    this.userservice.logout();
    this.router.navigate(['/login']);
  }
}
