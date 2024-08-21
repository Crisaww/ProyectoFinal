const root = document.documentElement;
var moradoOscuro="#ffffff";
var moradoClaro="#000000";
function modoOscuro(){
    root.style.setProperty('--background-color', '#000000');
    root.style.setProperty('--colorIconos','ffffff');
}
function modoClaro(){
    root.style.setProperty('--background-color', '#ffffff');
    
}