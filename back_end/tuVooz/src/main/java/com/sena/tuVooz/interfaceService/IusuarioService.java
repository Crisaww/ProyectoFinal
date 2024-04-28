package com.sena.tuVooz.interfaceService;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sena.tuVooz.model.usuario;

@Service
public interface IusuarioService {

    public String save (usuario usuario);
    public List <usuario>findAll();
    public Optional <usuario> findOne (String id_usuario);
    public int delete (String id_usuario);

}
