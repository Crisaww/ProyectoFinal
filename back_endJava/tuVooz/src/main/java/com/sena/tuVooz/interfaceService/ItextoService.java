package com.sena.tuVooz.interfaceService;

import java.util.List;
import java.util.Optional;

import com.sena.tuVooz.model.texto;

public interface ItextoService {
    
    public String save (texto texto);
    public List <texto>findAll();
    public Optional <texto> findOne (String id_texto);
    public int delete (String id_texto);
}
