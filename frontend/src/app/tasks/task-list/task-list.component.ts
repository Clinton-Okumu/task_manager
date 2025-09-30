import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/services/task.service';
import { AuthService } from '../../shared/services/auth.service';
import { Task } from '../../shared/models/task';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  editTask(task: Task) {
    this.router.navigate(['/tasks/edit', task.id]);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  createTask() {
    this.router.navigate(['/tasks/create']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getStatusClasses(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusDotClasses(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-400';
      case 'in_progress': return 'bg-blue-400';
      case 'completed': return 'bg-green-400';
      default: return 'bg-gray-400';
    }
  }
}