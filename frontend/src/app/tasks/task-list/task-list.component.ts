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
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load tasks. Please try again.';
        this.loading = false;
      },
    });
  }

  editTask(task: Task) {
    this.router.navigate(['/tasks/edit', task.id]);
  }

  deleteTask(id: number) {
    if (!confirm('Are you sure you want to delete this task?')) return;
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
    const map: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
    };
    return map[status.toLowerCase()] ?? 'bg-gray-100 text-gray-800';
  }

  getStatusDotClasses(status: string): string {
    const map: Record<string, string> = {
      pending: 'bg-yellow-400',
      in_progress: 'bg-blue-400',
      completed: 'bg-green-400',
    };
    return map[status.toLowerCase()] ?? 'bg-gray-400';
  }
}

