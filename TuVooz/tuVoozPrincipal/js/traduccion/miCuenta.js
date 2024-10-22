const translations = {
    es: {
        //Barra Navegacion
        BarraTexto: "Texto",
        BarraPalabras: "Palabras comunes",
        BarraComoUsar: "¿Cómo usar TuVooz?",
        miCuenta: "Mi cuenta",
        CerrarSesion: "Cerrar sesión",
        idioma: "Idioma", 
        //mi Cuenta
        urlMicuenta:"Mi cuenta",
        tituloAccesibilidad:"Accesibilidad",
        tituloMiCuenta:"Mi cuenta",
        cambioUsuario:"Cambiar usuario",
        nombreactual:"Nombre de usuario actual",
        nuevoNombre:"Nombre de usuario nuevo",
        btnActualizarPerfil:"Guardar cambios",
        cambioContrasena:"Cambiar contraseña",
        contrasenaActual:"Contraseña actual",
        nuvaContrasena:"Contraseña nueva",
        confirmacionContrasena:"Confirmación de contraseña nueva",
        btnActualizarEmail:"Guardar cambios",
        tituloEliminarCuenta:"Eliminar cuenta",
        btnEliminar:"Eliminar cuenta",
        flagSrc: "../tuVoozPrincipal/img/espanol.svg", 
        flagAlt: "Español"  
    },
    en: {
        //Barra Navegacion
        BarraTexto: "Text",
        BarraPalabras: "Common words",
        BarraComoUsar: "How to use TuVooz",
        miCuenta: "My account",
        CerrarSesion: "Sign out",
        idioma: "Language", 
        //mi Cuenta
        urlMicuenta:"My account",
        tituloAccesibilidad:"Accessibility",
        tituloMiCuenta:"My account",
        cambioUsuario:"changeUser",
        nombreactual:"Current username",
        nuevoNombre:"New username",
        btnActualizarPerfil:"Save changes",
        cambioContrasena:"Change password",
        contrasenaActual:"Current password",
        nuvaContrasena:"New password",
        confirmacionContrasena:"Confirmation of new password",
        btnActualizarEmail:"Save changes",
        tituloEliminarCuenta:"Delete account",
        btnEliminar:"Delete account",
        flagSrc: "../tuVoozPrincipal/img/english.svg", 
        flagAlt: "English" 
    },
    fr:{
        //Barra Navegacion
       BarraTexto: "Texte",
       BarraPalabras: "Mots courants",
       BarraComoUsar: "Comment utiliser TuVooz",
       miCuenta: "Mon compte",
       CerrarSesion: "Se déconnecter",
       idioma: "Langue",
       //mi Cuenta
       urlMicuenta:"Mon compte",
       tituloAccesibilidad:"L'accessibilité",
       tituloMiCuenta:"Mon compte",
       cambioUsuario:"Changer d'utilisateur",
       nombreactual:"Nom de l'utilisateur actuel",
       nuevoNombre:"Nouveau nom d'utilisateur",
       btnActualizarPerfil:"Sauvegarder les changements",
       cambioContrasena:"Modifier le mot de passe",
       contrasenaActual:"Mot de passe actuel",
       nuvaContrasena:"Nouveau mot de passe",
       confirmacionContrasena:"Confirmer le nouveau mot de passe",
       btnActualizarEmail:"Sauvegarder les modifications",
       tituloEliminarCuenta:"Supprimer le compte",
       btnEliminar:"Supprimer le compte",
       flagSrc: "../tuVoozPrincipal/img/france.svg", 
       flagAlt: "Français" 
    }
};

function changeLanguage(lang) {
    
    document.title = translations[lang].urlMicuenta;

    // Actualiza los textos de los elementos
    //Barra de busqueda
    document.getElementById('BarraTexto').innerText = translations[lang].BarraTexto;
    document.getElementById('BarraPalabras').innerText = translations[lang].BarraPalabras;
    document.getElementById('BarraComoUsar').innerText = translations[lang].BarraComoUsar;
    document.getElementById('CerrarSesion').innerText = translations[lang].CerrarSesion;
    document.getElementById('miCuenta').innerText = translations[lang].miCuenta;
    //palabras comunes
    document.getElementById('tituloAccesibilidad').innerText = translations[lang].tituloAccesibilidad;
    document.getElementById('tituloMiCuenta').innerText = translations[lang].tituloMiCuenta;
    document.getElementById('cambioUsuario').innerText = translations[lang].cambioUsuario;
    document.getElementById('nombreactual').innerText = translations[lang].nombreactual;
    document.getElementById('nuevoNombre').innerText = translations[lang].nuevoNombre;
    document.getElementById('btnActualizarPerfil').innerText = translations[lang].btnActualizarPerfil;
    document.getElementById('cambioContrasena').innerText = translations[lang].cambioContrasena;
    document.getElementById('contrasenaActual').innerText = translations[lang].contrasenaActual;
    document.getElementById('nuvaContrasena').innerText = translations[lang].nuvaContrasena;
    document.getElementById('confirmacionContrasena').innerText= translations[lang].confirmacionContrasena;
    document.getElementById('btnActualizarEmail').innerText = translations[lang].btnActualizarEmail;
    document.getElementById('tituloEliminarCuenta').innerText = translations[lang].tituloEliminarCuenta;
    document.getElementById('btnEliminar').innerText = translations[lang].btnEliminar;
  

     // Actualizar texto bandera-boton
     const languageButtonText = document.getElementById('idioma');
     const flagIcon = document.querySelector('#language-btn .flag-icon');
 
     // Actualizamos el texto y la imagen del botón
     languageButtonText.innerText = translations[lang].idioma;
     flagIcon.src = translations[lang].flagSrc;
     flagIcon.alt = translations[lang].flagAlt;
}

