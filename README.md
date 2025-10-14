# Team Service Costa S.A.S.

Sitio web oficial de Team Service Costa S.A.S. - Centro Autorizado KÄRCHER en Colombia.

## 🚀 Características

- **Diseño Moderno**: Interfaz de usuario limpia y responsiva construida con Astro
- **Catálogo de Productos**: Visualización de productos KÄRCHER con detalles completos
- **Carrito de Compras**: Sistema de carrito funcional con gestión de inventario
- **Panel Lateral**: Carrito deslizante con vista previa de productos
- **Diseño Miro**: Estilo visual moderno y atractivo
- **Optimizado para Móvil**: Experiencia de usuario optimizada en todos los dispositivos

## 🛠️ Tecnología

- **Astro**: Framework de construcción de sitios web
- **TypeScript**: Tipado estático para mayor robustez
- **CSS**: Estilos personalizados con variables CSS
- **JavaScript**: Interactividad del lado del cliente

## 📁 Estructura del Proyecto

```
/
├── public/
│   ├── images/          # Imágenes del sitio
│   └── placeholder-*.svg # Imágenes placeholder
├── src/
│   ├── components/      # Componentes Astro
│   │   ├── HeaderMiro.astro
│   │   ├── ProductCardMiro.astro
│   │   ├── CartModal.astro
│   │   └── ...
│   ├── data/           # Datos estáticos
│   │   └── products.ts
│   ├── layouts/        # Layouts de página
│   │   └── Layout.astro
│   ├── pages/          # Páginas del sitio
│   │   ├── index.astro
│   │   └── tienda.astro
│   ├── scripts/        # Scripts del lado del cliente
│   │   └── cart.ts
│   └── styles/         # Estilos globales
│       └── global.css
└── package.json
```

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala dependencias                            |
| `npm run dev`             | Inicia servidor de desarrollo en `localhost:4321` |
| `npm run build`           | Construye el sitio de producción en `./dist/`   |
| `npm run preview`         | Previsualiza la construcción localmente         |
| `npm run astro ...`       | Ejecuta comandos CLI de Astro                   |
| `npm run astro -- --help` | Obtiene ayuda usando el CLI de Astro            |

## 📦 Despliegue

Este proyecto está configurado para ser desplegado en plataformas compatibles con Astro como Vercel, Netlify o cualquier servicio de hosting estático.

## 👥 Equipo

- **Team Service Costa S.A.S.** - Centro Autorizado KÄRCHER
- Ubicaciones: Montería, Cartagena y Apartadó
- Especialistas en equipos de limpieza profesional

## 📄 Licencia

© 2024 Team Service Costa S.A.S. Todos los derechos reservados.
