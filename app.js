// Base de datos de productos de Textil y Hogar
const products = [
  // ROPA INTERIOR
  {
    id: "calzon-nina",
    name: "Calzón Niña de Algodón",
    category: "ropa-interior",
    subcategory: "Niña",
    material: "Algodón",
    price: "$3.000",
    priceVal: 3000,
    unitType: "Pack de 4 unidades",
    description: "Comodidad diaria para las más pequeñas con un ajuste suave e higiénico.",
    features: [
      "100% Algodón de alta calidad",
      "Costuras suaves que evitan irritaciones",
      "Pack incluye colores y diseños surtidos al azar",
      "Ideal para uso diario escolar y recreativo"
    ],
    defaultImage: "Media/Calzon Niña algodon.jpg",
    gallery: [
      "Media/Calzon Niña algodon.jpg"
    ],
    colors: ["Surtidos al azar"],
    dimensions: "Tallas infantiles estándar",
    recommendations: "Lavar a mano o máquina en ciclo suave con agua fría. No usar blanqueador.",
    uses: "Uso diario, comodidad escolar."
  },
  {
    id: "calzon-juvenil",
    name: "Calzón Juvenil de Algodón",
    category: "ropa-interior",
    subcategory: "Niña",
    material: "Algodón",
    price: "$5.000",
    priceVal: 5000,
    unitType: "Pack de 4 unidades",
    description: "Ajuste ideal adaptado para las etapas de crecimiento, garantizando soltura y frescura.",
    features: [
      "Material transpirable de algodón suave",
      "Cintura elástica que no aprieta ni deja marcas",
      "Colores y estampados juveniles surtidos según stock",
      "Excelente durabilidad tras múltiples lavados"
    ],
    defaultImage: "Media/Calzon Juvenil.png",
    gallery: [
      "Media/Calzon Juvenil.png",
      "Media/Calzon Juvenil maniqui.png"
    ],
    colors: ["Surtidos al azar"],
    dimensions: "Tallas juveniles estándar",
    recommendations: "Lavar con colores similares. Secar a la sombra para prolongar la elasticidad.",
    uses: "Uso diario, actividades deportivas y colegio."
  },
  {
    id: "pantaleta-juvenil",
    name: "Pantaleta Juvenil con Diseño",
    category: "ropa-interior",
    subcategory: "Niña",
    material: "Algodón",
    price: "$5.000",
    priceVal: 5000,
    unitType: "Pack de 4 unidades",
    description: "Estilo moderno y sumamente cómodo. Tipo short corto que ofrece excelente cobertura.",
    features: [
      "Diseño moderno tipo pantaleta/short",
      "Tejido de algodón elástico para mayor libertad",
      "Pack incluye diseños variados al azar",
      "Elástico plano muy discreto bajo la ropa"
    ],
    defaultImage: "Media/Pantaleta juvenil.jpg",
    gallery: [
      "Media/Pantaleta juvenil.jpg",
      "Media/Pantineta juvrenil precio.jpg"
    ],
    colors: ["Surtidos con diseño al azar"],
    dimensions: "Tallas juveniles",
    recommendations: "Lavar antes de usar. Planchar a temperatura baja si es necesario.",
    uses: "Uso diario, ideal para faldas y vestidos."
  },
  {
    id: "calzon-dama",
    name: "Calzón Dama de Algodón",
    category: "ropa-interior",
    subcategory: "Dama",
    material: "Algodón",
    price: "$6.000",
    priceVal: 6000,
    unitType: "Pack de 4 unidades",
    description: "Frescura y máxima higiene garantizada. Un modelo clásico enfocado en el bienestar cotidiano.",
    features: [
      "100% Algodón higiénico y transpirable",
      "Recomendado para pieles sensibles",
      "Corte clásico de tiro medio-alto para soporte óptimo",
      "Colores neutros y pasteles surtidos por pack"
    ],
    defaultImage: "Media/Calzones Adulto Algodon.jpg",
    gallery: [
      "Media/Calzones Adulto Algodon.jpg",
      "Media/Calzon Adulto maniqui.png",
      "Media/Calzon Adulto maniqui Titulo.png",
      "Media/Calzones adulto pack 6000.jpg"
    ],
    colors: ["Surtidos clásicos al azar"],
    dimensions: "Tallas M, L, XL, XXL",
    recommendations: "Lavar preferentemente con jabón neutro. No usar secadora.",
    uses: "Bienestar diario, comodidad higiénica permanente."
  },
  {
    id: "colaless-dama",
    name: "Colaless Encaje y Lycra",
    category: "ropa-interior",
    subcategory: "Dama",
    material: "Lycra",
    price: "$5.000",
    priceVal: 5000,
    unitType: "Pack de 4 unidades",
    description: "Elegancia, sensualidad y excelente elasticidad. Se adapta al cuerpo de forma invisible.",
    features: [
      "Combinación de lycra sedosa y encaje delicado en bordes",
      "No se marca bajo pantalones o vestidos ajustados",
      "Ajuste elástico premium y duradero",
      "Pack en combinación de colores atractivos al azar"
    ],
    defaultImage: "Media/Colaless con maniqui.jpg",
    gallery: [
      "Media/Colaless con maniqui.jpg"
    ],
    colors: ["Varios colores surtidos"],
    dimensions: "Tallas S, M, L",
    recommendations: "Lavar dentro de una bolsa de malla para proteger el encaje. Secar al aire libre.",
    uses: "Ocasiones especiales y uso bajo prendas entalladas."
  },
  {
    id: "pantaleta-dama",
    name: "Pantaleta Encaje y Microfibra",
    category: "ropa-interior",
    subcategory: "Dama",
    material: "Encaje / Microfibra",
    price: "$6.000",
    priceVal: 6000,
    unitType: "Pack de 4 unidades",
    description: "Suavidad insuperable con finos detalles de encaje. Diseñada para un calce favorecedor.",
    features: [
      "Confección en microfibra ultra suave al tacto",
      "Detalles de encaje elegante en los bordes",
      "Corte tipo pantaleta que brinda gran comodidad",
      "Prendas flexibles que se amoldan a tus curvas"
    ],
    defaultImage: "Media/Pantaletas con encaje.jpg",
    gallery: [
      "Media/Pantaletas con encaje.jpg",
      "Media/Pantaleta con  encaje.jpg"
    ],
    colors: ["Surtido de colores modernos"],
    dimensions: "Tallas M, L, XL",
    recommendations: "Lavar a mano con agua fría. No retorcer en exceso.",
    uses: "Uso diario, comodidad y elegancia combinadas."
  },
  {
    id: "boxer-corto-varon",
    name: "Bóxer Corto Varón Lycra con Diseño",
    category: "ropa-interior",
    subcategory: "Varón",
    material: "Lycra",
    price: "$6.000",
    priceVal: 6000,
    unitType: "Pack de 4 unidades",
    description: "Excelente soporte anatómico con un estilo moderno y dinámico. Textura elástica superior.",
    features: [
      "Tejido elástico de lycra que se adapta al movimiento",
      "Pretina elástica ancha para mayor comodidad en la cintura",
      "Diseños geométricos y modernos estampados",
      "Costuras reforzadas para mayor durabilidad"
    ],
    defaultImage: "Media/Pack Boxer corto con diseño.jpg",
    gallery: [
      "Media/Pack Boxer corto con diseño.jpg",
      "Media/Boxer corto Diseño Lycra Maniqui.png"
    ],
    colors: ["Estampados y colores surtidos"],
    dimensions: "Tallas S, M, L, XL",
    recommendations: "Lavar a máquina con agua tibia. No usar cloro ni planchar.",
    uses: "Uso diario y actividades deportivas."
  },
  {
    id: "boxer-largo-varon",
    name: "Bóxer Largo Varón Lycra Color Entero",
    category: "ropa-interior",
    subcategory: "Varón",
    material: "Lycra",
    price: "$6.000",
    priceVal: 6000,
    unitType: "Pack de 4 unidades",
    description: "Cobertura total, calidez y suavidad constante. Colores lisos de aspecto sobrio y limpio.",
    features: [
      "Corte largo que evita el roce en los muslos",
      "Lycra de color entero (lisos) de alta densidad",
      "Elástico suave y firme en la cintura",
      "Ideal para climas templados o fríos"
    ],
    defaultImage: "Media/Boxer largo Lycra maniqui.png",
    gallery: [
      "Media/Boxer largo Lycra maniqui.png"
    ],
    colors: ["Colores lisos surtidos (Negro, Azul, Gris, etc.)"],
    dimensions: "Tallas M, L, XL",
    recommendations: "Lavar con agua fría. Secar en secadora a baja temperatura o al aire.",
    uses: "Uso diario, excelente cobertura y protección."
  },
  {
    id: "boxer-largo-algodon",
    name: "Bóxer Largo de Algodón a Rayas",
    category: "ropa-interior",
    subcategory: "Varón",
    material: "Algodón",
    price: "$8.000",
    priceVal: 8000,
    unitType: "Pack de 4 unidades",
    description: "El confort clásico por excelencia. El tejido natural a rayas permite una transpiración perfecta.",
    features: [
      "Tejido de algodón natural ultra transpirable",
      "Diseño clásico a rayas horizontales finas",
      "Corte largo cómodo que se mantiene en su sitio",
      "Cintura elástica forrada para evitar rozaduras"
    ],
    defaultImage: "Media/12 Boxer largo de algodon.jpg",
    gallery: [
      "Media/12 Boxer largo de algodon.jpg"
    ],
    colors: ["Diseño a rayas en colores surtidos"],
    dimensions: "Tallas M, L, XL, XXL",
    recommendations: "Lavar con prendas del mismo tejido. Planchar a temperatura media si se requiere.",
    uses: "Ideal para el descanso y uso diario confortable de algodón."
  },

  // INDUMENTARIA DE TRABAJO
  {
    id: "delantal-pechera-basico",
    name: "Delantal Pechera Básico Cuello V",
    category: "indumentaria-trabajo",
    subcategory: "Profesional",
    material: "Bistrech",
    price: "$8.000",
    priceVal: 8000,
    unitType: "Pack de 4 unidades",
    description: "Excelente combinación de elegancia y resistencia para el trabajo intenso diario. No requiere planchado.",
    features: [
      "Tela Bistrech 100% poliéster de gran durabilidad",
      "Diseño con elegante cuello V y tiras laterales ajustables",
      "Cuenta con 2 amplios bolsillos frontales funcionales",
      "Incluye un pequeño cierre interior de seguridad",
      "Estructura firme, liviana y de excelente caída que no se estira"
    ],
    defaultImage: "Media/Morado.jpg",
    gallery: [
      "Media/Morado.jpg",
      "Media/medida.png",
      "Media/Rojo.jpg",
      "Media/Azul.jpg",
      "Media/Azul oscuro.png",
      "Media/Negro.jpg",
      "Media/Burdeo 1.jpg",
      "Media/Verde Botella.jpg",
      "Media/Rojo medida.jpg",
      "Media/Azul medida.jpg",
      "Media/Morado medida.jpg",
      "Media/Nrgro medida.jpg",
      "Media/Buedeo con medidas.jpg",
      "Media/Verde con medida 1.jpg",
      "Media/rojo inclinado.png",
      "Media/azul con medida.png",
      "Media/azul oscuro con medida.png",
      "Media/azul volteada.png",
      "Media/Morado inclinado.jpg",
      "Media/Negro1.jpg"
    ],
    colors: ["Rojo", "Azul", "Azul Oscuro", "Burdeo (Burdeos)", "Morado", "Negro", "Verde Botella"],
    dimensions: "48 cm x 70 cm (Medidas tomadas manualmente)",
    recommendations: "Lavar a máquina. No requiere planchado (se cuelga húmedo para eliminar arrugas).",
    uses: "Cocina, quehaceres del hogar, aseo, pastelería, manualidades y estética."
  },
  {
    id: "delantal-chefs",
    name: "Delantal de Chefs (Línea Profesional)",
    category: "indumentaria-trabajo",
    subcategory: "Profesional",
    material: "Bistrech",
    price: "$4.500",
    priceVal: 4500,
    unitType: "Por unidad",
    description: "Diseño simple y unisex con máxima flexibilidad profesional. Material de fácil mantenimiento.",
    features: [
      "Confeccionado en tela Bistrech 100% poliéster resistente",
      "Dos bolsillos amplios frontales para fácil organización",
      "Tiras laterales anchas para un ajuste firme a la medida",
      "Diseño unisex sobrio y cómodo para jornadas largas"
    ],
    defaultImage: "Media/Chef.jpg",
    gallery: [
      "Media/Chef.jpg",
      "Media/Chef negro.jpg",
      "Media/Chef con medida.jpg",
      "Media/Chef blanco con medidad.jpg"
    ],
    colors: ["Blanco", "Negro"],
    dimensions: "64 cm x 76 cm (Medición manual aproximada)",
    recommendations: "Se recomienda lavar a máquina regularmente para mantener la higiene y caída del tejido.",
    uses: "Chefs, ayudantes de cocina, restaurantes, cafeterías, barbacoas, barberías y estudios de pintura."
  },
  {
    id: "delantal-rojo-chino",
    name: "Delantal Rojo Cruzado (Estilo Chino)",
    category: "indumentaria-trabajo",
    subcategory: "Profesional",
    material: "Bistrech",
    price: "$4.000",
    priceVal: 4000,
    unitType: "Por unidad",
    description: "Diseño ergonómico cruzado en la espalda que distribuye el peso de manera uniforme, evitando dolores de cuello.",
    features: [
      "Diseño japonés/chino cruzado sin amarras difíciles",
      "Tela Bistrech de alta resistencia y fácil lavado",
      "Distribución del peso en los hombros para máxima ergonomía",
      "Bolsillo frontal grande y de fácil acceso"
    ],
    defaultImage: "Media/Delantal Rojo Chino.png",
    gallery: [
      "Media/Delantal Rojo Chino.png",
      "Media/Medidas chino.png"
    ],
    colors: ["Rojo"],
    dimensions: "Ver croquis de medidas (ajuste holgado)",
    recommendations: "Lavar a máquina en ciclo normal. No requiere planchado.",
    uses: "Cafeterías, florerías, manualidades, cocina doméstica y talleres creativos."
  }
];

// Configuración general
const WHATSAPP_PHONE = "56987654321"; // Reemplazar con el número real de la tienda (ej: 56912345678)
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
document.addEventListener("DOMContentLoaded", () => {
  gridContainer = document.getElementById("product-grid");
  searchInput = document.getElementById("search-input");
  categoryTabs = document.querySelectorAll(".category-tab");
  subcategoryFilters = document.querySelectorAll(".filter-subcategory");
  materialFilters = document.querySelectorAll(".filter-material");
  productModal = document.getElementById("product-modal");
  activeFiltersContainer = document.getElementById("active-filters");

  // Configurar escuchadores de eventos
  setupEventListeners();

  // Renderizar catálogo inicial
  renderProducts();
});

// Configuración de eventos
function setupEventListeners() {
  // Barra de búsqueda
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
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

  // Filtros de subcategoría (Dama, Varón, Niña, Profesional)
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
      btn.classList.add("btn-filter-active", "border-purple-500", "bg-purple-50");
      btn.classList.remove("bg-white", "text-gray-600");
    } else {
      btn.classList.remove("btn-filter-active", "border-purple-500", "bg-purple-50");
      btn.classList.add("bg-white", "text-gray-600");
    }
  });

  // Materiales
  materialFilters.forEach(btn => {
    if (btn.dataset.value === state.activeMaterial) {
      btn.classList.add("btn-filter-active", "border-purple-500", "bg-purple-50");
      btn.classList.remove("bg-white", "text-gray-600");
    } else {
      btn.classList.remove("btn-filter-active", "border-purple-500", "bg-purple-50");
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
    badge.className = "inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full animate-fade-in-scale";
    badge.innerHTML = `
      <span>${label}</span>
      <button class="hover:bg-purple-200 rounded-full p-0.5 transition-colors focus:outline-none" aria-label="Quitar filtro">
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
    clearAll.className = "text-xs font-bold text-gray-500 hover:text-purple-600 hover:underline ml-2 transition-all focus:outline-none";
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
      const matchName = p.name.toLowerCase().includes(state.searchQuery);
      const matchDesc = p.description.toLowerCase().includes(state.searchQuery);
      const matchMat = p.material.toLowerCase().includes(state.searchQuery);
      const matchSub = p.subcategory.toLowerCase().includes(state.searchQuery);
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
        <div class="inline-flex justify-center items-center w-16 h-16 rounded-full bg-purple-50 text-purple-400 mb-4 shadow-inner">
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
    const badgeHtml = isPack 
      ? `<span class="absolute top-4 left-4 z-10 bg-indigo-500/90 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">Pack de 4</span>`
      : `<span class="absolute top-4 left-4 z-10 bg-emerald-500/90 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">Por Unidad</span>`;

    card.innerHTML = `
      <div class="product-card-img-container aspect-[4/3] bg-gray-50 flex items-center justify-center relative cursor-pointer">
        ${badgeHtml}
        <img src="${p.defaultImage}" alt="${p.name}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/600x450/f3e8ff/8b5cf6?text=${encodeURIComponent(p.name)}'">
        <div class="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div class="p-6 flex flex-col flex-grow">
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="text-xs font-bold uppercase tracking-wider text-purple-500">${p.subcategory}</span>
          <span class="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">${p.material}</span>
        </div>
        <h3 class="text-lg font-extrabold text-gray-800 leading-tight mb-2 hover:text-purple-600 transition-colors cursor-pointer" onclick="openProductModal('${p.id}')">
          ${p.name}
        </h3>
        <p class="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
          ${p.description}
        </p>
        <div class="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div>
            <div class="text-2xl font-black text-purple-600">${p.price}</div>
            <div class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">${p.unitType}</div>
          </div>
          <button onclick="openProductModal('${p.id}')" class="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white text-sm font-bold rounded-2xl transition-all shadow-md shadow-purple-500/10 flex items-center gap-1">
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
  document.getElementById("modal-price").textContent = product.price;
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
    const textMsg = `Hola Textil y Hogar, me interesa el producto "${product.name}" (${product.unitType} por ${product.price}). ¿Tienen disponibilidad en stock?`;
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
    this.src = `https://placehold.co/600x450/f3e8ff/8b5cf6?text=${encodeURIComponent(product.name)}`;
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

    thumb.className = `w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-gray-50 relative focus:outline-none ${idx === 0 ? 'border-purple-600 scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'}`;
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
      thumb.className = "w-16 h-16 rounded-xl overflow-hidden border-2 border-purple-600 scale-95 shadow-sm transition-all shrink-0 bg-gray-50 relative focus:outline-none";
      
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
