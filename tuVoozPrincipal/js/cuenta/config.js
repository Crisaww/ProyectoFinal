let urlBasica= "http://127.0.0.1:8000/"
// let urlBasica="http://5.183.11.147:8000/";//ip servidor
//let urlBasica="http://192.168.17.3:8000/";
let urlLogin= urlBasica+"tuvooz/api/v1/iniciarSesion";
let urlRegistro=urlBasica+"tuvooz/api/v1/registro";
let urlPerfil = urlBasica+"tuvooz/api/v1/perfil";
let urlOlvideContrasena = urlBasica+"tuvooz/api/v1/olvideContrasena/";
let urlRestabkecerContrasena = urlBasica+"tuvooz/api/v1/restablecerContrasena/";
let urlCerrarSesion = urlBasica + "tuvooz/api/v1/logout/";
let urlGenerarTexto=urlBasica+"synthesize/";

function obtenerTokens() {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    return { access_token, refresh_token };
}
function refrescarToken() {
    const { refresh_token } = obtenerTokens();
    if (!refresh_token) {
        // No hay refresh_token disponible
        logout();  // Elimina los tokens y redirige a la página de inicio de sesión
        return Promise.reject(new Error('No refresh token disponible'));
    }

    return fetch('http://127.0.0.1:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refresh_token }),
    })
    .then(response => {
        if (!response.ok) {
            // Si el refresco falla, eliminamos los tokens y redirigimos a la página de inicio de sesión
            logout();
            return response.json().then(data => {
                console.error('Error en el refresco del token:', data);
                return Promise.reject(new Error('Error al refrescar el token'));
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Token refrescado:', data);
        localStorage.setItem('access_token', data.access);
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
        // Elimina los tokens y redirige a la página de inicio de sesión
        logout();
        return Promise.reject(error);
    });
}



// Función para hacer solicitudes protegidas

function VistasProtegidas(url) {
    const { access_token } = obtenerTokens();

    if (!access_token) {
        redirigirSiNoEnSesion();
        return;
    }

    fetch(`http://127.0.0.1:8000${url}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                return refrescarToken().then(() => {
                    
                    // Reintenta la solicitud después de refrescar el token
                    return fetch(`http://127.0.0.1:8000${url}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                        }
                    });
                });
            } else {
                return response.text().then(text => {
                    console.error('Error en la solicitud:', text);
                    throw new Error(`Error en la solicitud: ${text}`);
                });
            }
        }
        return response.json(); // Cambia a response.text() si esperas HTML
    })
    .then(data => {
        // Verifica si los datos indican que el usuario no está autenticado
        if (data && data.detail === 'Authentication credentials were not provided.') {
            logout();
        } else {
            console.log(data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        redirigirSiNoEnSesion();
    });
}

function redirigirSiNoEnSesion() {
    const { access_token } = obtenerTokens();
    const rutaActual = window.location.pathname;

    console.log('Ruta actual:', rutaActual); // Para depuración

    // Rutas permitidas en las que el usuario puede estar sin token
    const rutasPermitidas = [
        "/tuVoozPrincipal/cuenta/iniciarSesion.html",
        "/tuVoozPrincipal/cuenta/crearcuenta.html",
        "/tuVoozPrincipal/cuenta/olvideContrasena.html",
        "/tuVoozPrincipal/cuenta/recuperarContrasena.html"

    ];

    console.log('Access token:', access_token); // Para depuración

    // Verifica si el usuario tiene un token de acceso
    if (!access_token && !rutasPermitidas.includes(rutaActual)) {
        console.log('Redirigiendo a iniciar sesión'); // Para depuración
        // Redirige al usuario a la página de inicio de sesión si no tiene un token
        window.location.href = "http://127.0.0.1:5502/tuVoozPrincipal/cuenta/iniciarSesion.html";
    }
}

// Ejemplo de uso
function cargarPaginaPrincipal() {
    VistasProtegidas('/tuVoozPrincipal/paginaPrincipal/');
}
function cargarIndexPalabrasComunes() {
    VistasProtegidas('/tuVoozPrincipal/indexPalabrasComunes/');
}

function cargarAnimales() {
    VistasProtegidas('/tuVoozPrincipal/animales/');
}
function cargarComoTuVooz() {
    VistasProtegidas('/tuVoozPrincipal/comoUsarTuvooz/');
}
function cargarEmociones() {
    VistasProtegidas('/tuVoozPrincipal/emociones/');
}
function CargarMiCuenta() {
    VistasProtegidas('/tuVoozPrincipal/miCuenta/');
}
function cargarPreguntas() {
    VistasProtegidas('/tuVoozPrincipal/preguntas/');
}
function cargarSaludos() {
    VistasProtegidas('/tuVoozPrincipal/saludos/');
}

document.addEventListener('DOMContentLoaded', function() {
    const { access_token } = obtenerTokens();
    if (!access_token) {
        redirigirSiNoEnSesion();
    } else {
        cargarPaginaPrincipal();
        cargarIndexPalabrasComunes();
        cargarAnimales();
        cargarComoTuVooz();
        cargarEmociones();
        CargarMiCuenta();
        cargarPreguntas();
        cargarSaludos();
    }
});

async function logout() {
    Swal.fire({
        title: "Advertencia",
        text: "¿Estás seguro de que quieres cerrar sesión?",
        icon: "warning",
        showCancelButton: true, // Botón para cancelar la acción
        confirmButtonText: "Sí, cerrar sesión",
        cancelButtonText: "Cancelar",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                // Enviar solicitud de cierre de sesión al backend
                const response = await fetch(urlCerrarSesion, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    },
                });

                if (response.ok) {
                    // Eliminar tokens del almacenamiento local
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');

                    Swal.fire("Sesión cerrada", "Has cerrado sesión correctamente.", "success").then(() => {
                        window.location.href = "http://127.0.0.1:5502/tuVoozPrincipal/cuenta/iniciarSesion.html";
                    });
                } else {
                    const errorData = await response.json();
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: errorData.error || 'Hubo un problema al cerrar sesión.',
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
    });
}



