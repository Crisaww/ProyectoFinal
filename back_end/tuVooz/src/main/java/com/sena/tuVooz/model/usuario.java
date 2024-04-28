package com.sena.tuVooz.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name="usuario")
public class usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_usuario", nullable = false, length = 36)
    private String id_usuario; 

    @Column(name = "correo_electronico", nullable = false, length = 255)
	private String correo_electronico;

    @Column(name="nombre_usuario", nullable = false, length = 30)
    private String nombre_usuario;

    @Column(name="contrasena_usuario", nullable = false, length = 30)
    private String contrasena_usuario;


    
}


