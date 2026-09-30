# 🚀 GIA PUCP — Landing Page

> Grupo de Investigación Aeroespacial de la Pontificia Universidad Católica del Perú.

Sitio web institucional que impulsa la visibilidad del desarrollo aeroespacial peruano. Construido con un stack moderno, orientado al rendimiento y alineado con la identidad visual "space-tech" del grupo.

---

## 🛠 Stack Tecnológico

### Core

| Tecnología | Versión | Rol |
|---|---|---|
| [Next.js](https://nextjs.org/) | 15.5 | Framework React con App Router, SSR/ISR y Turbopack |
| [React](https://react.dev/) | 19.1 | Librería de UI con Server & Client Components |
| [TypeScript](https://www.typescriptlang.org/) | ^5 | Tipado estático sobre JavaScript |
| [Node.js](https://nodejs.org/) | ≥ 20 | Runtime del servidor y tooling |

### Estilos

| Tecnología | Versión | Rol |
|---|---|---|
| [Tailwind CSS](https://tailwindcss.com/) | v4 | Framework de utilidades CSS |
| [@tailwindcss/postcss](https://tailwindcss.com/docs/installation/using-postcss) | ^4 | Integración con PostCSS |
| CSS Modules (`.module.css`) | — | Estilos con alcance por componente |
| CSS vanilla (`.css`) | — | Estilos globales y de componentes compartidos |

### Animaciones

| Tecnología | Versión | Rol |
|---|---|---|
| [GSAP](https://gsap.com/) | ^3.13 | Animaciones de scroll, timeline y transiciones complejas |

### CMS (Headless)

| Tecnología | Versión | Rol |
|---|---|---|
| [Contentful](https://www.contentful.com/) (CDA API) | — | Gestión de contenido: noticias, eventos, banners, equipo |
| [@contentful/rich-text-react-renderer](https://github.com/contentful/rich-text/tree/master/packages/rich-text-react-renderer) | ^16.1 | Renderizado de Rich Text de Contentful |
| [@contentful/rich-text-types](https://github.com/contentful/rich-text/tree/master/packages/rich-text-types) | ^17.2 | Tipos de nodos Rich Text |

### Markdown

| Tecnología | Versión | Rol |
|---|---|---|
| [react-markdown](https://github.com/remarkjs/react-markdown) | ^10.1 | Renderizado de Markdown a React |
| [remark-gfm](https://github.com/remarkjs/remark-gfm) | ^4.0 | Soporte de tablas, listas de tareas y más (GitHub Flavored Markdown) |

### Iconos

| Tecnología | Versión | Rol |
|---|---|---|
| [Lucide React](https://lucide.dev/) | ^0.544 | Iconos SVG ligeros (interfaz general) |
| [React Icons](https://react-icons.github.io/react-icons/) | ^5.5 | Colección de iconos (redes sociales, etc.) |

### Imágenes

| Tecnología | Rol |
|---|---|
| `next/image` | Optimización automática de imágenes (WebP/AVIF, lazy load, responsive) |

### Calidad de código

| Tecnología | Versión | Rol |
|---|---|---|
| [ESLint](https://eslint.org/) | ^9 | Linter de código |
| [eslint-config-next](https://nextjs.org/docs/app/api-reference/config/eslint) | 15.5 | Reglas específicas de Next.js + Core Web Vitals |
| [Prettier](https://prettier.io/) | ^3.6 | Formateo de código |

---

## 📁 Estructura del Proyecto

```
src/
├── api/                    # Servicios y conexión con Contentful CDA
│   ├── ContentfulBase.ts   # Cliente base, helpers de URL e imágenes
│   └── types/              # Tipos TypeScript para las respuestas de Contentful
├── app/
│   ├── globals.css         # Variables CSS, paleta de colores, tipografía base
│   ├── layout.tsx          # Layout raíz (Navbar, Footer, metadatos SEO)
│   ├── (inicio)/           # Página principal (route group)
│   │   ├── components/     # Hero, Misión/Visión, Historia, Actualidad, Eventos
│   │   └── api/            # Data fetching para la home
│   ├── noticias/           # Página de noticias con modal de detalle
│   ├── eventos/            # Lista y modal de eventos con inscripción
│   ├── equipo/             # Directorio de miembros por área
│   ├── contacto/           # Formulario de contacto + info de contacto
│   ├── donar/              # Página de donaciones (Yape/Plin, Scotiabank)
│   └── types/              # Tipos compartidos a nivel de app
├── components/
│   ├── comun/              # Componentes reutilizables: Navbar, Footer, Banner
│   └── layout/             # NavbarSwitcher (elige navbar según ruta)
```

---

## 🎨 Identidad Visual

### Paleta de Colores

| Color | Hex | Uso |
|---|---|---|
| 🔵 Azul profundo | `#030723` | Fondo principal oscuro, transmite seriedad y espacio |
| 🔵 Azul oscuro | `#081021` | Fondo secundario, secciones oscuras |
| 🔵 Azul medio | `#1C296B` | Color de acento principal (botones, enlaces, badges) |
| 🔵 Celeste claro | `#CEDCF7` | Acentos claros, indicadores, hover effects |
| ⚪ Gris medio | `#595959` | Texto secundario |
| ⚪ Gris oscuro | `#344054` | Texto de cuerpo |
| ⚪ Blanco | `#FFFFFF` | Fondos claros, texto sobre fondos oscuros |

### Tipografía

- **Titulares (H1):** Microgramma D Bold — Look tecnológico y aeroespacial
- **Subtítulos y cuerpo (H2+, body):** Quicksand — Accesible, moderna, profesional

### Recursos visuales

- Texturas de galaxia como fondo sutil (contexto "space-tech")
- Trazos tipo circuito en esquinas (ingeniería, precisión)

---

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** ≥ 20
- **npm** ≥ 10

### Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
SPACE_ID=tu_space_id_de_contentful
ACCESS_TOKEN=tu_access_token_de_contentful
```

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build de producción

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## 📄 Licencia

© 2025 GIA PUCP — Todos los derechos reservados.
