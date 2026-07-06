// Base de datos de productos de Textil y Hogar (cargada dinámicamente)
let products = [];

// Función para cargar los productos desde el archivo JSON
async function loadProducts() {
  try {
    const response = await fetch("productos.json");
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    products = await response.json();
    return true;
  } catch (error) {
    console.error("No se pudo cargar la base de datos de productos:", error);
    if (gridContainer) {
      gridContainer.innerHTML = `
        <div class="col-span-full py-16 text-center animate-fade-in-scale">
          <div class="inline-flex justify-center items-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-4 shadow-inner">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-1">Error al cargar el catálogo</h3>
          <p class="text-sm text-gray-500 max-w-sm mx-auto">Lo sentimos, no pudimos cargar los productos en este momento. Por favor, intenta recargar la página.</p>
        </div>
      `;
    }
    return false;
  }
}

// Función helper para eliminar tildes y diacríticos
function removeAccents(str) {
  if (!str) return "";
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Configuración general
const WHATSAPP_PHONE = "56976195896"; // Reemplazar con el número real de la tienda (ej: 56912345678)
const WHATSAPP_BASE_URL = "https://wa.me/";

// Estado global de la aplicación
let state = {
  activeCategory: "all",
  activeSubcategory: "all",
  activeMaterial: "all",
  searchQuery: ""
};

// Elementos del DOM
let gridContainer;
let searchInput;
let categoryTabs;
let subcategoryFilters;
let materialFilters;
let catalogView;
let productDetailView;
let activeFiltersContainer;

// Inicialización de la aplicación
document.addEventListener("DOMContentLoaded", async () => {
  gridContainer = document.getElementById("product-grid");
  searchInput = document.getElementById("search-input");
  categoryTabs = document.querySelectorAll(".category-tab");
  subcategoryFilters = document.querySelectorAll(".filter-subcategory");
  materialFilters = document.querySelectorAll(".filter-material");
  catalogView = document.getElementById("catalog-view");
  productDetailView = document.getElementById("product-detail-view");
  activeFiltersContainer = document.getElementById("active-filters");

  // Configurar escuchadores de eventos
  setupEventListeners();

  // Inicializar carrusel del Hero
  initHeroCarousel();

  // Cargar productos de forma asíncrona y renderizar
  const loaded = await loadProducts();
  if (loaded) {
    renderProducts();
    // Ejecutar enrutamiento inicial basado en el hash actual al cargar la página
    const hash = window.location.hash;
    if (hash.startsWith("#producto/")) {
      const id = hash.replace("#producto/", "");
      showProductDetail(id, false);
    }
  }
});

// Escuchador del hash de la URL para permitir navegación con botones del navegador
window.addEventListener("hashchange", () => {
  const hash = window.location.hash;
  if (hash.startsWith("#producto/")) {
    const id = hash.replace("#producto/", "");
    showProductDetail(id, false);
  } else {
    showCatalog(false);
  }
});

// Configuración de eventos
function setupEventListeners() {
  // Barra de búsqueda
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = removeAccents(e.target.value.toLowerCase().trim());
      renderProducts();
    });
  }

  // Pestañas de categoría principal (Ropa Interior vs Trabajo)
  categoryTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      categoryTabs.forEach(t => t.classList.remove("btn-tab-active"));
      tab.classList.add("btn-tab-active");
      state.activeCategory = tab.dataset.category;
      
      // Restablecer subcategorías si cambia la categoría principal
      state.activeSubcategory = "all";
      updateFilterButtons();
      renderProducts();
    });
  });

  // Filtros de subcategoría (Mujer, Hombre, Niña, Profesional)
  subcategoryFilters.forEach(btn => {
    btn.addEventListener("click", () => {
      if (state.activeSubcategory === btn.dataset.value) {
        state.activeSubcategory = "all"; // Toggle off
      } else {
        state.activeSubcategory = btn.dataset.value;
      }
      updateFilterButtons();
      renderProducts();
    });
  });

  // Filtros de material (Algodón, Lycra, Bistrech)
  materialFilters.forEach(btn => {
    btn.addEventListener("click", () => {
      if (state.activeMaterial === btn.dataset.value) {
        state.activeMaterial = "all"; // Toggle off
      } else {
        state.activeMaterial = btn.dataset.value;
      }
      updateFilterButtons();
      renderProducts();
    });
  });
}

// Inicializar carrusel Hero superior (Deslizador Multitarjeta Responsivo)
function initHeroCarousel() {
  const slidesContainer = document.getElementById("carousel-slides");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const dotsContainer = document.getElementById("carousel-dots");
  
  if (!slidesContainer) return;
  
  const slides = slidesContainer.children;
  const slideCount = slides.length;
  if (slideCount === 0) return;
  
  let currentIndex = 0;
  let timer = null;
  const intervalTime = 5000; // 5 segundos
  
  // Calcular cuántas tarjetas mostrar según el tamaño de la ventana
  function getCardsToShow() {
    if (window.innerWidth >= 1024) return 3; // Desktop
    if (window.innerWidth >= 768) return 2;  // Tablet
    return 1;                                // Mobile
  }
  
  // Re-crear e inicializar dots dinámicamente según el número de pasos posibles
  function updateDots() {
    if (!dotsContainer) return;
    const cardsToShow = getCardsToShow();
    const maxIndex = Math.max(0, slideCount - cardsToShow);
    
    // El número de dots es maxIndex + 1 (los pasos que podemos dar)
    let dotsHtml = "";
    for (let i = 0; i <= maxIndex; i++) {
      dotsHtml += `<button class="w-2.5 h-2.5 rounded-full bg-slate-300 hover:bg-brand-500 transition-all focus:outline-none ${i === currentIndex ? 'active-dot' : ''}" data-index="${i}"></button>`;
    }
    dotsContainer.innerHTML = dotsHtml;
    
    // Volver a vincular eventos a los nuevos dots
    const dots = dotsContainer.querySelectorAll("button");
    dots.forEach(dot => {
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = parseInt(dot.dataset.index);
        resetTimer();
        updateCarousel(idx);
      });
    });
  }
  
  function updateCarousel(index) {
    const cardsToShow = getCardsToShow();
    const maxIndex = Math.max(0, slideCount - cardsToShow);
    
    // Controlar límites
    if (index > maxIndex) {
      currentIndex = 0; // Wrap al inicio
    } else if (index < 0) {
      currentIndex = maxIndex; // Wrap al final
    } else {
      currentIndex = index;
    }
    
    // Desplazar slides (cada slide tiene de ancho 100/cardsToShow %)
    const translatePercent = currentIndex * (100 / cardsToShow);
    slidesContainer.style.transform = `translateX(-${translatePercent}%)`;
    
    // Actualizar clase de active dot
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll("button");
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add("active-dot");
        } else {
          dot.classList.remove("active-dot");
        }
      });
    }
  }
  
  // Controles de flechas
  if (prevBtn) {
    const newPrevBtn = prevBtn.cloneNode(true);
    prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
    newPrevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      resetTimer();
      updateCarousel(currentIndex - 1);
    });
  }
  
  if (nextBtn) {
    const newNextBtn = nextBtn.cloneNode(true);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
    newNextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      resetTimer();
      updateCarousel(currentIndex + 1);
    });
  }
  
  // Auto-play
  function startTimer() {
    timer = setInterval(() => {
      updateCarousel(currentIndex + 1);
    }, intervalTime);
  }
  
  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }
  
  // Pausar en hover
  const carouselSection = slidesContainer.parentElement;
  if (carouselSection) {
    carouselSection.addEventListener("mouseenter", () => {
      clearInterval(timer);
    });
    carouselSection.addEventListener("mouseleave", () => {
      startTimer();
    });
  }
  
  // Inicialización
  updateDots();
  updateCarousel(0);
  startTimer();
  
  // Escuchador de redimensionamiento de pantalla para actualizar dots y traslación
  window.addEventListener("resize", () => {
    const cardsToShow = getCardsToShow();
    const maxIndex = Math.max(0, slideCount - cardsToShow);
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }
    updateDots();
    updateCarousel(currentIndex);
  });
}

// Actualizar el estado visual de los botones de filtro
function updateFilterButtons() {
  // Subcategorías
  subcategoryFilters.forEach(btn => {
    if (btn.dataset.value === state.activeSubcategory) {
      btn.classList.add("btn-filter-active", "border-brand-500", "bg-brand-50");
      btn.classList.remove("bg-white", "text-gray-600");
    } else {
      btn.classList.remove("btn-filter-active", "border-brand-500", "bg-brand-50");
      btn.classList.add("bg-white", "text-gray-600");
    }
  });

  // Materiales
  materialFilters.forEach(btn => {
    if (btn.dataset.value === state.activeMaterial) {
      btn.classList.add("btn-filter-active", "border-brand-500", "bg-brand-50");
      btn.classList.remove("bg-white", "text-gray-600");
    } else {
      btn.classList.remove("btn-filter-active", "border-brand-500", "bg-brand-50");
      btn.classList.add("bg-white", "text-gray-600");
    }
  });

  // Mostrar etiquetas de filtros activos
  renderActiveFilterBadges();
}

// Renderizar chapas de filtros activos
function renderActiveFilterBadges() {
  if (!activeFiltersContainer) return;
  activeFiltersContainer.innerHTML = "";
  
  let hasActive = false;

  const createBadge = (label, clearCallback) => {
    hasActive = true;
    const badge = document.createElement("div");
    badge.className = "inline-flex items-center gap-1.5 px-3 py-1 bg-brand-100 text-brand-800 text-xs font-semibold rounded-full animate-fade-in-scale";
    badge.innerHTML = `
      <span>${label}</span>
      <button class="hover:bg-brand-200 rounded-full p-0.5 transition-colors focus:outline-none" aria-label="Quitar filtro">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    `;
    badge.querySelector("button").addEventListener("click", clearCallback);
    activeFiltersContainer.appendChild(badge);
  };

  if (state.activeSubcategory !== "all") {
    createBadge(`Público: ${state.activeSubcategory}`, () => {
      state.activeSubcategory = "all";
      updateFilterButtons();
      renderProducts();
    });
  }

  if (state.activeMaterial !== "all") {
    createBadge(`Material: ${state.activeMaterial}`, () => {
      state.activeMaterial = "all";
      updateFilterButtons();
      renderProducts();
    });
  }

  if (state.searchQuery !== "") {
    createBadge(`Búsqueda: "${state.searchQuery}"`, () => {
      state.searchQuery = "";
      if (searchInput) searchInput.value = "";
      renderActiveFilterBadges();
      renderProducts();
    });
  }

  // Botón para limpiar todo
  if (hasActive) {
    const clearAll = document.createElement("button");
    clearAll.className = "text-xs font-bold text-gray-500 hover:text-brand-600 hover:underline ml-2 transition-all focus:outline-none";
    clearAll.textContent = "Limpiar todos";
    clearAll.addEventListener("click", () => {
      state.activeSubcategory = "all";
      state.activeMaterial = "all";
      state.searchQuery = "";
      if (searchInput) searchInput.value = "";
      updateFilterButtons();
      renderProducts();
    });
    activeFiltersContainer.appendChild(clearAll);
  }
}

// Renderizar el catálogo de productos filtrado
function renderProducts() {
  if (!gridContainer) return;
  gridContainer.innerHTML = "";

  // Filtrar productos
  const filtered = products.filter(p => {
    // Control de activación interna (manejo de stock / visibilidad)
    if (p.active === false) {
      return false;
    }
    // Categoría principal
    if (state.activeCategory !== "all" && p.category !== state.activeCategory) {
      return false;
    }
    // Subcategoría (Público)
    if (state.activeSubcategory !== "all" && p.subcategory !== state.activeSubcategory) {
      return false;
    }
    // Materiales
    if (state.activeMaterial !== "all" && !p.material.toLowerCase().includes(state.activeMaterial.toLowerCase())) {
      return false;
    }
    // Buscador text
    if (state.searchQuery) {
      const query = state.searchQuery;
      const matchName = removeAccents(p.name.toLowerCase()).includes(query);
      const matchDesc = removeAccents(p.description.toLowerCase()).includes(query);
      const matchMat = removeAccents(p.material.toLowerCase()).includes(query);
      const matchSub = removeAccents(p.subcategory.toLowerCase()).includes(query);
      if (!matchName && !matchDesc && !matchMat && !matchSub) {
        return false;
      }
    }
    return true;
  });

  // Mostrar mensaje de catálogo vacío
  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div class="col-span-full py-16 text-center animate-fade-in-scale">
        <div class="inline-flex justify-center items-center w-16 h-16 rounded-full bg-brand-50 text-brand-500 mb-4 shadow-inner">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <h3 class="text-lg font-bold text-gray-800 mb-1">No encontramos productos</h3>
        <p class="text-sm text-gray-500 max-w-sm mx-auto">Prueba cambiando los filtros seleccionados o modificando los términos de tu búsqueda.</p>
      </div>
    `;
    return;
  }

  // Renderizar las tarjetas
  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "glass-card rounded-none overflow-hidden flex flex-col h-full opacity-0 animate-fade-in-up shadow-sm";
    
    // Insignia de categoría e info superior
    const isPack = p.unitType.toLowerCase().includes("pack");
    let badgeHtml = isPack 
      ? `<span class="absolute top-4 left-4 z-10 bg-indigo-500/90 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">Pack de 4</span>`
      : `<span class="absolute top-4 left-4 z-10 bg-emerald-500/90 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">Por Unidad</span>`;
    
    if (p.discountPercent > 0) {
      badgeHtml += `<span class="absolute top-4 right-4 z-10 bg-rose-500/95 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm animate-pulse">${p.discountPercent}% OFF</span>`;
    }

    let priceHtml = '';
    if (p.discountPercent > 0) {
      priceHtml = `
        <div class="flex flex-col gap-0.5">
          <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Antes: <span class="line-through">${p.price}</span></span>
          <span class="text-2xl font-black text-rose-600 leading-tight">Ahora: ${p.discountedPrice}</span>
        </div>
      `;
    } else {
      priceHtml = `<div class="text-2xl font-black text-brand-600">${p.price}</div>`;
    }

    card.innerHTML = `
      <div class="product-card-img-container aspect-[4/3] bg-gray-50 flex items-center justify-center relative cursor-pointer">
        ${badgeHtml}
        <img src="${p.defaultImage}" alt="${p.name}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/600x450/ffe4e6/be185d?text=${encodeURIComponent(p.name)}'">
        <div class="absolute inset-0 bg-gradient-to-t from-brand-900/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div class="p-6 flex flex-col flex-grow">
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="text-xs font-bold uppercase tracking-wider text-brand-500">${p.subcategory}</span>
          <span class="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">${p.material}</span>
        </div>
        <h3 class="text-lg font-extrabold text-gray-800 leading-tight mb-2 hover:text-brand-600 transition-colors cursor-pointer" onclick="showProductDetail('${p.id}')">
          ${p.name}
        </h3>
        <p class="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
          ${p.description}
        </p>
        <div class="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div>
            ${priceHtml}
            <div class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">${p.unitType}</div>
          </div>
          <button onclick="showProductDetail('${p.id}')" class="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white text-sm font-bold rounded-2xl transition-all shadow-md shadow-brand-500/10 flex items-center gap-1">
            <span>Ver Ficha</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    `;

    // Vincular click en imagen para ver ficha
    card.querySelector(".product-card-img-container").addEventListener("click", () => showProductDetail(p.id));

    gridContainer.appendChild(card);
  });
}

// Renderizar la vista de detalle del producto directamente en la página
function showProductDetail(id, updateHash = true) {
  const product = products.find(p => p.id === id);
  if (!product || !productDetailView || !catalogView) return;

  if (updateHash) {
    window.location.hash = `producto/${id}`;
    return;
  }

  // Ocultar catálogo completo
  catalogView.classList.add("hidden");

  // Buscar productos relacionados
  let related = products.filter(p => p.id !== product.id && p.category === product.category && p.active !== false);
  if (related.length < 3) {
    const extra = products.filter(p => p.id !== product.id && p.category !== product.category && p.active !== false);
    related = [...related, ...extra];
  }
  const relatedToShow = related.slice(0, 3);

  // Generar HTML de productos relacionados
  let relatedHtml = "";
  relatedToShow.forEach(rp => {
    const isPack = rp.unitType.toLowerCase().includes("pack");
    const badgeText = isPack ? "Pack de 4" : "Por Unidad";
    
    let priceHtml = "";
    if (rp.discountPercent > 0) {
      priceHtml = `
        <div class="flex flex-col">
          <span class="text-[9px] text-gray-400 line-through">Antes: ${rp.price}</span>
          <span class="text-sm font-black text-rose-600">Ahora: ${rp.discountedPrice}</span>
        </div>
      `;
    } else {
      priceHtml = `
        <div class="text-sm font-black text-brand-600">${rp.price}</div>
      `;
    }

    relatedHtml += `
      <div class="bg-white border border-gray-150 hover:shadow-md transition-all duration-300 flex flex-col h-full cursor-pointer relative" onclick="showProductDetail('${rp.id}')">
        <span class="absolute top-2.5 left-2.5 z-10 bg-slate-200/90 text-gray-700 text-[8px] font-extrabold px-1.5 py-0.5 uppercase tracking-wider">${badgeText}</span>
        <div class="aspect-[4/3] bg-gray-50 flex items-center justify-center relative overflow-hidden shrink-0">
          <img src="${rp.defaultImage}" class="w-full h-full object-contain p-2" alt="${rp.name}" onerror="this.src='https://placehold.co/600x450/ffe4e6/be185d?text=${encodeURIComponent(rp.name)}'">
        </div>
        <div class="p-4 flex flex-col flex-grow justify-between">
          <div>
            <div class="flex items-center justify-between gap-1 mb-1">
              <span class="text-[9px] font-bold uppercase tracking-wider text-brand-500">${rp.subcategory}</span>
              <span class="text-[9px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-none">${rp.material}</span>
            </div>
            <h4 class="text-xs font-extrabold text-gray-800 leading-tight line-clamp-1 mb-1">${rp.name}</h4>
          </div>
          <div class="pt-2.5 border-t border-gray-100 flex items-end justify-between mt-2">
            <div>
              ${priceHtml}
              <div class="text-[8px] text-gray-400 font-semibold uppercase tracking-wider">${rp.unitType}</div>
            </div>
            <button class="px-2.5 py-1 bg-brand-600 hover:bg-brand-700 text-white text-[9px] font-bold uppercase tracking-wider transition-all pointer-events-none">Ver Ficha</button>
          </div>
        </div>
      </div>
    `;
  });

  // Preparar precio e insignia de descuento
  let priceSectionHtml = "";
  if (product.discountPercent > 0) {
    priceSectionHtml = `
      <div class="flex items-baseline gap-2 mb-4 bg-brand-50/50 p-4 rounded-none border border-brand-100/50">
        <div class="flex flex-col gap-0.5">
          <span class="text-xs text-gray-400 font-bold uppercase tracking-wider">Antes: <span class="line-through">${product.price}</span></span>
          <span class="text-3xl font-black text-rose-600 leading-tight">Ahora: ${product.discountedPrice}</span>
        </div>
        <span class="text-xs font-extrabold text-rose-500 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-none ml-auto h-fit self-end">${product.discountPercent}% OFF</span>
      </div>
    `;
  } else {
    priceSectionHtml = `
      <div class="flex items-baseline gap-2 mb-4 bg-brand-50/50 p-4 rounded-none border border-brand-100/50">
        <span class="text-3xl font-black text-brand-600">${product.price}</span>
        <span class="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">${product.unitType}</span>
      </div>
    `;
  }

  // Generar especificaciones (features)
  let featuresHtml = "";
  product.features.forEach(f => {
    featuresHtml += `
      <li class="flex items-start gap-2.5 text-sm text-gray-600">
        <svg class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>${f}</span>
      </li>
    `;
  });

  // Generar colores
  let colorsHtml = "";
  product.colors.forEach(col => {
    colorsHtml += `
      <span class="inline-block px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-800 text-xs font-semibold border border-slate-200 transition-colors cursor-default">
        ${col}
      </span>
    `;
  });

  // Generar galería de miniaturas
  let galleryHtml = "";
  let hideGalleryClass = "";
  if (!product.gallery || product.gallery.length <= 1) {
    hideGalleryClass = "hidden";
  } else {
    product.gallery.forEach((imgSrc, idx) => {
      const isMeasure = imgSrc.toLowerCase().includes("medida") || imgSrc.toLowerCase().includes("croquis") || imgSrc.toLowerCase().includes("nrgro") || imgSrc.toLowerCase().includes("buedeo");
      const overlayLabel = isMeasure ? '<span class="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] text-white font-extrabold uppercase py-0.5 text-center tracking-wide">Medida</span>' : '';
      galleryHtml += `
        <button class="thumb-btn w-16 h-16 overflow-hidden border-2 transition-all shrink-0 bg-gray-50 relative focus:outline-none ${idx === 0 ? 'border-brand-600 scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'}" data-src="${imgSrc}">
          <img src="${imgSrc}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/100x100/ffe4e6/be185d?text=Foto'">
          ${overlayLabel}
        </button>
      `;
    });
  }

  // Generar el HTML completo de la vista de detalle con productos recomendados
  productDetailView.innerHTML = `
    <!-- Ficha de Detalles del Producto -->
    <div class="flex flex-col lg:flex-row gap-10 items-stretch mb-12">
      <!-- Columna Izquierda: Galería / Imagen -->
      <div class="w-full lg:w-1/2 flex flex-col gap-6 bg-gray-50/50 p-4 sm:p-6 border border-gray-100">
        <div class="aspect-[4/3] bg-white border border-gray-100 flex items-center justify-center relative overflow-hidden shadow-sm shrink-0">
          <img id="detail-main-image" src="${product.defaultImage}" alt="${product.name}" class="w-full h-full object-contain p-4" onerror="this.src='https://placehold.co/600x450/ffe4e6/be185d?text=${encodeURIComponent(product.name)}'">
        </div>
        
        <!-- Carrusel de Miniaturas -->
        <div class="flex flex-col gap-2 ${hideGalleryClass}">
          <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Variantes de colores y medidas:</span>
          <div id="detail-thumbnails" class="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
            ${galleryHtml}
          </div>
        </div>

        <!-- Nota informativa -->
        <div class="bg-amber-50 border border-amber-200 p-4 flex gap-3">
          <svg class="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <div class="text-xs text-amber-800 leading-relaxed font-medium">
            <span class="font-bold">Nota importante:</span> Los colores y estampados se envían en combinaciones al azar según stock disponible.
          </div>
        </div>
      </div>

      <!-- Columna Derecha: Información Técnica -->
      <div class="w-full lg:w-1/2 flex flex-col justify-between p-2">
        <div>
          <!-- Categoría y Material -->
          <div class="flex items-center gap-2 mb-3">
            <span class="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-none">${product.subcategory}</span>
            <span class="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-none">${product.material}</span>
          </div>

          <!-- Título -->
          <h2 class="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-4">${product.name}</h2>

          <!-- Precio -->
          ${priceSectionHtml}

          <!-- Descripción -->
          <p class="text-sm text-gray-600 leading-relaxed mb-6 font-medium">${product.description}</p>

          <!-- Colores disponibles -->
          <div class="mb-6">
            <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Colores Disponibles</h4>
            <div class="flex flex-wrap gap-2">
              ${colorsHtml}
            </div>
          </div>

          <!-- Especificaciones Técnicas -->
          <div class="mb-6">
            <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Especificaciones Técnicas</h4>
            <ul class="space-y-2">
              ${featuresHtml}
            </ul>
          </div>

          <!-- Medidas y Usos -->
          <div class="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6 mb-6">
            <div>
              <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Medidas:</span>
              <span class="text-sm font-semibold text-gray-700">${product.dimensions}</span>
            </div>
            <div>
              <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Usos comunes:</span>
              <span class="text-sm font-semibold text-gray-700">${product.uses}</span>
            </div>
          </div>

          <!-- Recomendaciones -->
          <div class="border-t border-gray-100 pt-6 mb-8">
            <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Recomendaciones de cuidado:</span>
            <p class="text-xs text-gray-500 leading-relaxed font-medium">${product.recommendations}</p>
          </div>
        </div>

        <!-- Botones de compra y regreso -->
        <div class="pt-6 border-t border-gray-100 flex flex-col gap-3 mt-auto">
          <button id="detail-whatsapp-btn" class="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold rounded-none transition-all shadow-lg shadow-emerald-600/10 flex items-center justify-center gap-2">
            <i class="fa-brands fa-whatsapp text-xl"></i>
            <span>Consultar Disponibilidad</span>
          </button>
          
          <button onclick="showCatalog()" class="w-full py-3.5 bg-gray-100 hover:bg-gray-200 active:scale-[0.98] text-gray-700 text-sm font-bold rounded-none transition-all">
            Volver al Catálogo
          </button>
        </div>
      </div>
    </div>

    <!-- Sección de Productos Relacionados -->
    <div class="border-t border-gray-150 pt-10">
      <h3 class="text-lg font-black text-gray-800 tracking-tight mb-6">Productos que te pueden interesar</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${relatedHtml}
      </div>
    </div>
  `;

  // Vincular eventos de click en miniaturas
  if (galleryHtml !== "") {
    const thumbsContainer = document.getElementById("detail-thumbnails");
    const mainImage = document.getElementById("detail-main-image");
    if (thumbsContainer && mainImage) {
      const buttons = thumbsContainer.querySelectorAll("button");
      buttons.forEach(btn => {
        btn.addEventListener("click", () => {
          const imgSrc = btn.dataset.src;
          mainImage.src = imgSrc;
          buttons.forEach(b => {
            b.className = "w-16 h-16 overflow-hidden border-2 border-transparent opacity-70 hover:opacity-100 transition-all shrink-0 bg-gray-50 relative focus:outline-none";
          });
          btn.className = "w-16 h-16 overflow-hidden border-2 border-brand-600 scale-95 shadow-sm transition-all shrink-0 bg-gray-50 relative focus:outline-none";
          btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
      });
    }
  }

  // Vincular botón de WhatsApp
  const wsBtn = document.getElementById("detail-whatsapp-btn");
  if (wsBtn) {
    wsBtn.onclick = () => {
      const finalPrice = product.discountPercent > 0 ? product.discountedPrice : product.price;
      const discountNote = product.discountPercent > 0 ? ` con un ${product.discountPercent}% de descuento aplicado` : '';
      const textMsg = `Hola Textil y Hogar, me interesa el producto "${product.name}" (${product.unitType} por ${finalPrice}${discountNote}). ¿Tienen disponibilidad en stock?`;
      const url = `${WHATSAPP_BASE_URL}${WHATSAPP_PHONE}?text=${encodeURIComponent(textMsg)}`;
      window.open(url, "_blank");
    };
  }

  // Mostrar el contenedor de detalle
  productDetailView.classList.remove("hidden");
  
  // Desplazar la ventana hacia arriba de forma suave
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Ocultar detalle y mostrar catálogo completo
function showCatalog(updateHash = true) {
  if (updateHash) {
    window.location.hash = "";
    return;
  }

  if (!productDetailView || !catalogView) return;
  productDetailView.classList.add("hidden");
  catalogView.classList.remove("hidden");
  
  // Desplazar de vuelta al catálogo
  const offset = document.getElementById("search-filter-section") ? document.getElementById("search-filter-section").offsetTop - 100 : 0;
  window.scrollTo({ top: offset, behavior: 'smooth' });
}

// Exportar globalmente funciones llamadas inline en HTML
window.showProductDetail = showProductDetail;
window.showCatalog = showCatalog;
