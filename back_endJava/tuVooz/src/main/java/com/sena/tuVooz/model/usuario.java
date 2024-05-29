package com.sena.tuVooz.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Entity(name="usuario")
public class usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_usuario", nullable = false, length = 36)
    private String id_usuario; 

    @Column(name="nombre_usuario", nullable = false, length = 30)
    private String nombre_usuario;

    @Column(name = "correo_electronico", nullable = false, length = 255)
	private String correo_electronico;


    @Column(name="contrasena_usuario", nullable = false, length = 30)
    private String contrasena_usuario;

    @Column(name="confirmacion_contrasena", nullable = false, length = 30)
    private String confirmacion_contrasena;

    @Column(name = "rol", nullable = true, length = 10)
	private rol rol;

    @Column(name = "estado", nullable = false, length = 10)
	private String estado;

    // public usuario() {
	// 	super();
	// }

    // public usuario(String id_usuario, String nombre_usuario, String correo_electronico,  String contrasena_usuario, String confirmacion_contrasena, String rol, String estado )
	// {
	// 	super();
		
	// 	this.id_usuario = id_usuario;
    //     this.nombre_usuario = nombre_usuario;
	// 	this.correo_electronico = correo_electronico;
    //     this.contrasena_usuario = contrasena_usuario;
    //     this.confirmacion_contrasena = confirmacion_contrasena;
    //     this.rol = rol;
    //     this.estado = estado;
	// }


    // public String getId_usuario() {
    //     return id_usuario;
    // }

    // public void setId_usuario(String id_usuario) {
    //     this.id_usuario = id_usuario;
    // }

    // public String getCorreo_electronico() {
    //     return correo_electronico;
    // }

    // public void setCorreo_electronico(String correo_electronico) {
    //     this.correo_electronico = correo_electronico;
    // }

    // public String getNombre_usuario() {
    //     return nombre_usuario;
    // }

    // public void setNombre_usuario(String nombre_usuario) {
    //     this.nombre_usuario = nombre_usuario;
    // }

    // public String getContrasena_usuario() {
    //     return contrasena_usuario;
    // }

    // public void setContrasena_usuario(String contrasena_usuario) {
    //     this.contrasena_usuario = contrasena_usuario;
    // }

    // public String getConfirmacion_contrasena(){
    //     return confirmacion_contrasena;
    // }
    
    // public void setConfirmacion_contrasena(String confirmacion_contrasena) {
    //     this.confirmacion_contrasena = confirmacion_contrasena;
    // }

    // public String getRol(){
    //     return rol;
    // }

    // public void setRol(String rol) {
    //     this.rol = rol;
    // }


    
}


