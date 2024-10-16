document.addEventListener('DOMContentLoaded', () => {
  // Selecciona los botones para alternar entre modos
  const toggleButton = document.getElementById('toggle-dark-mode');
  const lightModeButton = document.getElementById('light-mode'); // Botón para modo claro

  // Verifica si hay un modo guardado en el almacenamiento local
  const currentMode = localStorage.getItem('theme');
  if (currentMode === 'dark') {
    setDarkMode();
  } else {
    setLightMode();
  }

  // Alterna el modo oscuro al hacer clic en el botón de modo oscuro
  toggleButton.addEventListener('click', () => {
    setDarkMode();
  });

  // Alterna el modo claro al hacer clic en el botón de modo claro
  lightModeButton.addEventListener('click', () => {
    setLightMode();
  });

  // Función para establecer el modo oscuro
  function setDarkMode() {
    document.body.classList.add('dark-mode');
    // Actualiza las variables CSS para el modo oscuro
    document.documentElement.style.setProperty('--background-color', 'var(--dark-background-color)');
    document.documentElement.style.setProperty('--text-color', 'var(--dark-text-color)');
    document.documentElement.style.setProperty('--input-background', 'var(--dark-input-background)');
    document.documentElement.style.setProperty('--input-text-color', 'var(--dark-input-text-color)');
    document.documentElement.style.setProperty('--h1-color', 'var(--dark-h1-color)');
    document.documentElement.style.setProperty('--hr-border-bottom', 'var(--dark-hr-linea-border-bottom)');

    // Guarda el modo oscuro en el almacenamiento local
    localStorage.setItem('theme', 'dark');
  }

  // Función para establecer el modo claro
  function setLightMode() {
    document.body.classList.remove('dark-mode');
    // Actualiza las variables CSS para el modo claro
    document.documentElement.style.setProperty('--background-color', 'var(--light-background-color)');
    document.documentElement.style.setProperty('--text-color', 'var(--light-text-color)');
    document.documentElement.style.setProperty('--input-background', 'var(--light-input-background)');
    document.documentElement.style.setProperty('--input-text-color', 'var(--light-input-text-color)');
    document.documentElement.style.setProperty('--h1-color', 'var(--light-h1-color)');
    document.documentElement.style.setProperty('--hr-border-bottom', 'var(--light-hr-linea-border-bottom)');

    // Guarda el modo claro en el almacenamiento local
    localStorage.setItem('theme', 'light');
  }
});
