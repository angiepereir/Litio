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
  let index = Math.floor(-1 * (topVal / distance + 1));

  for (let i = 0; i < cards.length; i++) {
    if (i <= index) {
      cards[i].classList.add("away");
    } else {
      cards[i].classList.remove("away");
    }
  }

  // Actualizamos el título con la tarjeta activa (la última que no tiene la clase away)
  let currentCard = Array.from(cards).find(card => !card.classList.contains("away"));
  if (currentCard) {
    title.style.opacity = 0;
    setTimeout(() => {
      title.textContent = currentCard.getAttribute("data-title");
      title.style.opacity = 1;
    }, 200);
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


document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('emojiButton');

  button.addEventListener('click', function () {
    // Elimina cualquier lluvia anterior
    document.querySelectorAll('.emoji-rain').forEach(e => e.remove());

    // Buscar la carta visible en el viewport
    const visibleCard = Array.from(document.querySelectorAll('.card')).find(card => {
      const rect = card.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });

    if (!visibleCard) return;

    const emoji = visibleCard.getAttribute('data-emoji');
    if (!emoji) return;

    // Crear contenedor para lluvia
    const rainContainer = document.createElement('div');
    rainContainer.classList.add('emoji-rain');
    Object.assign(rainContainer.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 9999,
    });
    document.body.appendChild(rainContainer);

    // Generar lluvia
    for (let i = 0; i < 30; i++) {
      const emojiSpan = document.createElement('span');
      emojiSpan.textContent = emoji;
      Object.assign(emojiSpan.style, {
        position: 'absolute',
        left: `${Math.random() * 100}vw`,
        top: `-40px`,
        fontSize: `${Math.random() * 24 + 16}px`,
        opacity: 1,
        transition: 'transform 3s ease, opacity 3s ease',
      });

      rainContainer.appendChild(emojiSpan);

      setTimeout(() => {
        emojiSpan.style.transform = `translateY(100vh) rotate(${Math.random() * 360}deg)`;
        emojiSpan.style.opacity = 0;
      }, i * 100);
    }

    // Remover después de animación
    setTimeout(() => {
      rainContainer.remove();
    }, 4000);
  });
});


window.addEventListener("scroll", () => {
  let cards = document.querySelectorAll(".card");
  let subtitleText = document.querySelector("#subtitleText"); // solo el <p>
  let title = document.querySelector("#title");

  let visibleCard = Array.from(cards).find(card => {
    const rect = card.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  });

  if (visibleCard) {
    // Obtener datos de la tarjeta
    let cardTitle = visibleCard.getAttribute("data-title");
    let cardSubtitle = visibleCard.getAttribute("data-subtitle");

    // Actualizar texto
    title.textContent = cardTitle;
    subtitleText.textContent = cardSubtitle; // solo cambia el <p>, no el botón
  }
});

window.addEventListener("scroll", () => {
  const cards = document.querySelectorAll(".card");
  const subtitleText = document.querySelector("#subtitleText");
  const title = document.querySelector("#title");

  // Detectar si estamos en un tamaño menor a 768px
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // Mostrar texto por defecto en mobile
    subtitleText.textContent = "Somos mujeres fuertes, dependientes y resilientes. y luchamos nos y lograremos todo lo que nos proponemos.";
    return; // Salimos sin hacer scroll tracking
  }

  // Scroll tracking solo en escritorio
  const visibleCard = Array.from(cards).find(card => {
    const rect = card.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  });

  if (visibleCard) {
    const cardTitle = visibleCard.getAttribute("data-title");
    const cardSubtitle = visibleCard.getAttribute("data-subtitle");

    title.textContent = cardTitle;
    subtitleText.textContent = cardSubtitle;
  }
});
