// Tamaño base inicial y cargar valor desde localStorage si existe
let fontSizeBase = parseFloat(localStorage.getItem('fontSizeBase')) || 16; // 16px predeterminado

// Función para actualizar el tamaño de fuente usando CSS variables
function actualizarTamanoFuente() {
    document.documentElement.style.setProperty('--font-size-base', fontSizeBase + 'px');
    // Guardar el nuevo tamaño en localStorage
    localStorage.setItem('fontSizeBase', fontSizeBase);
}

// Inicializar el tamaño de fuente al cargar la página
actualizarTamanoFuente();

// Aumentar el tamaño de la fuente
document.getElementById('aumentarFuente').addEventListener('click', () => {
    if (fontSizeBase < 25) { // Limitar el tamaño máximo a 25px
        fontSizeBase += 2; // Aumentar en 2px
        actualizarTamanoFuente();
    }
});

// Disminuir el tamaño de la fuente
document.getElementById('disminuirFuente').addEventListener('click', () => {
    if (fontSizeBase > 16) { // Limitar el tamaño mínimo a 18px
        fontSizeBase -= 2; // Disminuir en 2px
        actualizarTamanoFuente();
    }
});

