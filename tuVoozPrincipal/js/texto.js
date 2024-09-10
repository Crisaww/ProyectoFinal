async function convertirTexto() {
  const texto = document.getElementById("texto").value.trim();
  if (!texto) {
    Swal.fire({
      title: "Advertencia",
      text: "Ingrese un texto a convertir.",
      icon: "warning"
    });
    return;
  }

  document.querySelector('.botonReproducirTexto').classList.add('hidden');
  document.querySelector('.containerLoading').classList.remove('hidden');

  try {
    const response = await fetch(urlGenerarTexto, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: texto, voice: selectedVoice }),  // Enviar la voz seleccionada
    });

    if (response.ok) {
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
      audio.oncanplaythrough = () => {
        console.log("Audio is ready to play.");
      };
    } else {
      alert('Error en la conversión de texto a voz.');
    }
  } catch (error) {
    console.error('Error:', error);
    Swal.fire({
            title: "Error",
            text: "El sistema no se encuentra activo",
            icon: "error"
        });
  } finally {
    document.querySelector('.containerLoading').classList.add('hidden');
    document.querySelector('.botonReproducirTexto').classList.remove('hidden');
  }
}
