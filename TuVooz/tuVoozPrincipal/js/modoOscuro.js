document.addEventListener('DOMContentLoaded', () => {
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode'); // Botón para modo oscuro
    const lightModeButton = document.getElementById('light-mode'); // Botón para modo claro

    // Verifica la preferencia de tema almacenada en el servidor
    fetch(urlPerfil, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        },
    })
        .then(response => response.json())
        .then(data => {
            const savedTemaColor = data.temaColor; // Usamos 'temaColor' como está en tu vista de Django
            if (savedTemaColor === 'dark') {
                setDarkMode();
            } else {
                setLightMode();
            }
        })
        .catch(error => console.error('Error fetching user theme:', error));

    // Alterna al modo oscuro al hacer clic en el botón de modo oscuro
    toggleDarkModeButton.addEventListener('click', () => {
        setDarkMode();
    });

    // Alterna al modo claro al hacer clic en el botón de modo claro
    lightModeButton.addEventListener('click', () => {
        setLightMode();
    });

    // Función para establecer el modo oscuro
    function setDarkMode() {
        document.body.classList.add('dark-mode');
        applyDarkStyles();
        // Guarda el modo oscuro en el backend
        updateUserTemaColor('dark');
    }

    // Función para establecer el modo claro
    function setLightMode() {
        document.body.classList.remove('dark-mode');
        applyLightStyles();
        // Guarda el modo claro en el backend
        updateUserTemaColor('light');
    }

    // Función para aplicar estilos oscuros
    function applyDarkStyles() {
        document.documentElement.style.setProperty('--background-color', 'var(--dark-background-color)');
        document.documentElement.style.setProperty('--text-color', 'var(--dark-text-color)');
        // Agrega más propiedades de estilo según sea necesario
    }

    // Función para aplicar estilos claros
    function applyLightStyles() {
        document.documentElement.style.setProperty('--background-color', 'var(--light-background-color)');
        document.documentElement.style.setProperty('--text-color', 'var(--light-text-color)');
        // Agrega más propiedades de estilo según sea necesario
    }

    // Función para enviar el tema actualizado al servidor
    function updateUserTemaColor(temaColor) {
        console.log('Updating theme to:', temaColor); // Para depuración
        fetch(urlPerfil, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            },
            body: JSON.stringify({ temaColor: temaColor })
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(`Error updating theme: ${text}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Theme updated:', data);
            })
            .catch(error => {
                console.error('Error updating theme:', error);
            });
    }
});
// para abrir el desplegar botones
 // Funcionalidad de despliegue del submenú
 document.addEventListener('DOMContentLoaded', () => {
    const botonPrincipal = document.getElementById('boton-principal');
    const submenu = document.getElementById('submenu');

    // Lógica para mostrar u ocultar el submenú al hacer clic en el botón principal
    botonPrincipal.addEventListener('click', (event) => {
        // Prevenir que el clic en el botón principal cierre el submenú
        event.stopPropagation();
        // Alternar la visualización del submenú
        submenu.style.display = submenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Función para cerrar el submenú al hacer clic en cualquier parte de la pantalla
    document.addEventListener('click', (event) => {
        const isClickInside = submenu.contains(event.target) || botonPrincipal.contains(event.target);
        if (!isClickInside) {
            submenu.style.display = 'none'; // Cierra el submenú
        }
    });
});
