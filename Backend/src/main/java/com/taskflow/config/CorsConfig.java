package com.taskflow.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/*
 * Configuracion de CORS (Cross-Origin Resource Sharing)
 * Define que origenes, metodos y cabeceras estan permitidos
 * para que el frontend pueda comunicarse con el backend sin
 * restricciones de seguridad del navegador.
 */

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        /* Origenes permitidos (URLs desde donde se puede acceder al backend) */
        cfg.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"));
        /* Metodos HTTP permitidos */
        cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        /* Cabeceras que el cliente puede enviar */
        cfg.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));
        /* Permitir el envio de credenciales */
        cfg.setAllowCredentials(true);

        /* Aplicar la configuracion a todas las rutas del backend */
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cfg);
        return source;
    }
}

