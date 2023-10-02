import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'https://reqres.in/api';

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(`https://reqres.in/api/users`);
  }
}
