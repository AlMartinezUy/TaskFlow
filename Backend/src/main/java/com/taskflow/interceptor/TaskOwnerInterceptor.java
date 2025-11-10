package com.taskflow.interceptor;

import com.taskflow.service.TaskService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/*
 * Interceptor para validar la propiedad de una tarea
 *
 * Se ejecuta antes de que el controlador maneje la solicitud y
 * asegura que el usuario autenticado sea el dueño de la tarea
 * a la que intenta acceder
 */

@Component
@RequiredArgsConstructor
public class TaskOwnerInterceptor implements HandlerInterceptor {

    private final TaskService taskService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String path = request.getRequestURI();
        if (request.getMethod().matches("GET|PUT|DELETE") && path.matches("/api/tasks/\\d+")) {
            Long id = Long.valueOf(path.substring(path.lastIndexOf('/') + 1));
            String username = request.getUserPrincipal().getName();
            taskService.validateOwnership(id, username);
        }
        return true;
    }
}




