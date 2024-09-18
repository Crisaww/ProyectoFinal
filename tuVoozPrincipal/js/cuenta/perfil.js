// // Función para decodificar un JWT
// function decodeJwt(token) {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
// }

// // Función para obtener el ID del usuario desde el token
// function getUserIdFromToken() {
//     const token = localStorage.getItem('authToken'); // O cómo sea que almacenes tu token
//     if (token) {
//         try {
//             const decodedToken = decodeJwt(token);
//             return decodedToken.user_id; // Ajusta según el campo del ID en tu token
//         } catch (e) {
//             console.error('Error al decodificar el token:', e);
//         }
//     } else {
//         console.error('No se encontró el token');
//     }
//     return null;
// }

// // Obtener el ID del usuario
// const userId = getUserIdFromToken();
// if (userId) {
//     // URL de la API
//     const userUrl = `http://127.0.0.1:8000/api/v1/infousers/${userId}/`;

//     // Obtener información del usuario
//     fetch(userUrl)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error en la respuesta de la API');
//             }
//             return response.json();
//         })
//         .then(data => {
//             document.getElementById('username').value = data.username;
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });

//     // Manejar el evento de clic en el botón de cambios
//     document.getElementById('btnCambios').addEventListener('click', function() {
//         const newUsername = document.querySelector('input[name="new-username"]').value;
//         const updateData = {
//             username: newUsername
//         };

//         fetch(userUrl, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + localStorage.getItem('authToken') // Incluye el token si es necesario
//             },
//             body: JSON.stringify(updateData)
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error en la respuesta de la API');
//             }
//             return response.json();
//         })
//         .then(data => {
//             alert('Cambios guardados');
//             // Actualiza el campo de nombre de usuario actual
//             document.getElementById('username').value = data.username;
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     });
// } else {
//     console.error('ID de usuario no disponible');
// }

document.addEventListener('DOMContentLoaded', function() {
    // Función para obtener el perfil del usuario
    async function obtenerPerfil() {
        try {
            const token = localStorage.getItem('access_token'); 
            if (!token) {
                throw new Error('Token no encontrado en el localStorage');
            }

            const response = await fetch(urlPerfil, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener el perfil');
            }

            const data = await response.json();
            console.log('Datos del perfil:', data);
            document.getElementById('username').value = data.username;
            document.getElementById('email').value = data.email;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    
    // Función para validar el nombre de usuario
function validarUsername(usernameInput) {
    let tippyInstanceUsername = tippy(usernameInput, {
        content: '',
        trigger: 'manual',
        placement: 'right',
        theme: 'material',
    });

    let valor = usernameInput.value.trim();
    let valido = true;
    let mensajesError = [];

    // Verifica si el nombre está vacío
    if (!valor) {
        usernameInput.className = "form-control is-invalid";
        tippyInstanceUsername.setContent('El nombre de usuario es obligatorio.');
        tippyInstanceUsername.show();
        return false;
    }

     // Verifica la longitud mínima (al menos 3 caracteres)
     if (valor.length < 3) {
        valido = false;
        mensajesError.push("El nombre de usuario debe contener al menos 3 caracteres.");
    }

    // Verifica la longitud del nombre
    if (valor.length > 50) { // Ajusta la longitud máxima según sea necesario
        valido = false;
        mensajesError.push("El nombre de usuario debe tener hasta 50 caracteres.");
    }

    // Verifica si el nombre contiene espacios
    if (/\s/.test(valor)) {
        valido = false;
        mensajesError.push("El nombre de usuario no debe contener espacios.");
    }

    // Verifica si el nombre contiene caracteres especiales
    if (/[^a-zA-Z0-9]/.test(valor)) {
        valido = false;
        // Solo añade el mensaje de caracteres especiales si ya no hay otros errores
        if (!mensajesError.some(msg => msg.includes("espacios"))) {
            mensajesError.push("El nombre de usuario no debe contener caracteres especiales.");
        }
    }

    if (!valido) {
        usernameInput.className = "form-control is-invalid";
        tippyInstanceUsername.setContent(mensajesError.join(' '));
        tippyInstanceUsername.show();
    } else {
        usernameInput.className = "form-control is-valid";
        tippyInstanceUsername.hide();
    }

    return valido;
}

// Función para actualizar el nombre de usuario
async function actualizarUsername() {
    try {
        const usernameInput = document.getElementById('new-username');

        // Validar nombre de usuario antes de enviar la solicitud
        if (!validarUsername(usernameInput)) {
            return;
        }

        const token = localStorage.getItem('access_token');
        if (!token) {
            throw new Error('Token no encontrado en el localStorage');
        }

        const nuevoUsername = usernameInput.value;

        const response = await fetch(urlPerfil, {
            method: 'PATCH',  // Cambia el método si es necesario para tu API
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                'username': nuevoUsername
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al actualizar el nombre de usuario');
        }

        Swal.fire({
            title: 'Éxito',
            text: 'Nombre de usuario actualizado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            window.location.reload();
        });

    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error',
            text: 'No se pudo actualizar el nombre de usuario',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}




// Función para validar el correo electrónico
function validarEmailInput(emailInput) {
    let tippyInstanceEmail = tippy(emailInput, {
        content: '',
        trigger: 'manual',
        placement: 'right',
        theme: 'material',
    });

    if (!emailInput || !emailInput.value) {
        emailInput.className = "form-control is-invalid";
        tippyInstanceEmail.setContent('El correo electrónico es obligatorio.');
        tippyInstanceEmail.show();
        return false;
    }

    let valor = emailInput.value.trim();
    let valido = valor.length > 0 && valor.length <= 100;

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    valido = valido && re.test(valor);

    if (!valido) {
        emailInput.className = "form-control is-invalid";
        tippyInstanceEmail.setContent('El correo electrónico no tiene un formato válido.');
        tippyInstanceEmail.show();
    } else {
        emailInput.className = "form-control is-valid";
        tippyInstanceEmail.hide();
    }

    return valido;
}

// Función para actualizar el correo electrónico
async function actualizarEmail() {
    try {
        const emailInput = document.getElementById('new-email');

        // Validar correo electrónico antes de enviar la solicitud
        if (!validarEmailInput(emailInput)) {
            return;
        }

        const token = localStorage.getItem('access_token');
        if (!token) {
            throw new Error('Token no encontrado en el localStorage');
        }

        const nuevoEmail = emailInput.value;

        const response = await fetch(urlPerfil, {
            method: 'PATCH',  // Cambia el método si es necesario para tu API
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                'email': nuevoEmail
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al actualizar el correo electrónico');
        }

        Swal.fire({
            title: 'Éxito',
            text: 'Correo electrónico actualizado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            window.location.reload();
        });

    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error',
            text: 'No se pudo actualizar el correo electrónico',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}


    // Obtener perfil cuando se cargue la página
    obtenerPerfil();

    // Evento para actualizar el nombre de usuario al hacer clic en el botón correspondiente
    const btnActualizarUsername = document.getElementById('btnActualizarUsername');
    btnActualizarUsername.addEventListener('click', function(event) {
        event.preventDefault();
        actualizarUsername();
    });

    // Evento para actualizar el correo electrónico al hacer clic en el botón correspondiente
    const btnActualizarEmail = document.getElementById('btnActualizarEmail');
    btnActualizarEmail.addEventListener('click', function(event) {
        event.preventDefault();
        actualizarEmail();
    });
});

