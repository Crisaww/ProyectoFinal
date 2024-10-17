document.addEventListener('DOMContentLoaded', () => {
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode'); // Botón para modo oscuro
    const lightModeButton = document.getElementById('light-mode'); // Botón para modo claro
    const botonPrincipal = document.getElementById('boton-principal'); // Botón principal para mostrar/ocultar el submenú
    const submenu = document.getElementById('submenu'); // Submenú que se mostrará/ocultará
    const body = document.body; // Referencia al body

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

    // Alterna el modo oscuro al hacer clic en el botón de modo oscuro
    toggleDarkModeButton.addEventListener('click', () => {
        setDarkMode();
    });

    // Alterna el modo claro al hacer clic en el botón de modo claro
    lightModeButton.addEventListener('click', () => {
        setLightMode();
    });

    // Lógica para mostrar u ocultar el submenú al hacer clic en el botón principal
    botonPrincipal.addEventListener('click', () => {
        // Alternar la visualización del submenú
        submenu.style.display = submenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Función para establecer el modo oscuro
    function setDarkMode() {
        body.classList.add('dark-mode');
        toggleDarkModeButton.innerHTML = '🌙'; // Cambia el icono al de luna

        applyDarkStyles();
        // Guarda el modo oscuro en el backend
        updateUserTemaColor('dark');
    }

    // Función para establecer el modo claro
    function setLightMode() {
        body.classList.remove('dark-mode');
        toggleDarkModeButton.innerHTML = '🌞'; // Cambia el icono al de sol
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
  // Lógica para mostrar u ocultar el submenú al hacer clic en el botón principal
  const botonPrincipal = document.getElementById('boton-principal');
  const submenu = document.getElementById('submenu');

  botonPrincipal.addEventListener('click', () => {
      // Alternar la visualización del submenú
      submenu.style.display = submenu.style.display === 'flex' ? 'none' : 'flex';
  });

  // Funcionalidad para cambiar el modo y el icono
  const botonModo = document.getElementById('boton-modo');
  const iconoModo = document.getElementById('icono-modo');
  const body = document.body;

  botonModo.addEventListener('click', () => {
      // Alternar el modo claro y oscuro
      if (body.classList.contains('modo-claro')) {
          body.classList.remove('modo-claro');
          iconoModo.textContent = '🌙'; // Cambia el icono a la luna para el modo oscuro
      } else {
          body.classList.add('modo-claro');
          iconoModo.textContent = '🌞'; // Cambia el icono al sol para el modo claro
      }
  });