const translations = {
    es: {
        //Barra Navegacion
        BarraTexto: "Texto",
        BarraPalabras: "Palabras comunes",
        BarraComoUsar: "¿Cómo usar TuVooz?",
        miCuenta: "Mi cuenta",
        CerrarSesion: "Cerrar sesión",
        idioma: "Idioma", 
        //como usar tu vooz
        urlComoUsar:"¿Cómo usar TuVooz?",
        tituloComoUsarTuVooz:"¿Cómo usar TuVooz?",
        prrafoComoUsarTuVooz:"TuVooz es una aplicación muy sencilla de usar, si no entiendes como funciona, a continuacion te dejamos un corto manual de como usar nuestra App",
        manualpdf:"Abrir Manual PDF",
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
        //como usar tu vooz
        urlComoUsar:"How to use TuVooz?",
        tituloComoUsarTuVooz:"How to use TuVooz?",
        prrafoComoUsarTuVooz:"TuVooz is a very simple application to use, if you don't understand how it works, below we leave you a short manual on how to use our App",
        manualpdf:"Open PDF Manual",
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
       //como usar tu vooz
       urlComoUsar:"Comment utiliser TuVooz?",
       tituloComoUsarTuVooz:"Comment utiliser TuVooz?",
       prrafoComoUsarTuVooz:"TuVooz est une application très facile à utiliser, si vous ne comprenez pas comment l'utiliser, voici un petit manuel d'utilisation de notre application.",
       manualpdf:"Ouvrir le manuel PDF", 
       flagSrc: "../tuVoozPrincipal/img/france.svg", 
       flagAlt: "Français" 
    },
    pt:{
        //Barra Navegacion
        BarraTexto: "Texto",
        BarraPalabras: "Palavras comuns",
        BarraComoUsar: "Como utilizar o TuVooz?",
        miCuenta: "A minha conta",
        CerrarSesion: "Terminar sessão",
        idioma: "Língua",
        //comoUsarTuVoz
        urlComoUsar:"Como utilizar o TuVooz?",
        tituloComoUsarTuVooz:"Comment utiliser TuVooz?",
        prrafoComoUsarTuVooz:"TuVooz é uma aplicação muito fácil de usar, se não perceber como funciona, aqui está um pequeno manual sobre como usar a nossa aplicação.",
        manualpdf:"Abrir o manual em PDF", 
        flagSrc: "../tuVoozPrincipal/img/portugal.svg", 
        flagAlt: "português" 
   }
};

function changeLanguage(lang) {
    
    document.title = translations[lang].urlComoUsar;

    // Actualiza los textos de los elementos
    //Barra de busqueda
    document.getElementById('BarraTexto').innerText = translations[lang].BarraTexto;
    document.getElementById('BarraPalabras').innerText = translations[lang].BarraPalabras;
    document.getElementById('BarraComoUsar').innerText = translations[lang].BarraComoUsar;
    document.getElementById('CerrarSesion').innerText = translations[lang].CerrarSesion;
    document.getElementById('miCuenta').innerText = translations[lang].miCuenta;
    //palabras comunes
    document.getElementById('tituloComoUsarTuVooz').innerText = translations[lang].tituloComoUsarTuVooz;
    document.getElementById('prrafoComoUsarTuVooz').innerText = translations[lang].prrafoComoUsarTuVooz;
    document.getElementById('manualpdf').innerText = translations[lang].manualpdf;
  

     // Actualizar texto bandera-boton
     const languageButtonText = document.getElementById('idioma');
     const flagIcon = document.querySelector('#language-btn .flag-icon');
 
     // Actualizamos el texto y la imagen del botón
     languageButtonText.innerText = translations[lang].idioma;
     flagIcon.src = translations[lang].flagSrc;
     flagIcon.alt = translations[lang].flagAlt;
}
