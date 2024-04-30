package com.sena.tuVooz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.tuVooz.interfaceService.IusuarioService;
import com.sena.tuVooz.model.usuario;



@RequestMapping("/api/v1/usuario")
@RestController
@CrossOrigin

public class usuarioController {
    
    @Autowired
    private IusuarioService usuarioService;

    @PostMapping("/")
	public ResponseEntity<Object> save(
        @ModelAttribute("usuario") usuario usuario
        ){
            if (usuario.getNombre_usuario().equals("")) {
				return new ResponseEntity<>("Los nombres son obligatorios", HttpStatus.BAD_REQUEST);
			
			}
			if (usuario.getCorreo_electronico().equals("")) {
				return new ResponseEntity<>("El correo es obligatorio", HttpStatus.BAD_REQUEST);
			}
			if (usuario.getContrasena_usuario().equals("")) {
				return new ResponseEntity<>("La contraseña es obligatoria", HttpStatus.BAD_REQUEST);
			}
			if (usuario.getConfirmacion_contrasena().equals("")) {
				return new ResponseEntity<>("La confirmación de contraseña es obligatoria", HttpStatus.BAD_REQUEST);
			}

			if (usuario.getRol().equals("")) {
				return new ResponseEntity<>("El rol es obligatorio", HttpStatus.BAD_REQUEST);
			}
			if (usuario.getEstado().equals("")) {
				return new ResponseEntity<>("El estado es obligatorio", HttpStatus.BAD_REQUEST);
			}
		usuarioService.save(usuario);
		return new ResponseEntity<>(usuario,HttpStatus.OK);
	}

    @GetMapping("/")
    public ResponseEntity<Object> findAll(){
        var listaUsuario=usuarioService.findAll();
        return new ResponseEntity<>(listaUsuario, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findOne(@PathVariable String id_usuario){
        var usuario=usuarioService.findOne(id_usuario);
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }


    //ELIMINADO FISICO:
    // @DeleteMapping("/{id}")
	// public ResponseEntity<Object> delete(@PathVariable String id_usuario){
	// 	 usuarioService.delete(id_usuario);
	// 			return new ResponseEntity<>("Registro Eliminado",HttpStatus.OK);
	// }

    //ELIMINADO LÓGICO:
    @DeleteMapping("/id_usuario")
    public ResponseEntity<Object> delete (@PathVariable String id_usuario){
        usuarioService.delete(id_usuario);
        return new ResponseEntity<>("Registro Eliminado", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable String id_usuario, @ModelAttribute("usuario")usuario usuarioUpdate){
        var usuario = usuarioService.findOne(id_usuario).get();
        if (usuario != null) {
            usuario.setCorreo_electronico(usuarioUpdate.getCorreo_electronico());
            usuario.setNombre_usuario(usuarioUpdate.getNombre_usuario());
            usuario.setContrasena_usuario(usuarioUpdate.getContrasena_usuario());
            usuarioService.save(usuario);
            return new ResponseEntity<>(usuario, HttpStatus.OK);

        }
        else{
            return new ResponseEntity<>("Error, usuario no encontrado", HttpStatus.BAD_REQUEST);
        }
    }
}

    






