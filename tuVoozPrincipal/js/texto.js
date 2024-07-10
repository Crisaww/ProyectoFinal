function reproducirTexto() {
    var texto = document.getElementById("texto").value;
    speechSynthesis.speak(new SpeechSynthesisUtterance(texto));
  }