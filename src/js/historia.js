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

/*nav*/

function toggleMenu() {
    const navbar = document.getElementById("navbar");
    const hamburger = document.querySelector(".hamburger");

    navbar.classList.toggle("active");
    hamburger.classList.toggle("active");
}

// Cerrar menú al hacer clic en un enlace (solo en mobile)
document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", () => {
        const navbar = document.getElementById("navbar");
        const hamburger = document.querySelector(".hamburger");

        if (window.innerWidth <= 768) {
            navbar.classList.remove("active");
            hamburger.classList.remove("active");
        }
    });
});

// Reset al cambiar tamaño de ventana
window.addEventListener("resize", () => {
    const navbar = document.getElementById("navbar");
    const hamburger = document.querySelector(".hamburger");

    if (window.innerWidth > 768) {
        navbar.classList.remove("active");
        hamburger.classList.remove("active");
    }
});

// Cerrar menú al hacer clic fuera (solo mobile)
document.addEventListener("click", (e) => {
    const navbar = document.getElementById("navbar");
    const hamburger = document.querySelector(".hamburger");
    const logo = document.querySelector(".logo");

    if (
        window.innerWidth <= 768 &&
        navbar.classList.contains("active") &&
        !navbar.contains(e.target) &&
        !hamburger.contains(e.target) &&
        !logo.contains(e.target)
    ) {
        navbar.classList.remove("active");
        hamburger.classList.remove("active");
    }
});