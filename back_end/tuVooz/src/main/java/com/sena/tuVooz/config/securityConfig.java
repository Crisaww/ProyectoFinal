package com.sena.tuVooz.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;

//Se indica que este es un archivo de configuración
@Configuration
//Configurar la seguridad del proyecto
@EnableWebSecurity
//Se incluye el constructor con Lombok
@RequiredArgsConstructor
public class securityConfig {
    //FILTER CHAIN: Es el encargado de filtrar las peticiones e indicar el acceso a los END POINTS
    @Bean
    public SecurityFilterChain SecurityFilterChain(
        HttpSecurity http
    ) throws Exception
    {
        return http 
        .csrf(csrf->csrf.disable())
        .authorizeHttpRequests(
            authRequest-> authRequest
            /*
             Todas las peticiones que comiencen por /api/v1/public/
             van a ser permitidas sin restricción de usuario
             */
            .requestMatchers("/api/v1/public**")
            .permitAll()
            .anyRequest().permitAll()
        ).build();
    }
}

