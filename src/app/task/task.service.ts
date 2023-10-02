import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'https://reqres.in/api';

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(`${this.baseUrl}/users`);
  }

  createUser(user: any) {
    return this.http.post(`${this.baseUrl}/users`, user);
  }
}
