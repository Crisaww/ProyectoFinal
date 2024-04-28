package com.sena.tuVooz.interfaces;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sena.tuVooz.model.usuario;


@Repository
public interface Iusuario extends CrudRepository<usuario,String> {
    
}
