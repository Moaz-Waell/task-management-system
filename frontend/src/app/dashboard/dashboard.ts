import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ITask } from '../models/itask';
import { DashboardService } from '../services/dashboard';
import { Userservice } from '../services/userservice';

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

  userName = '';

  constructor(
    private dashboardService: DashboardService,
    private userservice: Userservice,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const user = this.userservice.getuser();

    if (user) {
      this.userName = user.name;
    }

    this.loadTasks();

    this.dashboardService.taskchanged$.subscribe(() => {
      this.loadTasks();
    });
  }

  loadTasks(): void {
    this.dashboardService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;

        this.totalTasks = tasks.length;

        this.pendingTasks = tasks.filter(
          task => task.status === 'pending'
        ).length;

        this.completedTasks = tasks.filter(
          task => task.status === 'completed'
        ).length;

        // إجبار Angular على تحديث الـ HTML
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Error loading tasks:', error);
      }
    });
  }
}
