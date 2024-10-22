const translations = {
    es: {
        //Barra Navegacion
        urlSaludoDespedidas:"Saludos y despedidas",
        BarraTexto: "Texto",
        BarraPalabras: "Palabras comunes",
        BarraComoUsar: "¿Cómo usar TuVooz?",
        miCuenta: "Mi cuenta",
        CerrarSesion: "Cerrar sesión",
        idioma: "Idioma", 
        //saludosDespedidas
        tituloSaludos:"Saludos y despedidas",
        boton0:"Hello",
        boton0:"Hola",
        boton1:"Buenos días",
        boton2:"Buenas tardes",
        boton3:"Buenas noches",
        boton4:"Encantado de conocerte",
        boton5:"Que gusto verte",
        boton6:"Es un placer conocerte",
        boton7:"Adiós",
        boton8:"Hasta pronto",
        boton9:"Hasta Luego",
        boton10:"Hasta Mañana",
        boton11:"Nos vemos",
        boton12:"Chao",
        flagSrc: "../tuVoozPrincipal/img/espanol.svg", 
        flagAlt: "Español" 
    },
    en: {
        //Barra Navegacion
        urlSaludoDespedidas:"Greetings goodbye",
        BarraTexto: "Text",
        BarraPalabras: "Common words",
        BarraComoUsar: "How to use TuVooz",
        miCuenta: "My account",
        CerrarSesion: "Sign out",
        idioma: "Language", 
        //saludosDespedidas
        tituloSaludos:"Greetings and farewells",
        boton0:"Hello",
        boton1:"Good morning",
        boton2:"Good afternoon",
        boton3:"Good night",
        boton4:"Nice to meet you",
        boton5:"How nice to see you",
        boton6:"It's a pleasure to meet you",
        boton7:"Bye",
        boton8:"See you soon",
        boton9:"See you later",
        boton10:"See you tomorrow",
        boton11:"See you",
        boton12:"Bye",
        flagSrc: "../tuVoozPrincipal/img/english.svg", 
        flagAlt: "English" 
    }
};

function changeLanguage(lang) {
    
    document.title = translations[lang].urlSaludoDespedidas;

    // Actualiza los textos de los elementos
    //Barra de busqueda
    document.getElementById('BarraTexto').innerText = translations[lang].BarraTexto;
    document.getElementById('BarraPalabras').innerText = translations[lang].BarraPalabras;
    document.getElementById('BarraComoUsar').innerText = translations[lang].BarraComoUsar;
    document.getElementById('CerrarSesion').innerText = translations[lang].CerrarSesion;
    document.getElementById('miCuenta').innerText = translations[lang].miCuenta;
    //palabras comunes
    document.getElementById('tituloSaludos').innerText = translations[lang].tituloSaludos;
    document.getElementById('boton0').innerText = translations[lang].boton0;
    document.getElementById('boton1').innerText = translations[lang].boton1;
    document.getElementById('boton2').innerText = translations[lang].boton2;
    document.getElementById('boton3').innerText = translations[lang].boton3;
    document.getElementById('boton4').innerText = translations[lang].boton4;
    document.getElementById('boton5').innerText = translations[lang].boton5;
    document.getElementById('boton6').innerText = translations[lang].boton6;
    document.getElementById('boton7').innerText = translations[lang].boton7;
    document.getElementById('boton8').innerText = translations[lang].boton8;
    document.getElementById('boton9').innerText = translations[lang].boton9;
    document.getElementById('boton10').innerText = translations[lang].boton10;
    document.getElementById('boton11').innerText = translations[lang].boton11;
    document.getElementById('boton12').innerText = translations[lang].boton12;
  
     // Actualizar texto bandera-boton
     const languageButtonText = document.getElementById('idioma');
     const flagIcon = document.querySelector('#language-btn .flag-icon');
 
     // Actualizamos el texto y la imagen del botón
     languageButtonText.innerText = translations[lang].idioma;
     flagIcon.src = translations[lang].flagSrc;
     flagIcon.alt = translations[lang].flagAlt;
}
