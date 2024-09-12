function olvidarContrasena() {
    let email = document.getElementById("email").value;

    function validarEmail(email) {
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

    // Validar el campo de correo electrónico
    if (!validarEmail(document.getElementById("email"))) {
        return;
    }

    let formData = {
        "email": email
    };

    fetch(urlOlvideContrasena, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // No se necesita el encabezado 'X-CSRFToken' si usas JWT
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
