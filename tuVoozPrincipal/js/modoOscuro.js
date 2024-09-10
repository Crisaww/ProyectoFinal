const root = document.documentElement;

function modoOscuro(){
    root.classList.add('oscuro');
    localStorage.setItem('modo', 'oscuro');
    root.style.setProperty('--background-color', '#000000');
    root.style.setProperty('--h1-color','#b91414');
    // root.style.setProperty('--color-p')
}
function modoClaro(){
    root.classList.remove('oscuro');
    localStorage.setItem('modo', 'claro');
    root.style.setProperty('--background-color', '#ffffff');
    root.style.setProperty('--h1-color','#000000');


    
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
