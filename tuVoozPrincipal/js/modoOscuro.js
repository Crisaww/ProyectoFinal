const root = document.documentElement;
var moradoOscuro="#ffffff";
var moradoClaro="#000000";
function modoOscuro(){
    root.style.setProperty('--background-color', '#000000');
}
function modoClaro(){
    root.style.setProperty('--background-color', '#ffffff');
}