package com.sena.tuVooz.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.tuVooz.interfaceService.ItextoService;
import com.sena.tuVooz.interfaces.Itexto;
import com.sena.tuVooz.model.texto;

@Service
public class textoService implements ItextoService {

    @Autowired
    private Itexto data;

    @Override
    public String save (texto texto){
        data.save(texto);
        return texto.getId_texto();
    }

    @Override
    public List<texto> findAll(){
        List <texto> listaTexto=(List<texto>) data.findAll();
        return listaTexto;
    }

    @Override
    public Optional <texto> findOne(String id_texto){
        Optional<texto> texto=data.findById(id_texto);
        return texto;
    }

    //ELIMINADO FISICO: Se elimina directamente de la base de datos*****

    @Override
	public int delete(String id_texto) {
		data.deleteById(id_texto);
		return 1;
	}
    
}
