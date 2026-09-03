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
  errorMessage: string = '';

  constructor(
    private taskService: Taskservice, 
    private router: Router,
    private cd: ChangeDetectorRef // 👈 حقن ChangeDetectorRef لتحديث الـ UI فوراً
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    // تفريغ المصفوفات لمنع استرجاع الكاش القديم
    this.tasks = [];
    this.filteredTasks = [];

    this.taskService.getalltasks().subscribe({
      next: (data) => {
        this.tasks = data;
        // إعادة ضبط البحث والفلتر للوضع الافتراضي
        this.searchTerm = '';
        this.selectedStatus = 'all';
        this.applyFilters();

        // 👈 إجبار أنجولار على تحديث الصفحة فور وصول البيانات
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
      // 1. بحث بدون مراعاة حالة الأحرف (Case-insensitive)
      const matchesSearch = task.title
        ? task.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      // 2. فلترة الحالة مع تحويل الطرفين لـ lowercase لضمان التطابق
      const matchesStatus =
        this.selectedStatus === 'all' ||
        (task.status && task.status.toLowerCase() === this.selectedStatus.toLowerCase());

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