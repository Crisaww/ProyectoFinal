//let urlBasica= "http://127.0.0.1:8000/"
let urlBasicaFront ="http://tuvooz.com/" 
//let urlBasicaFront ="http://127.0.0.1:5502/" 
let urlBasica="http://5.183.11.147:8000/";//ip servidor
//let urlBasica="http://192.168.17.3:8000/";
let urlLogin= urlBasica+"tuvooz/api/v1/iniciarSesion";
let urlRegistro=urlBasica+"tuvooz/api/v1/registro";
let urlPerfil = urlBasica+"tuvooz/api/v1/perfil/";
let urlActualizarUsername = urlBasica+"tuvooz/api/v1/actualizarUsername/";
// let urlPerfilNombre = urlBasica+"tuvooz/api/v1/nombre/";
let urlOlvideContrasena = urlBasica+"tuvooz/api/v1/olvideContrasena/";
let urlRestabkecerContrasena = urlBasica+"tuvooz/api/v1/restablecerContrasena/";
let urlCerrarSesion = urlBasica + "tuvooz/api/v1/logout/";
let urlGenerarTexto=urlBasica+"synthesize/";
let urlRefrescarToken = urlBasica + "api/token/refresh/";
let urlObtenerToken = urlBasica + "api/token/";
let urlCambiarContrasenna = urlBasica + "tuvooz/api/v1/cambiarContrasenna/";
let urlInicioSesion = urlBasicaFront +"TuVooz/tuVoozPrincipal/cuenta/iniciarSesion.html";

function obtenerTokens() {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    return { access_token, refresh_token };
}

async function logout() {
    const { access_token } = obtenerTokens();
    
    if (!access_token) {
        window.location.href = urlInicioSesion;
        return;
    }

    Swal.fire({
        title: "Advertencia",
        text: "¿Estás seguro de que quieres cerrar sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, cerrar sesión",
        cancelButtonText: "Cancelar",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(urlCerrarSesion, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + access_token,
                    },
                });

                if (response.ok) {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    Swal.fire("Sesión cerrada", "Has cerrado sesión correctamente.", "success").then(() => {
                        window.location.href = urlInicioSesion;
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
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al procesar la solicitud. Por favor, inténtelo nuevamente.',
                });
            }
        }
    });
}



function refrescarToken() {
    const { refresh_token } = obtenerTokens();
    if (!refresh_token) {
        logout();
        return Promise.reject(new Error('No refresh token disponible'));
    }

    return fetch(urlRefrescarToken, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refresh_token }),
    })
    .then(response => {
        if (!response.ok) {
            logout();
            return response.json().then(data => {
              
                return Promise.reject(new Error('Error al refrescar el token'));
            });
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('access_token', data.access);
        return data;
    })
    .catch(error => {
       
        logout();
        return Promise.reject(error);
    });
}

async function fetchWithAuth(url, options = {}) {
    const { access_token } = obtenerTokens();
    if (access_token) {
        options.headers = {
            ...options.headers,
            'Authorization': 'Bearer ' + access_token
        };
    }

    let response = await fetch(url, options);

    if (response.status === 401) { // Token expirado
        try {
            const data = await refrescarToken();
            options.headers['Authorization'] = 'Bearer ' + data.access;
            response = await fetch(url, options); // Reintentar solicitud
        } catch (error) {
           
            window.location.href = urlInicioSesion;
        }
    }

    return response;
}





// Función para hacer solicitudes protegidas

function VistasProtegidas(url) {
    const { access_token } = obtenerTokens();

    if (!access_token) {
        redirigirSiNoEnSesion();
        return;
    }

    fetch(`${urlBasica}${url}`, {
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
                    return fetch(`${urlBasica}${url}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                        }
                    });
                }).catch(() => {
                    // Si el refresco falla, redirige al inicio de sesión
                    redirigirSiNoEnSesion();
                });
            } else {
                return response.text().then(text => {
                 
                    throw new Error(`Error en la solicitud: ${text}`);
                });
            }
        }
        return response.json();
    })
    .then(data => {
        if (data && data.detail === 'Authentication credentials were not provided.') {
            logout();
        }
    })
    .catch(error => {
        
        redirigirSiNoEnSesion();
    });
}


function redirigirSiNoEnSesion() {
    const { access_token } = obtenerTokens();
    const rutaActual = window.location.pathname;


    // Rutas permitidas en las que el usuario puede estar sin token
    const rutasPermitidas = [
        "/TuVooz/tuVoozPrincipal/cuenta/iniciarSesion.html",
        "/TuVooz/tuVoozPrincipal/cuenta/crearcuenta.html",
        "/TuVooz/tuVoozPrincipal/cuenta/olvideContrasena.html",
        "/TuVooz/tuVoozPrincipal/cuenta/recuperarContrasena.html"

    ];

    // Verifica si el usuario tiene un token de acceso
    if (!access_token && !rutasPermitidas.includes(rutaActual)) {
        window.location.href = urlInicioSesion;
    }
}

// Ejemplo de uso
function cargarPaginaPrincipal() {
    VistasProtegidas('tuVoozPrincipal/paginaPrincipal/');
}
function cargarIndexPalabrasComunes() {
    VistasProtegidas('tuVoozPrincipal/indexPalabrasComunes/');
}

function cargarAnimales() {
    VistasProtegidas('tuVoozPrincipal/animales/');
}
function cargarComoTuVooz() {
    VistasProtegidas('tuVoozPrincipal/comoUsarTuvooz/');
}
function cargarEmociones() {
    VistasProtegidas('tuVoozPrincipal/emociones/');
}
function CargarMiCuenta() {
    VistasProtegidas('tuVoozPrincipal/miCuenta/');
}
function cargarPreguntas() {
    VistasProtegidas('tuVoozPrincipal/preguntas/');
}
function cargarSaludos() {
    VistasProtegidas('tuVoozPrincipal/saludos/');
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






