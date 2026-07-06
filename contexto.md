# Contexto del Proyecto: Catálogo Web Textil y Hogar

Este archivo documenta las especificaciones, decisiones de arquitectura, estructura de datos y el funcionamiento general del sitio web para **Textil y Hogar**. El objetivo principal es contar con una vitrina interactiva y moderna que sirva de apoyo para las ventas presenciales.

---

## 1. Tecnologías Utilizadas

- **HTML5:** Estructuración semántica del catálogo.
- **JavaScript (Vanilla):** Gestión interactiva del catálogo, filtrado dinámico en el cliente, control de modales de producto y carruseles.
- **Tailwind CSS (v3.4):** Framework CSS utilizado para el diseño responsive y estilización rápida.
- **CSS3 Personalizado (`styles.css`):** Extiende a Tailwind para implementar efectos avanzados:
  - Efectos de glassmorphism (desenfocado de fondo).
  - Tipografías premium importadas desde Google Fonts (*Plus Jakarta Sans*).
  - Transiciones suaves y micro-animaciones para mejorar la experiencia de usuario (UX).

---

## 2. Arquitectura de Información y Productos

El catálogo está estructurado en dos categorías principales: **Ropa Interior** e **Indumentaria de Trabajo**.

### 2.1 Ropa Interior
Toda la ropa interior se vende exclusivamente en **packs de 4 unidades** con colores distribuidos de manera aleatoria según stock.

| Producto | Material y Características | Precio (Pack 4) | Imágenes Principales |
| :--- | :--- | :--- | :--- |
| **Calzón Niña** | 100% Algodón. Comodidad diaria para las más pequeñas. | $3.300 ($3.000 con 10% OFF) | `Calzon Niña algodon.jpg` |
| **Calzón Juvenil** | Algodón. Ajuste ideal para el crecimiento. | $5.000 | `Calzon Juvenil.png`, `Calzon Juvenil maniqui.png` |
| **Pantaleta Juvenil** | Algodón con diseño. Estilo moderno y cómodo. | $5.000 | `Pantaleta juvenil.jpg`, `Pantineta juvrenil precio.jpg` |
| **Calzón Mujer** | 100% Algodón. Frescura e higiene garantizadas. | $6.600 ($6.000 con 10% OFF) | `Calzones Adulto Algodon.jpg`, `Calzon Adulto maniqui.png` |
| **Colaless Mujer** | Encaje y Lycra. Elegancia y elasticidad. | $5.000 | `Colaless con maniqui.jpg` |
| **Pantaleta Mujer** | Encaje y Microfibra. Suavidad con detalles finos. | $6.000 | `Pantaletas con encaje.jpg`, `Pantaleta con  encaje.jpg` |
| **Bóxer Corto Hombre** | Lycra con diseño. Soporte con estilo moderno. | $6.000 | `Pack Boxer corto con diseño.jpg`, `Boxer corto Diseño Lycra Maniqui.png` |
| **Bóxer Largo Hombre** | Lycra de color entero. Cobertura total y suavidad. | $6.000 | `Boxer largo Lycra maniqui.png` |
| **Bóxer Largo Algodón** | Algodón a rayas. El confort clásico. | $8.000 | `12 Boxer largo de algodon.jpg` |

### 2.2 Indumentaria de Trabajo
Productos confeccionados en **Tela Bistrech (100% poliéster)**, conocida por su durabilidad y facilidad de mantenimiento (no requiere planchado).

| Producto | Especificaciones Técnicas | Precio Sugerido | Variantes y Medidas |
| :--- | :--- | :--- | :--- |
| **Delantal Pechera Básico Cuello V** | Medidas: 48x70 cm. Cuello V, tiras laterales, 2 bolsillos frontales y cierre interior. Pack de 4 (colores al azar). | $12.500 ($10.000 con 20% OFF) | Colores: Rojo, Azul, Azul Oscuro, Burdeo, Morado, Negro, Verde Botella. Medidas: `medida.png` |
| **Delantal Chefs** | Medidas: 64x76 cm. Ajuste lateral, dos bolsillos amplios. Diseño unisex profesional. Lavable a máquina. | $5.000 ($4.500 con 10% OFF) | Colores: Blanco, Negro. Medidas: `Chef con medida.jpg` |
| **Delantal Rojo Chino** | Modelo adicional encontrado en imágenes. Tiras cruzadas en la espalda, color rojo. | $3.300 ($3.000 con 10% OFF) | Imagen: `Delantal Rojo Chino.png`. Medidas: `Medidas chino.png` |

---

## 3. Características Clave del Sitio Web

1. **Filtros Dinámicos Interactivos:**
   - Barra de búsqueda de productos con respuesta en tiempo real.
   - Categorías principales en pestañas para fácil navegación.
   - Filtrado secundario por público objetivo (Mujer, Hombre, Niña, Profesional) y por tipo de material (Algodón, Lycra, Bistrech).
2. **Modal de Ficha Técnica:**
   - Al hacer clic en cualquier producto, se despliega un modal elegante con la información extendida.
   - Carrusel de fotos interactivo que incluye las variaciones de colores del producto y los croquis con sus medidas exactas.
   - Detalle de la propuesta de valor y las recomendaciones de cuidado.
3. **Flujo de Venta Presencial (Integración con WhatsApp):**
   - El catálogo redirige a la acción presencial mediante un botón de consulta rápida.
   - Al pulsar "Consultar disponibilidad en WhatsApp", se genera un enlace personalizado que abre un chat con el vendedor, incluyendo un mensaje como:
     > *"Hola Textil y Hogar, me interesa el producto [Nombre del Producto] (Pack de 4 por [Precio]). ¿Tienen stock disponible?"*
4. **Garantía y Confianza:**
   - Banner interactivo destacando los puntos fuertes de los productos (ej. "Bistrech sin planchado" y "100% Algodón higiénico").

---

## 4. Estructura de Archivos del Proyecto

```
/
├── Documentos/               # Archivos .docx de origen (especificaciones y precios)
├── Media/                    # Carpeta de imágenes de los productos y medidas
├── contexto.md               # Este archivo de documentación
├── index.html                # Interfaz principal (HTML5 + Tailwind)
├── app.js                    # Base de datos y lógica del catálogo interactivo
└── styles.css                # Estilos y animaciones personalizadas
```

---

## 5. Historial de Cambios

- **2026-06-30:**
  - Creación del plan de implementación.
  - Creación del archivo de contexto del proyecto (`contexto.md`).
  - Extracción de información de productos y mapeo de imágenes de la carpeta `Media`.
