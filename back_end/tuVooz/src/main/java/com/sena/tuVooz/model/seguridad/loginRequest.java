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
public class loginRequest {
    /*
     * Contiene la estructura
     * de la petiion de inicio de sesion
     */

     String correo_electronico;
     String confirmacion_contrasena;
}
