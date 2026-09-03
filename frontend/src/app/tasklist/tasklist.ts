import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  sortOrder: string = 'newest';
  errorMessage: string = '';

  constructor(
    private taskService: Taskservice, 
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = [];
    this.filteredTasks = [];

    this.taskService.getalltasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.searchTerm = '';
        this.selectedStatus = 'all';
        this.sortOrder = 'newest';
        this.applyFilters();

        this.cd.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load tasks';
        this.cd.detectChanges();
      }
    });
  }

  applyFilters(): void {
    this.filteredTasks = this.tasks.filter(task => {
      const matchesSearch = task.title
        ? task.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const matchesStatus =
        this.selectedStatus === 'all' ||
        (task.status && task.status.toLowerCase() === this.selectedStatus.toLowerCase());

      return matchesSearch && matchesStatus;
    });

    this.sortTasks();
  }

  sortTasks(): void {
    this.filteredTasks.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();

      return this.sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onStatusChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.sortTasks();
  }

  goToEdit(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/tasks/edit', id], {
        queryParams: { from: 'tasks' }
      });
    }
  }

  onDelete(id: string | undefined): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deletetask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t._id !== id);
          this.applyFilters();
          this.cd.detectChanges();
        },
        error: () => {
          this.errorMessage = 'Failed to delete task';
          this.cd.detectChanges();
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