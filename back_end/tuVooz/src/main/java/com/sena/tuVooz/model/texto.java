package com.sena.tuVooz.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity (name="texto")
public class texto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_texto", nullable = false, length = 36)
    private String id_texto;

    @Column(name = "areaTexto", nullable = true, length = 400)
    private String areaTexto;

    
    public texto(){
        super();
    }
    
    public texto(String id_texto, String areaTexto){
        super();
        this.id_texto = id_texto;
        this.areaTexto = areaTexto;
    }
    
    public String getId_texto() {
        return id_texto;
    }

    public void setId_texto(String id_texto) {
        this.id_texto = id_texto;
    }

    public String getAreaTexto() {
        return areaTexto;
    }

    public void setAreaTexto(String areaTexto) {
        this.areaTexto = areaTexto;
    }
    

}
