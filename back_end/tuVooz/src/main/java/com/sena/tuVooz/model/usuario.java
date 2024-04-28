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

    public usuario() {
		super();
	}

    public usuario(String id_usuario, String correo_electronico, String nombre_usuario, String contrasena_usuario )
	{
		super();
		
		this.id_usuario = id_usuario;
		this.correo_electronico = correo_electronico;
        this.nombre_usuario = nombre_usuario;
        this.contrasena_usuario = contrasena_usuario;
	}


    public String getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(String id_usuario) {
        this.id_usuario = id_usuario;
    }

    public String getCorreo_electronico() {
        return correo_electronico;
    }

    public void setCorreo_electronico(String correo_electronico) {
        this.correo_electronico = correo_electronico;
    }

    public String getNombre_usuario() {
        return nombre_usuario;
    }

    public void setNombre_usuario(String nombre_usuario) {
        this.nombre_usuario = nombre_usuario;
    }

    public String getContrasena_usuario() {
        return contrasena_usuario;
    }

    public void setContrasena_usuario(String contrasena_usuario) {
        this.contrasena_usuario = contrasena_usuario;
    }

    
}


