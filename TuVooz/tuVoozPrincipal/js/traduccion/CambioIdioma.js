const translations = {
    es: {
        //Barra Navegacion
        titulourl: "tuVooz",
        BarraTexto: "Texto",
        BarraPalabras: "Palabras comunes",
        BarraComoUsar: "¿Cómo usar TuVooz?",
        miCuenta: "Mi cuenta",
        CerrarSesion: "Cerrar sesión",
        idioma: "Idioma", 
        // pagina Principla
        textoVoz: "Texto a voz",
        sonido: "Reproducir sonido",
        vozFemenina: "Voz femenina",
        vozMasculina: "Voz masculina",
        flagSrc: "../tuVoozPrincipal/img/espanol.svg", 
        flagAlt: "Español" 
    },
    en: {
        //Barra Navegacion
        titulourl: "tuVooz",
        BarraTexto: "Text",
        BarraPalabras: "Common words",
        BarraComoUsar: "How to use TuVooz",
        miCuenta: "My account",
        CerrarSesion: "Sign out",
        idioma: "Language", 
        // pagina Principla
        textoVoz: "text to speech",
        sonido: "Play sound",
        vozFemenina: "Female voice",
        vozMasculina: "Male voice",
        flagSrc: "../tuVoozPrincipal/img/english.svg", 
        flagAlt: "English" 
    },
    fr: {
        titulourl: "tuVooz",
        BarraTexto: "Texte",
        BarraPalabras: "Mots courants",
        BarraComoUsar: "Comment utiliser TuVooz",
        miCuenta: "Mon compte",
        CerrarSesion: "Déconnexion",
        idioma: "Langue", 
        textoVoz: "Texte à voix",
        sonido: "Jouer le son",
        vozFemenina: "Voix féminine",
        vozMasculina: "Voix masculine",
        flagSrc: "../tuVoozPrincipal/img/france.svg", 
        flagAlt: "Français" 
    }
};

function changeLanguage(lang) {
    
    document.title = translations[lang].titulourl;

    // Actualiza los textos de los elementos
    //Barra de busqueda
    document.getElementById('BarraTexto').innerText = translations[lang].BarraTexto;
    document.getElementById('BarraPalabras').innerText = translations[lang].BarraPalabras;
    document.getElementById('BarraComoUsar').innerText = translations[lang].BarraComoUsar;
    document.getElementById('CerrarSesion').innerText = translations[lang].CerrarSesion;
    document.getElementById('miCuenta').innerText = translations[lang].miCuenta;
    //pagina Principal
    document.getElementById('textoVoz').innerText = translations[lang].textoVoz;
    document.getElementById('sonido').innerText = translations[lang].sonido;
    document.getElementById('vozFemenina').innerText = translations[lang].vozFemenina;
    document.getElementById('vozMasculina').innerText = translations[lang].vozMasculina;

     // Actualizar texto bandera-boton
     const languageButtonText = document.getElementById('idioma');
     const flagIcon = document.querySelector('#language-btn .flag-icon');
 
     // Actualizamos el texto y la imagen del botón
     languageButtonText.innerText = translations[lang].idioma;
     flagIcon.src = translations[lang].flagSrc;
     flagIcon.alt = translations[lang].flagAlt;
}

// // Añadir el evento al click de los elementos de la bandera
// document.querySelectorAll('.flags_item').forEach(item => {
//     item.addEventListener('click', () => {
//         const lang = item.getAttribute('data-language');
//         changeLanguage(lang);
//     });
// });

// // Cambia el idioma inicial al cargar la página
// document.addEventListener('DOMContentLoaded', () => {
//     changeLanguage('es'); // Cambia 'es' por 'en' si prefieres inglés por defecto
// });