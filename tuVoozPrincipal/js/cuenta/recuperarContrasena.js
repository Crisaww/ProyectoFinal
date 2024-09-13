async function restablecerContrasena() {
    // Obtener token y uid de los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const uid = urlParams.get('uid'); // Captura el uid si lo necesitas

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
        const response = await fetch('http://127.0.0.1:8000/api/v1/restablecerContrasena/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                token: token, 
                uid: uid,  // Enviar también el uid si es necesario
                new_password: password 
            })
        });

        // Procesar la respuesta
        if (response.ok) {
            const data = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: data.message,
            }).then(() => {
                window.location.href = './iniciarSesion.html'; // Redirigir al inicio de sesión
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
