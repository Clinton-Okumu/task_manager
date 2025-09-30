package com.example.backend.controller;

import com.example.backend.model.Task;
import com.example.backend.model.TaskStatus;
import com.example.backend.model.User;
import com.example.backend.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (User) auth.getPrincipal();
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Map<String, String> request) {
        String title = request.get("title");
        String description = request.get("description");
        User user = getCurrentUser();
        Task task = taskService.createTask(title, description, user);
        return ResponseEntity.ok(task);
    }

    @GetMapping
    public ResponseEntity<List<Task>> getTasks() {
        User user = getCurrentUser();
        List<Task> tasks = taskService.getTasksForUser(user);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Long id) {
        User user = getCurrentUser();
        Optional<Task> taskOpt = taskService.getTaskById(id, user);
        return taskOpt.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String title = request.get("title");
        String description = request.get("description");
        TaskStatus status = TaskStatus.valueOf(request.get("status"));
        User user = getCurrentUser();
        Optional<Task> taskOpt = taskService.updateTask(id, title, description, status, user);
        return taskOpt.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        User user = getCurrentUser();
        boolean deleted = taskService.deleteTask(id, user);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
