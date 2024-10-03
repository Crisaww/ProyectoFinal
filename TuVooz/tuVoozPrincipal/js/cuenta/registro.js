// Para el ojito de la contraseña
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Para el campo de confirmar contraseña
document.getElementById('toggleConfirmPassword').addEventListener('click', function () {
    const confirmPasswordField = document.getElementById('confirmPassword');
    const type = confirmPasswordField.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordField.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Inicializa los tippy para el campo de confirmar contraseña
const confirmPasswordInput = document.getElementById('confirmPassword');
let tippyInstanceConfirm = tippy(confirmPasswordInput, {
    content: '',
    trigger: 'manual',  // Control manual del tooltip
    placement: 'right', // Ubicación del tooltip
    theme: 'material',  // Tema visual del tooltip
});

function validarPasswordIguales() {
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirmPassword');

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

// Listener para validar en tiempo real
confirmPasswordInput.addEventListener('input', validarPasswordIguales);

// Listener para ocultar el tippy si el usuario cambia la contraseña principal
document.getElementById('password').addEventListener('input', function() {
    tippyInstanceConfirm.hide();
});

// Actualizar la función para registrar el usuario
function registrarUsuario() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let formData = {
        "username": username,
        "email": email,
        "password": password
    };

    if (validarCampos()) {
        fetch(urlRegistro, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.status === 226) {
                return response.json().then(data => {
                    // Muestra una alerta específica si el usuario ya está registrado
                    Swal.fire({
                        title: "Advertencia",
                        text: "El nombre de usuario ya está registrado.",
                        icon: "warning"
                    });
                    return Promise.reject('Usuario ya registrado');
                });
            } else if (!response.ok) {
                return response.json().then(data => {
                    Swal.fire("Error", data.error || "Error al registrar: " + response.statusText, "error");
                    throw new Error(data.error);
                });
            }
            return response.json();
        })
        .then(data => {
            // Almacenar el token JWT en el localStorage
            localStorage.setItem('accessToken', data.access);
            
            Swal.fire({
                title: "Excelente",
                text: "Se ha registrado exitosamente, \npor favor, revisa tu correo electrónico",
                icon: "success"
            }).then(() => {
                // Redirigir al inicio de sesión después de mostrar el mensaje
                window.location.href = urlInicioSesion;
            });
        })
        .catch(error => {
            if (error !== 'Usuario ya registrado') {
                console.error(error);
            }
        });
    } else {
        Swal.fire({
            title: "¡Atención!",
            text: "Complete los campos correctamente",
            icon: "warning"
        });
    }
}
// Modificar validarCampos para incluir validarPasswordIguales()
function validarCampos() {
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    return validarUsername(username) && validarPassword(password) && validarEmail(email) && validarPasswordIguales();
}

// Resto del código de validación se mantiene igual...

// Inicializa tippy.js en el campo de nombre de usuario
const usernameInput = document.getElementById('username');
let tippyInstanceUsername = tippy(usernameInput, {
    content: '',
    trigger: 'manual',
    placement: 'right',
    theme: 'light',
});

function validarUsername(username) {
    let valido = true;
    let mensajesError = [];

    // Verifica si el campo está vacío
    if (!username || !username.value.trim()) {
        username.classList.add("is-invalid");
        username.classList.remove("is-valid");
        tippyInstanceUsername.setContent("El nombre de usuario no puede estar vacío.");
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
        let mensajeError = "El nombre de usuario " + mensajesError.join(' y ') + ".";
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

// Escuchar el evento 'input' para validar en tiempo real
usernameInput.addEventListener('input', function() {
    validarUsername(usernameInput);
});

// Inicializa el tippy.js en el campo de contraseña
const passwordInput = document.getElementById('password');
let tippyInstance = tippy(passwordInput, {
    content: '',
    trigger: 'manual',  // Control manual del tooltip
    placement: 'right', // Ubicación del tooltip
    theme: 'material',  // Tema visual del tooltip
});

function validarPassword(password) {
    let valido = true;
    let mensajesError = [];
    
    // Verifica si el campo está vacío
    if (!password || !password.value.trim()) {
        password.classList.add("is-invalid");
        password.classList.remove("is-valid");
        tippyInstance.setContent("La contraseña no puede estar vacía.");
        tippyInstance.show(); // Muestra el tooltip
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
        let mensajeError = "La contraseña debe tener " + mensajesError.join(', ') + ".";
        tippyInstance.setContent(mensajeError);
        tippyInstance.show();
    } else {
        // Si es válida, ocultar el tooltip
        tippyInstance.hide();
    }

    // Cambia las clases del input para mostrar la validez visualmente
    password.className = valido ? "form-control is-valid" : "form-control is-invalid";
    return valido;
}

// Agregar un listener para que la validación ocurra en tiempo real
passwordInput.addEventListener('input', function() {
    validarPassword(passwordInput);
});


// Escucha el evento 'input' para validar en tiempo real
passwordInput.addEventListener('input', function() {
    validarPassword(passwordInput);
});


// Inicializa tippy.js en el campo de correo electrónico
const emailInput = document.getElementById('email');
let tippyInstanceEmail = tippy(emailInput, {
    content: '',
    trigger: 'manual',
    placement: 'right',
    theme: 'light',
});

function validarEmail(email) {
    let valido = true;
    let mensajeError = '';

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
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    if (!re.test(valor)) {
        valido = false;
        mensajeError = "El correo debe cumplir con el formato correcto (por ejemplo, usuario@dominio.com).";
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

// Escuchar el evento 'input' para validar en tiempo real
emailInput.addEventListener('input', function() {
    validarEmail(emailInput);
});


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

