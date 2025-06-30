  document.addEventListener("DOMContentLoaded", () => {
  const correctas = document.querySelectorAll(".respuestaCorrecta");
  const incorrectas = document.querySelectorAll(".respuestaIncorrecta");
  const totalPreguntas = 3;
  let puntos = 0;

  //Inicio: Pantalla de Incio

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

//Mostrar preguntas-pero aqui primero las oculta

document.querySelectorAll('.reinos a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();  // Para que no haga el scroll automático al id

    // Ocultar todas las secciones con clase preguntas
    document.querySelectorAll('.preguntas').forEach(sec => {
      sec.style.display = 'none';
    });

    // Mostrar la sección que corresponde al data-reino del enlace clickeado
    const reinoId = this.getAttribute('data-reino');
    const seccionMostrar = document.getElementById(reinoId);
    if (seccionMostrar) {
      seccionMostrar.style.display = 'block';
    }
  });
});
//termina aqui este bloque

  // Llama una sola vez a sumarPunto por cada respuesta correcta
  const preguntasRespondidas = new Set();

  // Manejar respuestas correctas
  correctas.forEach((elemento) => {
    elemento.addEventListener("click", () => {
      if (preguntaYaRespondida(elemento)) return;

      sonidoCorrecto.currentTime = 0;
      sonidoCorrecto.play();

      elemento.style.backgroundColor = "#d4edda"; // verde claro

      Swal.fire({
        icon: "success",
        title: "¡Vaya, por fin una neurona encendida!",
        text: "¡Bien hecho!",
      });

      desactivarGrupo(elemento);
      marcarPreguntaRespondida(elemento);
      puntos++;

      if (puntos === totalPreguntas) {
        mostrarMensajeGanador();
      }
    });
  });

  // Manejar respuestas incorrectas
  incorrectas.forEach((elemento) => {
    elemento.addEventListener("click", () => {
      if (preguntaYaRespondida(elemento)) return;

      sonidoIncorrecto.currentTime = 0;
      sonidoIncorrecto.play();

      elemento.style.backgroundColor = "#f8d7da"; // rojo claro

      Swal.fire({
        icon: "error",
        title: "Ni Heráclito entendería esa respuesta tan confusa.",
        text: "Intenta otra vez.",
      });

      desactivarGrupo(elemento);
      marcarPreguntaRespondida(elemento);
    });
  });

  // Desactiva todas las opciones del grupo una vez respondido
  function desactivarGrupo(opcionSeleccionada) {
    const grupo = opcionSeleccionada.parentElement.querySelectorAll("li");
    grupo.forEach((li) => {
      li.style.pointerEvents = "none";
    });
  }

  // 🔄 Control para que no se sume más de una vez por pregunta
  function marcarPreguntaRespondida(elemento) {
    const pregunta = elemento.closest(".pregunta-card");
    preguntasRespondidas.add(pregunta);
  }

  function preguntaYaRespondida(elemento) {
    const pregunta = elemento.closest(".pregunta-card");
    return preguntasRespondidas.has(pregunta);
  }

  // 🎉 Mostrar mensaje de ganador
  function mostrarMensajeGanador() {
    const mensaje = document.getElementById("Mensaje-ganador");
    if (mensaje) {
      mensaje.classList.remove("hidden");
    }
  }

  // 🔁 Reiniciar
  window.reiniciarJuego = function () {
    location.reload(); // Recarga todo
  };
});

// 🎵 Sonidos
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