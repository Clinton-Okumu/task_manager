import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:8080/api/tasks');
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`http://localhost:8080/api/tasks/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>('http://localhost:8080/api/tasks', task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`http://localhost:8080/api/tasks/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/tasks/${id}`);
  }
}