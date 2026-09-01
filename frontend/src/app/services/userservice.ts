import { Service } from '@angular/core';
import { IUser } from '../models/iuser';


@Service()
export class Userservice {
  myusers: IUser[] = [{ name: 'Mostafa', email: 'Mostafa@gmail.com', password: '12345678' }];

  login(email: string, password: string): IUser | undefined {
    return this.myusers.find((u) => u.email === email && u.password === password);
  }

  setuser(user: IUser) {
    return localStorage.setItem('user', JSON.stringify(user));
  }

  getuser(): IUser | null {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }
}
