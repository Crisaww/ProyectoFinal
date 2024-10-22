const translations = {
    es: {
        //Barra Navegacion
        BarraTexto: "Texto",
        BarraPalabras: "Palabras comunes",
        BarraComoUsar: "¿Cómo usar TuVooz?",
        miCuenta: "Mi cuenta",
        CerrarSesion: "Cerrar sesión",
        idioma: "Idioma", 
        //preguntas
        urlPregunats:"Preguntas",
        tituloPreguntas:"Preguntas",
        boton0:"¿Cómo estás?",
        boton1:"¿A qué te dedicas?",
        boton2:"¿Todo bien?",
        boton3:"¿Qué tal tu día?",
        boton4:"¿Te gusta?",
        boton5:"¿Te gusto?",
        boton6:"¿Te disgusta?",
        boton7:"Cómo va todo?",
        boton8:"¿Estás feliz?",
        boton9:"¿Has viajado?",
        boton10:"¿Estás enojado?",
        boton11:"¿Estás enojada?",
        boton12:"¿Qué es lo que no te gusta?",
        boton13:"¿Qué pasa?",
        boton14:"¿Tienes algún pasatiempo?",
        boton15:"¿Qué música te gusta?",
        boton16:"¿A qué le tienes miedo?",
        boton17:"¿Estás triste?",
        boton18:"¿Porqué?",
        boton19:"¿Dónde estás?",
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
        //preguntas
        urlPregunats:"Questions",
        tituloPreguntas:"Questions",
        boton0:"How are you?",
        boton1:"What do you do for a living?",
        boton2:"All good?",
        boton3:"How was your day?",
        boton4:"Do you like it?",
        boton5:"You like me?",
        boton6:"Do you dislike it?",
        boton7:"How is everything going?",
        boton8:"Are you happy?",
        boton9:"Have you traveled?",
        boton10:"Are you angry?",
        boton11:"Are you angry?",
        boton12:"What do you not like?",
        boton13:"What's happening?",
        boton14:"Do you have any hobbies?",
        boton15:"What music do you like?",
        boton16:"What are you afraid of?",
        boton17:"Are you sad?",
        boton18:"Because?",
        boton19:"Where are you?",
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
       //preguntas
       urlPregunats:"Questions",
       tituloPreguntas:"Questions",
       boton0:"Comment vous sentez-vous ?",
       boton1:"Que faites-vous ?",
       boton2:"Comment vous sentez-vous ?",
       boton3:"Comment s'est passée votre journée ?",
       boton4:"Tu l'aimes bien ?",
       boton5:"¿Tu m'aimes bien ??",
       boton6:"Tu n'aimes pas?",
       boton7:"Comment ça se passe ?",
       boton8:"Êtes-vous heureux ?",
       boton9:"Avez-vous voyagé ?",
       boton10:"Êtes-vous en colère ?",
       boton11:"Êtes-vous en colère ?",
       boton12:"Qu'est-ce qui ne vous plaît pas ?",
       boton13:"Qu'est-ce qui ne va pas ?",
       boton14:"As-tu des loisirs ?",
       boton15:"Quelle musique aimes-tu ?",
       boton16:"De quoi as-tu peur ?",
       boton17:"Es-tu triste ?",
       boton18:"Pourquoi es-tu triste?",
       boton19:"Où es-tu ?",
       flagSrc: "../tuVoozPrincipal/img/france.svg", 
       flagAlt: "Français" 
    }
};

function changeLanguage(lang) {
    
    document.title = translations[lang].urlPregunats;

    // Actualiza los textos de los elementos
    //Barra de busqueda
    document.getElementById('BarraTexto').innerText = translations[lang].BarraTexto;
    document.getElementById('BarraPalabras').innerText = translations[lang].BarraPalabras;
    document.getElementById('BarraComoUsar').innerText = translations[lang].BarraComoUsar;
    document.getElementById('CerrarSesion').innerText = translations[lang].CerrarSesion;
    document.getElementById('miCuenta').innerText = translations[lang].miCuenta;
    //palabras comunes
    document.getElementById('tituloPreguntas').innerText = translations[lang].tituloPreguntas;
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
    document.getElementById('boton13').innerText = translations[lang].boton13;
    document.getElementById('boton14').innerText = translations[lang].boton14;
    document.getElementById('boton15').innerText = translations[lang].boton15;
    document.getElementById('boton16').innerText = translations[lang].boton16;
    document.getElementById('boton17').innerText = translations[lang].boton17;
    document.getElementById('boton18').innerText = translations[lang].boton18;
    document.getElementById('boton19').innerText = translations[lang].boton19;
   
     // Actualizar texto bandera-boton
     const languageButtonText = document.getElementById('idioma');
     const flagIcon = document.querySelector('#language-btn .flag-icon');
 
     // Actualizamos el texto y la imagen del botón
     languageButtonText.innerText = translations[lang].idioma;
     flagIcon.src = translations[lang].flagSrc;
     flagIcon.alt = translations[lang].flagAlt;
}
