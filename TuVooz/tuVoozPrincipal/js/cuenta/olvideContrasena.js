function olvidarContrasena() {
    let emailElement = document.getElementById("email");
    let email = emailElement.value;

    // Función para validar el email con el ajuste de Tippy para pantallas pequeñas
    function validarEmail(emailElement) {
        let valor = emailElement.value.trim();
        let valido = true;
        let mensajeError = "";

        // Detecta el tamaño de la pantalla para ajustar la posición del Tippy
        let placement = window.matchMedia("(max-width: 1023px)").matches ? 'top' : 'right';

        // Crea o usa una instancia de Tippy con el posicionamiento adecuado
        if (!emailElement.tippyInstance) {
            emailElement.tippyInstance = tippy(emailElement, {
                content: '',
                trigger: 'manual',
                placement: placement,  // Cambia dinámicamente la posición
                theme: 'material',
            });
        } else {
            // Actualiza la posición del tooltip si ya existe
            emailElement.tippyInstance.setProps({
                placement: placement,
            });
        }

        // Verifica si el campo está vacío
        if (!valor) {
            valido = false;
            mensajeError = 'El correo electrónico es obligatorio.';
        } else {
            // Verifica la longitud del email
            valido = valor.length > 0 && valor.length <= 100;

            // Expresión regular para validar el formato del email
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
            valido = valido && re.test(valor);

            if (!valido) {
                mensajeError = 'El correo electrónico no tiene un formato válido.';
            }
        }

        // Muestra o oculta el tooltip basado en la validez
        if (!valido) {
            emailElement.className = "form-control is-invalid";
            emailElement.tippyInstance.setContent(mensajeError);
            emailElement.tippyInstance.show();
        } else {
            emailElement.className = "form-control is-valid";
            emailElement.tippyInstance.hide();
        }

        return valido;
    }

    // Agregar un listener al campo de email para validar en tiempo real
    emailElement.addEventListener("input", function () {
        validarEmail(this);
    });

    // Ajustar el tooltip al cambiar el tamaño de la ventana
    window.addEventListener("resize", function () {
        if (emailElement.tippyInstance) {
            let placement = window.matchMedia("(max-width: 1023px)").matches ? 'top' : 'right';
            emailElement.tippyInstance.setProps({
                placement: placement,
            });
        }
    });

    // Llama a la función de validación antes de enviar el formulario
    if (!validarEmail(emailElement)) {
        return; // Detiene la ejecución si el email no es válido
    }

    let formData = {
        "email": email
    };

    // Realiza la solicitud para olvidar la contraseña
    fetch(urlOlvideContrasena, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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

