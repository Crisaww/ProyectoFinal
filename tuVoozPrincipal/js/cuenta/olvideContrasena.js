function olvidarContrasena() {
    let emailElement = document.getElementById("email");
    let email = emailElement.value;

    // Función para validar el email
    function validarEmail(emailElement) {
        let tippyInstanceEmail = tippy(emailElement, {
            content: '',
            trigger: 'manual',
            placement: 'right',
            theme: 'material',
        });

        // Validar si el campo de email está vacío
        if (!emailElement.value) {
            emailElement.className = "form-control is-invalid";
            tippyInstanceEmail.setContent('El correo electrónico es obligatorio.');
            tippyInstanceEmail.show();
            return false;
        }

        let valor = emailElement.value.trim();
        let valido = valor.length > 0 && valor.length <= 100;

        // Expresión regular para validar el formato del correo
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
        valido = valido && re.test(valor);

        if (!valido) {
            emailElement.className = "form-control is-invalid";
            tippyInstanceEmail.setContent('El correo electrónico no tiene un formato válido.');
            tippyInstanceEmail.show();
        } else {
            emailElement.className = "form-control is-valid";
            tippyInstanceEmail.hide();
        }

        return valido;
    }

    // Validar el campo de correo electrónico
    if (!validarEmail(emailElement)) {
        return;
    }

    let formData = {
        "email": email
    };

    fetch(urlOlvideContrasena, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Si no estás usando JWT ni autenticación por token, necesitas incluir CSRF Token aquí:
            'X-CSRFToken': getCookie('csrftoken')  // Solo si es necesario
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 404) {
            return response.json().then(data => {
                Swal.fire({
                    title: "Error",
                    text: "No se encontró un usuario con ese correo electrónico.",
                    icon: "error"
                });
                return Promise.reject('Usuario no encontrado');
            });
        } else {
            throw new Error('Error en la red');
        }
    })
    .then(data => {
        Swal.fire({
            title: "Éxito",
            text: "Se ha enviado un enlace para restablecer la contraseña a su correo electrónico.",
            icon: "success"
        });
    })
    .catch(error => {
        if (error !== 'Usuario no encontrado') {
            Swal.fire("Error", "Error al enviar el correo: " + error, "error");
        }
    });
}

// Función para obtener el CSRF token si es necesario (solo si usas sesiones con Django)
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
