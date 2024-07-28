let url="http://127.0.0.1:8000/tuvooz/api/v1/registro";

//para el ojito de la contraseña
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});
function registrarUsuario() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let formData = {
        "username": username,
        "email": email,
        "password": password
    };
    console.log(formData);
    if (validarCampos()) {
        let token = localStorage.getItem('authToken'); // Recuperar el token de localStorage

        fetch(url, { 
            method: 'POST',
            headers: {
                'Authorization': 'Token '+token, 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.status === 401) {
                // El usuario ya está registrado
                return response.json().then(data => {
                    Swal.fire({
                        title: "Advertencia",
                        text: "El usuario ya está registrado.",
                        icon: "warning"
                    });
                    return Promise.reject('Usuario ya registrado'); // Rechazar la promesa para detener el flujo
                });
            } else if (!response.ok) {
                throw new Error('La respuesta de la red no fue correcta');
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                title: "Excelente",
                text: "Se ha registrado exitosamente",
                icon: "success"
            });
            // window.location.href = "http://192.168.140.176:5500/front_end/listacliente.html";
        })
        .catch(error => {
            if (error !== 'Usuario ya registrado') {
                Swal.fire("Error", "Error al guardar: " + error, "error");
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
function validarCampos() {
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password"); 
   
    return validarUsername(username) && validarPassword(password) && validarEmail(email);
}

function validarUsername(username) {
    if (!username || !username.value) {
        username.className = "form-control is-invalid";
        return false;
    }

    let valor = username.value.trim();
    let valido = valor.length > 0 && valor.length <= 100;

    username.className = valido ? "form-control is-valid" : "form-control is-invalid";
    return valido;
}

function validarPassword(password) {
    let errorDiv = document.getElementById('password-error');
    let valor = password.value.trim();
    let valido = true;
    let mensajeError = "";

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

    password.className = valido ? "form-control is-valid" : "form-control is-invalid";
    errorDiv.textContent = mensajeError;
    errorDiv.style.display = valido ? 'none' : 'block';
    return valido;
}

function validarEmail(email) {
    let errorDiv = document.getElementById('email-error');
    if (!email || !email.value) {
        email.className = "form-control is-invalid";
        errorDiv.style.display = 'block';
        return false;
    }

    let valor = email.value.trim();
    let valido = true;

    // Longitud mínima de 1 y máxima de 100 caracteres
    valido = valor.length > 0 && valor.length <= 100;

    // Validar formato de correo electrónico
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    valido = valido && re.test(valor);

    email.className = valido ? "form-control is-valid" : "form-control is-invalid";
    errorDiv.style.display = valido ? 'none' : 'block';
    return valido;
}

