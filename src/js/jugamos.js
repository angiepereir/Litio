  document.addEventListener("DOMContentLoaded", () => {
  const correctas = document.querySelectorAll(".respuestaCorrecta");
  const incorrectas = document.querySelectorAll(".respuestaIncorrecta");
  const totalPreguntas = document.querySelectorAll('.pregunta-card').length;
  let puntos = 0;

  const reinosOrden = ['quimico', 'natural', 'tecnologico'];
  const preguntasRespondidas = new Set();
  let reinoActualIndex = 0;

  // Pantalla de inicio
  const playBtn = document.getElementById("playBtn");
  const pantallaPrincipal = document.querySelector(".pantalla-principal");
  const contenedorPrincipal = document.querySelector(".contenedor-principal");

  if (playBtn && pantallaPrincipal && contenedorPrincipal) {
    playBtn.addEventListener("click", () => {
      pantallaPrincipal.style.display = "none";
      contenedorPrincipal.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Mostrar solo el reino actual permitido
  function mostrarReinoActual() {
    document.querySelectorAll('.preguntas').forEach(sec => {
      sec.style.display = 'none';
    });

    const reino = reinosOrden[reinoActualIndex];
    const seccion = document.getElementById(reino);
    if (seccion) {
      seccion.style.display = 'block';
    }
  }

  // Desactivar navegación manual (click en menú)
  document.querySelectorAll('.reinos a').forEach((link, index) => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    if (index <= reinoActualIndex) {
      mostrarReinoActual();

      // Hacer scroll suave hasta el formulario/pregunta
      const reinoId = reinosOrden[index];
      const seccion = document.getElementById(reinoId);
      if (seccion) {
        seccion.scrollIntoView({ behavior: "smooth" });
      }

    } else {
      Swal.fire({
        icon: "info",
        title: "¡Ups!",
        text: "Primero responde las preguntas anteriores antes de avanzar.",
      });
    }
  });
});

  // Manejo de respuestas
  function manejarRespuesta(elemento, esCorrecta) {
    if (preguntaYaRespondida(elemento)) return;

    if (esCorrecta) {
      sonidoCorrecto.currentTime = 0;
      sonidoCorrecto.play();
      elemento.style.backgroundColor = "#d4edda";
    } else {
      sonidoIncorrecto.currentTime = 0;
      sonidoIncorrecto.play();
      elemento.style.backgroundColor = "#f8d7da";
    }

    Swal.fire({
      icon: esCorrecta ? "success" : "error",
      title: esCorrecta ? "¡Correcto!" : "¡Ni Heráclito entendería esa respuesta tan confusa!",
      text: esCorrecta ? "¡Vaya, por fin una neurona encendida!" : "Sigue intentándolo...",
      willClose: () => {
        avanzarSiTodasResueltasDelReino();
      }
    });

    desactivarGrupo(elemento);
    marcarPreguntaRespondida(elemento);

    if (esCorrecta) puntos++;

    if (puntos === totalPreguntas) {
      mostrarMensajeGanador();
    }
  }

  correctas.forEach((elemento) => {
    elemento.addEventListener("click", () => manejarRespuesta(elemento, true));
  });

  incorrectas.forEach((elemento) => {
    elemento.addEventListener("click", () => manejarRespuesta(elemento, false));
  });

  function avanzarSiTodasResueltasDelReino() {
    const preguntasEnReino = document
      .getElementById(reinosOrden[reinoActualIndex])
      .querySelectorAll(".pregunta-card");

    const todasRespondidas = Array.from(preguntasEnReino).every(p =>
      preguntasRespondidas.has(p)
    );

    if (todasRespondidas && reinoActualIndex < reinosOrden.length - 1) {
      reinoActualIndex++;
      mostrarReinoActual();
    }
  }

  function desactivarGrupo(opcionSeleccionada) {
    const grupo = opcionSeleccionada.parentElement.querySelectorAll("li");
    grupo.forEach((li) => {
      li.style.pointerEvents = "none";
    });
  }

  function marcarPreguntaRespondida(elemento) {
    const pregunta = elemento.closest(".pregunta-card");
    preguntasRespondidas.add(pregunta);
  }

  function preguntaYaRespondida(elemento) {
    const pregunta = elemento.closest(".pregunta-card");
    return preguntasRespondidas.has(pregunta);
  }

  function mostrarMensajeGanador() {
    const mensaje = document.getElementById("Mensaje-ganador");
    if (mensaje) {
      mensaje.classList.remove("hidden");
      mensaje.scrollIntoView({ behavior: "smooth" });
    }
  }

  window.reiniciarJuego = function () {
    location.reload();
  };
});

// Sonidos
const sonidoCorrecto = document.getElementById("sound-correct");
const sonidoIncorrecto = document.getElementById("sound-incorrect");


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