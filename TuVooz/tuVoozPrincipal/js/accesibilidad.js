let selectedVoice = localStorage.getItem('selectedVoice') || "es-US-Wavenet-B";  // Recuperar valor o usar el valor por defecto
const checkboxes = document.querySelectorAll('input[type="checkbox"]');



// Objeto que contiene las rutas de los audios para cada palabra y cada voz
const audios = {

    //Variable de Saludos

    hola: {
        masculino: "./sonido/espanol/Hola.wav",
        femenino: "./sonido//espanol/MujerHola.mp3"
    },
    buenosDias: {
        masculino: "./sonido/espanol/Buenos_dias.wav",
        femenino: "./sonido/espanol/MujerBuenosDias.mp3"
    },
    buenasTardes: {
        masculino: "./sonido/espanol/Buenas_tardes.wav",
        femenino: "./sonido/espanol/MujerBuenasTardes.mp3"
    },
    buenasNoches: {
        masculino: "./sonido/espanol/Buenas_noches.wav",
        femenino: "./sonido/espanol/MujerBuenasNoches.mp3"
    },
    encantadoDeConocerte: {
        masculino: "./sonido/espanol/Encantado_de_conocerte.wav",
        femenino: "./sonido/espanol/MujerEncantadoDeConocerte.mp3"
    },
    queGustoVerte: {
        masculino: "./sonido/espanol/Que_gusto_verte.wav",
        femenino: "./sonido/espanol/MujerQueGustoVerte.mp3"
    },
    esUnPlacerConocerte: {
        masculino: "./sonido/espanol/Es_un_placer_conocerte.wav",
        femenino: "./sonido/espanol/MujerEsUnPlacerConocerte.mp3"
    },
    adios: {
        masculino: "./sonido/espanol/Adios.wav",
        femenino: "./sonido/espanol/MujerAdios.mp3"
    },
    hastaPronto: {
        masculino: "./sonido/espanol/Hasta_pronto.wav",
        femenino: "./sonido/espanol/MujerHastaPronto.mp3"
    },
    hastaLuego: {
        masculino: "./sonido/espanol/Hasta_luego.wav",
        femenino: "./sonido/espanol/MujerHastaLuego.mp3"
    },
    hastaMañana: {
        masculino: "./sonido/espanol/Hasta_mañana.wav",
        femenino: "./sonido/espanol/MujerHastaManana.mp3"
    },
    nosVemos: {
        masculino: "./sonido/espanol/Nos_vemos.wav",
        femenino: "./sonido/espanol/MujerNosVemos.mp3"
    },
    chao: {
        masculino: "./sonido/espanol/Chao.wav",
        femenino: "./sonido/espanol/MujerChao.mp3"
    },

    //Variables de Emociones

    feliz:{
        masculino: "./sonido/espanol/Feliz.wav",
        femenino: "./sonido/MujerFeliz.wav"
    },
    sorprendido:{
        masculino: "./sonido/espanol/Sorprendido.wav",
        femenino: "./sonido/espanol/MujerSorprendido.wav"
    },
    confundido: {
        masculino: "./sonido/espanol/Confundido.wav",
        femenino: "./sonido/espanol/MujerConfundido.wav"
    },
    enojado: {
        masculino: "./sonido/espanol/Enojado.wav",
        femenino: "./sonido/espanol/MujerEnojado.wav"
    },
    estresado: {
        masculino: "./sonido/espanol/Estresado.wav",
        femenino: "./sonido/espanol/MujerEstresado.wav"
    },
    tranquilo: {
        masculino: "./sonido/espanol/Tranquilo.wav",
        femenino: "./sonido/espanol/MujerTranquilo.wav"
    },
    triste: {
        masculino: "./sonido/espanol/Triste.wav",
        femenino: "./sonido/espanol/MujerTriste.wav"
    },
    aburrido: {
        masculino: "./sonido/espanol/Aburrido.wav",
        femenino: "./sonido/espanol/MujerAburrido.wav"
    },
    enamorado: {
        masculino: "./sonido/espanol/Enamorado.wav",
        femenino: "./sonido/espanol/MujerEnamorado.wav"
    },
    malo: {
        masculino: "./sonido/espanol/Malo.wav",
        femenino: "./sonido/espanol/MujerMalo.wav"
    },
    enfermo: {
        masculino: "./sonido/espanol/Enfermo.wav",
        femenino: "./sonido/espanol/MujerEnfermo.wav"
    },

    //Variables Animales
    perro: {
        masculino: "./sonido/espanol/Perro.wav",
        femenino: "./sonido/espanol/MujerPerro.wav" // Ruta de audio femenino
    },
    gato: {
        masculino: "./sonido/espanol/Gato.wav",
        femenino: "./sonido/espanol/MujerGato.wav" // Ruta de audio femenino
    },
    elefante: {
        masculino: "./sonido/espanol/Elefante.wav",
        femenino: "./sonido/espanol/MujerElefante.wav" // Ruta de audio femenino
    },
    leon: {
        masculino: "./sonido/espanol/León.wav",
        femenino: "./sonido/espanol/MujerLeon.wav" // Ruta de audio femenino
    },
    tigre: {
        masculino: "./sonido/espanol/Tigre.wav",
        femenino: "./sonido/espanol/MujerTigre.wav" // Ruta de audio femenino
    },
    oso: {
        masculino: "./sonido/espanol/Oso.wav",
        femenino: "./sonido/espanol/MujerOso.wav" // Ruta de audio femenino
    },
    caballo: {
        masculino: "./sonido/espanol/Caballo.wav",
        femenino: "./sonido/espanol/MujerCaballo.wav" // Ruta de audio femenino
    },
    delfin: {
        masculino: "./sonido/espanol/Delfín.wav",
        femenino: "./sonido/espanol/MujerDelfin.wav" // Ruta de audio femenino
    },
    aguila: {
        masculino: "./sonido/espanol/Aguila.wav",
        femenino: "./sonido/espanol/MujerAguila.wav" // Ruta de audio femenino
    },
    pinguino: {
        masculino: "./sonido/espanol/Pinguino.wav",
        femenino: "./sonido/espanol/MujerPinguino.wav" // Ruta de audio femenino
    },
    cebra: {
        masculino: "./sonido/espanol/Cebra.wav",
        femenino: "./sonido/espanol/MujerCebra.wav" // Ruta de audio femenino
    },
    jirafa: {
        masculino: "./sonido/espanol/Jirafa.wav",
        femenino: "./sonido/espanol/MujerJirafa.wav" // Ruta de audio femenino
    },
    lobo: {
        masculino: "./sonido/espanol/Lobo.wav",
        femenino: "./sonido/espanol/MujerLobo.wav" // Ruta de audio femenino
    },
    koala: {
        masculino: "./sonido/espanol/Koala.wav",
        femenino: "./sonido/espanol/MujerKoala.wav" // Ruta de audio femenino
    },
    panda: {
        masculino: "./sonido/espanol/Panda.wav",
        femenino: "./sonido/espanol/MujerPanda.wav" // Ruta de audio femenino
    },
    loro: {
        masculino: "./sonido/espanol/Loro.wav",
        femenino: "./sonido/espanol/MujerLoro.wav" // Ruta de audio femenino
    },
    tortuga: {
        masculino: "./sonido/espanol/Tortuga.wav",
        femenino: "./sonido/espanol/MujerTortuga.wav" // Ruta de audio femenino
    },
    pato: {
        masculino: "./sonido/espanol/Pato.wav",
        femenino: "./sonido/espanol/MujerPato.wav" // Ruta de audio femenino
    },
    gallina: {
        masculino: "./sonido/espanol/Gallina.wav",
        femenino: "./sonido/espanol/MujerGallina.wav" // Ruta de audio femenino
    },
    pollo: {
        masculino: "./sonido/espanol/Pollo.wav",
        femenino: "./sonido/espanol/MujerPollo.wav" // Ruta de audio femenino
    },
    pez: {
        masculino: "./sonido/espanol/Pez.wav",
        femenino: "./sonido/espanol/MujerPez.wav" // Ruta de audio femenino
    },

    //Variables preguntas

    comoEstas: {
        masculino: "./sonido/espanol/como_estas.wav",
        femenino: "./sonido/espanol/MujerComoEstas.wav" // Ruta de audio femenino
    },
    aQueTeDedicas: {
        masculino: "./sonido/espanol/a_que_te_dedicas.wav",
        femenino: "./sonido/espanol/MujerAQueTeDedicas.wav" // Ruta de audio femenino
    },
    todoBien: {
        masculino: "./sonido/espanol/todo_bien.wav",
        femenino: "./sonido/espanol/MujerTodoBien.wav" // Ruta de audio femenino
    },
    queTalTuDia: {
        masculino: "./sonido/espanol/que_tal_tu_dia.wav",
        femenino: "./sonido/espanol/MujerQueTalTuDia.wav" // Ruta de audio femenino
    },
    teGusta: {
        masculino: "./sonido/espanol/te_gusta.wav",
        femenino: "./sonido/espanol/MujerTeGusta.wav" // Ruta de audio femenino
    },
    teGusto: {
        masculino: "./sonido/espanol/te_gusto.wav",
        femenino: "./sonido/espanol/MujerTeGusto.wav" // Ruta de audio femenino
    },
    teDisgusta: {
        masculino: "./sonido/espanol/te_disgusta.wav",
        femenino: "./sonido/espanol/MujerTeDisgusta.wav" // Ruta de audio femenino
    },
    comoVaTodo: {
        masculino: "./sonido/espanol/como_va_todo.wav",
        femenino: "./sonido/espanol/MujerComoVaTodo.wav" // Ruta de audio femenino
    },
    estasFeliz: {
        masculino: "./sonido/espanol/estas_feliz.wav",
        femenino: "./sonido/espanol/MujerEstasFeliz.wav" // Ruta de audio femenino
    },
    hasViajado: {
        masculino: "./sonido/espanol/has_viajado.wav",
        femenino: "./sonido/espanol/MujerHasViajado.wav" // Ruta de audio femenino
    },
    estasEnojado: {
        masculino: "./sonido/espanol/estas_enojado.wav",
        femenino: "./sonido/espanol/MujerEstasEnojado.wav" // Ruta de audio femenino
    },
    estasEnojada: {
        masculino: "./sonido/espanol/estas_enojada.wav",
        femenino: "./sonido/espanol/MujerEstasEnojada.wav" // Ruta de audio femenino
    },
    queEsLoQueNoTeGusta: {
        masculino: "./sonido/espanol/que_es_lo_que_no_te_gusta.wav",
        femenino: "./sonido/espanol/MujerQueEsLoQueNoTeGusta.wav" // Ruta de audio femenino
    },
    quePasa: {
        masculino: "./sonido/espanol/que_pasa.wav",
        femenino: "./sonido/espanol/MujerQuePasa.wav" // Ruta de audio femenino
    },
    tienesAlgunPasatiempo: {
        masculino: "./sonido/espanol/tienes_algun_pasatiempo.wav",
        femenino: "./sonido/espanol/MujerTienesAlgunPasatiempo.wav" // Ruta de audio femenino
    },
    queMusicaTeGusta: {
        masculino: "./sonido/espanol/que_musica_te_gusta.wav",
        femenino: "./sonido/espanol/MujerQueMusicaTeGusta.wav" // Ruta de audio femenino
    },
    aQueLeTienesMiedo: {
        masculino: "./sonido/espanol/a_que_le_tienes_miedo.wav",
        femenino: "./sonido/espanol/MujerAQueLeTienesMiedo.wav" // Ruta de audio femenino
    },
    estasTriste: {
        masculino: "./sonido/espanol/estas_triste.wav",
        femenino: "./sonido/espanol/MujerEstasTriste.wav" // Ruta de audio femenino
    },
    porque: {
        masculino: "./sonido/espanol/porque.wav",
        femenino: "./sonido/espanol/MujerPorque.wav" // Ruta de audio femenino
    },
    dondeEstas: {
        masculino: "./sonido/espanol/donde_estas.wav",
        femenino: "./sonido/espanol/MujerDondeEstas.wav" // Ruta de audio femenino
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

const soundFeliz = new Audio("./sonido/espanol/Feliz.wav");                  
const soundSorprendido = new Audio("./sonido/espanol/Sorprendido.wav");     
const soundConfundido = new Audio("./sonido/espanol/Confundido.wav");        
const soundEnojado = new Audio("./sonido/espanol/Enojado.wav");              
const soundEstresado = new Audio("./sonido/espanol/Estresado.wav");          
const soundTranquilo = new Audio("./sonido/espanol/Tranquilo.wav");          
const soundTriste = new Audio("./sonido/espanol/Triste.wav");              
const soundAburrido = new Audio("./sonido/espanol/Aburrido.wav");            
const soundEnamorado = new Audio("./sonido/espanol/Enamorado.wav");          
const soundMalo = new Audio("./sonido/espanol/Malo.wav");                   
const soundEnfermo = new Audio("./sonido/espanol/Enfermo.wav");              


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



document.addEventListener('click', (event) => {
    const isClickInside = submenu.contains(event.target) || botonPrincipal.contains(event.target);

    // Verifica si se hizo clic en un botón dentro del submenú
    const isButtonClick = submenu.querySelectorAll('button').length > 0 && event.target.closest('button');

    // Si se hace clic fuera del submenú o en cualquier botón dentro del submenú, se cierra con un retraso de 3 segundos
    if (!isClickInside || isButtonClick) {
        setTimeout(() => {
            submenu.style.display = 'none'; // Cierra el submenú después de 3 segundos (3000 ms)
        }, 2000);
    }
});
