import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ITask } from '../models/itask';
import { Userservice } from './userservice';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  private apiurl = 'http://127.0.0.1:8000';

  private taskchanged = new Subject<void>();

  taskchanged$ = this.taskchanged.asObservable();

  constructor(
    private http: HttpClient,
    private userservice: Userservice
  ) {}

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(
      `${this.apiurl}/tasks`,
      this.userservice.getauthheaders()
    );
  }

  notifyTaskChanged(): void {
    this.taskchanged.next();
  }
}
