let urlBasica= "http://127.0.0.1:8000/"
let urlBasicaFront ="http://127.0.0.1:5502/" 
//let urlBasicaFront ="http://tuvooz.com/" 
//let urlBasica="http://5.183.11.147:8000/";//ip servidor
//let urlBasica="http://192.168.17.3:8000/";
let urlLogin= urlBasica+"tuvooz/api/v1/iniciarSesion";
let urlRegistro=urlBasica+"tuvooz/api/v1/registro";
let urlPerfil = urlBasica+"tuvooz/api/v1/perfil/";
let urlActualizarUsername = urlBasica+"tuvooz/api/v1/actualizarUsername/";
// let urlPerfilNombre = urlBasica+"tuvooz/api/v1/nombre/";
let urlOlvideContrasena = urlBasica+"tuvooz/api/v1/olvideContrasena/";
let urlRestablecerContrasena = urlBasica+"tuvooz/api/v1/restablecerContrasena/";
let urlCerrarSesion = urlBasica + "tuvooz/api/v1/logout/";
let urlGenerarTexto=urlBasica+"synthesize/";
let urlRefrescarToken = urlBasica + "api/token/refresh/";
let urlObtenerToken = urlBasica + "api/token/";
let urlCambiarContrasenna = urlBasica + "tuvooz/api/v1/cambiarContrasenna/";
let urlInicioSesion = urlBasicaFront +"TuVooz/tuVoozPrincipal/cuenta/iniciarSesion.html";
let urlEliminarCuenta = urlBasica + "tuvooz/api/v1/eliminarcuenta/";
let url404 = urlBasica + "api/v1/error404/";


function logout() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas cerrar la sesión?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, cerrar sesión",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(urlCerrarSesion, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cerrar sesión');
                }
                return response.json();
            })
            .then(data => {
                // Limpiar localStorage
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('user_data');
                
                Swal.fire({
                    title: "¡Éxito!",
                    text: data.message || "Sesión cerrada correctamente",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = urlInicioSesion;
                });
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al cerrar la sesión",
                    icon: "error",
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    // Aún si hay error, limpiamos localStorage y redirigimos
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    localStorage.removeItem('user_data');
                    window.location.href = urlInicioSesion;
                });
            });
        }
    });
}


