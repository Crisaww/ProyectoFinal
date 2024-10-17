// Para el ojito de la contraseña
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

function iniciarSesion() {
    let identifier = document.getElementById("identifier").value;
    let password = document.getElementById("password").value;

    let formData = {
        "identifier": identifier,  // Puede ser email o username
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
            if (data.user) {
                localStorage.setItem('user_data', JSON.stringify(data.user));
            }
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
    var identifier = document.getElementById("identifier");
    var password = document.getElementById("password"); 
   
    return validarIdentifier(identifier) && validarPassword(password);
}

function validarIdentifier(identifier) {
    let placement = window.matchMedia("(max-width: 1023px)").matches ? 'top' : 'right';

    let tippyInstanceIdentifier = tippy(identifier, {
        content: '',
        trigger: 'manual',
        placement: placement,
        theme: 'material',
    });

    if (!identifier || !identifier.value.trim()) {
        identifier.className = "form-control is-invalid";
        tippyInstanceIdentifier.setContent('El usuario o correo electrónico es obligatorio.');
        tippyInstanceIdentifier.show();
        return false;
    }

    let valor = identifier.value.trim();
    let valido = true;
    let mensajesError = [];

    // Validar longitud
    if (valor.length === 0 || valor.length > 100) {
        valido = false;
        mensajesError.push('No debe tener más de 100 caracteres');
    }

    // Verificar si tiene espacios
    if (/\s/.test(valor)) {
        valido = false;
        mensajesError.push('No debe contener espacios');
    }

    // Verificar si es email o username
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;  // Username de 3 a 30 caracteres

    if (!emailRegex.test(valor) && !usernameRegex.test(valor)) {
        valido = false;
        mensajesError.push('Ingrese un correo electrónico o nombre de usuario válido');
    }

    // Mostrar mensajes de error
    if (!valido) {
        identifier.className = "form-control is-invalid";
        tippyInstanceIdentifier.setContent(mensajesError.join(' y ') + '.');
        tippyInstanceIdentifier.show();
    } else {
        identifier.className = "form-control is-valid";
        tippyInstanceIdentifier.hide();
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

// Agregar listener para validación en tiempo real del identifier
document.getElementById("identifier").addEventListener("input", function () {
    validarIdentifier(this);
});

// Ajustar tooltips al cambiar tamaño de ventana
window.addEventListener("resize", function () {
    let identifierField = document.getElementById("identifier");
    let passwordField = document.getElementById("password");
    
    let placement = window.matchMedia("(max-width: 1023px)").matches ? 'top' : 'right';
    
    if (identifierField.tippyInstance) {
        identifierField.tippyInstance.setProps({ placement });
    }
    if (passwordField.tippyInstance) {
        passwordField.tippyInstance.setProps({ placement });
    }
});

// Función para deshabilitar el pegado y mostrar el tippy instantáneamente
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
  
  // Deshabilita el pegado en ambos campos
  deshabilitarPegado(passwordField);

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


