
let cards = document.querySelectorAll(".card");

      let stackArea = document.querySelector(".stack-area");

      function rotateCards() {
        let angle = 0;
        cards.forEach((card, index) => {
          if (card.classList.contains("away")) {
            card.style.transform = `translateY(-120vh) rotate(-48deg)`;
          } else {
            card.style.transform = ` rotate(${angle}deg)`;
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

        for (i = 0; i < cards.length; i++) {
          if (i <= index) {
            cards[i].classList.add("away");
          } else {
            cards[i].classList.remove("away");
          }
        }
        rotateCards();
      });

document.addEventListener("DOMContentLoaded", () => {
    const titleElement = document.getElementById("title");
    const cards = document.querySelectorAll(".card");
    const cardPositions = [];

    // Store the positions of each card
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        cardPositions.push(rect.top + window.scrollY); // Get the absolute position
    });

    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2; // Middle of the viewport

        // Check which card is currently in view
        for (let i = 0; i < cardPositions.length; i++) {
            if (scrollPosition >= cardPositions[i] && 
                (i === cardPositions.length - 1 || scrollPosition < cardPositions[i + 1])) {
                // Update the title based on the current card
                titleElement.textContent = cards[i].getAttribute("data-title");
                break;
            }
        }
    });
});
