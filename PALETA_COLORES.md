# Paleta de Colores - GIA PUCP

Este documento detalla los colores principales y secundarios utilizados en el diseño y estilos del proyecto GIA PUCP. Los colores están divididos por categorías de uso (Primarios, Secundarios, Estados y Neutros).

## 1. Colores Principales (Brand Colors)

Los tonos azules son los predominantes en la identidad corporativa del proyecto, utilizados en barras de navegación, botones principales, títulos y gradientes.

- **Azul GIA Principal**: `#00548c`
  - *Uso*: Fondos de secciones, bordes, elementos destacados (ej. Sección de Actualidad, Misión y Visión).
- **Azul Oscuro**: `#003d66`
  - *Uso*: Variantes de hover (interacción de mouse), secciones con más contraste.
- **Azul Marino (Kuntur)**: `#002366`
  - *Uso*: Textos oscuros, insignias y títulos de la sección de proyectos Kuntur.
- **Cian / Celeste (Gradientes)**: `#4facfe` a `#00f2fe`
  - *Uso*: Textos resaltados en el Navbar animado, efectos de resplandor o transición.
- **Teal Suave**: `#7fc0ba`
  - *Uso*: Color intermedio en gradientes junto al azul principal.

## 2. Colores Secundarios y de Acción (Donaciones)

Principalmente tonos verdes utilizados para los llamados a la acción (CTAs), flujos de donaciones y elementos afirmativos.

- **Verde Principal (Botones)**: Clases Tailwind `bg-green-500` y `hover:bg-green-600`.
- **Verde Texto Destacado**: `text-green-700` a `text-green-900`.
- **Verde Claro (Fondos y Bordes)**: `bg-green-50`, `border-green-200`.

## 3. Colores de Estado y Alertas

Colores usados en los formularios de contacto y alertas dinámicas (mensajes de error o éxito).

- **Éxito (Success)**: 
  - Fondo: `#d4edda`
  - Texto: `#155724`
  - Borde: `#c3e6cb`
- **Error (Danger)**:
  - Fondo: `#f8d7da`
  - Texto: `#721c24` / `text-red-600`
  - Borde: `#f5c6cb`

## 4. Colores Neutros

Utilizados para fondos estructurales, textos de lectura, bordes de tarjetas y contrastes suaves.

- **Blancos y Fondos Claros**:
  - **Blanco puro**: `#ffffff` o `white` (Fondos de tarjetas, textos principales en fondos oscuros).
  - **Gris claro / Off-white**: `#f9fafb`, `#f9f9f9` (Fondos alternativos para resaltar tarjetas o contenedores).
- **Grises (Textos y Bordes)**:
  - **Textos secundarios**: `#999999`, `#4a5568`, `text-gray-600`, `text-gray-700` (Para párrafos y descripciones).
  - **Bordes y divisores**: `#e0e0e0`, `#d1d5db`, `#a5b4fc`.
- **Negros y Fondos Oscuros**:
  - **Negro puro**: `#000000` o `black`.
  - **Fondos oscuros profundos**: `#111111`, `#1a1a1a`, `#111827` (Fondos para secciones de noticias o navbar en scroll).
  - **Gris oscuro (Tarjetas)**: `#222222`, `#2a2a2a`, `#333333`.

## 5. Notas sobre la Implementación

Gran parte del proyecto combina **módulos CSS convencionales** (donde se usan los códigos HEX explícitos) y **clases utilitarias de Tailwind CSS**.
Las clases más frecuentes de Tailwind en el proyecto incluyen:
- `text-white`, `bg-white` para contrastes.
- `text-gray-600`, `text-gray-700`, `text-gray-800` para lectura prolongada.
- Familias de `green` (`bg-green-500`, `text-green-700`) para la sección de Donar.
- Familias de `blue` (`text-blue-500`, `bg-blue-50`) para complementos de tarjetas de proyectos.
