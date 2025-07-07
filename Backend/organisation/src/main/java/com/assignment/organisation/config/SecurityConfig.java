package com.assignment.organisation.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig {

	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Apply to all paths
                        .allowedOrigins("http://localhost:5173") // Specific allowed origins
                        .allowedMethods("GET", "POST", "PATCH", "OPTIONS") // Allowed HTTP methods
                        .allowedHeaders("*") // Allowed request headers
                        .allowCredentials(true) // Allow sending credentials (cookies, HTTP authentication)
                        .maxAge(3600); // Max age of pre-flight response in seconds
            }
        };
    }
}
