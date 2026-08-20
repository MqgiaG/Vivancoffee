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
     MENÚ INTERACTIVO - CATEGORÍAS
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

    const toggleMenu = (open) => {

      const isOpen =
        typeof open === "boolean"
          ? open
          : !navigation.classList.contains(
              "is-open"
            );


      navigation.classList.toggle(
        "is-open",
        isOpen
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


      /* Bloquea el scroll del fondo */

      document.body.style.overflow =
        isOpen
          ? "hidden"
          : "";

    };


    menuButton.addEventListener(
      "click",
      () => toggleMenu()
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

            toggleMenu(false);

          }
        );

      }
    );

  }


  /* =====================================================
     CERRAR CON ESC
     CATEGORÍAS + MENÚ HAMBURGUESA
  ====================================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key !== "Escape") {
        return;
      }


      /* =============================================
         CERRAR CATEGORÍAS
      ============================================== */

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


      /* =============================================
         CERRAR MENÚ MÓVIL
      ============================================== */

      if (
        navigation &&
        navigation.classList.contains(
          "is-open"
        )
      ) {

        navigation.classList.remove(
          "is-open"
        );


        if (menuButton) {

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


        document.body.style.overflow =
          "";

      }

    }
  );


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
            link.getAttribute(
              "href"
            );


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
          document.createElement(
            "a"
          );


        link.href =
          "menu/Menu_Vivancoffee.pdf";


        link.download =
          "Menu_Vivancoffee.pdf";


        document.body.appendChild(
          link
        );


        link.click();


        document.body.removeChild(
          link
        );

      }
    );

  }


  /* =====================================================
     CURSOR DE CAFÉ
  ====================================================== */

  const coffeeCursor =
    document.querySelector(
      ".coffee-cursor"
    );


  if (coffeeCursor) {

    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;


    /* =============================================
       MOVER EL CURSOR
    ============================================== */

    document.addEventListener(
      "mousemove",
      (event) => {

        mouseX =
          event.clientX;

        mouseY =
          event.clientY;


        coffeeCursor.classList.add(
          "is-visible"
        );

      }
    );


    /* =============================================
       MOVIMIENTO SUAVE
    ============================================== */

    const animateCoffeeCursor = () => {

      cursorX +=
        (mouseX - cursorX) * 0.15;


      cursorY +=
        (mouseY - cursorY) * 0.15;


      coffeeCursor.style.left =
        `${cursorX}px`;


      coffeeCursor.style.top =
        `${cursorY}px`;


      requestAnimationFrame(
        animateCoffeeCursor
      );

    };


    animateCoffeeCursor();


    /* =============================================
       OCULTAR AL SALIR DE LA VENTANA
    ============================================== */

    document.addEventListener(
      "mouseleave",
      () => {

        coffeeCursor.classList.remove(
          "is-visible"
        );

      }
    );


    /* =============================================
       MOSTRAR AL VOLVER
    ============================================== */

    document.addEventListener(
      "mouseenter",
      () => {

        coffeeCursor.classList.add(
          "is-visible"
        );

      }
    );


    /* =============================================
       EFECTO AL HACER CLICK
    ============================================== */

    document.addEventListener(
      "mousedown",
      () => {

        coffeeCursor.classList.add(
          "is-clicked"
        );

      }
    );


    document.addEventListener(
      "mouseup",
      () => {

        coffeeCursor.classList.remove(
          "is-clicked"
        );

      }
    );

  }

});