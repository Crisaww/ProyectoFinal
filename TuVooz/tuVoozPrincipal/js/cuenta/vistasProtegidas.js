document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('access_token');
  if (!token) {
      window.location.href = urlInicioSesion;
  }
});
function fetchProtectedData(endpoint) {
    fetch(`http://127.0.0.1:8000/tuvooz/tuVoozPrincipal/${endpoint}/`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }
  
  // Llamadas a diferentes endpoints
  fetchProtectedData('paginaPrincipal');
  fetchProtectedData('indexPalabrasComunes');
  fetchProtectedData('saludos');
  fetchProtectedData('animales');
  fetchProtectedData('comoUsarTuvooz');
  fetchProtectedData('emociones');
  fetchProtectedData('preguntas');
  fetchProtectedData('miCuenta');
  