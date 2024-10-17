document.addEventListener("DOMContentLoaded", function () {
  // Función para obtener el perfil del usuario
  async function obtenerPerfil() {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        window.location.href = urlInicioSesion;
        return;
      }

      const response = await fetch(urlPerfil, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = urlInicioSesion;
        }
        throw new Error("Error al obtener el perfil");
      }

      const data = await response.json();
      document.getElementById("username").value = data.username;
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  }

  function validarUsername(usernameInput) {
    let placement = window.matchMedia("(max-width: 1023px)").matches ? 'top' : 'right';
  
    let tippyInstanceUsername = tippy(usernameInput, {
      content: "",
      trigger: "manual",
      placement: placement,
      theme: "material",
    });
  
    let valor = usernameInput.value.trim();  // Eliminamos espacios al inicio y al final
    let valido = true;
    let mensajesError = [];
  
    // Verifica si el campo está vacío
    if (!valor) {
      valido = false;
      mensajesError.push("El nombre de usuario es obligatorio.");
    }
  
    // Verifica si el nombre contiene espacios
    if (/\s/.test(valor)) {
      valido = false;
      mensajesError.push("El nombre de usuario no debe contener espacios.");
    }
  
    // Verifica si el nombre contiene caracteres especiales, excluyendo los espacios
    if (/[^a-zA-Z0-9\s]/.test(valor)) {
      valido = false;
      mensajesError.push("El nombre de usuario no debe contener caracteres especiales.");
    }
  
    // Verifica si el nombre excede los 20 caracteres
    if (valor.length > 20) {
      valido = false;
      mensajesError.push("El nombre de usuario no debe tener más de 20 caracteres.");
    }
  
    // Mostrar u ocultar el tooltip en función de la validez del campo
    if (!valido) {
      usernameInput.className = "form-control is-invalid";
      tippyInstanceUsername.setContent(mensajesError.join(" "));
      tippyInstanceUsername.show();
    } else {
      usernameInput.className = "form-control is-valid";
      tippyInstanceUsername.hide();
    }
  
    return valido;
  }
  

  // Validación en tiempo real al escribir en el campo de nombre de usuario
  const usernameInput = document.getElementById("new-username");
  usernameInput.addEventListener("input", function () {
    validarUsername(usernameInput);
  });

  // Función para actualizar el perfil del usuario
  async function actualizarPerfil() {
    try {
      // Validar el nombre de usuario antes de proceder
      if (!validarUsername(usernameInput)) {
        return;
      }

      const token = localStorage.getItem("access_token");
      if (!token) {
        window.location.href = urlInicioSesion;
        return;
      }

      const nuevoUsername = usernameInput.value;

      const response = await fetch(urlPerfil, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: nuevoUsername,
        }),
      });

      console.log("Respuesta completa:", response);

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Error al actualizar el perfil");
        }

        Swal.fire({
          title: "Éxito",
          text: "Perfil actualizado correctamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
          window.location.reload();
        });
      } else {
        const text = await response.text();
        console.error("Respuesta no JSON:", text);
        throw new Error("La respuesta del servidor no es JSON válido");
      }
    } catch (error) {
      console.error("Error completo:", error);
      Swal.fire({
        title: "¡Advertencia!",
        text: error.message || "No se pudo actualizar el perfil",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  }

  // Obtener perfil cuando se cargue la página
  obtenerPerfil();

  // Evento para actualizar el perfil al hacer clic en el botón correspondiente
  const btnActualizarPerfil = document.getElementById("btnActualizarPerfil");
  btnActualizarPerfil.addEventListener("click", function (event) {
    event.preventDefault();
    actualizarPerfil();
  });
});
