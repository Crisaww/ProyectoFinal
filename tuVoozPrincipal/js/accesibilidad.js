let selectedVoice = localStorage.getItem('selectedVoice') || "es-US-Wavenet-B";  // Recuperar valor o usar el valor por defecto

const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Función para marcar el checkbox correspondiente basado en el valor guardado
function setCheckboxState() {
    checkboxes.forEach(checkbox => {
        if (checkbox.value === selectedVoice) {
            checkbox.checked = true;
        }
    });
}

// Establecer el estado inicial del checkbox basado en el valor de localStorage
setCheckboxState();

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            checkboxes.forEach(cb => {
                if (cb !== checkbox) {
                    cb.checked = false;
                }
            });

            // Cambiar el valor de la voz seleccionada y guardarlo en localStorage
            selectedVoice = checkbox.value;
            localStorage.setItem('selectedVoice', selectedVoice);
        }
    });
});



//Tamaño de texto
const buttons = document.querySelectorAll('.text-size-button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        if (button.id === 'smallText') {
            content.style.fontSize = '12px';
        } else if (button.id === 'mediumText') {
            content.style.fontSize = '16px';
        } else if (button.id === 'largeText') {
            content.style.fontSize = '20px';
        }
    });
});

// Tamaño de letras
