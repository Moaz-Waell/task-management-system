import { Component, OnInit } from '@angular/core';
import { ITask } from '../models/itask';
import { DashboardService } from '../services/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  tasks: ITask[] = [];

  totalTasks = 0;
  pendingTasks = 0;
  completedTasks = 0;

  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.dashboardService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;

        this.totalTasks = this.tasks.length;

        this.pendingTasks = this.tasks.filter(
          task => task.status === 'pending'
        ).length;

        this.completedTasks = this.tasks.filter(
          task => task.status === 'completed'
        ).length;
      },

      error: (error) => {
        console.error('Error loading tasks:', error);
      }
    });
  }
}
