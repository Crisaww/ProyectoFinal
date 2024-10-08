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


// async function logout() {
//     const { access_token } = obtenerTokens();
    
//     if (!access_token) {
//         console.log("No hay sesión activa. Redirigiendo a la página de inicio de sesión.");
//         window.location.href = urlInicioSesion;
//         return;
//     }
    
//     const result = await Swal.fire({
//         title: "Advertencia",
//         text: "¿Estás seguro de que quieres cerrar sesión?",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Sí, cerrar sesión",
//         cancelButtonText: "Cancelar",
//     });
    
//     if (result.isConfirmed) {
//         try {
//             const response = await fetch(urlCerrarSesion, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': 'Bearer ' + access_token,
//                 },
//             });
            
//             if (response.ok) {
//                 localStorage.removeItem('access_token');
//                 localStorage.removeItem('refresh_token');
//                 await Swal.fire("Sesión cerrada", "Has cerrado sesión correctamente.", "success");
//                 window.location.href = urlInicioSesion;
//             } else {
//                 const errorData = await response.json();
//                 await Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: errorData.error || 'Hubo un problema al cerrar sesión.',
//                 });
//             }
//         } catch (error) {
//             await Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: 'Ocurrió un error al procesar la solicitud. Por favor, inténtelo nuevamente.',
//             });
//         }
//     }
// }
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
    // Prevenir el almacenamiento en caché de la página
    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload();
        }
    };
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

// Event listener modificado
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

// Agregar este código a todas las páginas protegidas
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', verificarSesion);
} else {
    verificarSesion();
}




