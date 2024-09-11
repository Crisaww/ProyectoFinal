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
  // Update CSS variables for dark mode
  document.documentElement.style.setProperty('--background-color', 'var(--dark-background-color)');
  document.documentElement.style.setProperty('--text-color', 'var(--dark-text-color)');
  document.documentElement.style.setProperty('--text-color', 'var(--dark-text-color)');


  // ... and so on for other variables
  localStorage.setItem('theme', 'dark');
}

// Función para establecer el modo claro
function setLightMode() {
  document.body.classList.remove('dark-mode');
  // Update CSS variables for light mode
  document.documentElement.style.setProperty('--background-color', 'var(--light-background-color)');
  document.documentElement.style.setProperty('--text-color', 'var(--light-text-color)');
  // ... and so on for other variables
  localStorage.setItem('theme', 'light');
}