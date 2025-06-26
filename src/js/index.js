 



particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": { "value": "#ffffff" },
    "shape": {
      "type": "circle",
      "stroke": { "width": 0, "color": "#000000" }
    },
    "opacity": {
      "value": 0.5,
      "random": false
    },
    "size": {
      "value": 3,
      "random": true
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "out_mode": "out"
    }
  },
  "interactivity": {
    "events": {
      "onhover": { "enable": true, "mode": "repulse" },
      "onclick": { "enable": true, "mode": "push" }
    },
    "modes": {
      "repulse": { "distance": 100 },
      "push": { "particles_nb": 4 }
    }
  },
  "retina_detect": true
});
  document.getElementById("enter-button").addEventListener("click", function () {
  document.getElementById("intro-screen").style.display = "none";
  document.getElementById("main-content").style.display = "block";
});
  document.getElementById("back-button").addEventListener("click", function () {
  document.getElementById("main-content").style.display = "none";
  document.getElementById("intro-screen").style.display = "flex";
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