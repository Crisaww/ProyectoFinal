$(document).ready(function(){
    $(".packages-carousel").owlCarousel({
        items: 3, // Número de tarjetas visibles a la vez
        loop: true, // Hacer el carrusel en bucle
        margin: 10, // Espacio entre tarjetas
        nav: true, // Mostrar botones de navegación
        autoplay: true, // Activar la reproducción automática
        autoplayTimeout: 5000, // Tiempo entre transiciones (2 segundos)
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
});
