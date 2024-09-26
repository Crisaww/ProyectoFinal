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
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.status === 401 ||response.status === 404) {
                return response.json().then(data => {
                    Swal.fire({
                        title: "Advertencia",
                        text: "Credenciales incorrectas.",
                        icon: "warning"
                    });
                    throw new Error('Credenciales incorrectas');
                });
            } else if (!response.ok) {
                throw new Error('La respuesta de la red no fue correcta');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('showLoginMessage', 'true'); 
            localStorage.setItem('access_token', data.access); // guarda el token
            localStorage.setItem('refresh_token', data.refresh); // lo actualiza
            window.location.href = urlBasicaFront+"TuVooz/tuVoozPrincipal/paginaPrincipal.html";
        })
        .catch(error => {
            if (error.message !== 'Credenciales incorrectas') {
                Swal.fire("Error", "Error al iniciar sesión: " + error.message, "error");
            }
        });
    } else {
        Swal.fire({
            title: "Error!",
            text: "Complete los campos correctamente",
            icon: "error"
        });
    }
}



function validarCamposLogin() {
    var email = document.getElementById("email");
    var password = document.getElementById("password"); 
   
    return validarEmail(email) && validarPassword(password);
}

function validarEmail(email) {
    let errorDiv = document.getElementById('email-error');
    let tippyInstanceEmail = tippy(email, {
        content: '',
        trigger: 'manual',
        placement: 'right',
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
    let errorDiv = document.getElementById('password-error');
    let valor = password.value.trim();
    let valido = true;
    let mensajeError = "";

    let tippyInstancePassword = tippy(password, {
        content: '',
        trigger: 'manual',
        placement: 'right',
        theme: 'material',
    });

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

    if (!valido) {
        password.className = "form-control is-invalid";
        tippyInstancePassword.setContent(mensajeError);
        tippyInstancePassword.show();
    } else {
        password.className = "form-control is-valid";
        tippyInstancePassword.hide();
    }

    return valido;
}

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


