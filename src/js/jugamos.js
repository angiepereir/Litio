document.addEventListener("DOMContentLoaded", () => {
  const correctas = document.querySelectorAll(".respuestaCorrecta");
  const incorrectas = document.querySelectorAll(".respuestaIncorrecta");

  // Manejar respuestas correctas
  correctas.forEach((elemento) => {
    elemento.addEventListener("click", () => {
      elemento.style.backgroundColor = "#d4edda"; // verde claro
      Swal.fire({
        icon: "success",
        title: "¡Correcto!",
        text: "¡Bien hecho!",
      });
      desactivarGrupo(elemento);
    });
  });

  // Manejar respuestas incorrectas
  incorrectas.forEach((elemento) => {
    elemento.addEventListener("click", () => {
      elemento.style.backgroundColor = "#f8d7da"; // rojo claro
      Swal.fire({
        icon: "error",
        title: "Incorrecto",
        text: "Intenta otra vez.",
      });
      desactivarGrupo(elemento);
    });
  });

  // Desactiva todas las opciones del grupo una vez respondido
  function desactivarGrupo(opcionSeleccionada) {
    const grupo = opcionSeleccionada.parentElement.querySelectorAll("li");
    grupo.forEach((li) => {
      li.style.pointerEvents = "none";
    });
  }
});


js 
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