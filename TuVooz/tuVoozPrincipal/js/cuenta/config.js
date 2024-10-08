let urlBasica= "http://127.0.0.1:8000/"
 let urlBasicaFront ="http://127.0.0.1:5502/" 
// let urlBasicaFront ="http://tuvooz.com/" 
// let urlBasica="http://5.183.11.147:8000/";//ip servidor
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
let urlEliminarCuenta = urlBasica + "tuvooz/api/v1/eliminarcuenta/";
let url404 = urlBasica + "api/v1/error404/";

// Función para obtener tokens
function obtenerTokens() {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    return { access_token, refresh_token };
}

// Función mejorada para refrescar el token
async function refrescarToken() {
    const { refresh_token } = obtenerTokens();
    if (!refresh_token) {
        throw new Error('No refresh token disponible');
    }

    try {
        const response = await fetch(urlRefrescarToken, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refresh_token }),
        });

        if (!response.ok) {
            throw new Error('Error al refrescar el token');
        }

        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        return data.access;
    } catch (error) {
        logout();
        throw error;
    }
}
async function logout() {
    // Mostrar confirmación antes de cerrar sesión
    const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas cerrar sesión?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    });

    if (!confirmacion.isConfirmed) {
        return; // Si el usuario cancela, no se cierra la sesión
    }

    const { access_token } = obtenerTokens();

    if (!access_token) {
        console.log("No hay sesión activa. Redirigiendo a la página de inicio de sesión.");
        window.location.href = urlInicioSesion;
        return;
    }

    try {
        const response = await fetch(urlCerrarSesion, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            },
        });

        if (response.ok) {
            // Limpiar tokens
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            
            // Limpiar cualquier otra información de sesión
            sessionStorage.clear();
            
            // Invalidar la caché del navegador para esta página
            window.location.reload(true);
            
            await Swal.fire("Sesión cerrada", "Has cerrado sesión correctamente.", "success");
            
            // Redirigir a la página de inicio de sesión
            window.location.href = urlInicioSesion;
        } else {
            throw new Error('Error al cerrar sesión');
        }
    } catch (error) {
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al cerrar sesión. Por favor, inténtelo nuevamente.',
        });
    }
}
// Función para prevenir el almacenamiento en caché de la página
function prevenirCache() {
    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload();
        }
    };
}
// Función para manejar errores 404 en el lado del cliente
function manejarError404Cliente() {
    const rutaActual = window.location.pathname;
    const rutasConocidas = [
        "/TuVooz/tuVoozPrincipal/cuenta/iniciarSesion.html",
        "/TuVooz/tuVoozPrincipal/cuenta/crearcuenta.html",
        "/TuVooz/tuVoozPrincipal/cuenta/olvideContrasena.html",
        "/TuVooz/tuVoozPrincipal/cuenta/recuperarContrasena.html",
        "/TuVooz/tuVoozPrincipal/cuenta/recuperarContraseña.html",
        "/TuVooz/tuVoozPrincipal/paginaPrincipal.html",
        "/TuVooz/tuVoozPrincipal/animales.html",
        "/TuVooz/tuVoozPrincipal/comoUsarTuvooz.html",
        "/TuVooz/tuVoozPrincipal/emociones.html",
        "/TuVooz/tuVoozPrincipal/index.html",
        "/TuVooz/tuVoozPrincipal/indexPalabrasComunes.html",
        "/TuVooz/tuVoozPrincipal/miCuenta.html",
        "/TuVooz/tuVoozPrincipal/nosotros.html",
        "/TuVooz/tuVoozPrincipal/preguntas.html",
        "/TuVooz/tuVoozPrincipal/saludos.html",
        "/TuVooz/index.html",
        "/index.html",
        
        // Añadir aquí todas las rutas válidas conocidas de su aplicación
    ];

    if (!rutasConocidas.includes(rutaActual)) {
        window.location.href = urlBasicaFront + 'TuVooz/404.html';
    }
}

// Función mejorada para redirigir si no hay sesión
function redirigirSiNoEnSesion() {
    const rutaActual = window.location.pathname;
    const rutasPermitidas = [
        "/TuVooz/tuVoozPrincipal/cuenta/iniciarSesion.html",
        "/TuVooz/tuVoozPrincipal/cuenta/crearcuenta.html",
        "/TuVooz/tuVoozPrincipal/cuenta/olvideContrasena.html",
        "/TuVooz/tuVoozPrincipal/cuenta/recuperarContrasena.html",
        "/TuVooz/tuVoozPrincipal/cuenta/recuperarContraseña.html",
    ];

    if (!rutasPermitidas.includes(rutaActual)) {
        window.location.href = urlInicioSesion;
    }
}
async function VistasProtegidas(url) {
    try {
        const response = await fetchWithAuth(`${urlBasica}${url}`);
        if (response === null) {
            // La función fetchWithAuth ya manejó el error 404
            return;
        }
        const data = await response.json();
        // Procesar los datos como sea necesario
        console.log(data);
    } catch (error) {
        if (error.message.includes('Error al refrescar el token')) {
            redirigirSiNoEnSesion();
        }
    }
}
// Función mejorada para hacer solicitudes autenticadas
async function fetchWithAuth(url, options = {}) {
    let { access_token } = obtenerTokens();

    if (!access_token) {
        try {
            access_token = await refrescarToken();
        } catch (error) {
            redirigirSiNoEnSesion();
            throw error;
        }
    }

    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${access_token}`
    };

    try {
        let response = await fetch(url, options);

        if (response.status === 401) {
            access_token = await refrescarToken();
            options.headers['Authorization'] = `Bearer ${access_token}`;
            response = await fetch(url, options);
        }

        if (response.status === 404) {
            window.location.href = urlBasicaFront + 'TuVooz/404.html';
            return null;
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
    } catch (error) {
        if (error.message.includes('Error al refrescar el token')) {
            redirigirSiNoEnSesion();
        }
        throw error;
    }
}
function verificarSesion() {
    const { access_token } = obtenerTokens();
    return !!access_token; // Retorna verdadero si hay un token de acceso
}

// Event listener actualizado
document.addEventListener('DOMContentLoaded', async function() {
    prevenirCache();
    manejarError404Cliente();
    
    const esPaginaProtegida = !window.location.pathname.includes('/cuenta/');
    
    if (esPaginaProtegida) {
        if (verificarSesion()) {
            try {
                await Promise.all([
                    VistasProtegidas('tuVoozPrincipal/paginaPrincipal/'),
                    VistasProtegidas('tuVoozPrincipal/indexPalabrasComunes/'),
                    VistasProtegidas('tuVoozPrincipal/animales/'),
                    VistasProtegidas('tuVoozPrincipal/comoUsarTuvooz/'),
                    VistasProtegidas('tuVoozPrincipal/emociones/'),
                    VistasProtegidas('tuVoozPrincipal/miCuenta/'),
                    VistasProtegidas('tuVoozPrincipal/preguntas/'),
                    VistasProtegidas('tuVoozPrincipal/saludos/')
                ]);
            } catch (error) {
                console.error('Error al cargar las vistas protegidas:', error);
            }
        } else {
            redirigirSiNoEnSesion();
        }
    }
});



