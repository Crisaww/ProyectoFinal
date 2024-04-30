package com.sena.tuVooz.model.seguridad;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//GET AND SETTERS
@Data
@Builder

//Constructor sin argumento o vacio
@NoArgsConstructor

//Constructor con argumentos
@AllArgsConstructor
public class authResponse {
    /*
     * Este archivo contiene la respuesta
     * cuando el usuario que inicie sesion se autentica.
     * 
     * Cuando inicia sesion se debe retornar el token
     */
    String status;
    String message;
    String token;
}
