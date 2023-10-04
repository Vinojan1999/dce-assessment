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
    return this.http.post(`${this.baseUrl}/users`, user, {observe: 'response'});
  }

  editUser(userId: number, userData: any): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.put(url, userData, {observe: 'response'});
  }

  deleteUser(userId: number): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.delete(url, {observe: 'response'});
  }

  getUser(userId: number): Observable<any> {
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.get(url);
  }
}
