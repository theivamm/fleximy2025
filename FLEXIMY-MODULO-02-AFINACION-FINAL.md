# FLEXIMY — MÓDULO 02 / AFINACIÓN FINAL

## Naturaleza de esta tarea

Esta tarea **no es un nuevo rework conceptual**.

La estructura actual del módulo 02 es correcta y debe conservarse:

- encabezado centrado;
- título `Tu web vende. Tu aplicación organiza. Tu dashboard te muestra qué sigue.`;
- una única plataforma panorámica;
- tres sectores simultáneos: Website, App de gestión y Dashboard;
- frase de cierre debajo;
- ausencia de tabs, carruseles y dashboards intercambiables.

El objetivo es llevar la implementación actual de aproximadamente `7,5/10` a una terminación profesional.

No reconstruir el módulo con otra arquitectura. No recuperar ninguna versión anterior. No modificar el copy principal.

---

# 1. Diagnóstico actual

En la versión publicada se observan estos problemas:

1. El panel Website contiene una gran superficie vacía y un círculo difuminado que parece un placeholder.
2. El producto protagonista no existe o no se reconoce.
3. El contenido inferior de los tres paneles queda cortado por el marco.
4. La línea horizontal atraviesa textos, botones y contenido importante.
5. La App de gestión tiene información útil, pero su parte inferior queda truncada.
6. El Dashboard tiene poca profundidad visual y parece una primera versión.
7. Light mode tiene poco contraste y demasiados tonos lavados.
8. Dark mode funciona mejor, pero varios textos internos tienen contraste insuficiente.
9. La barra superior utiliza más altura de la necesaria.
10. La frase final queda demasiado cerca del escenario.
11. El marco parece tener una altura definida para la composición, no para el contenido real.

Estos defectos deben corregirse sin cambiar la idea del módulo.

---

# 2. Alcance estricto

Modificar solamente:

- el componente del módulo 02;
- sus subcomponentes visuales;
- sus estilos locales;
- los SVG o assets internos estrictamente necesarios;
- sus media queries;
- su soporte dark/light;
- su animación ambiental.

No modificar:

- header;
- hero;
- navegación;
- copy del hero;
- módulo de costos;
- proceso de trabajo;
- rubros;
- formulario;
- FAQ;
- footer;
- variables globales que puedan alterar otras secciones.

---

# 3. Copy que debe permanecer intacto

## Encabezado

`TODO EN UNA SOLA PLATAFORMA`

## Título

`Tu web vende. Tu aplicación organiza. Tu dashboard te muestra qué sigue.`

## Bajada

`Creamos las tres partes alrededor de tu negocio para que tus clientes, tu equipo y tu información trabajen en el mismo sistema.`

## Cierre

`Todo empieza en tu website. Todo continúa dentro de tu plataforma.`

No reescribir estos textos.

---

# 4. Ajuste general del escenario

## Desktop

El escenario debe conservar su ancho actual, pero aumentar su altura útil.

```css
.platform-journey {
  width: 100%;
  min-height: clamp(610px, 37vw, 680px);
  height: auto;
  border-radius: 28px;
  overflow: clip;
}
```

La altura debe provenir del contenido y de una altura mínima razonable. No fijar una altura menor que corte los paneles.

El contenido de los tres sectores debe terminar al menos `28px` antes del borde inferior.

No usar:

- `max-height` que recorte contenido;
- `height` rígida de aproximadamente 550px;
- `transform: scale()`;
- `overflow: hidden` para ocultar el final de las interfaces;
- degradados para disimular contenido cortado;
- posiciones negativas.

## Padding

```css
.platform-panel {
  padding: 30px 28px 32px;
  min-width: 0;
}
```

En anchos entre 1280 y 1440 px se puede reducir a `26px 24px 28px`, pero nunca comprimir tipografías o interfaces completas.

---

# 5. Barra superior

Reducir su altura y mejorar su integración.

## Dimensiones

- altura: `48px` en desktop;
- padding horizontal: `20px`;
- puntos decorativos: `8px`;
- texto principal: 10–11px;
- estado activo: 10px;
- borde inferior sutil.

Mantener:

- `FLEXIMY / PLATAFORMA DE NEGOCIO`;
- `SISTEMA ACTIVO`.

No agregar navegación, botones, tabs ni URL.

---

# 6. Rework visual del panel Website

## Problema

Actualmente existe un gran vacío central con un halo borroso. La mini landing no parece terminada.

## Solución obligatoria

Convertir la mini web de BRUMA en una composición editorial completa.

### Distribución interna

Usar una grilla de dos columnas dentro del hero de la mini web:

```css
grid-template-columns: minmax(0, 0.55fr) minmax(120px, 0.45fr);
align-items: center;
gap: 12px;
```

### Columna izquierda

Mantener:

- `Algo bueno está por pasar.`;
- descripción breve;
- CTA `Ver el menú`.

Corregir el texto visualmente pegado `cocinasimple` para que exista el espacio correspondiente.

### Columna derecha

Mostrar un producto gastronómico protagonista claramente reconocible:

- preferencia: croissant de pistacho;
- alternativa: roll de canela;
- usar un PNG transparente ya existente en el proyecto si está disponible;
- no usar una foto rectangular;
- el producto debe ocupar aproximadamente 72% del ancho de su columna;
- debe sobresalir visualmente sin salir del panel;
- aplicar una sombra realista suave;
- agregar una elipse o halo muy sutil detrás, nunca reemplazar el producto por el halo.

Ejemplo:

```css
.website-product {
  width: min(100%, 210px);
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 22px 28px rgba(16, 12, 30, 0.28));
}
```

Definir `width` y `height` reales del asset para evitar CLS.

### Precio

Ubicar `$4.200` junto al producto, no aislado en el extremo inferior del panel.

Puede aparecer dentro de una pequeña etiqueta asociada al producto:

- nombre `Croissant Pistacho`;
- precio `$4.200`;
- fondo con contraste;
- radio 10–12px;
- sin glassmorphism exagerado.

### Productos secundarios

Mantener solamente dos:

- `Iced Matcha · $3.500`;
- `Roll de Canela · $3.800`.

Sus cards deben verse completas y nunca cortadas por el borde inferior.

### Notificación

Mantener:

`Nueva consulta · Mesa para 4`

Debe ubicarse dentro del panel, cerca del borde derecho, pero sin superponerse con el producto ni con la línea de conexión.

---

# 7. Ajuste del panel App de gestión

## Jerarquía

El panel central debe continuar siendo el más importante.

Mantener:

- bandeja de tres contactos;
- reserva activa;
- cliente;
- horario;
- responsable;
- próximas acciones.

## Correcciones

- reducir ligeramente la altura de cada contacto;
- aumentar el contraste de nombres y estados;
- mostrar completas las dos próximas acciones;
- dejar `24px` como mínimo entre la última acción y el borde inferior;
- no cortar checkboxes ni textos;
- mantener el fondo del panel activo diferenciado;
- alinear columnas y metadatos;
- evitar que `Reserva activa`, `Mesa para 4` y la línea de conexión compitan en la misma altura.

## Alturas aproximadas

- cabecera de bandeja: 26–30px;
- cada contacto: 46–52px;
- reserva activa: 150–180px;
- próximas acciones: 90–110px.

Todo debe entrar sin scroll interno.

---

# 8. Rework del Dashboard

## Problema

Los tres KPIs y el gráfico actual son correctos conceptualmente, pero se perciben básicos y demasiado genéricos.

## Nueva composición

Conservar los mismos datos, pero mejorar la jerarquía.

### Fila superior

Tres KPIs:

1. `Ventas hoy` — `$184.500` — `+18%`;
2. `Reservas` — `12` — `+3`;
3. `Clientes nuevos` — `8` — `+12%`.

El KPI de Ventas debe ocupar mayor ancho:

```css
grid-template-columns: 1.25fr 0.85fr 0.9fr;
```

Cada KPI debe incluir:

- etiqueta superior;
- dato principal;
- variación acompañada por flecha;
- microbarra o sparkline discreto;
- contraste suficiente.

### Gráfico principal

Mejorar el gráfico SVG:

- incorporar siete puntos;
- línea con gradiente violeta → cyan;
- área inferior con degradado transparente;
- línea guía horizontal sutil;
- etiquetas inferiores mínimas: `L`, `M`, `X`, `J`, `V`, `S`, `D`;
- destacar el último punto;
- tooltip estático pequeño sobre el punto más alto: `$38.400`;
- evitar líneas demasiado finas;
- usar `vector-effect="non-scaling-stroke"` cuando corresponda.

### Insight

Convertir:

`Tu horario con más actividad es de 19 a 21 h.`

en un bloque de insight más editorial:

- ícono pequeño;
- etiqueta `INSIGHT`;
- texto en dos líneas como máximo;
- pequeño acento degradado lateral;
- no usar una cápsula larga y vacía.

### Alerta

Mostrar debajo:

`Stock bajo · Café Brasil` — `Revisar hoy`

Usar naranja controlado y un ícono. No utilizar rojo salvo error crítico.

El insight y la alerta deben verse completos dentro del panel.

---

# 9. Línea de conexión

## Problema

Actualmente atraviesa textos, CTA, reserva activa y gráfico.

## Solución

Reservar una franja específica para la conexión entre las cabeceras comerciales y las interfaces.

Ubicación recomendada:

- entre la descripción de cada sector y el comienzo de su interfaz;
- aproximadamente `112px` debajo del inicio de los paneles;
- nunca sobre contenido interactivo o informativo.

La línea debe:

- comenzar dentro de Website;
- atravesar App de gestión;
- terminar dentro de Dashboard;
- tener tres nodos alineados con el centro de cada sector;
- usar una opacidad base entre `0.22` y `0.34`;
- tener un pulso animado pequeño;
- quedar detrás de las cabeceras y delante del fondo;
- no atravesar el cuerpo de las interfaces.

Si no existe una franja libre suficiente, ubicarla inmediatamente por encima de las tres interfaces, no sobre ellas.

No mantener la línea actual en la mitad vertical del contenido.

---

# 10. Contraste y profundidad

## Dark mode

Mejorar:

- texto secundario: subir aproximadamente un 12–18% su luminosidad;
- bordes de inputs y cards: aumentar levemente la separación tonal;
- nombres de clientes y datos KPI: usar el color principal;
- captions y metadatos: nunca por debajo de contraste AA cuando sean información real;
- evitar que toda la interfaz tenga la misma tonalidad azul oscuro.

Crear tres niveles visuales:

1. fondo del escenario;
2. superficie de cada interfaz;
3. elementos activos y datos.

## Light mode

Corregir específicamente:

- fondo de las interfaces un poco más blanco que el escenario;
- bordes entre `rgba(40, 50, 90, 0.10)` y `0.16`;
- texto primario cercano a `#11162a`;
- texto secundario no más claro que `#626b82`;
- estados activos con tintes claros, no con opacidad general;
- sombras ligeramente más marcadas debajo de cada interfaz interna;
- evitar el aspecto de interfaz deshabilitada.

No aplicar `opacity` al panel completo ni a contenedores con texto.

---

# 11. Separación de la frase final

La frase de cierre debe tener mayor independencia visual.

```css
.module02-closing {
  margin-top: clamp(56px, 5vw, 76px);
  max-width: 820px;
  margin-inline: auto;
  padding-inline: 20px;
}
```

En desktop debe ocupar como máximo dos líneas.

No debe tocar la sombra del escenario ni quedar visualmente pegada al borde inferior.

Mantener la segunda oración con gradiente, pero aumentar el contraste en light mode.

---

# 12. Encabezado del módulo

El título actual funciona. No cambiar su tamaño de forma drástica.

Aplicar solamente estos controles:

- `max-width: 1120px`;
- centrado real;
- `text-wrap: balance`;
- line-height entre `0.98` y `1.03`;
- evitar una línea extremadamente corta;
- mantener dos o tres líneas en desktop;
- no superar 76px a 1440px;
- no reducir la bajada por debajo de 17px.

Mantener la separación actual entre encabezado y escenario si está entre 64 y 80px.

---

# 13. Responsive

## 1280–1599 px

- mantener tres columnas;
- escenario mínimo de 610px de alto;
- reducir paddings antes que contenidos;
- producto protagonista mínimo de 150px;
- gráfico legible;
- ningún elemento inferior recortado.

## 1024–1279 px

Usar dos filas:

```text
Website           App de gestión
Dashboard         Dashboard
```

- Website: 40%;
- App: 60%;
- Dashboard: 100% debajo;
- no comprimir las tres columnas horizontalmente;
- línea de conexión adaptada al recorrido;
- escenario con altura automática.

## 768–1023 px

- tres paneles apilados dentro del mismo marco;
- línea vertical en una franja libre;
- sin contenido cortado;
- interfaces simplificadas, no escaladas;
- separación interna mediante bordes, no gaps exteriores.

## Hasta 767 px

- escenario en una columna;
- barra superior simplificada;
- cada panel entre 330 y 410px de altura según su contenido;
- Website: un producto y un secundario;
- App: dos contactos, una reserva y una acción;
- Dashboard: dos KPIs, gráfico e insight;
- ocultar detalles secundarios antes de reducir la tipografía;
- línea vertical sin atravesar textos;
- cierre alineado a la izquierda;
- no usar carousel, tabs, swipe ni scroll interno;
- ancho máximo `calc(100% - 40px)`;
- ningún elemento puede exceder el viewport.

---

# 14. Animación

Mantener únicamente el pulso ambiental de la conexión.

- duración total: 8–10s;
- animar `transform`, `opacity` o `stroke-dashoffset`;
- no mover los paneles;
- no animar tamaños;
- no cambiar contenido;
- no usar JavaScript timers;
- no reaccionar al mouse;
- no introducir autoplay de vistas.

Con `prefers-reduced-motion`:

- detener el pulso;
- conservar la línea y nodos visibles;
- mantener la composición completa.

---

# 15. Reglas de código

- conservar la arquitectura de componentes actual cuando sea limpia;
- corregir componentes concretos, no volver a crear todo en un archivo monolítico;
- mantener estilos acotados al módulo;
- no modificar selectores globales;
- no usar `!important` salvo una incompatibilidad documentada;
- no usar alturas mágicas sin relación con el contenido;
- no usar positioning absoluto para organizar el layout principal;
- permitir `position: absolute` únicamente para halo, producto decorativo controlado, nodos o pulso;
- ningún absoluto puede definir la altura del contenedor;
- no instalar dependencias;
- no usar librerías de gráficos;
- no usar capturas rasterizadas del dashboard;
- no usar `overflow-x: hidden` en `html` o `body`;
- no duplicar el DOM para dark y light;
- eliminar reglas obsoletas reemplazadas por estos ajustes;
- ejecutar build y revisar consola.

---

# 16. Validación visual obligatoria

Validar:

- 1920 × 1080 dark;
- 1920 × 1080 light;
- 1440 × 900 dark;
- 1440 × 900 light;
- 1366 × 768 dark;
- 1366 × 768 light;
- 1280 × 800;
- 1024 × 768;
- 768 × 1024;
- 430 × 932;
- 390 × 844;
- 360 × 800.

Comprobar en cada resolución:

1. que el producto del Website sea claramente visible;
2. que no exista el círculo borroso como protagonista vacío;
3. que todos los contenidos inferiores terminen completos;
4. que la línea no atraviese información;
5. que la App muestre completas sus próximas acciones;
6. que Dashboard muestre KPIs, gráfico, insight y alerta;
7. que light mode no parezca deshabilitado;
8. que dark mode tenga suficiente contraste;
9. que la frase final no toque el escenario;
10. que no exista overflow horizontal;
11. que no exista scroll interno;
12. que el módulo no altere las secciones vecinas.

---

# 17. Criterios finales de aprobación

El módulo se considera terminado solamente si:

- conserva el concepto panorámico actual;
- Website, App y Dashboard se ven simultáneamente en desktop;
- existe un producto gastronómico reconocible;
- no queda ningún placeholder visual;
- no existe contenido recortado;
- la línea de conexión tiene una franja propia;
- las tres interfaces se ven terminadas;
- el Dashboard ya no parece un gráfico genérico aislado;
- dark y light funcionan con la misma calidad;
- tablet reorganiza el contenido sin miniaturizarlo;
- mobile simplifica sin perder el relato;
- no hay errores de consola;
- el build finaliza correctamente;
- no hay código muerto de la versión previa;
- no se modificó ningún otro módulo.

---

# 18. Instrucción final para OpenCode

Aplicar esta especificación como una etapa de afinación final sobre el módulo 02 actualmente publicado.

No cambiar el concepto, el título, la bajada, las tres columnas ni la frase de cierre. Resolver los problemas visuales y técnicos descritos mediante cambios reales en el layout y en las interfaces internas.

No considerar finalizada la tarea basándose solamente en que el build funciona. Inspeccionar visualmente todas las resoluciones solicitadas y corregir cualquier recorte, vacío, falta de contraste, desalineación u overflow antes de entregar.

Al finalizar, informar:

1. archivos modificados;
2. causa del recorte inferior;
3. solución aplicada a la altura;
4. asset utilizado en Website;
5. cambios realizados en Dashboard;
6. nueva ubicación de la línea;
7. ajustes de dark y light mode;
8. comportamiento en tablet y mobile;
9. resoluciones verificadas;
10. resultado del build y de la consola.
