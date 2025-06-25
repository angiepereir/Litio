let cards = document.querySelectorAll(".card");
let stackArea = document.querySelector(".stack-area");
let title = document.querySelector("#title");

function rotateCards() {
  let angle = 0;
  cards.forEach((card, index) => {
    if (card.classList.contains("away")) {
      card.style.transform = `translateY(-120vh) rotate(-48deg)`;
    } else {
      card.style.transform = `rotate(${angle}deg)`;
      angle = angle - 10;
      card.style.zIndex = cards.length - index;
    }
  });
}

rotateCards();

window.addEventListener("scroll", () => {
  let distance = window.innerHeight * 0.5;
  let topVal = stackArea.getBoundingClientRect().top;
  let index = -1 * (topVal / distance + 1);
  index = Math.floor(index);

  // Mostrar u ocultar las tarjetas
  for (let i = 0; i < cards.length; i++) {
    if (i <= index) {
      cards[i].classList.add("away");
    } else {
      cards[i].classList.remove("away");
    }
  }

  // Cambiar el título con base en la tarjeta actual
  if (index >= 0 && index < cards.length) {
    let currentTitle = cards[index].getAttribute("data-title");
    title.textContent = currentTitle;
  } else {
    title.textContent = "Our Features"; // Valor por defecto si no hay tarjeta activa
  }

  rotateCards();
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