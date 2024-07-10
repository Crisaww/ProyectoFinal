function marcarComoFavorito(icono){
    if(icono.className=="fa-regular fa-heart"){
    icono.setAttribute("class", "fa-solid fa-heart");
    }else{
        icono.setAttribute("class", "fa-regular fa-heart");
    }
    
   }