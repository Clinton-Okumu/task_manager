package com.example.backend.service;

import com.example.backend.model.Task;
import com.example.backend.model.TaskStatus;
import com.example.backend.model.User;
import com.example.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task createTask(String title, String description, User user) {
        Task task = new Task(title, description, user);
        return taskRepository.save(task);
    }

    public List<Task> getTasksForUser(User user) {
        return taskRepository.findByUserId(user.getId());
    }

    public Optional<Task> getTaskById(Long id, User user) {
        Optional<Task> taskOpt = taskRepository.findById(id);
        if (taskOpt.isPresent() && taskOpt.get().getUser().getId().equals(user.getId())) {
            return taskOpt;
        }
        return Optional.empty();
    }

    public Optional<Task> updateTask(Long id, String title, String description, TaskStatus status, User user) {
        Optional<Task> taskOpt = getTaskById(id, user);
        if (taskOpt.isPresent()) {
            Task task = taskOpt.get();
            task.setTitle(title);
            task.setDescription(description);
            task.setStatus(status);
            return Optional.of(taskRepository.save(task));
        }
        return Optional.empty();
    }

    public boolean deleteTask(Long id, User user) {
        Optional<Task> taskOpt = getTaskById(id, user);
        if (taskOpt.isPresent()) {
            taskRepository.delete(taskOpt.get());
            return true;
        }
        return false;
    }
}
