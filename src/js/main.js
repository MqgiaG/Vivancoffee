document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     ELEMENTOS DEL LOADER
  ====================================================== */

  const loader = document.querySelector("#loader");

  const progressFill = document.querySelector(
    ".loader__progress"
  );

  const progressText = document.querySelector(
    ".loader__text"
  );


  /* =====================================================
     VERIFICAR LOADER
  ====================================================== */

  if (!loader) {
    console.warn("Vivancoffee: no se encontró #loader.");
    return;
  }


  /* =====================================================
     BLOQUEAR SCROLL
  ====================================================== */

  document.body.classList.add("is-loading");


  /* =====================================================
     VARIABLES
  ====================================================== */

  let progress = 0;

  let finished = false;

  const minimumLoadingTime = 2800;

  const startTime = Date.now();


  /* =====================================================
     TEXTOS DEL LOADER
  ====================================================== */

  const updateLoadingText = () => {

    if (!progressText) {
      return;
    }


    if (progress < 30) {

      progressText.textContent =
        "MOLIENDO LOS GRANOS...";

    } else if (progress < 60) {

      progressText.textContent =
        "PREPARANDO TU CAFÉ...";

    } else if (progress < 90) {

      progressText.textContent =
        "AÑADIENDO SABOR...";

    } else if (progress < 100) {

      progressText.textContent =
        "CASI LISTO...";

    } else {

      progressText.textContent =
        "VIVANCOFFEE ESTÁ LISTO";
    }
  };


  /* =====================================================
     ACTUALIZAR BARRA
  ====================================================== */

  const updateProgress = () => {

    if (progressFill) {

      progressFill.style.width =
        `${progress}%`;
    }

    updateLoadingText();
  };


  /* =====================================================
     INICIAR LOADER
  ====================================================== */

  updateProgress();


  /* =====================================================
     PROGRESO AUTOMÁTICO
  ====================================================== */

  const loadingInterval = setInterval(() => {

    if (progress >= 100) {
      return;
    }


    /*
      Avance progresivo.
      Se vuelve más lento conforme llega al final
      para que el loading se sienta más natural.
    */

    if (progress < 60) {

      progress +=
        Math.floor(
          Math.random() * 8
        ) + 4;

    } else if (progress < 85) {

      progress +=
        Math.floor(
          Math.random() * 5
        ) + 2;

    } else {

      progress +=
        Math.floor(
          Math.random() * 3
        ) + 1;
    }


    if (progress > 100) {
      progress = 100;
    }


    updateProgress();


    /* =================================================
       LLEGÓ AL 100%
    ================================================== */

    if (progress === 100) {

      clearInterval(
        loadingInterval
      );

      finishLoader();
    }

  }, 130);


  /* =====================================================
     FINALIZAR LOADER
  ====================================================== */

  function finishLoader() {

    if (finished) {
      return;
    }

    finished = true;


    /*
      Nos aseguramos de que el loading dure
      mínimo unos segundos para que sí se alcance
      a apreciar la animación.
    */

    const elapsed =
      Date.now() - startTime;

    const remainingTime =
      Math.max(
        0,
        minimumLoadingTime - elapsed
      );


    setTimeout(() => {

      /* ===============================================
         OCULTAR
      ================================================ */

      loader.classList.add(
        "loader--hidden"
      );


      /* ===============================================
         DESBLOQUEAR SCROLL
      ================================================ */

      document.body.classList.remove(
        "is-loading"
      );


      /* ===============================================
         ELIMINAR DEL DOM
      ================================================ */

      setTimeout(() => {

        if (loader) {
          loader.remove();
        }

      }, 900);

    }, remainingTime);
  }


  /* =====================================================
     FALLBACK
     
     Si por alguna razón el intervalo no termina,
     el loader no se queda pegado para siempre.
  ====================================================== */

  setTimeout(() => {

    if (!finished) {

      progress = 100;

      updateProgress();

      clearInterval(
        loadingInterval
      );

      finishLoader();
    }

  }, 7000);

});