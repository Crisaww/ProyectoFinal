document.addEventListener('DOMContentLoaded', () => {
  const toggleDarkModeButton = document.getElementById('toggle-dark-mode'); // Botón para modo oscuro
  const lightModeButton = document.getElementById('light-mode'); // Botón para modo claro

  // Verifica la preferencia de tema almacenada en el servidor
  fetch('/api/v1/perfil', {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
  })
  .then(response => response.json())
  .then(data => {
      const savedTheme = data.theme; // Asumiendo que la respuesta incluye un campo 'theme'
      if (savedTheme === 'dark') {
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
      updateUserTheme('dark');
  }

  // Función para establecer el modo claro
  function setLightMode() {
      document.body.classList.remove('dark-mode');
      applyLightStyles();
      // Guarda el modo claro en el backend
      updateUserTheme('light');
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
  function updateUserTheme(theme) {
      fetch('/api/v1/perfil', {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'), // Asegúrate de usar el token correcto
          },
          body: JSON.stringify({ theme: theme })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Error updating theme');
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
