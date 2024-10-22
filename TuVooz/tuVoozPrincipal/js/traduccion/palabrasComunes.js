const translations = {
    es: {
        //Barra Navegacion
        BarraTexto: "Texto",
        BarraPalabras: "Palabras comunes",
        BarraComoUsar: "¿Cómo usar TuVooz?",
        miCuenta: "Mi cuenta",
        CerrarSesion: "Cerrar sesión",
        idioma: "Idioma", 
        //frases y palabras
        urlPaComunes:"Palabras comunes",
        tituloPalComunes:"Palabras comunes",
        saludosDespedidas:"Saludos/Despedidas",
        emociones:"Emociones",
        animales:"Animales",
        preguntas:"Preguntas",
        IngresoCartas0:"Ingresar",
        IngresoCartas1:"Ingresar",
        IngresoCartas2:"Ingresar",
        IngresoCartas3:"Ingresar",
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
        //frases y palabras
        urlPaComunes:"Common words",
        tituloPalComunes:"Common words",
        saludosDespedidas:"Greetings/Farewells",
        emociones:"Emotions",
        animales:"Animals",
        preguntas:"Questions",
        IngresoCartas0:"Get into",
        IngresoCartas1:"Get into",
        IngresoCartas2:"Get into",
        IngresoCartas3:"Get into",
        flagSrc: "../tuVoozPrincipal/img/english.svg", 
        flagAlt: "English" 
    },
    fr: { 
        //Barra Navegacion
        BarraTexto: "Texte",
        BarraPalabras: "Mots courants",
        BarraComoUsar: "Comment utiliser TuVooz",
        miCuenta: "Mon compte",
        CerrarSesion: "Se déconnecter",
        idioma: "Langue", 
        //frases y palabras
        urlPaComunes: "Mots courants",
        tituloPalComunes: "Mots courants",
        saludosDespedidas: "Salutations/Au revoir",
        emociones: "Émotions",
        animales: "Les animaux",
        preguntas: "Questions",
        IngresoCartas0: "Entrer",
        IngresoCartas1: "Entrer",
        IngresoCartas2: "Entrer",
        IngresoCartas3: "Entrer",
        flagSrc: "../tuVoozPrincipal/img/france.svg", 
        flagAlt: "Français" 
    }
    
};

function changeLanguage(lang) {
    
    document.title = translations[lang].urlPaComunes;

    // Actualiza los textos de los elementos
    //Barra de busqueda
    document.getElementById('BarraTexto').innerText = translations[lang].BarraTexto;
    document.getElementById('BarraPalabras').innerText = translations[lang].BarraPalabras;
    document.getElementById('BarraComoUsar').innerText = translations[lang].BarraComoUsar;
    document.getElementById('CerrarSesion').innerText = translations[lang].CerrarSesion;
    document.getElementById('miCuenta').innerText = translations[lang].miCuenta;
    //palabras comunes
    document.getElementById('tituloPalComunes').innerText = translations[lang].tituloPalComunes;
    document.getElementById('saludosDespedidas').innerText = translations[lang].saludosDespedidas;
    document.getElementById('emociones').innerText = translations[lang].emociones;
    document.getElementById('animales').innerText = translations[lang].animales;
    document.getElementById('preguntas').innerText = translations[lang].preguntas;
    document.getElementById('IngresoCartas0').innerText = translations[lang].IngresoCartas0;
    document.getElementById('IngresoCartas1').innerText = translations[lang].IngresoCartas1;
    document.getElementById('IngresoCartas2').innerText = translations[lang].IngresoCartas2;
    document.getElementById('IngresoCartas3').innerText = translations[lang].IngresoCartas3;

     // Actualizar texto bandera-boton
     const languageButtonText = document.getElementById('idioma');
     const flagIcon = document.querySelector('#language-btn .flag-icon');
 
     // Actualizamos el texto y la imagen del botón
     languageButtonText.innerText = translations[lang].idioma;
     flagIcon.src = translations[lang].flagSrc;
     flagIcon.alt = translations[lang].flagAlt;
}
