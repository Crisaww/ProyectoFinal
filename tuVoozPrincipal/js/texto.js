async function convertirTexto() {
  // Obtén el valor del campo de texto
  const texto = document.getElementById("texto").value.trim();;
  // Validar si el campo de texto está vacío
  if (!texto) {
    // Muestra una alerta si el campo está vacío
    Swal.fire({
      title: "Advertencia",
      text: "Ingrese un texto a convertir.",
      icon: "warning"
    });
    return; // Sal de la función si el campo está vacío
  }
  // Oculta el botón
  document.querySelector('.botonReproducirTexto').classList.add('hidden');
  
  // Muestra la sección del loader
  document.querySelector('.containerLoading').classList.remove('hidden');

  try {
    // Realiza la solicitud de conversión de texto a voz
    const response = await fetch('http://127.0.0.1:8000/synthesize/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: texto }),
    });

    if (response.ok) {
      // Convierte la respuesta en un blob de audio
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
    // Oculta la sección del loader y muestra el botón nuevamente
    document.querySelector('.containerLoading').classList.add('hidden');
    document.querySelector('.botonReproducirTexto').classList.remove('hidden');
  }
}
