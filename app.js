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
let productModal;
let activeFiltersContainer;

// Inicialización de la aplicación
document.addEventListener("DOMContentLoaded", async () => {
  gridContainer = document.getElementById("product-grid");
  searchInput = document.getElementById("search-input");
  categoryTabs = document.querySelectorAll(".category-tab");
  subcategoryFilters = document.querySelectorAll(".filter-subcategory");
  materialFilters = document.querySelectorAll(".filter-material");
  productModal = document.getElementById("product-modal");
  activeFiltersContainer = document.getElementById("active-filters");

  // Configurar escuchadores de eventos
  setupEventListeners();

  // Cargar productos de forma asíncrona y renderizar
  const loaded = await loadProducts();
  if (loaded) {
    renderProducts();
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

// Actualizar el estado visual de los botones de filtro
function updateFilterButtons() {
  // Subcategorías
  subcategoryFilters.forEach(btn => {
    if (btn.dataset.value === state.activeSubcategory) {
      btn.classList.add("btn-filter-active", "border-sky-500", "bg-sky-50");
      btn.classList.remove("bg-white", "text-gray-600");
    } else {
      btn.classList.remove("btn-filter-active", "border-sky-500", "bg-sky-50");
      btn.classList.add("bg-white", "text-gray-600");
    }
  });

  // Materiales
  materialFilters.forEach(btn => {
    if (btn.dataset.value === state.activeMaterial) {
      btn.classList.add("btn-filter-active", "border-sky-500", "bg-sky-50");
      btn.classList.remove("bg-white", "text-gray-600");
    } else {
      btn.classList.remove("btn-filter-active", "border-sky-500", "bg-sky-50");
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
    badge.className = "inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-800 text-xs font-semibold rounded-full animate-fade-in-scale";
    badge.innerHTML = `
      <span>${label}</span>
      <button class="hover:bg-sky-200 rounded-full p-0.5 transition-colors focus:outline-none" aria-label="Quitar filtro">
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
    clearAll.className = "text-xs font-bold text-gray-500 hover:text-sky-600 hover:underline ml-2 transition-all focus:outline-none";
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
        <div class="inline-flex justify-center items-center w-16 h-16 rounded-full bg-sky-50 text-sky-400 mb-4 shadow-inner">
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
    card.className = "glass-card rounded-3xl overflow-hidden flex flex-col h-full opacity-0 animate-fade-in-up shadow-sm";
    
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
      priceHtml = `<div class="text-2xl font-black text-sky-600">${p.price}</div>`;
    }

    card.innerHTML = `
      <div class="product-card-img-container aspect-[4/3] bg-gray-50 flex items-center justify-center relative cursor-pointer">
        ${badgeHtml}
        <img src="${p.defaultImage}" alt="${p.name}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/600x450/e0f2fe/0284c7?text=${encodeURIComponent(p.name)}'">
        <div class="absolute inset-0 bg-gradient-to-t from-sky-900/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div class="p-6 flex flex-col flex-grow">
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="text-xs font-bold uppercase tracking-wider text-sky-500">${p.subcategory}</span>
          <span class="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">${p.material}</span>
        </div>
        <h3 class="text-lg font-extrabold text-gray-800 leading-tight mb-2 hover:text-sky-600 transition-colors cursor-pointer" onclick="openProductModal('${p.id}')">
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
          <button onclick="openProductModal('${p.id}')" class="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white text-sm font-bold rounded-2xl transition-all shadow-md shadow-sky-500/10 flex items-center gap-1">
            <span>Ver Ficha</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    `;

    // Vincular click en imagen para abrir modal
    card.querySelector(".product-card-img-container").addEventListener("click", () => openProductModal(p.id));

    gridContainer.appendChild(card);
  });
}

// Abrir el Modal con los datos del producto
function openProductModal(id) {
  const product = products.find(p => p.id === id);
  if (!product || !productModal) return;

  // Llenar datos básicos en el modal
  document.getElementById("modal-title").textContent = product.name;
  document.getElementById("modal-category").textContent = product.subcategory;
  document.getElementById("modal-material").textContent = product.material;
  const modalPriceEl = document.getElementById("modal-price");
  if (product.discountPercent > 0) {
    modalPriceEl.innerHTML = `
      <div class="flex flex-col gap-0.5">
        <span class="text-xs text-gray-400 font-bold uppercase tracking-wider">Antes: <span class="line-through">${product.price}</span></span>
        <span class="text-3xl font-black text-rose-600 leading-tight">Ahora: ${product.discountedPrice}</span>
      </div>
      <span class="text-xs font-extrabold text-rose-500 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-lg ml-auto h-fit self-end">${product.discountPercent}% OFF</span>
    `;
  } else {
    modalPriceEl.innerHTML = `<span class="text-sky-600">${product.price}</span>`;
  }
  document.getElementById("modal-unit").textContent = product.unitType;
  document.getElementById("modal-description").textContent = product.description;
  document.getElementById("modal-dimensions").textContent = product.dimensions;
  document.getElementById("modal-recommendations").textContent = product.recommendations;
  document.getElementById("modal-uses").textContent = product.uses;

  // Renderizar lista de características
  const featuresList = document.getElementById("modal-features-list");
  featuresList.innerHTML = "";
  product.features.forEach(f => {
    const li = document.createElement("li");
    li.className = "flex items-start gap-2.5 text-sm text-gray-600";
    li.innerHTML = `
      <svg class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
      </svg>
      <span>${f}</span>
    `;
    featuresList.appendChild(li);
  });

  // Renderizar colores disponibles
  const colorsContainer = document.getElementById("modal-colors-container");
  colorsContainer.innerHTML = "";
  product.colors.forEach(col => {
    const span = document.createElement("span");
    span.className = "inline-block px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl transition-colors cursor-default border border-gray-200";
    span.textContent = col;
    colorsContainer.appendChild(span);
  });

  // Configurar carrusel de imágenes
  setupModalCarousel(product);

  // Botón de WhatsApp personalizado
  const wsBtn = document.getElementById("modal-whatsapp-btn");
  wsBtn.onclick = () => {
    const finalPrice = product.discountPercent > 0 ? product.discountedPrice : product.price;
    const discountNote = product.discountPercent > 0 ? ` con un ${product.discountPercent}% de descuento aplicado` : '';
    const textMsg = `Hola Textil y Hogar, me interesa el producto "${product.name}" (${product.unitType} por ${finalPrice}${discountNote}). ¿Tienen disponibilidad en stock?`;
    const url = `${WHATSAPP_BASE_URL}${WHATSAPP_PHONE}?text=${encodeURIComponent(textMsg)}`;
    window.open(url, "_blank");
  };

  // Mostrar el modal
  productModal.classList.remove("hidden");
  productModal.classList.add("flex");
  document.body.style.overflow = "hidden"; // Desactivar scroll fondo
}

// Configurar Carrusel interactivo dentro del modal
function setupModalCarousel(product) {
  const mainImage = document.getElementById("modal-main-image");
  const thumbsContainer = document.getElementById("modal-thumbnails");
  
  if (!mainImage || !thumbsContainer) return;

  // Imagen por defecto inicial
  mainImage.src = product.defaultImage;
  mainImage.alt = product.name;
  mainImage.onerror = function() {
    this.src = `https://placehold.co/600x450/e0f2fe/0284c7?text=${encodeURIComponent(product.name)}`;
  };

  // Limpiar miniaturas
  thumbsContainer.innerHTML = "";

  // Si no hay galería o solo hay una imagen, ocultar contenedor de miniaturas
  if (!product.gallery || product.gallery.length <= 1) {
    thumbsContainer.classList.add("hidden");
    return;
  }
  thumbsContainer.classList.remove("hidden");

  // Crear miniaturas
  product.gallery.forEach((imgSrc, idx) => {
    const thumb = document.createElement("button");
    // Detectar si la imagen contiene croquis de medidas por su nombre
    const isMeasure = imgSrc.toLowerCase().includes("medida") || imgSrc.toLowerCase().includes("croquis") || imgSrc.toLowerCase().includes("nrgro") || imgSrc.toLowerCase().includes("buedeo");
    const overlayLabel = isMeasure ? '<span class="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] text-white font-extrabold uppercase py-0.5 text-center tracking-wide">Medida</span>' : '';

    thumb.className = `w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-gray-50 relative focus:outline-none ${idx === 0 ? 'border-sky-600 scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'}`;
    thumb.innerHTML = `
      <img src="${imgSrc}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/100x100/f3e8ff/8b5cf6?text=Foto'">
      ${overlayLabel}
    `;

    // Click en miniatura cambia la imagen principal
    thumb.addEventListener("click", () => {
      mainImage.src = imgSrc;
      // Quitar borde activo de todas y ponerlo en esta
      thumbsContainer.querySelectorAll("button").forEach(b => {
        b.className = "w-16 h-16 rounded-xl overflow-hidden border-2 border-transparent opacity-70 hover:opacity-100 transition-all shrink-0 bg-gray-50 relative focus:outline-none";
      });
      thumb.className = "w-16 h-16 rounded-xl overflow-hidden border-2 border-sky-600 scale-95 shadow-sm transition-all shrink-0 bg-gray-50 relative focus:outline-none";
      
      // Auto-scrollear miniatura a la vista si se desborda horizontalmente
      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });

    thumbsContainer.appendChild(thumb);
  });
}

// Cerrar el Modal
function closeProductModal() {
  if (!productModal) return;
  productModal.classList.add("hidden");
  productModal.classList.remove("flex");
  document.body.style.overflow = ""; // Reactivar scroll fondo
}

// Cerrar modal al hacer click fuera del contenedor de contenido
window.addEventListener("click", (e) => {
  if (productModal && e.target === productModal) {
    closeProductModal();
  }
});

// Cerrar con la tecla Escape
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && productModal && !productModal.classList.contains("hidden")) {
    closeProductModal();
  }
});

// Exportar globalmente funciones llamadas inline en HTML
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
