// Para el ojito de la contraseña
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});
function iniciarSesion() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let formData = {
        "email": email,
        "password": password
    };

    if (validarCamposLogin()) {
        fetch(urlLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.error || 'Error en el servidor');
                });
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            
          
            }).then(() => {
                window.location.href = urlBasicaFront + "TuVooz/tuVoozPrincipal/paginaPrincipal.html";
          
        })
        .catch(error => {
            Swal.fire({
                title: "Error",
                text: error.message || "Error al iniciar sesión",
                icon: "error"
            });
        });
    }
}

function validarCamposLogin() {
    var email = document.getElementById("email");
    var password = document.getElementById("password"); 
   
    return validarEmail(email) && validarPassword(password);
}

function validarEmail(email) {
    // Detecta el tamaño de la pantalla
    let placement = window.matchMedia("(max-width: 1023px)").matches ? 'top' : 'right';

    // Crea una instancia de Tippy con el posicionamiento adecuado
    let tippyInstanceEmail = tippy(email, {
        content: '',
        trigger: 'manual',
        placement: placement,  // Dinámicamente cambia la posición
        theme: 'material',
    });

    if (!email || !email.value) {
        email.className = "form-control is-invalid";
        tippyInstanceEmail.setContent('El correo electrónico es obligatorio.');
        tippyInstanceEmail.show();
        return false;
    }

    let valor = email.value.trim();
    let valido = true;

    valido = valor.length > 0 && valor.length <= 100;

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    valido = valido && re.test(valor);

    if (!valido) {
        email.className = "form-control is-invalid";
        tippyInstanceEmail.setContent('El correo electrónico no tiene un formato válido.');
        tippyInstanceEmail.show();
    } else {
        email.className = "form-control is-valid";
        tippyInstanceEmail.hide();
    }

    return valido;
}


function validarPassword(password) {
    let valor = password.value.trim();
    let valido = true;
    let mensajeError = "";

    // Detecta el tamaño de la pantalla
    let placement = window.matchMedia("(max-width: 1023px)").matches ? 'top' : 'right';

    // Crea o usa una instancia de Tippy con el posicionamiento adecuado
    if (!password.tippyInstance) {
        password.tippyInstance = tippy(password, {
            content: '',
            trigger: 'manual',
            placement: placement,  // Dinámicamente cambia la posición
            theme: 'material',
        });
    } else {
        // Actualiza la posición del tooltip
        password.tippyInstance.setProps({
            placement: placement,
        });
    }

    // Validaciones de la contraseña
    if (valor.length < 8 || valor.length > 20) {
        valido = false;
        mensajeError = "La contraseña debe tener entre 8 y 20 caracteres.";
    } else if (!/[A-Z]/.test(valor)) {
        valido = false;
        mensajeError = "La contraseña debe tener al menos una letra mayúscula.";
    } else if (!/[a-z]/.test(valor)) {
        valido = false;
        mensajeError = "La contraseña debe tener al menos una letra minúscula.";
    } else if (!/[0-9]/.test(valor)) {
        valido = false;
        mensajeError = "La contraseña debe tener al menos un número.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(valor)) {
        valido = false;
        mensajeError = "La contraseña debe tener al menos un carácter especial.";
    }

    // Muestra o oculta el tooltip basado en la validez
    if (!valido) {
        password.className = "form-control is-invalid";
        password.tippyInstance.setContent(mensajeError);
        password.tippyInstance.show();
    } else {
        password.className = "form-control is-valid";
        password.tippyInstance.hide();
    }

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


