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





/*document.addEventListener("DOMContentLoaded",()=> {
    const correctas = document.querySelectorAll(".reapuestaCorrecta")
    correctas.forEach((opcion)=> {
    opcion.addEventListener("click", ()=> {
    Swal.fire({
    title: '¡Correcto!',
    text: 'Has elegido bien 🔋',
    icon: 'success', 
    confirmButtonText: 'Continuar'
});
        })
    })
}) 

document.addEventListener("DOMContentLoaded",()=> {
    const incorrectas = document.querySelectorAll(".reapuestaIncorrecta")
    incorrectas.forEach((opcion)=> {
    opcion.addEventListener("click", ()=> {
    Swal.fire({
    title: '¡Incorrecto!',
    text: 'Intenta otra vez 😢',
    icon: 'error',
    confirmButtonText: 'Continuar'
});
        })
    })
}) 


/*function seleccionarRespuesta(elemento, esCorrecta) {
    if (esCorrecta) {
        alert("¡Correcto! 🎉" );
    }
    else {
        alert("Incorrecto ❌");
    }
}

function seleccionarRespuesta(elemento, esCorrecta){
    if(esCorrecta){
        elemento.style.backgroundColor = "green";
        alert("¡Correcto! 🎉");
    }
    else {
        elemento.style.backgroundColor = "red";
        alert("Incorrecto ❌");
    }
    }*/
