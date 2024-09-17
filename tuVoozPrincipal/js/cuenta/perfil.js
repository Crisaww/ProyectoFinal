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
    async function obtenerPerfil() {
        try {
            const token = localStorage.getItem('access_token'); 
            if (!token) {
                throw new Error('Token no encontrado en el localStorage');
            }

            const response = await fetch(urlPerfil, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener el perfil');
            }

            const data = await response.json();
            console.log('Datos del perfil:', data);  // Verifica lo que se está recibiendo
            document.getElementById('username').value = data.username;
            document.getElementById('email').value = data.email;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    obtenerPerfil();  // Ejecuta la función para obtener el perfil
});




async function actualizarUsername() {
    const nuevoUsername = document.getElementById('new-username').value;

    try {
        const response = await fetch(urlActualizarUsername, { // Asegúrate de tener esta ruta configurada en Django
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ new_username: nuevoUsername })
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el nombre de usuario');
        }

        alert('Nombre de usuario actualizado con éxito');
    } catch (error) {
        console.error('Error:', error);
    }
}
