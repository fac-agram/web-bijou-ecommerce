(function () {
  "use strict";

  const WHATSAPP_PHONE = "5491100000000";

  // =========================================
  // CATÁLOGO DE PRODUCTOS (Grilla 2 columnas)
  // =========================================
  const PRODUCTS = [
    {
      id: "aros-luna",
      name: "Aros Luna",
      category: "aros",
      material: "oro",
      badge: "ORO 18K",
      badgeType: "oro",
      cardType: "oro",
      price: 12500,
      installments: "3 CUOTAS S/INT",
      desc: "Argolla mini martillada • Aros",
      watermark: "ORO • ATELIER",
      svg: `
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="38" fill="none" stroke="#D3B068" stroke-width="2.5" opacity="0.9" />
          <circle cx="60" cy="60" r="31" fill="none" stroke="#E3C98E" stroke-width="1.2" opacity="0.5" />
          <circle cx="60" cy="60" r="14" fill="#C5A059" />
          <circle cx="58" cy="58" r="4" fill="#EAD5A8" opacity="0.6" />
        </svg>
      `
    },
    {
      id: "collar-selene",
      name: "Collar Sélene",
      category: "collares",
      material: "plata",
      badge: "PLATA 925",
      badgeType: "plata",
      cardType: "plata",
      price: 9800,
      installments: "3 CUOTAS S/INT",
      desc: "Cadena fina 42cm • Collares",
      watermark: "PUESTO • +30% CONVERSIÓN",
      svg: `
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bustGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#5B5B65" />
              <stop offset="100%" stop-color="#2D2D33" />
            </linearGradient>
          </defs>
          <path d="M 32 20 C 44 15, 76 15, 88 20 C 94 48, 90 85, 78 108 L 42 108 C 30 85, 26 48, 32 20 Z" fill="url(#bustGrad)" />
          <circle cx="60" cy="56" r="24" fill="none" stroke="#E8E8EC" stroke-width="2" />
        </svg>
      `
    },
    {
      id: "anillo-aura",
      name: "Anillo Aura",
      category: "anillos",
      material: "oro",
      badge: "ORO",
      badgeType: "oro",
      cardType: "oro",
      price: 15200,
      installments: "3 CUOTAS S/INT",
      desc: "Sello liso brillo espejo • Anillos",
      watermark: "ORO • ATELIER",
      svg: `
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="42" fill="none" stroke="#C5A059" stroke-width="2.5" />
          <circle cx="60" cy="60" r="16" fill="#C5A059" />
          <circle cx="57" cy="57" r="5" fill="#F3E7C9" opacity="0.7" />
        </svg>
      `
    },
    {
      id: "aros-nube",
      name: "Aros Nube",
      category: "aros",
      material: "plata",
      badge: "PLATA",
      badgeType: "plata",
      cardType: "plata",
      price: 7400,
      installments: "3 CUOTAS S/INT",
      desc: "Perla barroca + plata • Aros",
      watermark: "PLATA • ATELIER",
      svg: `
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="pearlGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="65%" stop-color="#E2E2E6" />
              <stop offset="100%" stop-color="#9C9CA4" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="36" fill="none" stroke="#90909A" stroke-width="2" opacity="0.6" />
          <circle cx="60" cy="60" r="14" fill="url(#pearlGlow)" />
        </svg>
      `
    }
  ];

  // =========================================
  // GESTIÓN DE FAVORITOS
  // =========================================
  const FAVORITES_KEY = "atelier:favorites";
  let favorites = new Set();
  try {
    const savedFavs = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    favorites = new Set(savedFavs);
  } catch (_) {}

  function toggleFavorite(productId, buttonElement) {
    if (favorites.has(productId)) {
      favorites.delete(productId);
      buttonElement.classList.remove("active");
      buttonElement.setAttribute("aria-label", "Agregar a favoritos");
    } else {
      favorites.add(productId);
      buttonElement.classList.add("active");
      buttonElement.setAttribute("aria-label", "Quitar de favoritos");
    }
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
    } catch (_) {}
  }

  function formatPrice(amount) {
    return "$ " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function getWhatsAppUrl(name, price, desc) {
    const text = `Hola Atelier V2! Quiero pedir la siguiente pieza:\n\n• *${name}* (${price})\n• ${desc}`;
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  }

  // =========================================
  // RENDER GRILLA DE PRODUCTOS
  // =========================================
  const gridContainer = document.getElementById("products-grid");

  function renderProducts(filter = "todo") {
    if (!gridContainer) return;

    gridContainer.innerHTML = "";

    const filtered = PRODUCTS.filter((item) => {
      if (filter === "todo") return true;
      if (filter === "oro") return item.material === "oro";
      if (filter === "plata") return item.material === "plata";
      return item.category === filter;
    });

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
          No se encontraron piezas en esta categoría.
        </div>
      `;
      return;
    }

    filtered.forEach((item) => {
      const isFav = favorites.has(item.id);

      const card = document.createElement("article");
      card.className = `card card--${item.cardType}`;
      card.innerHTML = `
        <div class="card__visual">
          <div class="card__top-bar">
            <span class="badge badge--${item.badgeType}">${item.badge}</span>
            <button
              type="button"
              class="fav-btn ${isFav ? "active" : ""}"
              data-id="${item.id}"
              aria-label="${isFav ? "Quitar de favoritos" : "Agregar a favoritos"}"
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>

          <div class="card__artwork">
            ${item.svg}
          </div>

          <span class="card__watermark">${item.watermark}</span>
        </div>

        <div class="card__body">
          <div class="card__row">
            <div class="card__info">
              <h3 class="card__title">${item.name}</h3>
              <p class="card__desc">${item.desc}</p>
            </div>
            <div class="card__pricing">
              <div class="card__price">${formatPrice(item.price)}</div>
              <div class="card__installments">${item.installments}</div>
            </div>
          </div>

          <a
            class="card__cta"
            href="${getWhatsAppUrl(item.name, formatPrice(item.price), item.desc)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            ✦ AGREGAR — WHATSAPP
          </a>
        </div>
      `;

      const favBtn = card.querySelector(".fav-btn");
      favBtn.addEventListener("click", () => toggleFavorite(item.id, favBtn));

      gridContainer.appendChild(card);
    });
  }

  // =========================================
  // FILTROS DE CATEGORÍA
  // =========================================
  const filterButtons = document.querySelectorAll(".filter-chip");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProducts(btn.dataset.filter || "todo");
    });
  });

  // =========================================
  // BESTSELLERS WHATSAPP LINK
  // =========================================
  const bestsellerCards = document.querySelectorAll(".bestseller-card");
  bestsellerCards.forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      const title = card.querySelector(".bestseller-card__title")?.textContent || "Pieza";
      const price = card.querySelector(".bestseller-card__price")?.textContent || "";
      const subtitle = card.querySelector(".bestseller-card__subtitle")?.textContent || "";
      window.open(getWhatsAppUrl(title, price, subtitle), "_blank");
    });
  });

  // =========================================
  // MENÚ MÓVIL
  // =========================================
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuLinks = document.querySelectorAll(".mobile-menu__link");

  function setMenuOpen(open) {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    mobileMenu.dataset.open = String(open);
    if (open) {
      mobileMenu.removeAttribute("inert");
    } else {
      mobileMenu.setAttribute("inert", "");
    }
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      setMenuOpen(!isOpen);
    });

    menuLinks.forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });
  }

  // =========================================
  // SELECTOR DE TEMA: ATELIER / NOIR
  // =========================================
  const btnAtelier = document.getElementById("btn-theme-atelier");
  const btnNoir = document.getElementById("btn-theme-noir");

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("atelier:theme", theme);
    } catch (_) {}

    if (theme === "noir") {
      btnNoir?.classList.add("active");
      btnAtelier?.classList.remove("active");
    } else {
      btnAtelier?.classList.add("active");
      btnNoir?.classList.remove("active");
    }
  }

  if (btnAtelier && btnNoir) {
    btnAtelier.addEventListener("click", () => setTheme("atelier"));
    btnNoir.addEventListener("click", () => setTheme("noir"));

    const initialTheme = document.documentElement.dataset.theme || "atelier";
    setTheme(initialTheme);
  }

  // Año dinámico footer
  const yearElem = document.getElementById("year");
  if (yearElem) {
    yearElem.textContent = String(new Date().getFullYear());
  }

  // Render inicial del catálogo
  renderProducts("todo");
})();
