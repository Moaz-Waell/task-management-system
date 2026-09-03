import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ITask } from '../models/itask';
import { Taskservice } from '../services/taskservice';
import { DashboardService } from '../services/dashboard';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnInit {
  task: ITask = {
    title: '',
    description: '',
    status: 'pending',
  };

  taskid: string | null = null;
  selectedfile: File | null = null;
  returnPage: string = 'dashboard';

  isedit: boolean = false;
  issaving: boolean = false;

  message: string = '';
  errormessage: string = '';

  constructor(
    private taskservice: Taskservice,
    private dashboardService: DashboardService,
    private activatedroute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.taskid = this.activatedroute.snapshot.paramMap.get('id');

    this.returnPage =
      this.activatedroute.snapshot.queryParamMap.get('from') ||
      'dashboard';

    if (this.taskid) {
      this.isedit = true;

      this.taskservice.gettaskbyid(this.taskid).subscribe({
        next: (oldtask: ITask) => {
          this.task = oldtask;
        },
        error: (error) => {
          this.errormessage =
            error.error?.message || 'Failed to load task';
        },
      });
    }
  }

  selectfile(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.errormessage = '';

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.size > 5 * 1024 * 1024) {
        this.selectedfile = null;
        input.value = '';
        this.errormessage = 'File size must not exceed 5 MB';
        return;
      }

      this.selectedfile = file;
    }
  }

  removefile(fileinput: HTMLInputElement): void {
    this.selectedfile = null;
    fileinput.value = '';
  }

  savetask(taskform: NgForm): void {
    if (taskform.invalid) {
      taskform.control.markAllAsTouched();
      return;
    }

    this.issaving = true;
    this.message = '';
    this.errormessage = '';

    if (this.isedit && this.taskid) {
      this.taskservice.updatetask(this.taskid, this.task).subscribe({
        next: (updatedtask: ITask) => {
          if (this.selectedfile && updatedtask._id) {
            this.uploadfile(
              updatedtask._id,
              'Task updated successfully',
            );
          } else {
            this.savesuccess('Task updated successfully');
          }
        },
        error: (error) => {
          this.saveerror(
            error.error?.message || 'Failed to update task',
          );
        },
      });
    } else {
      this.taskservice.addtask(this.task).subscribe({
        next: (newtask: ITask) => {
          if (this.selectedfile && newtask._id) {
            this.uploadfile(
              newtask._id,
              'Task created successfully',
            );
          } else {
            this.savesuccess('Task created successfully');
          }
        },
        error: (error) => {
          this.saveerror(
            error.error?.message || 'Failed to create task',
          );
        },
      });
    }
  }

  uploadfile(id: string, successmessage: string): void {
    if (!this.selectedfile) {
      this.savesuccess(successmessage);
      return;
    }

    this.taskservice
      .uploadattachment(id, this.selectedfile)
      .subscribe({
        next: () => {
          this.savesuccess(successmessage);
        },
        error: (error) => {
          this.saveerror(
            error.error?.message ||
              'Task saved but attachment upload failed',
          );
        },
      });
  }

  savesuccess(message: string): void {
    this.issaving = false;
    this.message = message;

    this.dashboardService.notifyTaskChanged();

    setTimeout(() => {
      this.goback();
    }, 1000);
  }

  saveerror(message: string): void {
    this.issaving = false;
    this.errormessage = message;
  }

  goback(): void {
    if (this.returnPage === 'tasks') {
      this.router.navigate(['/tasks']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  cancel(): void {
    this.goback();
  }
}