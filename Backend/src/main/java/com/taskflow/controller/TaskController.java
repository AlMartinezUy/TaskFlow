package com.taskflow.controller;

import com.taskflow.dto.TaskDto;
import com.taskflow.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

/*
 * Controlador de tareas.
 *
 * Expone operaciones CRUD sobre las tareas de un usuario autenticado.
 * Cada operacion se ejecuta en el contexto del usuario dueño de las tareas,
 * validado mediante el nombre de usuario extraido del JWT.
 */

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService service;

    @GetMapping
    public ResponseEntity<List<TaskDto>> getAll(Authentication auth) {
        return ResponseEntity.ok(service.getAllForUser(auth.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDto> getOne(@PathVariable Long id, Authentication auth) {
        return ResponseEntity.ok(service.getByIdForUser(id, auth.getName()));
    }

    @PostMapping
    public ResponseEntity<TaskDto> create(@Valid @RequestBody TaskDto dto, Authentication auth) {
        return ResponseEntity.ok(service.create(dto, auth.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDto> update(@PathVariable Long id,@Valid @RequestBody TaskDto dto, Authentication auth) {
        return ResponseEntity.ok(service.update(id, dto, auth.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication auth) {
        service.delete(id, auth.getName());
        return ResponseEntity.noContent().build();
    }
}









