
const token = localStorage.getItem('token');

if (!token) {
    console.log("No token found. User needs to log in.");
} else {
    // Hacer la petición AJAX para obtener el perfil del usuario
    $.ajax({
        url: urlPerfil,  // Cambia esto a la URL de tu API
        type: 'POST',         // Debe ser POST porque tu view es POST
        headers: {
            'Authorization': 'Token ' + token,  // Añade el token en el encabezado
        },
        success: function(response) {
            console.log(response);  // Verifica la respuesta en la consola
            // Mostrar los datos del perfil en la página
            $('#perfil-info').html(`
                <p>Email: ${response.email}</p>
                <p>Usuario: ${response.username}</p>
                <p>Nombre: ${response.first_name} ${response.last_name}</p>
                <p>Fecha de nacimiento: ${response.fecha_nacimiento}</p>
                <p>Miembro desde: ${response.date_joined}</p>
            `);
        },
        error: function(xhr, status, error) {
            console.error("Error:", xhr.responseText);
        }
    });
}