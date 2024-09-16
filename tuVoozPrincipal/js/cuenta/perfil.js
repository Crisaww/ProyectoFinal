
// const token = localStorage.getItem('token');

// if (!token) {
//     console.log("No token found. User needs to log in.");
// } else {
//     // Hacer la petición AJAX para obtener el perfil del usuario
//     $.ajax({
//         url: urlPerfil, 
//         type: 'POST',         
//         headers: {
//             'Authorization': 'Token ' + token,  // Añade el token en el encabezado
//         },
//         success: function(response) {
//             console.log(response);  // Verifica la respuesta en la consola
//             // Mostrar los datos del perfil en la página
//             $('#perfil-info').html(`
//                 <p>Email: ${response.email}</p>
//                 <p>Usuario: ${response.username}</p>
//                 <p>Nombre: ${response.first_name} ${response.last_name}</p>
//                 <p>Fecha de nacimiento: ${response.fecha_nacimiento}</p>
//                 <p>Miembro desde: ${response.date_joined}</p>
//             `);
//         },
//         error: function(xhr, status, error) {
//             console.error("Error:", xhr.responseText);
//         }
//     });
// }

// Función para obtener los datos del perfil del usuario
function obtenerPerfilUsuario() {
    $.ajax({
        url: urlPerfilNombre,  // Ruta de tu API que devuelve los datos del perfil
        method: 'GET',  // Método GET para obtener los datos
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),  // Incluye el token JWT
        },
        success: function(response) {
            // Rellenar el campo "Nombre de usuario actual" con el nombre de usuario del perfil y hacerlo readonly
            $('#username').val(response.username).attr('readonly', true);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error al cargar el perfil:", jqXHR.responseText, textStatus, errorThrown);
            alert("Error al cargar el perfil. Por favor, inténtelo de nuevo más tarde.");
        }
    });
}

$(document).ready(function() {
    obtenerPerfilUsuario();
});

