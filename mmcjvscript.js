// ----------------------------------------------------------
  // 1️- Registrar el plugin ScrollTrigger
  // ----------------------------------------------------------
  // GSAP necesita saber que vamos a usar el plugin ScrollTrigger,
  // que permite activar animaciones basadas en el desplazamiento (scroll).
  gsap.registerPlugin(ScrollTrigger);

  // ----------------------------------------------------------
  // 2️-Seleccionar todas las imágenes con la clase .img-section
  // ----------------------------------------------------------
  // gsap.utils.toArray() convierte el NodeList (resultado de querySelectorAll)
  // en un array normal, para poder recorrerlo fácilmente con forEach().
  const images = gsap.utils.toArray(".img-section");


  // ----------------------------------------------------------
  // 3️- Recorrer cada imagen y asignar una animación personalizada
  // ----------------------------------------------------------
  images.forEach((img, index) => {

    // --------------------------------------------------------
    // 3.1 Determinar desde qué dirección entrará la imagen
    // --------------------------------------------------------
    // Según el índice (posición) de la imagen en la lista,
    // se alterna la dirección de aparición:
    // 0 → izquierda, 1 → derecha, 2 → arriba, 3 → abajo
    // Esto se repite cíclicamente cada 4 imágenes.
    let fromVars;
    switch(index % 4) {
      case 0: fromVars = {x: -200, y: 0}; break; // entra desde la izquierda
      case 1: fromVars = {x: 200, y: 0}; break;  // entra desde la derecha
      case 2: fromVars = {x: -200, y: 0}; break; // entra desde arriba
      case 3: fromVars = {x: 200, y: 0}; break;  // entra desde abajo
    }

    // --------------------------------------------------------
    // 3.2 Definir la animación de entrada de la imagen
    // --------------------------------------------------------
    // Se usa gsap.fromTo() para indicar:
    // - un estado inicial (posición y apariencia)
    // - un estado final (posición original, visible, tamaño normal)
    gsap.fromTo(img,
      { ...fromVars, opacity: 0, scale: 0.95 }, // Estado inicial
      { 
        x: 0, y: 0, opacity: 1, scale: 1, duration: 1.0, // Estado final + duración

        // --- Configuración del ScrollTrigger ---
        scrollTrigger: {
          trigger: img,         // el propio elemento activa la animación
          start: "top 80%",     // empieza cuando el top del elemento llega al 80% del viewport
          end: "bottom 20%",    // termina cuando el bottom llega al 20%
          toggleActions: "play play play reverse", 
          // "play" (al entrar), "play" (al avanzar),
          // "play" (al salir por abajo), "reverse" (al volver hacia arriba)
          // En este caso, la animación se repite si se vuelve a entrar en el rango.
          markers: false          // muestra los puntos de inicio y fin (para depurar)
        }
      }
    );
  });


  // ----------------------------------------------------------
  // 4️-Animar los títulos (etiquetas <h2>)
  // ----------------------------------------------------------
  // Cada título se desplazará desde arriba y aparecerá
  // con un fundido suave cuando entre en el viewport.
  gsap.utils.toArray("h2").forEach((text) => {
    gsap.from(text, {
      y: -50,         // se desplaza 50px hacia abajo
      opacity: 0,     // empieza invisible
      duration: 1,    // duración de la animación (1 segundo)

      // --- ScrollTrigger para el texto ---
      scrollTrigger: {
        trigger: text,          // el propio texto activa la animación
        start: "top 90%",       // empieza cuando el top del texto llega al 90% de la pantalla
        toggleActions: "play none none reverse", 
        // se reproduce al aparecer y se revierte al hacer scroll hacia arriba
      }
    });
  });