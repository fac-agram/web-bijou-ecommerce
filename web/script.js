(function () {
  "use strict";

  const STORAGE_KEY = "atelier:finish";
  const FINISH_IDS = ["oro", "plata", "noir"];

  // 1. Selector de acabado (Finish Switcher)
  const finishContainer = document.querySelector(".finish");
  const finishButtons = document.querySelectorAll(".finish__option");

  function setFinish(id) {
    if (!FINISH_IDS.includes(id)) return;

    const index = FINISH_IDS.indexOf(id);
    document.documentElement.dataset.finish = id;

    if (finishContainer) {
      finishContainer.dataset.index = String(index);
    }

    finishButtons.forEach((btn) => {
      const isSelected = btn.dataset.finish === id;
      btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });

    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch (_) {}
  }

  // Sincronizar el estado inicial con el DOM / localStorage
  let initialFinish = document.documentElement.dataset.finish || "oro";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && FINISH_IDS.includes(saved)) {
      initialFinish = saved;
    }
  } catch (_) {}

  setFinish(initialFinish);

  finishButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.finish;
      if (id) setFinish(id);
    });
  });

  // 2. Menú de navegación móvil
  const menuButton = document.querySelector(".menu-button");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileNavInner = mobileNav ? mobileNav.querySelector(".mobile-nav__inner") : null;
  const mobileLinks = mobileNav ? mobileNav.querySelectorAll("a") : [];

  function setMenuOpen(open) {
    if (!menuButton || !mobileNav) return;

    menuButton.setAttribute("aria-expanded", open ? "true" : "false");
    menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    mobileNav.dataset.open = open ? "true" : "false";

    if (mobileNavInner) {
      if (open) {
        mobileNavInner.removeAttribute("inert");
      } else {
        mobileNavInner.setAttribute("inert", "");
      }
    }
  }

  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      setMenuOpen(!isExpanded);
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    // Cerrar el menú si se presiona la tecla Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        menuButton.focus();
      }
    });
  }

  // 3. Año dinámico en el footer
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
})();

