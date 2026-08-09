# Auditoría técnica del repositorio Fleximy

## Repositorio

- **URL:** `https://github.com/theivamm/fleximy2025.git`
- **Visibilidad:** pública.
- **Rama principal observada:** `main`.
- **Hosting actual:** Netlify.
- **Sitio observado:** `https://fleximy.netlify.app/`.

## Stack detectado

- React 19.
- Vite.
- React Router.
- Tailwind CSS 4.
- GSAP.
- Framer Motion.
- Lucide React.
- Supabase.
- React Dropzone.
- `html-to-image`.
- Oxlint.
- Netlify SPA redirects.

## Estructura principal

```text
public/
sql/
src/
  assets/
  components/
  content/
  context/
  lib/
  pages/
  App.jsx
  index.css
  main.jsx
.env
.gitignore
README.md
index.html
netlify.toml
package.json
vite.config.js
```

## Páginas actuales detectadas

### Website público

- Home.
- Services.
- WhyUs.
- Blog.
- Contact.
- Gastronomía.
- Gestión PyMEs.
- Turnos.
- Demos.
- Precios.
- Nosotros.

### Área privada

- Login.
- Dashboard Home.
- AI Images.
- Crear Imagen.
- Mis Diseños.

El área privada debe conservarse y aislarse del rework comercial.

## Componentes visuales existentes

El proyecto contiene componentes como:

- `BackgroundOrbs`.
- `ParticlesBackground`.
- `InteractiveBackground`.
- `GlassCard`.
- `IndustryCards`.
- `ComparisonTable`.
- `ProcessSteps`.
- `PricingCards`.
- `ModuleShowcase`.
- Simuladores de Gastronomía, Gestión y Turnos.

Parte de esta lógica puede reutilizarse, pero la estética actual entra en conflicto con la nueva dirección de “minimalismo operativo”.

## Hallazgos prioritarios

### 1. Archivo `.env` público

Existe un `.env` versionado dentro de un repositorio público.

OpenCode no debe abrir ni reproducir sus valores.

Acciones necesarias:

1. Eliminarlo del seguimiento de Git.
2. Confirmar `.env` y `.env.*` en `.gitignore`.
3. Permitir únicamente `.env.example` sin valores reales.
4. Rotar las credenciales que hayan sido incluidas.
5. Evaluar eliminación del historial con una herramienta adecuada.
6. Configurar variables reales en Netlify.

Eliminar el archivo del último commit no elimina secretos del historial.

### 2. README genérico

El README observado conserva contenido del starter React + Vite. Debe reemplazarse con descripción del proyecto, stack, configuración, variables y proceso de validación.

### 3. Mezcla de sistemas de animación

Actualmente conviven:

- Framer Motion.
- GSAP.
- Numerosas animaciones CSS permanentes.

Se necesita una responsabilidad clara:

- GSAP: secuencias narrativas y ScrollTrigger.
- Framer Motion: transiciones de rutas, menús y estados React simples.
- CSS: hover, focus y microinteracciones de baja complejidad.

### 4. Recursos visuales a retirar

- Orbes.
- Partículas.
- Fondos mesh generalizados.
- Shimmers permanentes.
- Glass cards repetidas.
- Formas con morphing decorativo.
- Cursor automatizado sin interacción real.

### 5. Cobertura incompleta de soluciones

Existen páginas específicas para Gastronomía, Gestión y Turnos. Faltan:

- Comercio y Retail.
- Inmobiliarias.
- Educación.
- Talleres y Reparaciones.

### 6. Arquitectura incompleta

Faltan rutas previstas para:

- Cómo funciona.
- FAQ general.
- Seguridad.
- Casos de uso.
- Privacidad.
- Términos.
- Gracias por diagnóstico.
- 404.

### 7. SEO limitado

Se observó un título global compartido. Cada página debe administrar title, description, canonical, Open Graph y schema apropiado.

### 8. Bundle

Todas las páginas aparecen importadas desde `App.jsx`. Implementar `React.lazy` y `Suspense` para dividir rutas. Considerar que Supabase y las herramientas del dashboard no deberían cargarse en Home.

### 9. Netlify

`netlify.toml` incluye:

- Build con `npm run build`.
- Publicación de `dist`.
- Fallback SPA.
- Caché de assets.
- Algunos headers básicos.

Agregar y validar cuando corresponda:

- Content Security Policy compatible con el proyecto.
- Strict Transport Security.
- Permissions Policy.
- Headers para documentos y assets.
- Deploy previews.

## Qué conservar

- React + Vite.
- React Router.
- GSAP.
- Supabase para el área privada.
- Configuración SPA de Netlify.
- Logo y activos reales.
- Lógica útil de simuladores existentes.
- Contextos necesarios del dashboard.

## Qué refactorizar

- `App.jsx` y división por rutas.
- Navbar y navegación de soluciones.
- Footer.
- Tokens y CSS global.
- Home.
- Simuladores.
- Arquitectura SEO.
- Formularios y seguimiento de conversiones.

## Qué eliminar solamente después de comprobar uso

- Componentes visuales antiguos.
- Animaciones CSS obsoletas.
- Contextos públicos que ya no sean necesarios.
- Dependencias sin uso.
- `App.css` residual del starter.

No borrar componentes por nombre sin revisar imports y rutas privadas.

