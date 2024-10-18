const translations = {
    es: {
        //paginaPrincipal
        title: "Tu Vooz",
        BarraTexto: "Texto",
        BarraPalabras: "Palabras comunes",
        BarraComoUsar: "¿Cómo usar TuVooz?",
        miCuenta: "Mi cuenta",
        CerrarSesion: "Cerrar sesión",
        tituloTexto: "Texto a voz",
        sonido: "Reproducir sonido",
        vozFemenina: "Voz femenina",
        vozMasculina: "Voz masculina",
        // footerText: "©2024 · TuTurismo Neiva"
    },
    en: {
        //paginaPrincipal
        title: "Tu Vooz",
        BarraPalabras: "Text",
        lugarTuristico: "Common words",
        BarraComoUsar: "How to use TuVooz?",
        miCuenta: "My account",
        CerrarSesion: "Sign out",
        tituloTexto: "text to speech",
        sonido: "Play sound",
        vozFemenina: "female voice",
        vozMasculina: "male voice",
        // footerText: "©2024 · YourTourism Neiva"
    }
};

function changeLanguage(lang) {
    document.title = translations[lang].title;
    document.getElementById('Texto').innerText = translations[lang].BarraTexto;
    document.getElementById('Palabras-comunes').innerText = translations[lang].BarraPalabras;
    document.getElementById('Cómo-usar-TuVooz').innerText = translations[lang].BarraComoUsar;
    document.getElementById('Cerrar-sesión').innerText = translations[lang].CerrarSesion;
    document.getElementById('Mi-cuenta').innerText = translations[lang].miCuenta;
    document.getElementById('Texto-a-voz').innerText = translations[lang].tituloTexto;
    document.getElementById('Reproducir-sonido').innerText = translations[lang].sonido;
    document.getElementById('Voz-femenina').innerText = translations[lang].vozFemenina;
    document.getElementById('Voz-masculina').innerText = translations[lang].vozMasculina;
   

    // Cambios en el footer
    document.getElementById('contact-title').innerText = translations[lang].contactanos;
    // document.getElementById('pqrsfd-link').innerText = translations[lang].pqrsfd;
    document.getElementById('terms-link').innerText = translations[lang].terminos;
    // document.getElementById('footer-text').innerText = translations[lang].footerText;
}

document.querySelectorAll('.flags_item').forEach(item => {
    item.addEventListener('click', () => {
        const lang = item.getAttribute('data-language');
        changeLanguage(lang);

        // Cambiar la apariencia del botón y actualizar la bandera
        const button = document.getElementById('language-switcher');
        if (lang === 'en') {
            button.setAttribute('data-language', 'es');
            button.innerHTML = '<img src="flag-us.png" alt="EN" id="language-icon"> English';
            button.classList.add('active');
        } else {
            button.setAttribute('data-language', 'en');
            button.innerHTML = '<img src="flag-es.png" alt="ES" id="language-icon"> Español';
            button.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    changeLanguage('es'); // Cambia 'es' por 'en' si prefieres inglés por defecto
});
