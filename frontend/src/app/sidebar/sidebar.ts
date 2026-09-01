import { Component } from '@angular/core';
import { Userservice } from '../services/userservice';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  styleUrl: './sidebar.css',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  constructor(private userservice: Userservice) {}

  get currentUserName(): string {
    const user = this.userservice.getuser();
    return user ? user.name : '';
  }
}
