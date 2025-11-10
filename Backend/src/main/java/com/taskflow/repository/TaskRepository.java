package com.taskflow.repository;

import com.taskflow.model.Task;
import com.taskflow.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

/*
 * Repositorio JPA para la entidad {@link Task}
 *
 * Proporciona metodos CRUD basicos a traves de JpaRepository,
 * ademas de consultas personalizadas para obtener tareas
 * asociadas a un usuario.
 */

public interface TaskRepository extends JpaRepository<Task, Long> {
    // Todas las tareas de un usuario
    List<Task> findByUser(User user);

    // Buscar una tarea especifica por id y usuario
    Optional<Task> findByIdAndUser(Long id, User user);
}
