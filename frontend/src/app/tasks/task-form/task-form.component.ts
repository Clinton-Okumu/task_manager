import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../shared/services/task.service';
import { AuthService } from '../../shared/services/auth.service';
import { Task } from '../../shared/models/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEdit = false;
  taskId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['PENDING']
    });
  }

  ngOnInit() {
    this.taskId = +this.route.snapshot.params['id'];
    if (this.taskId) {
      this.isEdit = true;
      this.taskService.getTask(this.taskId).subscribe(task => {
        this.taskForm.patchValue(task);
      });
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const user = this.authService.getCurrentUser();
      if (user) {
        const task: Task = { ...this.taskForm.value, userId: user.id };
        if (this.isEdit && this.taskId) {
          this.taskService.updateTask(this.taskId, task).subscribe(() => this.router.navigate(['/tasks']));
        } else {
          this.taskService.createTask(task).subscribe(() => this.router.navigate(['/tasks']));
        }
      }
    }
  }
}