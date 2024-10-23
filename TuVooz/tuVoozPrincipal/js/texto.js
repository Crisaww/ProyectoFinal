async function sugerirTexto() {
  const texto = document.getElementById("texto").value.trim();
  if (!texto) return;  // Salir si no hay texto

  try {
      const response = await fetch(urlSugerirTexto, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              text: texto,
              max_length: 10,  // Generar más palabras
              temperature: 0.7  // Ajustar creatividad
          }),
      });

      const data = await response.json();
      
      if (response.ok) {
          const sugerencias = data.suggested_texts || [];
          if (sugerencias.length > 0) {
              mostrarSugerencias(sugerencias);
          } else {
              console.warn('No hay sugerencias disponibles.');
              limpiarSugerencias();
          }
      } else {
          console.error('Error en la respuesta:', response.statusText);
      }
  } catch (error) {
      console.error('Error en la solicitud:', error);
  }
}

function mostrarSugerencias(sugerencias) {
  const sugerenciaContainer = document.getElementById("sugerencia");
  limpiarSugerencias();  // Limpiar sugerencias previas

  if (sugerencias.length > 0) {
      sugerenciaContainer.style.display = "block";  // Mostrar el contenedor
  } else {
      sugerenciaContainer.style.display = "none";  // Ocultar si no hay sugerencias
      return; // Salir si no hay sugerencias
  }

  sugerencias.forEach(sugerencia => {
      const sugerenciaElement = document.createElement("button");
      sugerenciaElement.textContent = sugerencia;
      sugerenciaElement.classList.add("sugerencia-item");  // Clase para dar estilos a los botones
      sugerenciaElement.onclick = () => agregarTextoAlArea(sugerencia);
      sugerenciaContainer.appendChild(sugerenciaElement);
  });
}

function limpiarSugerencias() {
  const sugerenciaContainer = document.getElementById("sugerencia");
  sugerenciaContainer.innerHTML = '';  // Eliminar contenido previo
}

function agregarTextoAlArea(sugerencia) {
  const textarea = document.getElementById("texto");
  textarea.value += " " + sugerencia;
  textarea.focus();

  // Generar nuevas sugerencias al hacer clic
  sugerirTexto();
}

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
              console.log("El audio está listo para reproducirse.");
          };
      } else {
          Swal.fire({
              title: "Error",
              text: "Error en la conversión de texto a voz.",
              icon: "error"
          });
      }
  } catch (error) {
      console.error('Error:', error);
      Swal.fire({
          title: "Error",
          text: "El sistema no se encuentra activo.",
          icon: "error"
      });
  } finally {
      document.querySelector('.containerLoading').classList.add('hidden');
      document.querySelector('.botonReproducirTexto').classList.remove('hidden');
  }
}
