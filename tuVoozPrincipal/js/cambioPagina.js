function cambioPagina(page,etiqueta){
    //este metodo es para cambiar el selecionado 
    document.getElementById("iframe").setAttribute("src",page);
    /*aqui se crea un array llamado list para almacenar todos lo elementos que tengan el tipo de clase 
    a_seleccionado */
    var list=document.getElementsByClassName("a-selecionado")
    /*este ciclo lo que hace es quitarle el seleccionado/ el tipo de clase a un elemento que lo tenia */
    for (index = 0; index < list.length; ++index) {
        list[index].setAttribute("class","");
    }
    /*aqui se le asigna la clase a-selecionad a el el nuevo elemento selecionado */
    etiqueta.setAttribute("class","a-selecionado");

}