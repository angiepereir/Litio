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

// REVERSE SCROLLING COLUMNS ANIMATION
function initReverseScrolling() {
    const scrollContainer = document.querySelector('.container-column-scroll');
    const parallaxSections = document.querySelectorAll('.parallax-scroll');

    if (!scrollContainer || !parallaxSections.length) return;

    let ticking = false;

    function updateReverseScroll() {
        const containerRect = scrollContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Solo procesar si el contenedor está visible
        if (containerRect.bottom >= 0 && containerRect.top <= viewportHeight) {

            parallaxSections.forEach((section, index) => {
                const elevator = section.querySelector('.elevator');
                const elevatorText = section.querySelector('.elevator-text');

                if (!elevator || !elevatorText) return;

                const sectionRect = section.getBoundingClientRect();

                // Calcular el progreso del scroll para esta sección
                const sectionTop = sectionRect.top;
                const sectionHeight = sectionRect.height;

                // Progreso basado en cuándo la sección entra y sale del viewport
                const progress = (viewportHeight - sectionTop) / (viewportHeight + sectionHeight);

                // Diferentes velocidades para crear el efecto reverse
                const imageSpeed = -0.3; // Imágenes se mueven hacia arriba
                const textSpeed = 0.3;   // Texto se mueve hacia abajo

                // Calcular desplazamientos
                const imageOffset = progress * 200 * imageSpeed; // Rango de movimiento
                const textOffset = progress * 200 * textSpeed;

                // Aplicar transformaciones con suavizado
                elevator.style.transform = `translateY(${imageOffset}px)`;
                elevatorText.style.transform = `translateY(${textOffset}px)`;

                // Efecto de opacidad opcional basado en la proximidad al centro
                const centerDistance = Math.abs(sectionTop - viewportHeight / 2) / (viewportHeight / 2);
                const opacity = Math.max(0.3, 1 - centerDistance * 0.7);

                elevator.style.opacity = opacity;
                elevatorText.style.opacity = opacity;
            });
        }

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateReverseScroll);
            ticking = true;
        }
    }

    // Event listeners
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);

    // Inicializar
    updateReverseScroll();
}

// ALTERNATIVA: Efecto más dramático con IntersectionObserver
function initAdvancedReverseScrolling() {
    const parallaxSections = document.querySelectorAll('.parallax-scroll');

    // Crear observer para detectar cuando las secciones entran al viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '10% 0px'
    });

    parallaxSections.forEach(section => {
        observer.observe(section);
    });

    let ticking = false;

    function updateAdvancedScroll() {
        const viewportHeight = window.innerHeight;
        const scrollY = window.pageYOffset;

        parallaxSections.forEach((section, index) => {
            if (!section.classList.contains('in-view')) return;

            const elevator = section.querySelector('.elevator');
            const elevatorText = section.querySelector('.elevator-text');

            if (!elevator || !elevatorText) return;

            const sectionRect = section.getBoundingClientRect();
            const sectionCenter = sectionRect.top + sectionRect.height / 2;
            const viewportCenter = viewportHeight / 2;

            // Distancia del centro de la sección al centro del viewport
            const distanceFromCenter = sectionCenter - viewportCenter;

            // Diferentes patrones de movimiento para cada sección
            const isEven = index % 2 === 0;

            let imageTransform, textTransform;

            if (isEven) {
                // Secciones pares: imagen sube, texto baja
                imageTransform = `translateY(${distanceFromCenter * -0.3}px) scale(${1 + Math.abs(distanceFromCenter) * 0.0002})`;
                textTransform = `translateY(${distanceFromCenter * 0.5}px)`;
            } else {
                // Secciones impares: imagen baja, texto sube
                imageTransform = `translateY(${distanceFromCenter * 0.3}px) scale(${1 + Math.abs(distanceFromCenter) * 0.0002})`;
                textTransform = `translateY(${distanceFromCenter * -0.5}px)`;
            }

            // Aplicar transformaciones
            elevator.style.transform = imageTransform;
            elevatorText.style.transform = textTransform;

            // Efecto de blur basado en la distancia
            const blurAmount = Math.min(3, Math.abs(distanceFromCenter) * 0.01);
            elevator.style.filter = `blur(${blurAmount}px)`;
        });

        ticking = false;
    }

    function requestAdvancedTick() {
        if (!ticking) {
            requestAnimationFrame(updateAdvancedScroll);
            ticking = true;
        }
    }

    // Event listeners
    window.addEventListener('scroll', requestAdvancedTick, { passive: true });
    window.addEventListener('resize', requestAdvancedTick);

    // Inicializar
    updateAdvancedScroll();
}

// FUNCIÓN DE INICIALIZACIÓN PRINCIPAL
function initColumnScrollEffects() {
    // Remover el event listener anterior si existe
    const oldScript = document.querySelector('script[data-column-scroll]');
    if (oldScript) {
        oldScript.remove();
    }

    // Elegir qué efecto usar (puedes cambiar entre las dos opciones)
    // initReverseScrolling(); // Efecto básico
    initAdvancedReverseScrolling(); // Efecto avanzado
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initColumnScrollEffects);
} else {
    initColumnScrollEffects();
}


// Botón móvil con efectos especiales
function initMovingButton() {
    const button = document.getElementById('botonMovible');
    const container = document.querySelector('.container-how-to');
    
    if (!button || !container) return;
    
    // Crear efectos de partículas
    setInterval(() => {
        const rect = button.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        for (let i = 0; i < 2; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = 'rgba(255,255,255,0.7)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '99';
            
            const x = rect.left - containerRect.left + (rect.width / 2);
            const y = rect.top - containerRect.top + (rect.height / 2);
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.animation = 'particleFade 1s ease-out forwards';
            
            container.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1000);
        }
    }, 800);
    
    // Efecto de click
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255,255,255,0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'buttonRipple 0.6s ease-out';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
}

// Agregar estilos de animación dinámicamente
const buttonStyles = document.createElement('style');
buttonStyles.textContent = `
    @keyframes particleFade {
        0% { opacity: 1; transform: scale(1) translate(0, 0); }
        100% { opacity: 0; transform: scale(0.3) translate(30px, -30px); }
    }
    @keyframes buttonRipple {
        to { transform: scale(4); opacity: 0; }
    }
`;
document.head.appendChild(buttonStyles);

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMovingButton);
} else {
    initMovingButton();
}