async function restablecerContrasena() {
    // Obtener token y uid de los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const uid = urlParams.get('uid'); // Captura el uid desde la URL

    // Validar que se reciban los parámetros necesarios
    if (!token || !uid) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El enlace de restablecimiento no es válido o ha expirado.',
        });
        return;
    }

    // Obtener los valores de las contraseñas
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden.',
        });
        return;
    }

    // Validar la longitud de la contraseña (mínimo 8 caracteres)
    if (password.length < 8) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La contraseña debe tener al menos 8 caracteres.',
        });
        return;
    }

    try {
        // Enviar la solicitud al backend
        const response = await fetch(urlRestabkecerContrasena, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                token: token, 
                uid: uid,  // Enviar también el uid para identificar al usuario
                new_password: password // Enviar la nueva contraseña
            })
        });

        // Procesar la respuesta
        if (response.ok) {
            const data = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: data.message, // Mostrar el mensaje de éxito del backend
            }).then(() => {
                window.location.href = './recuperarContrasena.html'; // Redirigir a la página de recuperación de contraseña
            });
        } else {
            // Manejar errores del servidor
            const errorData = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorData.error || 'Hubo un problema al restablecer la contraseña.',
            });
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al procesar la solicitud. Por favor, inténtelo nuevamente.',
        });
    }
}
