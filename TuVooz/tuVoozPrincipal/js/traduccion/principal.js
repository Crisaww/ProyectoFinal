// Añadir el evento al click de los elementos de la bandera
document.querySelectorAll('.flags_item').forEach(item => {
    item.addEventListener('click', () => {
        const lang = item.getAttribute('data-language');
        changeLanguage(lang);
    });
});

// Cambia el idioma inicial al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage('es'); // Cambia 'es' por 'en' si prefieres inglés por defecto
});