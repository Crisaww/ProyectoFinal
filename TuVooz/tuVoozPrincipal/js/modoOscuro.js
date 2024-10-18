document.addEventListener('DOMContentLoaded', () => {
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
    const lightModeButton = document.getElementById('light-mode');

    // Recupera la preferencia de tema del backend al cargar la página
    fetch(urlPerfil, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        },
    })
        .then(response => response.json())
        .then(data => {
            const savedTemaColor = data.temaColor || 'light';  // Modo claro por defecto
            if (savedTemaColor === 'dark') {
                setDarkMode();  // Aplicar el modo oscuro si está configurado
            } else {
                setLightMode();  // Aplicar el modo claro si es el predeterminado
            }
        })
        .catch(error => console.error('Error fetching user theme:', error));

    // Alternar al modo oscuro al hacer clic en el botón
    toggleDarkModeButton.addEventListener('click', () => {
        setDarkMode();
    });

    // Alternar al modo claro al hacer clic en el botón
    lightModeButton.addEventListener('click', () => {
        setLightMode();
    });

    // Función para establecer el modo oscuro
    function setDarkMode() {
        document.body.classList.add('dark-mode');
        applyDarkStyles();
        updateUserTemaColor('dark');  // Guardar la preferencia en el backend
    }

    // Función para establecer el modo claro
    function setLightMode() {
        document.body.classList.remove('dark-mode');
        applyLightStyles();
        updateUserTemaColor('light');  // Guardar la preferencia en el backend
    }

    // Función para aplicar los estilos del modo oscuro
    function applyDarkStyles() {
        document.documentElement.style.setProperty('--background-color', 'var(--dark-background-color)');
        document.documentElement.style.setProperty('--text-color', 'var(--dark-text-color)');
    }

    // Función para aplicar los estilos del modo claro
    function applyLightStyles() {
        document.documentElement.style.setProperty('--background-color', 'var(--light-background-color)');
        document.documentElement.style.setProperty('--text-color', 'var(--light-text-color)');
    }

    // Función para guardar el tema en el backend
    function updateUserTemaColor(temaColor) {
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
                throw new Error('Error updating theme');
            }
            return response.json();
        })
        .then(data => {
            console.log('Tema actualizado en el servidor:', data);
        })
        .catch(error => {
            console.error('Error al actualizar el tema en el backend:', error);
        });
    }
});
