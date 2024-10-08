// let urlBasica= "http://127.0.0.1:8000/"
// let urlBasicaFront ="http://127.0.0.1:5502/" 
let urlBasicaFront ="http://tuvooz.com/" 
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
let urlEliminarCuenta = urlBasica + "tuvooz/api/v1/eliminarcuenta/";


// Función para obtener tokens
function obtenerTokens() {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');
    return { access_token, refresh_token };
}

// Función para verificar la sesión
function verificarSesion() {
    const { access_token } = obtenerTokens();
    if (!access_token) {
        redirigirSiNoEnSesion();
        return false;
    }
    return true;
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

// Función para prevenir el almacenamiento en caché de la página
function prevenirCache() {
    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload();
        }
    };
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
        console.error('Error al refrescar el token:', error);
        logout();
        throw error;
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

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error('Error en fetchWithAuth:', error);
        if (error.message.includes('Error al refrescar el token')) {
            redirigirSiNoEnSesion();
        }
        throw error;
    }
}

// Función mejorada para vistas protegidas
async function VistasProtegidas(url) {
    try {
        const response = await fetchWithAuth(`${urlBasica}${url}`);
        const data = await response.json();
        // Procesar los datos como sea necesario
        console.log(data);
    } catch (error) {
        console.error('Error en VistasProtegidas:', error);
        // Manejar el error según sea necesario
    }
}

// Función mejorada de logout
async function logout() {
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
        console.error('Error durante el cierre de sesión:', error);
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al cerrar sesión. Por favor, inténtelo nuevamente.',
        });
    }
}

// Event listener
document.addEventListener('DOMContentLoaded', async function() {
    prevenirCache();
    
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
            redirigirSiNoEnSesion();
        }
    }
});

// Verificación adicional para todas las páginas protegidas
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', verificarSesion);
} else {
    verificarSesion();
}




