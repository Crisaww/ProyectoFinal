const translations = {
    es: {
        //Barra Navegacion
        BarraTexto: "Texto",
        BarraPalabras: "Palabras comunes",
        BarraComoUsar: "¿Cómo usar TuVooz?",
        miCuenta: "Mi cuenta",
        CerrarSesion: "Cerrar sesión",
        idioma: "Idioma", 
        //animales
        urlAnimales:"Animales",
        tituloAnimales:"Animales",
        boton0:"Perro",
        boton1:"Gato",
        boton2:"Elefante",
        boton3:"León",
        boton4:"Tigre",
        boton5:"Oso",
        boton6:"Caballo",
        boton7:"Delfín",
        boton8:"Águila",
        boton9:"Pingüino",
        boton10:"Cebra",
        boton11:"Jirafa",
        boton12:"Lobo",
        boton13:"Koala",
        boton14:"Panda",
        boton15:"Loro",
        boton16:"Tortuga",
        boton17:"Pato",
        boton18:"Gallina",
        boton19:"Pollo",
        boton20:"Pez",
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
        //animales
        urlEmociones:"Animals",
        tituloAnimales:"Animals",
        boton0:"Dog",
        boton1:"Cat",
        boton2:"Elephant",
        boton3:"Lion",
        boton4:"Tiger",
        boton5:"Bear",
        boton6:"Horse",
        boton7:"Dolphin",
        boton8:"Eagle",
        boton9:"Penguin",
        boton10:"Zebra",
        boton11:"Giraffe",
        boton12:"Wolf",
        boton13:"Koala",
        boton14:"Panda",
        boton15:"Parrot",
        boton16:"Tortoise",
        boton17:"Duck",
        boton18:"Hen",
        boton19:"Chicken",
        boton20:"Fish",
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
        //emociones
        urlAnimales:"Animaux",
        tituloAnimales:"Animaux",
        boton0:"Chien",
        boton1:"Chat",
        boton2:"Eléphant",
        boton3:"Lion",
        boton4:"Tigre",
        boton5:"Ours",
        boton6:"Cheval",
        boton7:"Dauphin",
        boton8:"Aigle",
        boton9:"Pingouin ",
        boton10:"Zèbre",
        boton11:"girafe",
        boton12:"Loup",
        boton13:"Koala",
        boton14:"Panda",
        boton15:"perroquet",
        boton16:"Tortue",
        boton17:"Canard",
        boton18:"Gallin",
        boton19:"Poulet",
        boton20:"poisson",
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
        //animales
        urlAnimales:"Animais",
        tituloAnimales:"Animais",
        boton0:"Cão",
        boton1:"Gato",
        boton2:"Elefante",
        boton3:"Leão",
        boton4:"Tigre",
        boton5:"Urso",
        boton6:"Cavalo",
        boton7:"Golfinho",
        boton8:"Aguia",
        boton9:"Pinguim",
        boton10:"Zebra",
        boton11:"Girafa",
        boton12:"Lobo",
        boton13:"Coala",
        boton14:"Panda",
        boton15:"Papagaio",
        boton16:"Tartaruga",
        boton17:"Pato",
        boton18:"Galinha",
        boton19:"Galinha",
        boton20:"Peixe",
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
    document.getElementById('tituloAnimales').innerText = translations[lang].tituloAnimales;
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
    document.getElementById('boton20').innerText = translations[lang].boton20;
    

     // Actualizar texto bandera-boton
     const languageButtonText = document.getElementById('idioma');
     const flagIcon = document.querySelector('#language-btn .flag-icon');
 
     // Actualizamos el texto y la imagen del botón
     languageButtonText.innerText = translations[lang].idioma;
     flagIcon.src = translations[lang].flagSrc;
     flagIcon.alt = translations[lang].flagAlt;
}
