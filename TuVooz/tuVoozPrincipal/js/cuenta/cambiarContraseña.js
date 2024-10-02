document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            const icon = this.querySelector('i');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('bi-eye-slash');
                icon.classList.add('bi-eye');
            }
        });
    });
});
// Función de validación de contraseña
function validarPassword(password) {
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

// Agregar event listeners para validación en tiempo real
document.getElementById('nuevaContrasena').addEventListener('input', function() {
    validarPassword(this);
});

document.getElementById('confirmarContrasena').addEventListener('input', function() {
    const nuevaContrasena = document.getElementById('nuevaContrasena');
    
    if (this.value !== nuevaContrasena.value) {
        this.className = "form-control is-invalid";
        if (this._tippy) {  // Verifica si _tippy existe
            this._tippy.setContent('Las contraseñas no coinciden');
            this._tippy.show();
        }
    } else {
        this.className = "form-control is-valid";
        if (this._tippy) {
            this._tippy.hide();
        }
    }
});

// Inicializar Tippy para los campos de contraseña
tippy('#nuevaContrasena', {
    content: 'Ingrese la nueva contraseña',
    placement: 'right',
    trigger: 'manual'
});

tippy('#confirmarContrasena', {
    content: 'Confirme la nueva contraseña',
    placement: 'right',
    trigger: 'manual'
});

async function cambiarContrasena() {
    const currentPasswordInput = document.getElementById('contrasenaActual');
    const newPasswordInput = document.getElementById('nuevaContrasena');
    const confirmPasswordInput = document.getElementById('confirmarContrasena');

    // Validar que se haya ingresado la contraseña actual
    if (!currentPasswordInput.value.trim()) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingrese su contraseña actual'
        });
        return;
    }

    // Validar la nueva contraseña
    if (!validarPassword(newPasswordInput)) {
        return;
    }

    // Validar que ambas contraseñas nuevas coincidan
    if (newPasswordInput.value !== confirmPasswordInput.value) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas nuevas no coinciden'
        });
        return;
    }

    try {
        const response = await fetch(urlCambiarContrasenna, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            },
            body: JSON.stringify({
                current_password: currentPasswordInput.value,
                new_password: newPasswordInput.value,
                confirm_password: confirmPasswordInput.value
            })
        });

        const data = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Contraseña cambiada exitosamente'
            }).then(() => {
               // Redireccionar al usuario a la página de inicio de sesión
                window.location.href = urlInicioSesion;
            });
    
            if (data.access) localStorage.setItem('access_token', data.access);
            if (data.refresh) localStorage.setItem('refresh_token', data.refresh);
        } else {
            throw new Error(data.error || 'Error al cambiar la contraseña');
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message
        });
    }
}
// Función para obtener el token JWT
async function obtenerToken(username, password) {
    try {
        const response = await fetch(urlObtenerToken, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            return true;
        } else {
            throw new Error(data.detail || 'Error al obtener el token');
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}



// Función para refrescar el token
async function refreshToken() {
    try {
        const response = await fetch(urlRefrescarToken, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: localStorage.getItem('refresh_token') })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('access_token', data.access);
            return true;
        } else {
            throw new Error('No se pudo refrescar el token');
        }
    } catch (error) {
        console.error('Error al refrescar el token:', error);
        return false;
    }
}

