package com.taskflow.exception;

/*
 * Excepcion personalizada para recursos no encontrados
 *
 * Se lanza cuando se intenta acceder a un recurso (ej: tarea o usuario)
 * que no existe en la base de datos
 */

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

