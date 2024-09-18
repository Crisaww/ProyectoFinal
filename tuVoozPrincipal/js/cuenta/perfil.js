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

    // Función para actualizar el nombre de usuario
    async function actualizarUsername() {
        try {
            const token = localStorage.getItem('access_token'); 
            if (!token) {
                throw new Error('Token no encontrado en el localStorage');
            }

            const nuevoUsername = document.getElementById('new-username').value;

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

    // Función para actualizar el correo electrónico
    async function actualizarEmail() {
        try {
            const token = localStorage.getItem('access_token'); 
            if (!token) {
                throw new Error('Token no encontrado en el localStorage');
            }

            const nuevoEmail = document.getElementById('new-email').value;

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

