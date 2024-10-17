// Para el ojito de la contraseña
document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
  });

// Para el campo de confirmar contraseña
document
  .getElementById("toggleConfirmPassword")
  .addEventListener("click", function () {
    const confirmPasswordField = document.getElementById("confirmPassword");
    const type =
      confirmPasswordField.getAttribute("type") === "password"
        ? "text"
        : "password";
    confirmPasswordField.setAttribute("type", type);
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
  });

// Validaciones de la contraseña
function validarPasswordEnTiempoReal(passwordField) {
  let valido = true;
  let mensajesError = [];

  // Detecta el tamaño de la pantalla
  let placement = window.matchMedia("(max-width: 1023px)").matches ? 'top' : 'right';

  // Inicializa tippy.js en el campo de contraseña si no está inicializado
  if (!passwordField.tippyInstance) {
    passwordField.tippyInstance = tippy(passwordField, {
      content: "",
      trigger: "manual", // Control manual del tooltip
      placement: placement, // Ubicación del tooltip
      theme: "material", // Tema visual del tooltip
    });
  } else {
    // Actualiza la ubicación del tooltip si ya está inicializado
    passwordField.tippyInstance.setProps({
      placement: placement,
    });
  }

  // Verifica si el campo está vacío
  if (!passwordField.value.trim()) {
    passwordField.classList.add("is-invalid");
    passwordField.classList.remove("is-valid");
    passwordField.tippyInstance.setContent("La contraseña no puede estar vacía.");
    passwordField.tippyInstance.show(); // Muestra el tooltip
    return false;
  }

  let valor = passwordField.value.trim();

  // Validar la longitud de la contraseña
  if (valor.length < 8 || valor.length > 20) {
    valido = false;
    mensajesError.push("entre 8 y 20 caracteres");
  }
  // Verificar si tiene al menos una letra mayúscula
  if (!/[A-Z]/.test(valor)) {
    valido = false;
    mensajesError.push("una letra mayúscula");
  }
  // Verificar si tiene al menos una letra minúscula
  if (!/[a-z]/.test(valor)) {
    valido = false;
    mensajesError.push("una letra minúscula");
  }
  // Verificar si tiene al menos un número
  if (!/[0-9]/.test(valor)) {
    valido = false;
    mensajesError.push("al menos un número");
  }
  // Verificar si tiene al menos un carácter especial
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(valor)) {
    valido = false;
    mensajesError.push("un carácter especial");
  }

  if (!valido) {
    // Si no es válido, mostrar los mensajes de error en el tooltip
    let mensajeError =
      "La contraseña debe tener " + mensajesError.join(", ") + ".";
    passwordField.tippyInstance.setContent(mensajeError);
    passwordField.tippyInstance.show(); // Muestra el tooltip inmediatamente
  } else {
    // Si es válida, ocultar el tooltip
    passwordField.tippyInstance.hide();
  }

  // Cambia las clases del input para mostrar la validez visualmente
  passwordField.className = valido
    ? "form-control is-valid"
    : "form-control is-invalid";

  return valido;
}

// Listener para validar la contraseña en tiempo real mientras se escribe
document.getElementById("password").addEventListener("input", function () {
  validarPasswordEnTiempoReal(this);
});

// Función para restablecer la contraseña
async function restablecerContrasena() {
  // Obtener token y uid de los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const uid = urlParams.get("uid"); // Captura el uid desde la URL

  // Validar que se reciban los parámetros necesarios
  if (!token || !uid) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El enlace de restablecimiento no es válido o ha expirado.",
    });
    return;
  }

  // Obtener los valores de las contraseñas
  const passwordField = document.getElementById("password");
  const confirmPasswordField = document.getElementById("confirmPassword");

  const password = passwordField.value;
  const confirmPassword = confirmPasswordField.value;

  // Validar que las contraseñas coincidan
  if (password !== confirmPassword) {
    Swal.fire({
      icon: "warning",
      title: "¡Advertencia!",
      text: "Las contraseñas no coinciden.",
    });
    return;
  }

  // Validar la contraseña en tiempo real antes de enviarla
  if (!validarPasswordEnTiempoReal(passwordField)) {
    return;
  }

  try {
    // Enviar la solicitud al backend
    const response = await fetch(urlRestablecerContrasena, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        uid: uid, // Enviar también el uid para identificar al usuario
        new_password: password, // Enviar la nueva contraseña
      }),
    });

    // Procesar la respuesta
    if (response.ok) {
      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: data.message, // Mostrar el mensaje de éxito del backend
      }).then(() => {
        window.location.href = urlInicioSesion;
      });
    } else {
      // Manejar errores del servidor
      const errorData = await response.json();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorData.error || "Hubo un problema al restablecer la contraseña.",
      });
    }
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ocurrió un error al procesar la solicitud. Por favor, inténtelo nuevamente.",
    });
  }
}

/// Función para deshabilitar el pegado y mostrar el tippy instantáneamente
function deshabilitarPegado(campo) {
    campo.addEventListener("paste", function (e) {
        e.preventDefault(); // Evita que se pegue cualquier contenido
        
        // Configura y muestra el tippy instantáneamente
        if (!campo.tippyInstance) {
            campo.tippyInstance = tippy(campo, {
                content: "No se permite pegar.",
                trigger: 'manual',
                theme: 'material',
                placement: 'right' // Puedes ajustar la posición
            });
        } else {
            campo.tippyInstance.setContent("No se permite pegar.");
        }
  
        campo.tippyInstance.show(); // Muestra el mensaje de Tippy al instante
        
        // Oculta el tippy después de 2 segundos
        setTimeout(() => {
            campo.tippyInstance.hide();
        }, 2000);
    });
}

// Seleccionamos los campos de contraseña y confirmación de contraseña
const passwordField = document.getElementById("password");
const confirmPasswordField = document.getElementById("confirmPassword"); 

// Deshabilita el pegado en ambos campos
deshabilitarPegado(passwordField);
deshabilitarPegado(confirmPasswordField); 

