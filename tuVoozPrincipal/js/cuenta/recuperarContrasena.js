async function restablecerContrasena() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden.',
        });
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/restablecerContrasena/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token, new_password: password })
        });

        if (response.ok) {
            const data = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: data.message,
            }).then(() => {
                window.location.href = './iniciarSesion.html';
            });
        } else {
            const errorData = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorData.error,
            });
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al procesar la solicitud.',
        });
    }
}