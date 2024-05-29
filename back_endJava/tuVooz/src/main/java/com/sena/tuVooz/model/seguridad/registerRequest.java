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
public class registerRequest {

    /*
     * Contiene la estructura de la peticion
     * de registro
     */

     String correo_electronico;
     String contrasena;
     String confirmacion_contrasena;
}
