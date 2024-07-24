let url="http://127.0.0.1:8000/tuvooz/api/v1/registro";

function registrarUsuario() {

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
     
    let formData = {
      "username": username,
      "email": email,
      "password": password
    };
  
    if(validarCampos()){
  
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        success: function(result){
          Swal.fire({
            title: "Excelente",
  
            text: "Se ha registrado exitosamente",
  
            icon: "success"
          });
          // window.location.href= "http://192.168.140.176:5500/front_end/listacliente.html";
        },
        error: function(error){
          Swal.fire("Error", "Error al guardar "+error.responseText, "error");
        }
      });
    }else{
     // alert("llena los campos correctamente")
      Swal.fire({
        title: "Error!",
        text: "Complete los campos correctamente",
        icon: "error"
      });
    }
}
function validarCampos() {
   
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password"); 
   
    return validarusername(username) && validarpassword(password) && validaremail(email);
}

function validarusername(username) {
    if (!username || !username.value) {
        return false;
    }

    let valor = username.value;
    let valido = true;
    if (valor.length <=0 || valor.length > 100) {
        valido = false;
    }

    if (valido) {
        username.className = "form-control is-valid";
    } else {
        username.className = "form-control is-invalid";
    }
    return valido;
}

function validarpassword(password) {
    if (!password || !password.value) {
        return false;
    }

    let valor = password.value;
    let valido = true;

    // Longitud mínima de 8 caracteres y máxima de 20 caracteres
    if (valor.length < 8 || valor.length > 20) {
        valido = false;
    }

    // Al menos una letra mayúscula
    if (!/[A-Z]/.test(valor)) {
        valido = false;
    }

    // Al menos una letra minúscula
    if (!/[a-z]/.test(valor)) {
        valido = false;
    }

    // Al menos un número
    if (!/[0-9]/.test(valor)) {
        valido = false;
    }

    // Al menos un carácter especial
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(valor)) {
        valido = false;
    }

    if (valido) {
        password.className = "form-control is-valid";
    } else {
        password.className = "form-control is-invalid";
    }
    return valido;
}


function validaremail(email){
    var valido=true;
    if(email.value.length <=0 || email.value.length > 100){
        valido=false;
    }

    if (valido) {
        email.className = "form-control is-valid"
    }
    else{
        email.className = "form-control is-invalid"
    }
    return valido;
}
  
