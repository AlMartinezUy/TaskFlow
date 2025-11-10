package com.taskflow.config;

import com.taskflow.interceptor.TaskOwnerInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*
 * Configuracion web personalizada.
 *
 * Registra interceptores que se ejecutan antes de que los controladores
 * manejen las solicitudes HTTP. En este caso, se utiliza para asegurar
 * que solo el dueño de una tarea pueda acceder a ella.
 */

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    /* Interceptor que valida la propiedad de la tarea */
    private final TaskOwnerInterceptor taskOwnerInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(taskOwnerInterceptor)
                .addPathPatterns("/api/tasks/*");
    }
}


