package com.sena.tuVooz.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.sena.tuVooz.interfaceService.IusuarioService;
import com.sena.tuVooz.interfaces.Iusuario;
import com.sena.tuVooz.model.usuario;

@Service
public class usuarioService implements IusuarioService{

    @Autowired
    private Iusuario data;

    @Override
    public String save (usuario usuario){
        data.save(usuario);
        return usuario.getId_usuario();
    }

    @Override
    public List<usuario> findAll(){
        List<usuario> listaUsuario=(List<usuario>) data.findAll();
        return listaUsuario;
    }

    @Override
    public Optional<usuario> findOne(String id_usuario){
        Optional<usuario> usuario=data.findById(id_usuario);
        return usuario;
    }


    //ELIMINADO FISICO: Se elimina directamente de la base de datos*****

    @Override
	public int delete(String id) {
		data.deleteById(id);
		return 1;
	}

   

}
