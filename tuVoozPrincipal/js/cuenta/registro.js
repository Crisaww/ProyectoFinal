 //let url = "http://127.0.0.1:8000/tuvooz/api/v1/registro";
//let url = "http://10.192.66.56:8000/tuvooz/api/v1/registro";

// Para el ojito de la contraseña
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

    if (validarCampos()) {
        document.querySelector('.loader').style.display = 'block';
        fetch(urlRegistro, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.status === 401) {
                return response.json().then(data => {
                    Swal.fire({
                        title: "Advertencia",
                        text: "El usuario ya está registrado.",
                        icon: "warning"
                    });
                    return Promise.reject('Usuario ya registrado');
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
            // Redirigir al usuario a otra página si es necesario
            // window.location.href = "http://192.168.140.176:5500/front_end/listacliente.html";
        })
        .catch(error => {
            if (error !== 'Usuario ya registrado') {
                Swal.fire("Error", "Error al registrar: " + error, "error");
            }
        }).finally(() => {
            // Ocultar el loader independientemente del resultado
            document.querySelector('.loader').style.display = 'none';
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
    let errorDiv = document.getElementById('username-error');  
    let valido = true;
    let mensajesError = []; 

    if (!username || !username.value.trim()) {
        username.classList.add("is-invalid");
        username.classList.remove("is-valid");
        errorDiv.textContent = "El nombre de usuario no puede estar vacío.";
        errorDiv.style.display = 'block';
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

    if (!valido) {
        let mensajeError = "El nombre de usuario " + mensajesError.join(' y ') + ".";
        errorDiv.textContent = mensajeError;
        errorDiv.style.display = 'block';
        username.classList.add("is-invalid");
        username.classList.remove("is-valid");
    } else {
        errorDiv.textContent = "";
        errorDiv.style.display = 'none';
        username.classList.add("is-valid");
        username.classList.remove("is-invalid");
    }

    return valido;
}

    

// function validarPassword(password) {
//     let errorDiv = document.getElementById('password-error');
//     let valor = password.value.trim();
//     let valido = true;
//     let mensajeError = "";

//     if (valor.length < 8 || valor.length > 20) {
//         valido = false;
//         mensajeError = "La contraseña debe tener entre 8 y 20 caracteres.";
//     } else if (!/[A-Z]/.test(valor)) {
//         valido = false;
//         mensajeError = "La contraseña debe tener al menos una letra mayúscula.";
//     } else if (!/[a-z]/.test(valor)) {
//         valido = false;
//         mensajeError = "La contraseña debe tener al menos una letra minúscula.";
//     } else if (!/[0-9]/.test(valor)) {
//         valido = false;
//         mensajeError = "La contraseña debe tener al menos un número.";
//     } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(valor)) {
//         valido = false;
//         mensajeError = "La contraseña debe tener al menos un carácter especial.";
//     }

//     password.className = valido ? "form-control is-valid" : "form-control is-invalid";
//     errorDiv.textContent = mensajeError;
//     errorDiv.style.display = valido ? 'none' : 'block';
//     return valido;
// }

function validarPassword(password) {
    let errorDiv = document.getElementById('password-error');
    let valor = password.value.trim();
    let valido = true;
    let mensajesError = [];

    if (valor.length < 8 || valor.length > 20) {
        valido = false;
        mensajesError.push("entre 8 y 20 caracteres");
    }
    if (!/[A-Z]/.test(valor)) {
        valido = false;
        mensajesError.push("una letra mayúscula");
    }
    if (!/[a-z]/.test(valor)) {
        valido = false;
        mensajesError.push("una letra minúscula");
    }
    if (!/[0-9]/.test(valor)) {
        valido = false;
        mensajesError.push("tambien debe tener al menos un número");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(valor)) {
        valido = false;
        mensajesError.push("y un carácter especial");
    }

    if (!valido) {
        let mensajeError = "La contraseña debe tener " + mensajesError.join(', ') + ".";
        errorDiv.textContent = mensajeError;
        errorDiv.style.display = 'block';
    } else {
        errorDiv.textContent = "";
        errorDiv.style.display = 'none';
    }

    password.className = valido ? "form-control is-valid" : "form-control is-invalid";
    return valido;
}



function validarEmail(email) {
    let errorDiv = document.getElementById('email-error');
    
    // Verificar si el campo de email está vacío
    if (!email || !email.value) {
        email.className = "form-control is-invalid";
        errorDiv.style.display = 'block';
        errorDiv.textContent = "El correo no puede estar vacío.";
        return false;
    }

    let valor = email.value.trim();
    let valido = true;
    let mensajeError = '';

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

    // Actualizar la clase del campo y el mensaje de error
    email.className = valido ? "form-control is-valid" : "form-control is-invalid";
    errorDiv.style.display = valido ? 'none' : 'block';
    errorDiv.textContent = valido ? '' : mensajeError;

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

