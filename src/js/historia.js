let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let slider = document.querySelector('.slider');

next.addEventListener('click', function(){
  let slides = document.querySelectorAll('.slides');
  slider.appendChild(slides[0]);
})

prev.addEventListener('click', function(){
  let slides = document.querySelectorAll('.slides');
  slider.prepend(slides[slides.length - 1]);
})

// Control con teclas del teclado
document.addEventListener('keydown', function(event) {
    // Tecla flecha izquierda o 'A' para anterior
    if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') {
        document.querySelector('.prev').click();
    }
    
    // Tecla flecha derecha o 'D' para siguiente
    if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') {
        document.querySelector('.next').click();
    }
    
    // Tecla Espacio para siguiente (opcional)
    if (event.key === ' ') {
        event.preventDefault(); // Evita el scroll de la página
        document.querySelector('.next').click();
    }
});