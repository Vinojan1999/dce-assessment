import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    console.log(user);
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  editUser(userId: number, userData: any): Observable<any> {
    console.log(userData);
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.put(url, userData);
  }

  deleteUser(userId: number): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.delete(url);
  }

  getUser(userId: number): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.get(url);
  }
}
