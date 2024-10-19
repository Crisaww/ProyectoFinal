let selectedVoice = localStorage.getItem('selectedVoice') || "es-US-Wavenet-B";  // Recuperar valor o usar el valor por defecto
const checkboxes = document.querySelectorAll('input[type="checkbox"]');



// Objeto que contiene las rutas de los audios para cada palabra y cada voz
const audios = {

    //Variable de Saludos

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
    },

    //Variables de Emociones

    feliz:{
        masculino: "./sonido/Feliz.wav",
        femenino: "./sonido/MujerFeliz.wav"
    },
    sorprendido:{
        masculino: "./sonido/Sorprendido.wav",
        femenino: "./sonido/MujerSorprendido.wav"
    },
    confundido: {
        masculino: "./sonido/Confundido.wav",
        femenino: "./sonido/MujerConfundido.wav"
    },
    enojado: {
        masculino: "./sonido/Enojado.wav",
        femenino: "./sonido/MujerEnojado.wav"
    },
    estresado: {
        masculino: "./sonido/Estresado.wav",
        femenino: "./sonido/MujerEstresado.wav"
    },
    tranquilo: {
        masculino: "./sonido/Tranquilo.wav",
        femenino: "./sonido/MujerTranquilo.wav"
    },
    triste: {
        masculino: "./sonido/Triste.wav",
        femenino: "./sonido/MujerTriste.wav"
    },
    aburrido: {
        masculino: "./sonido/Aburrido.wav",
        femenino: "./sonido/MujerAburrido.wav"
    },
    enamorado: {
        masculino: "./sonido/Enamorado.wav",
        femenino: "./sonido/MujerEnamorado.wav"
    },
    malo: {
        masculino: "./sonido/Malo.wav",
        femenino: "./sonido/MujerMalo.wav"
    },
    enfermo: {
        masculino: "./sonido/Enfermo.wav",
        femenino: "./sonido/MujerEnfermo.wav"
    },

    //Variables Animales
    perro: {
        masculino: "./sonido/Perro.wav",
        femenino: "./sonido/MujerPerro.wav" // Ruta de audio femenino
    },
    gato: {
        masculino: "./sonido/Gato.wav",
        femenino: "./sonido/MujerGato.wav" // Ruta de audio femenino
    },
    elefante: {
        masculino: "./sonido/Elefante.wav",
        femenino: "./sonido/MujerElefante.wav" // Ruta de audio femenino
    },
    leon: {
        masculino: "./sonido/León.wav",
        femenino: "./sonido/MujerLeon.wav" // Ruta de audio femenino
    },
    tigre: {
        masculino: "./sonido/Tigre.wav",
        femenino: "./sonido/MujerTigre.wav" // Ruta de audio femenino
    },
    oso: {
        masculino: "./sonido/Oso.wav",
        femenino: "./sonido/MujerOso.wav" // Ruta de audio femenino
    },
    caballo: {
        masculino: "./sonido/Caballo.wav",
        femenino: "./sonido/MujerCaballo.wav" // Ruta de audio femenino
    },
    delfin: {
        masculino: "./sonido/Delfín.wav",
        femenino: "./sonido/MujerDelfin.wav" // Ruta de audio femenino
    },
    aguila: {
        masculino: "./sonido/Aguila.wav",
        femenino: "./sonido/MujerAguila.wav" // Ruta de audio femenino
    },
    pinguino: {
        masculino: "./sonido/Pinguino.wav",
        femenino: "./sonido/MujerPinguino.wav" // Ruta de audio femenino
    },
    cebra: {
        masculino: "./sonido/Cebra.wav",
        femenino: "./sonido/MujerCebra.wav" // Ruta de audio femenino
    },
    jirafa: {
        masculino: "./sonido/Jirafa.wav",
        femenino: "./sonido/MujerJirafa.wav" // Ruta de audio femenino
    },
    lobo: {
        masculino: "./sonido/Lobo.wav",
        femenino: "./sonido/MujerLobo.wav" // Ruta de audio femenino
    },
    koala: {
        masculino: "./sonido/Koala.wav",
        femenino: "./sonido/MujerKoala.wav" // Ruta de audio femenino
    },
    panda: {
        masculino: "./sonido/Panda.wav",
        femenino: "./sonido/MujerPanda.wav" // Ruta de audio femenino
    },
    loro: {
        masculino: "./sonido/Loro.wav",
        femenino: "./sonido/MujerLoro.wav" // Ruta de audio femenino
    },
    tortuga: {
        masculino: "./sonido/Tortuga.wav",
        femenino: "./sonido/MujerTortuga.wav" // Ruta de audio femenino
    },
    pato: {
        masculino: "./sonido/Pato.wav",
        femenino: "./sonido/MujerPato.wav" // Ruta de audio femenino
    },
    gallina: {
        masculino: "./sonido/Gallina.wav",
        femenino: "./sonido/MujerGallina.wav" // Ruta de audio femenino
    },
    pollo: {
        masculino: "./sonido/Pollo.wav",
        femenino: "./sonido/MujerPollo.wav" // Ruta de audio femenino
    },
    pez: {
        masculino: "./sonido/Pez.wav",
        femenino: "./sonido/MujerPez.wav" // Ruta de audio femenino
    },

    //Variables preguntas

    comoEstas: {
        masculino: "./sonido/como_estas.wav",
        femenino: "./sonido/MujerComoEstas.wav" // Ruta de audio femenino
    },
    aQueTeDedicas: {
        masculino: "./sonido/a_que_te_dedicas.wav",
        femenino: "./sonido/MujerAQueTeDedicas.wav" // Ruta de audio femenino
    },
    todoBien: {
        masculino: "./sonido/todo_bien.wav",
        femenino: "./sonido/MujerTodoBien.wav" // Ruta de audio femenino
    },
    queTalTuDia: {
        masculino: "./sonido/que_tal_tu_dia.wav",
        femenino: "./sonido/MujerQueTalTuDia.wav" // Ruta de audio femenino
    },
    teGusta: {
        masculino: "./sonido/te_gusta.wav",
        femenino: "./sonido/MujerTeGusta.wav" // Ruta de audio femenino
    },
    teGusto: {
        masculino: "./sonido/te_gusto.wav",
        femenino: "./sonido/MujerTeGusto.wav" // Ruta de audio femenino
    },
    teDisgusta: {
        masculino: "./sonido/te_disgusta.wav",
        femenino: "./sonido/MujerTeDisgusta.wav" // Ruta de audio femenino
    },
    comoVaTodo: {
        masculino: "./sonido/como_va_todo.wav",
        femenino: "./sonido/MujerComoVaTodo.wav" // Ruta de audio femenino
    },
    estasFeliz: {
        masculino: "./sonido/estas_feliz.wav",
        femenino: "./sonido/MujerEstasFeliz.wav" // Ruta de audio femenino
    },
    hasViajado: {
        masculino: "./sonido/has_viajado.wav",
        femenino: "./sonido/MujerHasViajado.wav" // Ruta de audio femenino
    },
    estasEnojado: {
        masculino: "./sonido/estas_enojado.wav",
        femenino: "./sonido/MujerEstasEnojado.wav" // Ruta de audio femenino
    },
    estasEnojada: {
        masculino: "./sonido/estas_enojada.wav",
        femenino: "./sonido/MujerEstasEnojada.wav" // Ruta de audio femenino
    },
    queEsLoQueNoTeGusta: {
        masculino: "./sonido/que_es_lo_que_no_te_gusta.wav",
        femenino: "./sonido/MujerQueEsLoQueNoTeGusta.wav" // Ruta de audio femenino
    },
    quePasa: {
        masculino: "./sonido/que_pasa.wav",
        femenino: "./sonido/MujerQuePasa.wav" // Ruta de audio femenino
    },
    tienesAlgunPasatiempo: {
        masculino: "./sonido/tienes_algun_pasatiempo.wav",
        femenino: "./sonido/MujerTienesAlgunPasatiempo.wav" // Ruta de audio femenino
    },
    queMusicaTeGusta: {
        masculino: "./sonido/que_musica_te_gusta.wav",
        femenino: "./sonido/MujerQueMusicaTeGusta.wav" // Ruta de audio femenino
    },
    aQueLeTienesMiedo: {
        masculino: "./sonido/a_que_le_tienes_miedo.wav",
        femenino: "./sonido/MujerAQueLeTienesMiedo.wav" // Ruta de audio femenino
    },
    estasTriste: {
        masculino: "./sonido/estas_triste.wav",
        femenino: "./sonido/MujerEstasTriste.wav" // Ruta de audio femenino
    },
    porque: {
        masculino: "./sonido/porque.wav",
        femenino: "./sonido/MujerPorque.wav" // Ruta de audio femenino
    },
    dondeEstas: {
        masculino: "./sonido/donde_estas.wav",
        femenino: "./sonido/MujerDondeEstas.wav" // Ruta de audio femenino
    }
};

// Variables para los audios

//Saludos
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

// Emociones

const soundFeliz = new Audio("./sonido/Feliz.wav");                  
const soundSorprendido = new Audio("./sonido/Sorprendido.wav");     
const soundConfundido = new Audio("./sonido/Confundido.wav");        
const soundEnojado = new Audio("./sonido/Enojado.wav");              
const soundEstresado = new Audio("./sonido/Estresado.wav");          
const soundTranquilo = new Audio("./sonido/Tranquilo.wav");          
const soundTriste = new Audio("./sonido/Triste.wav");              
const soundAburrido = new Audio("./sonido/Aburrido.wav");            
const soundEnamorado = new Audio("./sonido/Enamorado.wav");          
const soundMalo = new Audio("./sonido/Malo.wav");                   
const soundEnfermo = new Audio("./sonido/Enfermo.wav");              


// Animales
const soundPerro = new Audio();          
const soundGato = new Audio();           
const soundElefante = new Audio();     
const soundLeon = new Audio();          
const soundTigre = new Audio();         
const soundOso = new Audio();            
const soundCaballo = new Audio();        
const soundDelfin = new Audio();         
const soundAguila = new Audio();         
const soundPinguino = new Audio();       
const soundCebra = new Audio();          
const soundJirafa = new Audio();         
const soundLobo = new Audio();          
const soundKoala = new Audio();          
const soundPanda = new Audio();         
const soundLoro = new Audio();           
const soundTortuga = new Audio();        
const soundPato = new Audio();          
const soundGallina = new Audio();        
const soundPollo = new Audio();          
const soundPez = new Audio();

// Preguntas

const soundComoEstas = new Audio();         
const soundAQueTeDedicas = new Audio();      
const soundTodoBien = new Audio();          
const soundQueTalTuDia = new Audio();       
const soundTeGusta = new Audio();           
const soundTeGusto = new Audio();           
const soundTeDisgusta = new Audio();        
const soundComoVaTodo = new Audio();        
const soundEstasFeliz = new Audio();        
const soundHasViajado = new Audio();        
const soundEstasEnojado = new Audio();      
const soundEstasEnojada = new Audio();      
const soundQueEsLoQueNoTeGusta = new Audio(); 
const soundQuePasa = new Audio();           
const soundTienesAlgunPasatiempo = new Audio();
const soundQueMusicaTeGusta = new Audio();  
const soundAQueLeTienesMiedo = new Audio();  
const soundEstasTriste = new Audio();       
const soundPorque = new Audio();            
const soundDondeEstas = new Audio();        




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

    //Emociones

    soundFeliz.src = audios.feliz[tipoVoz];
    soundSorprendido.src = audios.sorprendido[tipoVoz];
    soundConfundido.src = audios.confundido[tipoVoz];
    soundEnojado.src = audios.enojado[tipoVoz];
    soundEstresado.src = audios.estresado[tipoVoz];
    soundTranquilo.src = audios.tranquilo[tipoVoz];
    soundTriste.src = audios.triste[tipoVoz];
    soundAburrido.src = audios.aburrido[tipoVoz];
    soundEnamorado.src = audios.enamorado[tipoVoz];
    soundMalo.src = audios.malo[tipoVoz];
    soundEnfermo.src = audios.enfermo[tipoVoz];

    //Animales

    soundPerro.src = audios.perro[tipoVoz];
    soundGato.src = audios.gato[tipoVoz];
    soundElefante.src = audios.elefante[tipoVoz];
    soundLeon.src = audios.leon[tipoVoz];
    soundTigre.src = audios.tigre[tipoVoz];
    soundOso.src = audios.oso[tipoVoz];
    soundCaballo.src = audios.caballo[tipoVoz];
    soundDelfin.src = audios.delfin[tipoVoz];
    soundAguila.src = audios.aguila[tipoVoz];
    soundPinguino.src = audios.pinguino[tipoVoz];
    soundCebra.src = audios.cebra[tipoVoz];
    soundJirafa.src = audios.jirafa[tipoVoz];
    soundLobo.src = audios.lobo[tipoVoz];
    soundKoala.src = audios.koala[tipoVoz];
    soundPanda.src = audios.panda[tipoVoz];
    soundLoro.src = audios.loro[tipoVoz];
    soundTortuga.src = audios.tortuga[tipoVoz];
    soundPato.src = audios.pato[tipoVoz];
    soundGallina.src = audios.gallina[tipoVoz];
    soundPollo.src = audios.pollo[tipoVoz];
    soundPez.src = audios.pez[tipoVoz];

    // Preguntas

    soundComoEstas.src = audios.comoEstas[tipoVoz];
    soundAQueTeDedicas.src = audios.aQueTeDedicas[tipoVoz];
    soundTodoBien.src = audios.todoBien[tipoVoz];
    soundQueTalTuDia.src = audios.queTalTuDia[tipoVoz];
    soundTeGusta.src = audios.teGusta[tipoVoz];
    soundTeGusto.src = audios.teGusto[tipoVoz];
    soundTeDisgusta.src = audios.teDisgusta[tipoVoz];
    soundComoVaTodo.src = audios.comoVaTodo[tipoVoz];
    soundEstasFeliz.src = audios.estasFeliz[tipoVoz];
    soundHasViajado.src = audios.hasViajado[tipoVoz];
    soundEstasEnojado.src = audios.estasEnojado[tipoVoz];
    soundEstasEnojada.src = audios.estasEnojada[tipoVoz];
    soundQueEsLoQueNoTeGusta.src = audios.queEsLoQueNoTeGusta[tipoVoz];
    soundQuePasa.src = audios.quePasa[tipoVoz];
    soundTienesAlgunPasatiempo.src = audios.tienesAlgunPasatiempo[tipoVoz];
    soundQueMusicaTeGusta.src = audios.queMusicaTeGusta[tipoVoz];
    soundAQueLeTienesMiedo.src = audios.aQueLeTienesMiedo[tipoVoz];
    soundEstasTriste.src = audios.estasTriste[tipoVoz];
    soundPorque.src = audios.porque[tipoVoz];
    soundDondeEstas.src = audios.dondeEstas[tipoVoz];



}



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

//Emociones

function reproducirFeliz() {
    soundFeliz.play();
}

function reproducirSorprendido() {
    soundSorprendido.play();
}

function reproducirConfundido() {
    soundConfundido.play();
}

function reproducirEnojado() {
    soundEnojado.play();
}

function reproducirEstresado() {
    soundEstresado.play();
}

function reproducirTranquilo() {
    soundTranquilo.play();
}

function reproducirTriste() {
    soundTriste.play();
}

function reproducirAburrido() {
    soundAburrido.play();
}

function reproducirEnamorado() {
    soundEnamorado.play();
}

function reproducirMalo() {
    soundMalo.play();
}

function reproducirEnfermo() {
    soundEnfermo.play();
}

//Animales

function reproducirPerro() {
    soundPerro.play();
}

function reproducirGato() {
    soundGato.play();
}

function reproducirElefante() {
    soundElefante.play();
}

function reproducirLeon() {
    soundLeon.play();
}

function reproducirTigre() {
    soundTigre.play();
}

function reproducirOso() {
    soundOso.play();
}

function reproducirCaballo() {
    soundCaballo.play();
}

function reproducirDelfin() {
    soundDelfin.play();
}

function reproducirAguila() {
    soundAguila.play();
}

function reproducirPinguino() {
    soundPinguino.play();
}

function reproducirCebra() {
    soundCebra.play();
}

function reproducirJirafa() {
    soundJirafa.play();
}

function reproducirLobo() {
    soundLobo.play();
}

function reproducirKoala() {
    soundKoala.play();
}

function reproducirPanda() {
    soundPanda.play();
}

function reproducirLoro() {
    soundLoro.play();
}

function reproducirTortuga() {
    soundTortuga.play();
}

function reproducirPato() {
    soundPato.play();
}

function reproducirGallina() {
    soundGallina.play();
}

function reproducirPollo() {
    soundPollo.play();
}

function reproducirPez() {
    soundPez.play();
}

// Preguntas

function reproducirComoEstas() {
    soundComoEstas.play();
}

function reproducirAQueTeDedicas() {
    soundAQueTeDedicas.play();
}

function reproducirTodoBien() {
    soundTodoBien.play();
}

function reproducirQueTalTuDia() {
    soundQueTalTuDia.play();
}

function reproducirTeGusta() {
    soundTeGusta.play();
}

function reproducirTeGusto() {
    soundTeGusto.play();
}

function reproducirTeDisgusta() {
    soundTeDisgusta.play();
}

function reproducirComoVaTodo() {
    soundComoVaTodo.play();
}

function reproducirEstasFeliz() {
    soundEstasFeliz.play();
}

function reproducirHasViajado() {
    soundHasViajado.play();
}

function reproducirEstasEnojado() {
    soundEstasEnojado.play();
}

function reproducirEstasEnojada() {
    soundEstasEnojada.play();
}

function reproducirQueEsLoQueNoTeGusta() {
    soundQueEsLoQueNoTeGusta.play();
}

function reproducirQuePasa() {
    soundQuePasa.play();
}

function reproducirTienesAlgunPasatiempo() {
    soundTienesAlgunPasatiempo.play();
}

function reproducirQueMusicaTeGusta() {
    soundQueMusicaTeGusta.play();
}

function reproducirAQueLeTienesMiedo() {
    soundAQueLeTienesMiedo.play();
}

function reproducirEstasTriste() {
    soundEstasTriste.play();
}

function reproducirPorque() {
    soundPorque.play();
}

function reproducirDondeEstas() {
    soundDondeEstas.play();
}
// Función para obtener el tipo de voz del backend y actualizar el estado
function obtenerTipoVozDelBackend() {
    fetch(urlPerfil, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        // Asigna la voz masculina si no hay voz registrada en el backend
        selectedVoice = data.tipo_voz || "es-US-Wavenet-B"; 
        localStorage.setItem('selectedVoice', selectedVoice);
        setCheckboxState(); // Asegúrate de que se llame después de asignar selectedVoice
        actualizarFuentesAudio(); // Actualiza las fuentes de audio basadas en el nuevo valor
        console.log('Tipo de voz obtenido del servidor:', selectedVoice);
    })
    .catch(error => console.error('Error al obtener el perfil:', error));
}

// Función para enviar el tipo de voz seleccionado al backend
function guardarTipoVozEnBackend(tipo_voz) {
    fetch(urlPerfil, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        },
        body: JSON.stringify({
            tipo_voz: tipo_voz  // Asegúrate de que este campo se envíe
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Respuesta del servidor:', data);
        if (data.message) {
            console.log('Tipo de voz actualizado en el servidor');
        } else if (data.error) {
            console.error('Error al actualizar el tipo de voz:', data.error);
        }
    })
    .catch(error => console.error('Error al guardar el tipo de voz:', error));
}

// Función para establecer el estado del checkbox
function setCheckboxState() {
    checkboxes.forEach(checkbox => {
        checkbox.checked = (checkbox.value === selectedVoice); // Marca el checkbox correspondiente
    });
}


//Obtener el tipo de voz desde el backend al cargar la página
obtenerTipoVozDelBackend();

// Establecer el estado inicial del checkbox basado en el valor de localStorage
setCheckboxState();
actualizarFuentesAudio();  // Actualizar la fuente de audio al cargar la página

// Manejar cambios en los checkboxes
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            checkboxes.forEach(cb => {
                if (cb !== checkbox) {
                    cb.checked = false; // Desmarcar otros checkboxes
                }
            });

            selectedVoice = checkbox.value; // Actualiza selectedVoice
            localStorage.setItem('selectedVoice', selectedVoice); // Actualiza el valor en localStorage
            actualizarFuentesAudio(); // Actualiza las fuentes de audio

            // Guardar el tipo de voz seleccionado en el backend
            guardarTipoVozEnBackend(selectedVoice);
        }
    });
});

// Boton de accesibilidad 


// Variables
const botonPrincipal = document.getElementById('boton-principal');
const submenu = document.getElementById('submenu');
const botonModo = document.getElementById('boton-modo');
const body = document.body;
const iconoModo = document.getElementById('icono-modo');

// Funcionalidad de despliegue del submenú
botonPrincipal.addEventListener('click', (event) => {
    event.stopPropagation(); // Previene que el clic se propague al documento y cierre el submenú inmediatamente
    submenu.style.display = submenu.style.display === 'flex' ? 'none' : 'flex';
});

// Función para cerrar el submenú al hacer clic en cualquier parte de la pantalla
document.addEventListener('click', (event) => {
    const isClickInside = submenu.contains(event.target) || botonPrincipal.contains(event.target);
    if (!isClickInside) {
        submenu.style.display = 'none'; // Cierra el submenú
    }
});
