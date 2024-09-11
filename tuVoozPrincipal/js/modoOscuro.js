// Selecciona el botón de alternar modo oscuro
const toggleButton = document.getElementById('toggle-dark-mode');

// Verifica si hay un modo guardado en el almacenamiento local
const currentMode = localStorage.getItem('theme');
if (currentMode === 'dark') {
  setDarkMode();
} else {
  setLightMode();
}

// Alterna el modo oscuro al hacer clic en el botón
toggleButton.addEventListener('click', () => {
  if (document.body.classList.contains('dark-mode')) {
    setLightMode();
  } else {
    setDarkMode();
  }
});

// Función para establecer el modo oscuro
function setDarkMode() {
  document.body.classList.add('dark-mode');
  document.documentElement.style.setProperty('--background-color', 'var(--dark-background-color)');
  document.documentElement.style.setProperty('--text-color', 'var(--dark-text-color)');
  document.documentElement.style.setProperty('--input-background', 'var(--dark-input-background)'); // Actualiza el fondo del input
  document.documentElement.style.setProperty('--input-text-color', 'var(--dark-input-text-color)'); // Actualiza el color del texto del input
  document.documentElement.style.setProperty('--primary-color', 'var(--dark-primary-color)');
  document.documentElement.style.setProperty('--secondary-color', 'var(--dark-secondary-color)');
  localStorage.setItem('theme', 'dark');
}

// Función para establecer el modo claro
function setLightMode() {
  document.body.classList.remove('dark-mode');
  document.documentElement.style.setProperty('--background-color', 'var(--light-background-color)');
  document.documentElement.style.setProperty('--text-color', 'var(--light-text-color)');
  document.documentElement.style.setProperty('--input-background', 'var(--light-input-background)'); // Actualiza el fondo del input
  document.documentElement.style.setProperty('--input-text-color', 'var(--light-input-text-color)'); // Actualiza el color del texto del input
  document.documentElement.style.setProperty('--primary-color', 'var(--light-primary-color)');
  document.documentElement.style.setProperty('--secondary-color', 'var(--light-secondary-color)');
  localStorage.setItem('theme', 'light');
}
