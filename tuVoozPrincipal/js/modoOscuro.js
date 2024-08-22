const root = document.documentElement;

function modoOscuro(){
    root.classList.add('oscuro');
    localStorage.setItem('modo', 'oscuro');
    root.style.setProperty('--background-color', '#131313');
    root.style.setProperty('--color-h2','#ffffff')
    root.style.setProperty('--color-h1','#ffffff   ')
}
function modoClaro(){
    root.classList.remove('oscuro');
    localStorage.setItem('modo', 'claro');
    root.style.setProperty('--background-color', '#ffffff');
    
}
// Apply user preference on page load (using IIFE pattern)
(function () {
    const modo = localStorage.getItem('modo');
    if (modo === 'oscuro') {
      modoOscuro();
    } else if (modo === 'claro') {
      modoClaro();
    }
  })(); // Immediately invoke the function expression
  
  // Event listener for a toggle button (optional)
  const toggleButton = document.getElementById('modo-toggle'); // Assuming an element with this ID
  if (toggleButton) {
    toggleButton.addEventListener('click', function () {
      if (root.classList.contains('oscuro')) {
        modoClaro();
      } else {
        modoOscuro();
      }
    });
  }