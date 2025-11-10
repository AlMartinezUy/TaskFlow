package com.taskflow.exception;

/*
 * Excepcion personalizada para denegar acceso.
 *
 * Se lanza cuando un usuario intenta acceder, modificar
 * o eliminar un recurso que no le pertenece.
 */

public class AccessDeniedException extends RuntimeException {
    public AccessDeniedException(String message) {
        super(message);
    }
}
