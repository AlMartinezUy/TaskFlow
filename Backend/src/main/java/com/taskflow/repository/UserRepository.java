package com.taskflow.repository;

import com.taskflow.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/*
 * Repositorio JPA para la entidad {User}
 *
 * Proporciona metodos CRUD basicos a través de JpaRepository
 * y consultas adicionales para buscar usuarios por nombre de
 * usuario o correo electronico
 */

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);
}

