# Prompt rector para OpenCode

## Instrucción para copiar y pegar

Quiero que trabajes sobre el repositorio público:

`https://github.com/theivamm/fleximy2025.git`

El objetivo es realizar un rework integral del website comercial de Fleximy sin afectar las rutas privadas del dashboard que ya existen.

## Antes de modificar código

1. Cloná o abrí el repositorio.
2. Leé completamente los archivos Markdown entregados.
3. Comenzá por `00-MAPA-Y-CRITERIOS.md` y los documentos técnicos `24` a `28`.
4. Revisá el archivo específico de la página antes de desarrollarla.
5. Inspeccioná todo `src`, `public`, `sql`, `package.json`, `vite.config.js`, `netlify.toml`, `.gitignore` e `index.html`.
6. No abras, muestres ni reutilices valores del `.env` versionado. Tratá ese archivo como credencial potencialmente comprometida.
7. Presentá un diagnóstico del estado real antes de proponer cambios.
8. Creá una rama nueva. No desarrolles sobre `main`.

Rama sugerida:

`rework/fleximy-website-v2`

## Qué es Fleximy

Fleximy es una plataforma digital para PyMEs que integra un sitio web profesional con un panel privado de gestión adaptado a la operación de cada empresa.

Posicionamiento:

**Sitios web que también operan el negocio.**

Mensaje principal:

**Tu web también puede operar tu negocio.**

La solución conecta dos lados:

- Experiencia pública: sitio, catálogo, reserva, consulta, compra o seguimiento.
- Operación privada: clientes, turnos, pedidos, proyectos, stock, propiedades, cursos u órdenes.

No presentar Fleximy como agencia que desarrolla cualquier sistema, como ERP corporativo ni como constructor de páginas genérico.

## Objetivo visual

Construir una web ejemplar, única, minimalista y potente. Debe sentirse diseñada por un estudio digital de primer nivel y no por una plantilla SaaS o una IA generativa.

Concepto rector:

**Minimalismo operativo.**

La identidad surge de:

- Retícula precisa.
- Espacios amplios.
- Tipografía expresiva.
- Interfaces creadas con HTML, CSS y SVG.
- Movimiento con propósito.
- Datos y flujos coherentes.
- Microinteracciones sobrias.
- Contrastes fuertes.
- Una paleta corta y reconocible.

## Prohibiciones visuales

No utilizar:

- Blobs 3D.
- Orbes flotantes.
- Fondos de partículas.
- Cerebros, robots o manos holográficas.
- Personas generadas por IA.
- Glassmorphism repetido.
- Gradientes decorativos sin función.
- Mockups de laptops comprados o genéricos.
- Emojis como iconografía.
- Cards idénticas para todas las secciones.
- Métricas o testimonios ficticios.
- Contadores automáticos sin evidencia.
- Texto con efecto máquina de escribir.
- Scroll hijacking.
- Movimiento continuo innecesario.
- Copias visuales de Linear, Notion, ClickUp u otro SaaS conocido.

## Pantallas y dashboards

Los dispositivos, dashboards, calendarios, catálogos, CRM y órdenes deben construirse con componentes React, HTML, CSS y SVG.

No usar capturas planas como recurso principal.

Las pantallas deben demostrar relaciones operativas reales:

- Una consulta del sitio aparece en el CRM.
- Un turno reservado bloquea un horario.
- Un pedido llega a cocina.
- Un cambio de precio actualiza el catálogo.
- Un lead queda asociado a una propiedad.
- Una inscripción aparece en el panel académico.
- Una orden cambia de diagnóstico a reparación.

Si se usan datos ficticios, indicar “Demo” o “Datos ilustrativos”.

## GSAP y movimiento

Utilizá GSAP y ScrollTrigger para:

- Revelados tipográficos por líneas o palabras.
- Secuencias de entrada de interfaces.
- Cambios de estado durante el scroll.
- Transiciones entre vista cliente y panel.
- Secciones sticky de duración limitada.
- Máscaras y clips.
- Movimiento de bajo costo con `transform` y `opacity`.

Reglas:

- La web debe funcionar sin GSAP.
- Respetar `prefers-reduced-motion`.
- No animar todo.
- Pausar efectos fuera de pantalla.
- No comprometer scroll, foco ni lectura.
- Mobile puede reemplazar escenas sticky por secuencias verticales.

## Arquitectura de trabajo

No desarrolles todas las páginas simultáneamente.

Orden:

1. Seguridad y limpieza.
2. Auditoría técnica.
3. Design tokens y componentes globales.
4. Header, mega menú, footer y layout.
5. Inicio completa.
6. QA visual y funcional de Inicio.
7. Soluciones y páginas por rubro.
8. Demos interactivas.
9. Cómo funciona, Precios, Nosotros y Contacto.
10. Confianza, recursos y legales.
11. SEO, accesibilidad, rendimiento y QA final.

Al cerrar cada fase:

- Ejecutá build.
- Ejecutá lint.
- Revisá desktop y mobile.
- Revisá consola.
- Informá archivos modificados.
- Informá pendientes y decisiones necesarias.
- Realizá un commit acotado.

## Reglas de contenido

- Los textos de los archivos Markdown son la base editorial autorizada.
- No inventar precio, plazo, clientes, equipo, testimonios, SLA, certificaciones o datos legales.
- Mantener marcadores `[DEFINIR]` y `[VALIDAR]` cuando falte información.
- Español rioplatense consistente.
- CTA principal: “Solicitar diagnóstico”.
- CTA secundario: “Probar una demo”.
- No mantener el selector ES/EN hasta tener traducción completa de todas las páginas.

## Reglas técnicas

- Conservar React, Vite, React Router, Tailwind, GSAP, Framer Motion, Supabase y Netlify salvo justificación concreta.
- Mantener dashboard y autenticación aislados del website público.
- Aplicar lazy loading por rutas.
- No cargar Supabase en la experiencia pública si puede evitarse.
- Evitar dependencias nuevas para resolver elementos posibles con CSS o SVG.
- Crear componentes reutilizables sin producir un sistema visual monótono.
- Mantener HTML semántico.
- Navegación completa por teclado.
- Contraste WCAG AA.
- Áreas táctiles mínimas de 44 px.
- Optimizar fuentes, SVG, imágenes y JavaScript.
- El 404 debe devolver estado correcto en el entorno que lo permita.

## Primera tarea

Comenzá únicamente con:

1. Auditoría completa del repositorio.
2. Corrección segura del `.env` versionado.
3. Propuesta de sistema visual y tokens.
4. Implementación del header, footer y página Inicio.
5. Dashboards CSS de la Home.
6. GSAP con reduced motion.
7. Build, lint y QA responsive.

Antes de extender el sistema a las demás páginas, presentá la Home terminada para validación.

