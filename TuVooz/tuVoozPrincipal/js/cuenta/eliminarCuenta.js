function EliminarCuenta() {
    // Usar SweetAlert para confirmar
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción. Se eliminará tu cuenta.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar cuenta',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
    
        fetch(urlEliminarCuenta, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (response.ok) {
            Swal.fire(
              'Eliminada!',
              'Tu cuenta ha sido eliminada correctamente.',
              'success'
            ).then(() => {
              // Se eliminan los tokens y se cierra la sesión
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              // Redirigir al usuario a la página de inicio de sesión
              window.location.href = urlInicioSesion;  
            });
          } else {
            throw new Error('Error al eliminar la cuenta');
          }
        })
        .catch(error => {
          // Mostrar SweetAlert de error
          Swal.fire(
            'Error!',
            'Hubo un problema al eliminar tu cuenta. Por favor, inténtalo de nuevo.',
            'error'
          );
          console.error("Error:", error);
        });
      }
    });
  }
  