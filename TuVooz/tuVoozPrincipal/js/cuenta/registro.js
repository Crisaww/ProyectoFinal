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

// Inicializa los tippy para el campo de confirmar contraseña
const confirmPasswordField = document.getElementById("confirmPassword");
let tippyInstanceConfirm = tippy(confirmPasswordField, {
  content: "",
  trigger: "manual", // Control manual del tooltip
  placement: getPlacement(), // Ubicación del tooltip
  theme: "material", // Tema visual del tooltip
});

// Función para obtener el placement basado en el tamaño de pantalla
function getPlacement() {
  return window.matchMedia("(max-width: 1023px)").matches ? "top" : "right";
}

// Función para actualizar el placement en tiempo real
function actualizarPlacement() {
  tippyInstanceConfirm.setProps({ placement: getPlacement() });
}

// Listener para cambios en el tamaño de la pantalla
window.addEventListener("resize", actualizarPlacement);

function validarPasswordIguales() {
  const passwordField = document.getElementById("password");
  const confirmPasswordField = document.getElementById("confirmPassword");

  let passwordValue = passwordField.value.trim();
  let confirmPasswordValue = confirmPasswordField.value.trim();

  // Verificar si las contraseñas coinciden
  if (passwordValue !== confirmPasswordValue) {
    // Mostrar el tooltip si las contraseñas no coinciden
    tippyInstanceConfirm.setContent("Las contraseñas no coinciden.");
    tippyInstanceConfirm.show();
    confirmPasswordField.classList.add("is-invalid");
    confirmPasswordField.classList.remove("is-valid");
    return false;
  } else {
    // Ocultar el tooltip si las contraseñas coinciden
    tippyInstanceConfirm.hide();
    confirmPasswordField.classList.add("is-valid");
    confirmPasswordField.classList.remove("is-invalid");
    return true;
  }
}

// Listener para ocultar el tippy si el usuario cambia la contraseña principal
document.getElementById("password").addEventListener("input", function () {
  tippyInstanceConfirm.hide();
});

// Escuchar cambios en el campo de confirmación de contraseña para validación en tiempo real
confirmPasswordField.addEventListener("input", function () {
  validarPasswordIguales();
});


// Actualizar la función para registrar el usuario
function registrarUsuario() {
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let formData = {
    username: username,
    email: email,
    password: password,
  };

  if (validarCampos()) {
    fetch(urlRegistro, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 226) {
          return response.json().then((data) => {
            // Muestra una alerta específica si el usuario ya está registrado
            Swal.fire({
              title: "Advertencia",
              text: "El nombre de usuario ya está registrado.",
              icon: "warning",
            });
            return Promise.reject("Usuario ya registrado");
          });
        } else if (!response.ok) {
          return response.json().then((data) => {
            Swal.fire(
              "Error",
              data.error || "Error al registrar: " + response.statusText,
              "error"
            );
            throw new Error(data.error);
          });
        }
        return response.json();
      })
      .then((data) => {
        // Almacenar el token JWT en el localStorage
        localStorage.setItem("accessToken", data.access);

        Swal.fire({
          title: "Excelente",
          text: "Se ha registrado exitosamente, \npor favor, revisa tu correo electrónico",
          icon: "success",
        }).then(() => {
          // Redirigir al inicio de sesión después de mostrar el mensaje
          window.location.href = urlInicioSesion;
        });
      })
      .catch((error) => {
        if (error !== "Usuario ya registrado") {
          console.error(error);
        }
      });
  } else {
    Swal.fire({
      title: "¡Atención!",
      text: "Complete los campos correctamente",
      icon: "warning",
    });
  }
}
// Modificar validarCampos para incluir validarPasswordIguales()
function validarCampos() {
  var username = document.getElementById("username");
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  return (
    validarUsername(username) &&
    validarPassword(password) &&
    validarEmail(email) &&
    validarPasswordIguales()
  );
}

// // Inicializa tippy.js en el campo de nombre de usuario
// const usernameInput = document.getElementById('username');

function validarUsername(username) {
  let valido = true;
  let mensajesError = [];

  // Detecta el tamaño de la pantalla
  let placement = window.matchMedia("(max-width: 1023px)").matches ? 'top' : 'right';


  let tippyInstanceUsername = tippy(username, {
    content: "",
    trigger: "manual",
    placement: placement,
    theme: "light",
  });

  // Verifica si el campo está vacío
  if (!username || !username.value.trim()) {
    username.classList.add("is-invalid");
    username.classList.remove("is-valid");
    tippyInstanceUsername.setContent(
      "El nombre de usuario no puede estar vacío."
    );
    tippyInstanceUsername.show();
    return false;
  }

  let valor = username.value.trim();

  // Verifica si el nombre contiene espacios
  if (/\s/.test(valor)) {
    valido = false;
    mensajesError.push("no debe contener espacios");
  }

  // Verifica si el nombre contiene caracteres especiales
  if (/[^a-zA-Z0-9]/.test(valor)) {
    valido = false;
    mensajesError.push("no debe contener caracteres especiales");
  }

  // Mostrar u ocultar el tooltip en función de la validez del campo
  if (!valido) {
    let mensajeError =
      "El nombre de usuario " + mensajesError.join(" y ") + ".";
    tippyInstanceUsername.setContent(mensajeError);
    tippyInstanceUsername.show();
    username.classList.add("is-invalid");
    username.classList.remove("is-valid");
  } else {
    tippyInstanceUsername.hide();
    username.classList.add("is-valid");
    username.classList.remove("is-invalid");
  }

  return valido;
}

// // Escuchar el evento 'input' para validar en tiempo real
// usernameInput.addEventListener('input', function() {
//     validarUsername(usernameInput);
// });



function validarEmail(email) {
    let valido = true;
    let mensajeError = "";

    // Detecta el tamaño de la pantalla
  let placement = window.matchMedia("(max-width: 1023px)").matches ? 'top' : 'right';
    
    // Inicializa tippy.js en el campo de correo electrónico
    let tippyInstanceEmail = tippy(email, {
      content: "",
      trigger: "manual",
      placement: placement,
      theme: "light",
    });
    
  // Verificar si el campo de email está vacío
  if (!email || !email.value) {
    email.className = "form-control is-invalid";
    mensajeError = "El correo no puede estar vacío.";
    tippyInstanceEmail.setContent(mensajeError);
    tippyInstanceEmail.show();
    return false;
  }

  let valor = email.value.trim();

  // Verificar la longitud del correo
  if (valor.length === 0 || valor.length > 100) {
    valido = false;
    mensajeError = "El correo debe tener entre 1 y 100 caracteres.";
  }

  // Validar el formato del correo electrónico
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
  if (!re.test(valor)) {
    valido = false;
    mensajeError =
      "El correo debe cumplir con el formato correcto (por ejemplo, usuario@dominio.com).";
  }

  // Mostrar u ocultar el tooltip en función de la validez del correo
  if (!valido) {
    email.className = "form-control is-invalid";
    tippyInstanceEmail.setContent(mensajeError);
    tippyInstanceEmail.show();
  } else {
    email.className = "form-control is-valid";
    tippyInstanceEmail.hide();
  }

  return valido;
}



function validarPassword(password) {
    let valido = true;
    let mensajesError = [];

    // Detecta el tamaño de la pantalla
    let placement = window.matchMedia("(max-width: 1023px)").matches ? 'top' : 'right';

    // Inicializa el tippy.js en el campo de contraseña (si no se ha inicializado previamente)
    if (!password.tippyInstance) {
        password.tippyInstance = tippy(password, {
            content: "",
            trigger: "manual", // Control manual del tooltip
            placement: placement, // Ubicación del tooltip
            theme: "material", // Tema visual del tooltip
        });
    } else {
        // Actualiza la ubicación del tooltip si ya está inicializado
        password.tippyInstance.setProps({
            placement: placement,
        });
    }

    // Verifica si el campo está vacío
    if (!password.value.trim()) {
        password.classList.add("is-invalid");
        password.classList.remove("is-valid");
        password.tippyInstance.setContent("La contraseña no puede estar vacía.");
        password.tippyInstance.show(); // Muestra el tooltip
        return false;
    }

    let valor = password.value.trim();

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
        mensajesError.push("y un carácter especial");
    }

    if (!valido) {
        // Si no es válido, mostrar los mensajes de error en el tooltip
        let mensajeError =
            "La contraseña debe tener " + mensajesError.join(", ") + ".";
        password.tippyInstance.setContent(mensajeError);
        password.tippyInstance.show(); // Muestra el tooltip inmediatamente
    } else {
        // Si es válida, ocultar el tooltip
        password.tippyInstance.hide();
    }

    // Cambia las clases del input para mostrar la validez visualmente
    password.className = valido
        ? "form-control is-valid"
        : "form-control is-invalid";
    
    return valido;
}

// Agregar un listener al campo de contraseña para validar en tiempo real
document.getElementById("password").addEventListener("input", function () {
    validarPassword(this);
});

// Ajustar el tooltip al cambiar el tamaño de la ventana
window.addEventListener("resize", function () {
    let passwordField = document.getElementById("password");
    if (passwordField.tippyInstance) {
        let placement = window.matchMedia("(max-width: 1023px)").matches ? 'top' : 'right';
        passwordField.tippyInstance.setProps({
            placement: placement,
        });
    }
});




function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
