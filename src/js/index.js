  // Inicializar el átomo 3D cuando se carga la página
        let atomScene, atomCamera, atomRenderer, atomGroup;
        let electrons = [];
        let isAtomInitialized = false;

        function initAtom() {
            if (isAtomInitialized) return;
            
            const container = document.getElementById('atom-container');
            if (!container) return;

            // Configuración de la escena
            atomScene = new THREE.Scene();
            atomCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
            atomRenderer = new THREE.WebGLRenderer({ 
                antialias: true, 
                alpha: true,
                canvas: document.createElement('canvas')
            });
            
            atomRenderer.setSize(300, 300);
            atomRenderer.setClearColor(0x000000, 0);
            atomRenderer.domElement.id = 'atom-canvas';
            container.appendChild(atomRenderer.domElement);

            // Grupo principal del átomo
            atomGroup = new THREE.Group();
            atomScene.add(atomGroup);

            // Materiales con colores oscuros
            const protonMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x8B0000,
                shininess: 100,
                specular: 0x444444
            });
            
            const neutronMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x2F2F2F,
                shininess: 100,
                specular: 0x444444
            });
            
            const electronMaterial = new THREE.MeshPhongMaterial({ 
                color: 0x0066CC,
                shininess: 150,
                specular: 0x666666,
                emissive: 0x001122
            });

            // Geometrías
            const nucleonGeometry = new THREE.SphereGeometry(0.2, 16, 16);
            const electronGeometry = new THREE.SphereGeometry(0.1, 12, 12);

            // Crear protones (3)
            const protonPositions = [[-0.3, 0, 0], [0.3, 0, 0], [0, 0.3, 0]];
            protonPositions.forEach(pos => {
                const proton = new THREE.Mesh(nucleonGeometry, protonMaterial);
                proton.position.set(pos[0], pos[1], pos[2]);
                atomGroup.add(proton);
            });

            // Crear neutrones (4)
            const neutronPositions = [[0, -0.3, 0], [0, 0, 0.3], [0, 0, -0.3], [0.15, 0.15, 0.15]];
            neutronPositions.forEach(pos => {
                const neutron = new THREE.Mesh(nucleonGeometry, neutronMaterial);
                neutron.position.set(pos[0], pos[1], pos[2]);
                atomGroup.add(neutron);
            });

            // Crear electrones (3) y sus órbitas
            const orbitRadii = [1.5, 2, 2.5];
            const orbitSpeeds = [0.03, 0.02, 0.015];
            const orbitAngles = [0, Math.PI / 3, 2 * Math.PI / 3];

            orbitRadii.forEach((radius, i) => {
                // Crear anillo de órbita
                const orbitGeometry = new THREE.RingGeometry(radius - 0.01, radius + 0.01, 32);
                const orbit = new THREE.Mesh(
                    orbitGeometry, 
                    new THREE.MeshBasicMaterial({ 
                        color: 0x333333, 
                        transparent: true, 
                        opacity: 0.2,
                        side: THREE.DoubleSide
                    })
                );
                
                orbit.rotation.x = Math.PI / 2 + (i * Math.PI / 8);
                orbit.rotation.y = i * Math.PI / 6;
                atomGroup.add(orbit);

                // Crear electrón
                const electron = new THREE.Mesh(electronGeometry, electronMaterial);
                atomGroup.add(electron);
                
                electrons.push({
                    mesh: electron,
                    radius: radius,
                    speed: orbitSpeeds[i],
                    angle: orbitAngles[i],
                    orbitRotation: { x: Math.PI / 2 + (i * Math.PI / 8), y: i * Math.PI / 6 }
                });
            });

            // Iluminación
            const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
            atomScene.add(ambientLight);

            const pointLight1 = new THREE.PointLight(0xffffff, 0.6, 100);
            pointLight1.position.set(5, 5, 5);
            atomScene.add(pointLight1);

            const pointLight2 = new THREE.PointLight(0x4444ff, 0.4, 100);
            pointLight2.position.set(-5, -5, 3);
            atomScene.add(pointLight2);

            // Posición de la cámara
            atomCamera.position.set(4, 4, 4);
            atomCamera.lookAt(0, 0, 0);

            // Controles de mouse simplificados
            let mouseDown = false;
            let mouseX = 0, mouseY = 0;
            let targetRotationX = 0, targetRotationY = 0;
            let rotationX = 0, rotationY = 0;

            atomRenderer.domElement.addEventListener('mousedown', (event) => {
                mouseDown = true;
                mouseX = event.clientX;
                mouseY = event.clientY;
            });

            document.addEventListener('mouseup', () => {
                mouseDown = false;
            });

            atomRenderer.domElement.addEventListener('mousemove', (event) => {
                if (mouseDown) {
                    const deltaX = event.clientX - mouseX;
                    const deltaY = event.clientY - mouseY;
                    
                    targetRotationY += deltaX * 0.01;
                    targetRotationX += deltaY * 0.01;
                    
                    mouseX = event.clientX;
                    mouseY = event.clientY;
                }
            });

            // Función de animación del átomo
            function animateAtom() {
                if (!atomGroup) return;

                // Suavizar la rotación
                rotationX += (targetRotationX - rotationX) * 0.1;
                rotationY += (targetRotationY - rotationY) * 0.1;
                
                atomGroup.rotation.x = rotationX;
                atomGroup.rotation.y = rotationY;

                // Animar electrones en sus órbitas
                electrons.forEach((electronData) => {
                    electronData.angle += electronData.speed;
                    
                    const x = Math.cos(electronData.angle) * electronData.radius;
                    const y = Math.sin(electronData.angle) * electronData.radius * 0.3;
                    const z = Math.sin(electronData.angle) * electronData.radius;
                    
                    const cosX = Math.cos(electronData.orbitRotation.x);
                    const sinX = Math.sin(electronData.orbitRotation.x);
                    const cosY = Math.cos(electronData.orbitRotation.y);
                    const sinY = Math.sin(electronData.orbitRotation.y);
                    
                    const rotatedY = y * cosX - z * sinX;
                    const rotatedZ = y * sinX + z * cosX;
                    const finalX = x * cosY - rotatedZ * sinY;
                    const finalZ = x * sinY + rotatedZ * cosY;
                    
                    electronData.mesh.position.set(finalX, rotatedY, finalZ);
                });

                // Rotación automática suave
                atomGroup.rotation.y += 0.005;

                atomRenderer.render(atomScene, atomCamera);
                requestAnimationFrame(animateAtom);
            }

            animateAtom();
            isAtomInitialized = true;
        }

        // Inicializar el átomo cuando se carga la página
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initAtom, 500); // Pequeño delay para asegurar que todo esté cargado
        });



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