import { inject, Service } from '@angular/core';
import { IUser } from '../models/iuser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class Userservice {
  private http = inject(HttpClient);
  private apiurl = 'http://127.0.0.1:8000';

  register(user: IUser): Observable<any> {
    return this.http.post<any>(`${this.apiurl}/auth/register`, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiurl}/auth/login`, { email, password });
  }

  setuser(user: IUser): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getuser(): IUser | null {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  settoken(token: string): void {
    localStorage.setItem('token', token);
  }

  gettoken(): string | null {
    return localStorage.getItem('token');
  }

  getauthheaders() {
    return { headers: { authorization: `${this.gettoken()}` } };
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
