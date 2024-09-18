package com.example.mockuptaller.config

class Config {
    companion object {
        val urlBasica = "http://192.168.152.3:8000/"
        val urlLogin = urlBasica + "tuvooz/api/v1/iniciarSesion"
        val urlRegistro = urlBasica + "tuvooz/api/v1/registro"
        val urlPerfil = urlBasica + "tuvooz/api/v1/perfil"
        val urlGenerarTexto = urlBasica + "synthesize/"
    }
}