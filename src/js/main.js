document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     LOADER
  ====================================================== */

  const loader = document.querySelector("#loader");

  const progressFill = document.querySelector(
    ".loader__progress"
  );

  const progressText = document.querySelector(
    ".loader__text"
  );


  if (loader) {

    document.body.classList.add("is-loading");

    let progress = 0;
    let finished = false;

    const minimumLoadingTime = 2800;
    const startTime = Date.now();


    /* =================================================
       TEXTO DEL LOADER
    ================================================== */

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


    /* =================================================
       ACTUALIZAR PROGRESO
    ================================================== */

    const updateProgress = () => {

      if (progressFill) {

        progressFill.style.width =
          `${progress}%`;

      }

      updateLoadingText();

    };


    updateProgress();


    /* =================================================
       PROGRESO AUTOMÁTICO
    ================================================== */

    const loadingInterval = setInterval(() => {

      if (progress >= 100) {
        return;
      }


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


      if (progress === 100) {

        clearInterval(
          loadingInterval
        );

        finishLoader();

      }

    }, 130);


    /* =================================================
       FINALIZAR LOADER
    ================================================== */

    function finishLoader() {

      if (finished) {
        return;
      }

      finished = true;


      const elapsed =
        Date.now() - startTime;


      const remainingTime =
        Math.max(
          0,
          minimumLoadingTime - elapsed
        );


      setTimeout(() => {

        loader.classList.add(
          "loader--hidden"
        );


        document.body.classList.remove(
          "is-loading"
        );


        setTimeout(() => {

          loader.remove();

        }, 900);

      }, remainingTime);

    }


    /* =================================================
       FALLBACK
    ================================================== */

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

  }


  /* =====================================================
     MENÚ INTERACTIVO
  ====================================================== */

  const categories =
    document.querySelectorAll(
      ".menu__category"
    );


  if (categories.length) {

    categories.forEach((category) => {

      const button =
        category.querySelector(
          ".menu__category-button"
        );


      if (!button) {
        return;
      }


      button.addEventListener(
        "click",
        () => {

          const isOpen =
            category.classList.contains(
              "is-open"
            );


          /* =============================================
             CERRAR TODAS LAS CATEGORÍAS
          ============================================== */

          categories.forEach(
            (otherCategory) => {

              otherCategory.classList.remove(
                "is-open"
              );


              const otherButton =
                otherCategory.querySelector(
                  ".menu__category-button"
                );


              if (otherButton) {

                otherButton.setAttribute(
                  "aria-expanded",
                  "false"
                );

              }

            }
          );


          /* =============================================
             ABRIR LA SELECCIONADA
          ============================================== */

          if (!isOpen) {

            category.classList.add(
              "is-open"
            );


            button.setAttribute(
              "aria-expanded",
              "true"
            );

          }

        }
      );

    });

  }


  /* =====================================================
     CERRAR MENÚ CON ESC
  ====================================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key !== "Escape") {
        return;
      }


      categories.forEach(
        (category) => {

          category.classList.remove(
            "is-open"
          );


          const button =
            category.querySelector(
              ".menu__category-button"
            );


          if (button) {

            button.setAttribute(
              "aria-expanded",
              "false"
            );

          }

        }
      );

    }
  );


  /* =====================================================
     MENÚ HAMBURGUESA
  ====================================================== */

  const menuButton =
    document.querySelector(
      ".header__menu-button"
    );

  const navigation =
    document.querySelector(
      ".header__nav"
    );


  if (menuButton && navigation) {

    menuButton.addEventListener(
      "click",
      () => {

        const isOpen =
          navigation.classList.toggle(
            "is-open"
          );


        menuButton.classList.toggle(
          "is-open",
          isOpen
        );


        menuButton.setAttribute(
          "aria-expanded",
          String(isOpen)
        );


        menuButton.setAttribute(
          "aria-label",
          isOpen
            ? "Cerrar menú"
            : "Abrir menú"
        );

      }
    );


    /* ===============================================
       CERRAR AL SELECCIONAR UNA OPCIÓN
    ================================================ */

    const navigationLinks =
      navigation.querySelectorAll(
        ".header__link"
      );


    navigationLinks.forEach(
      (link) => {

        link.addEventListener(
          "click",
          () => {

            navigation.classList.remove(
              "is-open"
            );


            menuButton.classList.remove(
              "is-open"
            );


            menuButton.setAttribute(
              "aria-expanded",
              "false"
            );


            menuButton.setAttribute(
              "aria-label",
              "Abrir menú"
            );

          }
        );

      }
    );

  }


  /* =====================================================
     SCROLL SUAVE
  ====================================================== */

  const internalLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  internalLinks.forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");


          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              targetId
            );


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    }
  );


  /* =====================================================
     BOTÓN DESCARGAR MENÚ
  ====================================================== */

  const downloadButton =
    document.querySelector(
      "#menuDownload"
    );


  if (downloadButton) {

    downloadButton.addEventListener(
      "click",
      () => {

        const link =
          document.createElement("a");


        link.href =
          "menu/Menu_Vivancoffee.pdf";


        link.download =
          "Menu_Vivancoffee.pdf";


        document.body.appendChild(link);


        link.click();


        document.body.removeChild(link);

      }
    );

  }

});