let selectedVoice = localStorage.getItem('selectedVoice') || "es-US-Wavenet-B";  // Recuperar valor o usar el valor por defecto

const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Objeto que contiene las rutas de los audios para cada palabra y cada voz
const audios = {
    hola: {
        masculino: "./sonido/Hola.wav",
        femenino: "./sonido/MujerHola.mp3"
    },
    buenosDias: {
        masculino: "./sonido/Buenos_dias.wav",
        femenino: "./sonido/MujerBuenosDias.mp3"
    },
    buenasTardes: {
        masculino: "./sonido/Buenas_tardes.wav",
        femenino: "./sonido/MujerBuenasTardes.mp3"
    },
    buenasNoches: {
        masculino: "./sonido/Buenas_noches.wav",
        femenino: "./sonido/MujerBuenasNoches.mp3"
    },
    encantadoDeConocerte: {
        masculino: "./sonido/Encantado_de_conocerte.wav",
        femenino: "./sonido/MujerEncantadoDeConocerte.mp3"
    },
    queGustoVerte: {
        masculino: "./sonido/Que_gusto_verte.wav",
        femenino: "./sonido/MujerQueGustoVerte.mp3"
    },
    esUnPlacerConocerte: {
        masculino: "./sonido/Es_un_placer_conocerte.wav",
        femenino: "./sonido/MujerEsUnPlacerConocerte.mp3"
    },
    adios: {
        masculino: "./sonido/Adios.wav",
        femenino: "./sonido/MujerAdios.mp3"
    },
    hastaPronto: {
        masculino: "./sonido/Hasta_pronto.wav",
        femenino: "./sonido/MujerHastaPronto.mp3"
    },
    hastaLuego: {
        masculino: "./sonido/Hasta_luego.wav",
        femenino: "./sonido/MujerHastaLuego.mp3"
    },
    hastaMañana: {
        masculino: "./sonido/Hasta_mañana.wav",
        femenino: "./sonido/MujerHastaManana.mp3"
    },
    nosVemos: {
        masculino: "./sonido/Nos_vemos.wav",
        femenino: "./sonido/MujerNosVemos.mp3"
    },
    chao: {
        masculino: "./sonido/Chao.wav",
        femenino: "./sonido/MujerChao.mp3"
    }
};

// Variables para los audios
const soundHola = new Audio();
const soundBuenosDias = new Audio();
const soundBuenasTardes = new Audio();
const soundBuenasNoches = new Audio();
const soundEncantadoDeConocerte = new Audio();
const soundQueGustoVerte = new Audio();
const soundEsUnPlacerConocerte = new Audio();
const soundAdios = new Audio();
const soundHastaPronto = new Audio();
const soundHastaLuego = new Audio();
const soundHastaManana = new Audio();
const soundNosVemos = new Audio();
const soundChao = new Audio();

// Función para marcar el checkbox correspondiente basado en el valor guardado
function setCheckboxState() {
    checkboxes.forEach(checkbox => {
        if (checkbox.value === selectedVoice) {
            checkbox.checked = true;
        }
    });
}

// Función para cambiar las fuentes de audio según la voz seleccionada
function actualizarFuentesAudio() {
    const tipoVoz = selectedVoice === "es-US-Wavenet-B" ? "masculino" : "femenino";
    
    // Actualiza todas las fuentes de audio dinámicamente según el tipo de voz
    soundHola.src = audios.hola[tipoVoz];
    soundBuenosDias.src = audios.buenosDias[tipoVoz];
    soundBuenasTardes.src = audios.buenasTardes[tipoVoz];
    soundBuenasNoches.src = audios.buenasNoches[tipoVoz];
    soundEncantadoDeConocerte.src = audios.encantadoDeConocerte[tipoVoz];
    soundQueGustoVerte.src = audios.queGustoVerte[tipoVoz];
    soundEsUnPlacerConocerte.src = audios.esUnPlacerConocerte[tipoVoz];
    soundAdios.src = audios.adios[tipoVoz];
    soundHastaPronto.src = audios.hastaPronto[tipoVoz];
    soundHastaLuego.src = audios.hastaLuego[tipoVoz];
    soundHastaManana.src = audios.hastaMañana[tipoVoz];
    soundNosVemos.src = audios.nosVemos[tipoVoz];
    soundChao.src = audios.chao[tipoVoz];
}

// Establecer el estado inicial del checkbox basado en el valor de localStorage
setCheckboxState();
actualizarFuentesAudio();  // Actualizar la fuente de audio al cargar la página

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
            actualizarFuentesAudio();  // Actualizar las fuentes de audio cuando se cambia la voz
        }
    });
});

// Funciones para reproducir cada palabra
function reproducirHola() {
    soundHola.play();
}

function reproducirBuenosDias() {
    soundBuenosDias.play();
}

function reproducirBuenasTardes() {
    soundBuenasTardes.play();
}

function reproducirBuenasNoches() {
    soundBuenasNoches.play();
}

function reproducirEncantadoDeConocerte() {
    soundEncantadoDeConocerte.play();
}

function reproducirQueGustoVerte() {
    soundQueGustoVerte.play();
}

function reproducirEsUnPlacerConocerte() {
    soundEsUnPlacerConocerte.play();
}

function reproducirAdios() {
    soundAdios.play();
}

function reproducirHastaPronto() {
    soundHastaPronto.play();
}

function reproducirHastaLuego() {
    soundHastaLuego.play();
}

function reproducirHastaManana() {
    soundHastaManana.play();
}

function reproducirNosVemos() {
    soundNosVemos.play();
}

function reproducirChao() {
    soundChao.play();
}





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
