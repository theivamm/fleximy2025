# Checklist de QA y entrega

## Validación automática

- [ ] `npm ci` funciona desde un clon limpio.
- [ ] `npm run build` finaliza sin errores.
- [ ] `npm run lint` finaliza sin errores nuevos.
- [ ] No hay secretos en el diff.
- [ ] No se versiona `.env`.
- [ ] Las variables están documentadas en `.env.example`.
- [ ] Netlify reconoce el directorio de publicación.

## Navegación

- [ ] Todas las rutas cargan desde navegación interna.
- [ ] Todas las rutas cargan al abrir su URL directamente.
- [ ] Header cambia de estado correctamente.
- [ ] Mega menú funciona con mouse y teclado.
- [ ] Menú mobile bloquea correctamente el fondo cuando corresponde.
- [ ] Escape cierra menús y modales.
- [ ] El foco vuelve al control que abrió un modal.
- [ ] Existe 404.
- [ ] No hay enlaces a rutas inexistentes.

## Responsive

- [ ] 320 px.
- [ ] 375 px.
- [ ] 430 px.
- [ ] 768 px.
- [ ] 1024 px.
- [ ] 1366 px.
- [ ] 1440 px.
- [ ] 1920 px.
- [ ] No hay scroll horizontal accidental.
- [ ] Los dashboards se entienden en mobile.
- [ ] Las tablas tienen alternativa mobile.
- [ ] Los CTAs mantienen 44 px mínimos.

## Visual

- [ ] No aparecen orbes, partículas o blobs genéricos.
- [ ] No hay abuso de glassmorphism.
- [ ] No hay imágenes de IA genéricas.
- [ ] Las interfaces simuladas mantienen datos coherentes.
- [ ] Los datos ficticios están identificados.
- [ ] La jerarquía tipográfica es consistente.
- [ ] El ritmo vertical no es monótono.
- [ ] Las páginas por industria tienen escenas diferentes.
- [ ] No se usan emojis como iconografía.
- [ ] Las fotografías poseen derechos y tratamiento consistente.

## Motion

- [ ] GSAP se limpia al desmontar componentes.
- [ ] ScrollTrigger se recalcula cuando cambia el layout.
- [ ] No existen listeners duplicados.
- [ ] No hay scroll hijacking.
- [ ] Las animaciones no provocan saltos de layout.
- [ ] `prefers-reduced-motion` funciona.
- [ ] La información es visible sin animaciones.
- [ ] Los efectos se pausan fuera del viewport.
- [ ] No hay loops permanentes innecesarios.

## Accesibilidad

- [ ] Un H1 por página.
- [ ] Jerarquía H2/H3 correcta.
- [ ] Landmark `header`, `nav`, `main`, `footer`.
- [ ] Links y botones utilizados semánticamente.
- [ ] Foco visible.
- [ ] Navegación completa por teclado.
- [ ] Contraste AA.
- [ ] Formularios con label.
- [ ] Errores asociados a campos.
- [ ] `aria-live` en confirmaciones necesarias.
- [ ] SVG decorativos ocultos.
- [ ] Imágenes con alt apropiado.

## Contenido

- [ ] No quedan teléfonos de ejemplo.
- [ ] No quedan emails de ejemplo.
- [ ] No quedan precios contradictorios.
- [ ] No quedan métricas no verificadas.
- [ ] Los `[DEFINIR]` son visibles solamente en entorno de revisión, no en producción.
- [ ] Casos ilustrativos identificados.
- [ ] Tono rioplatense consistente.
- [ ] CTA principal consistente.

## Formularios

- [ ] Validación cliente y servidor cuando corresponde.
- [ ] Consentimiento de privacidad.
- [ ] Anti-spam.
- [ ] Estado enviando.
- [ ] Estado exitoso.
- [ ] Estado error.
- [ ] No se duplica el envío.
- [ ] Redirección a Gracias.
- [ ] Medición única de conversión.

## SEO

- [ ] Title único.
- [ ] Description única.
- [ ] Canonical.
- [ ] Open Graph.
- [ ] Imagen social.
- [ ] Schema válido.
- [ ] Sitemap.
- [ ] Robots.
- [ ] 404 real.
- [ ] Enlaces internos.
- [ ] Noindex en Gracias.

## Rendimiento

- [ ] Lazy loading por rutas.
- [ ] Supabase no penaliza Home.
- [ ] Fuentes optimizadas.
- [ ] Imágenes responsive.
- [ ] SVG optimizados.
- [ ] Bundle revisado.
- [ ] LCP objetivo menor a 2,5 s.
- [ ] CLS menor a 0,1.
- [ ] INP menor a 200 ms.
- [ ] Sin errores en consola.

## Entrega

- [ ] Rama separada.
- [ ] Commits acotados.
- [ ] Pull Request con descripción.
- [ ] Preview de Netlify.
- [ ] Variables de entorno configuradas.
- [ ] Credenciales rotadas.
- [ ] Revisión del cliente.
- [ ] Aprobación antes de merge.
- [ ] Plan de rollback.

