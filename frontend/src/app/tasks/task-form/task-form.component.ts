import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../shared/services/task.service';
import { AuthService } from '../../shared/services/auth.service';
import { Task } from '../../shared/models/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEdit = false;
  taskId: number | null = null;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      status: ['PENDING', Validators.required],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.taskId = +idParam;
      this.isEdit = true;
      this.fetchTask(this.taskId);
    }
  }

  private fetchTask(id: number): void {
    this.taskService.getTask(id).subscribe({
      next: (task) => {
        if (task) {
          this.taskForm.patchValue(task);
        } else {
          this.router.navigate(['/tasks']);
        }
      },
      error: () => {
        this.errorMessage = 'Failed to load task details.';
        this.router.navigate(['/tasks']);
      },
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const user = this.authService.getCurrentUser();
    if (!user) {
      this.errorMessage = 'You must be logged in to create or edit tasks.';
      return;
    }

    this.loading = true;
    const task: Task = { ...this.taskForm.value, userId: user.id };

    const request$ =
      this.isEdit && this.taskId
        ? this.taskService.updateTask(this.taskId, task)
        : this.taskService.createTask(task);

    request$.subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: () => {
        this.errorMessage = 'Something went wrong. Please try again.';
        this.loading = false;
      },
    });
  }
}

