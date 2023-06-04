import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL_API = 'http://localhost:3000/users'

  users: User[];

  constructor(private http: HttpClient) { 
    this.users = [];
  }

  getUsers() {
    return this.http.get<User[]>(this.URL_API);
  }

  createUser(user: User) {
    return this.http.post(this.URL_API, user);
  }

  deleteUser(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

  getUser(_id: number) {
    return this.http.get<User>(this.URL_API + `/${_id}`);
  }

  updateUser(user: User, _id: number) {
    return this.http.put(this.URL_API + `/${_id}`, user);
  }
}
