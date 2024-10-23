const translations = {
    es: {
        //Barra Navegacion
        BarraTexto: "Texto",
        BarraPalabras: "Palabras comunes",
        BarraComoUsar: "¿Cómo usar TuVooz?",
        miCuenta: "Mi cuenta",
        CerrarSesion: "Cerrar sesión",
        idioma: "Idioma", 
        //emociones
        urlEmociones:"Emociones",
        tituloEmociones:"Emociones",
        boton0:"Feliz",
        boton1:"Sorprendido",
        boton2:"Confundido",
        boton3:"Enojado",
        boton4:"Estresado",
        boton5:"Tranquilo",
        boton6:"Triste",
        boton7:"Aburrido",
        boton8:"Enamorado",
        boton9:"Malo",
        boton10:"Enfermo",
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
        //emociones
        urlEmociones:"Emotions",
        tituloEmociones:"Emotions",
        boton0:"Happy",
        boton1:"Surprised",
        boton2:"Confused",
        boton3:"Angry",
        boton4:"stressed",
        boton5:"Don't worry",
        boton6:"Sad",
        boton7:"Bored",
        boton8:"In love",
        boton9:"Bad",
        boton10:"sick",
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
         //emociones
         urlEmociones:"Émotions",
         tituloEmociones:"Émotions",
         boton0:"Heureux",
         boton1:"Surpris",
         boton2:"Confus",
         boton3:"En colère",
         boton4:"Stressé",
         boton5:"Calme",
         boton6:"Triste",
         boton7:"Ennuyé",
         boton8:"Amoureux",
         boton9:"Mauvais",
         boton10:"Malade",
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
        //emociones
        urlEmociones:"Emoções",
        tituloEmociones:"Emoções",
        boton0:"Feliz",
        boton1:"Surpreso",
        boton2:"Confuso",
        boton3:"Zangado",
        boton4:"Stressado",
        boton5:"Calmo",
        boton6:"Triste",
        boton7:"Aborrecido",
        boton8:"Apaixonado",
        boton9:"Mau",
        boton10:"Doente",
        flagSrc: "../tuVoozPrincipal/img/portugal.svg", 
        flagAlt: "português" 
   }
};

function changeLanguage(lang) {
    
    document.title = translations[lang].urlEmociones;

    // Actualiza los textos de los elementos
    //Barra de busqueda
    document.getElementById('BarraTexto').innerText = translations[lang].BarraTexto;
    document.getElementById('BarraPalabras').innerText = translations[lang].BarraPalabras;
    document.getElementById('BarraComoUsar').innerText = translations[lang].BarraComoUsar;
    document.getElementById('CerrarSesion').innerText = translations[lang].CerrarSesion;
    document.getElementById('miCuenta').innerText = translations[lang].miCuenta;
    //palabras comunes
    document.getElementById('tituloEmociones').innerText = translations[lang].tituloEmociones;
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

     // Actualizar texto bandera-boton
     const languageButtonText = document.getElementById('idioma');
     const flagIcon = document.querySelector('#language-btn .flag-icon');
 
     // Actualizamos el texto y la imagen del botón
     languageButtonText.innerText = translations[lang].idioma;
     flagIcon.src = translations[lang].flagSrc;
     flagIcon.alt = translations[lang].flagAlt;
}
