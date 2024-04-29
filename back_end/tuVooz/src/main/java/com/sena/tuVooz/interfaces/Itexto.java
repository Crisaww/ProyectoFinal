package com.sena.tuVooz.interfaces;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sena.tuVooz.model.texto;

@Repository
public interface Itexto extends CrudRepository<texto, String>{
    
}
