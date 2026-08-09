# Plan de implementación para OpenCode

## Regla general

Cada fase debe terminar con build, lint, revisión visual, resumen de cambios y commit propio.

## Fase 0 — Seguridad

- Crear rama de rework.
- Retirar `.env` del seguimiento.
- Crear `.env.example`.
- Verificar `.gitignore`.
- Documentar necesidad de rotar credenciales.
- No reescribir el historial automáticamente sin aprobación.

**Criterio de cierre:** no quedan secretos nuevos en el diff.

## Fase 1 — Auditoría y limpieza

- Mapa de rutas.
- Inventario de componentes.
- Inventario de dependencias.
- Identificación de código del starter.
- Identificación de componentes exclusivos del dashboard.
- Revisión de Netlify.
- Revisión de SEO actual.

**Criterio de cierre:** plan de conservación, refactor y eliminación documentado.

## Fase 2 — Sistema global

- Tokens.
- Tipografía.
- Retícula.
- Button system.
- Section headers.
- Header.
- Mega menú.
- Menú mobile.
- Footer.
- Route loading.
- Reduced motion.

**Criterio de cierre:** componentes globales utilizables en desktop y mobile.

## Fase 3 — Inicio

Fuente: `01-INICIO.md`.

- Hero.
- Simulador Sitio/Panel.
- Beneficios.
- Dos lados de la plataforma.
- Selector de siete industrias.
- Proceso.
- Transformación.
- Demo destacada.
- FAQ breve.
- CTA final.
- GSAP.

**Criterio de cierre:** Home completa, sin datos inventados, lista para validación visual.

## Punto de aprobación obligatorio

No extender el sistema antes de aprobar:

- Paleta.
- Tipografía.
- Hero.
- Dashboard CSS.
- Ritmo de animación.
- Composición mobile.
- Header y footer.

## Fase 4 — Soluciones

Fuentes:

- `02-SOLUCIONES.md`.
- `03-GASTRONOMIA.md`.
- `04-SERVICIOS-Y-TURNOS.md`.
- `05-GESTION-PYMES.md`.
- `06-COMERCIO-RETAIL.md`.
- `07-INMOBILIARIAS.md`.
- `08-EDUCACION.md`.
- `09-TALLERES-REPARACIONES.md`.

Orden recomendado:

1. Hub Soluciones.
2. Gastronomía.
3. Turnos.
4. Gestión.
5. Comercio.
6. Inmobiliarias.
7. Educación.
8. Talleres.

**Criterio de cierre:** cada página posee escena propia y no es una réplica con texto cambiado.

## Fase 5 — Demos

Fuente: `10-DEMOS.md`.

- Laboratorio de demos.
- Selector por rubro.
- Vista cliente/equipo.
- Estado reiniciable.
- Datos ficticios identificados.
- Interacciones reales.
- Recorrido guiado opcional.

**Criterio de cierre:** todos los botones producen una acción visible.

## Fase 6 — Comercial

- `11-COMO-FUNCIONA.md`.
- `12-PRECIOS.md`.
- `13-NOSOTROS.md`.
- `14-CONTACTO-DIAGNOSTICO.md`.
- `15-PREGUNTAS-FRECUENTES.md`.

No completar valores pendientes sin definición del cliente.

## Fase 7 — Confianza y recursos

- `16-SEGURIDAD-Y-CONTINUIDAD.md`.
- `17-RECURSOS.md`.
- `20-CASOS-DE-USO.md`.

No presentar casos ilustrativos como clientes reales.

## Fase 8 — Legales y estados

- `18-POLITICA-DE-PRIVACIDAD.md`.
- `19-TERMINOS-DEL-SERVICIO.md`.
- `21-GRACIAS-DIAGNOSTICO.md`.
- `22-PAGINA-404.md`.

Los textos legales requieren validación profesional.

## Fase 9 — SEO y analítica

- Metadatos por ruta.
- Sitemap.
- Robots.
- Schema.
- Canonicals.
- Open Graph.
- Eventos.
- Página de gracias.
- Tracking de formularios.

## Fase 10 — QA final

- Checklist completo.
- Lighthouse.
- Browser matrix.
- Mobile real.
- Navegación por teclado.
- Consola limpia.
- Enlaces.
- Formularios.
- 404.
- Reduced motion.
- Build de Netlify.

## Estrategia de commits

Ejemplos:

```text
chore: secure environment configuration
refactor: establish public site architecture
feat: build global navigation system
feat: redesign home operating experience
feat: add industry solution hub
feat: build gastronomy solution
feat: create interactive demos lab
feat: add diagnostic conversion flow
chore: complete seo and accessibility pass
```

Evitar un solo commit con todo el website.

