import { Component, OnInit } from '@angular/core';
import { ITask } from '../models/itask';
import { Taskservice } from '../services/taskservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasklist',
  standalone: false,
  templateUrl: './tasklist.html',
  styleUrl: './tasklist.css'
})
export class Tasklist implements OnInit {
  tasks: ITask[] = [];
  filteredTasks: ITask[] = [];
  searchTerm: string = '';
  selectedStatus: string = 'all';
  errorMessage: string = '';

  constructor(private taskService: Taskservice, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getalltasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.applyFilters();
      },
      error: () => {
        this.errorMessage = 'Failed to load tasks';
      }
    });
  }

  applyFilters(): void {
    this.filteredTasks = this.tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.selectedStatus === 'all' || task.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onStatusChange(): void {
    this.applyFilters();
  }

  goToEdit(id: string | undefined): void {
    if (id) this.router.navigate(['/tasks/edit', id]);
  }

  onDelete(id: string | undefined): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deletetask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t._id !== id);
          this.applyFilters();
        },
        error: () => {
          this.errorMessage = 'Failed to delete task';
        }
      });
    }
  }

  goToNewTask(): void {
  this.router.navigate(['/tasks/new'], {
    queryParams: { from: 'tasks' }
  });
}
}