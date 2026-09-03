import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../models/itask';

@Injectable()
export class Taskservice {
  apiurl: string = 'http://127.0.0.1:8000/tasks';

  constructor(private http: HttpClient) {}

  getheaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: token || '',
    });
  }

  getalltasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.apiurl, {
      headers: this.getheaders(),
    });
  }

  gettaskbyid(id: string): Observable<ITask> {
    return this.http.get<ITask>(`${this.apiurl}/${id}`, {
      headers: this.getheaders(),
    });
  }

  addtask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.apiurl, task, {
      headers: this.getheaders(),
    });
  }

  updatetask(id: string, task: ITask): Observable<ITask> {
    return this.http.put<ITask>(`${this.apiurl}/${id}`, task, {
      headers: this.getheaders(),
    });
  }

  deletetask(id: string): Observable<any> {
    return this.http.delete(`${this.apiurl}/${id}`, {
      headers: this.getheaders(),
    });
  }

  uploadattachment(id: string, file: File): Observable<ITask> {
    const formdata = new FormData();

    formdata.append('attachment', file);

    return this.http.post<ITask>(
      `${this.apiurl}/${id}/upload`,
      formdata,
      {
        headers: this.getheaders(),
      },
    );
  }
}