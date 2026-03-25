# M004 — Research

**Date:** 2026-03-19

## Summary

M004 covers 1860–1900 "a grandes rasgos" (D003): three foundational presidencies (Mitre/Sarmiento/Avellaneda 1862–1880), Guerra de la Triple Alianza (1865–1870), Conquista del Desierto (1878–1885), federalización de Buenos Aires y primera presidencia de Roca (1880), Generación del 80 / inmigración masiva, Crisis 1890 / Revolución del Parque / nacimiento UCR, y el cierre del arco narrativo de Alberdi (diputado 1879–1881, muerte julio 1884, legado). El plan de 7 events del CONTEXT cubre exactamente estos 7 clusters.

El codebase está listo: `#periodo-nacional` existe como placeholder con 3 stubs, header y period-intro. Los templates de cards (hecho/opinión/rumor), el sistema de certeza, reveal animations e image fallback están completamente operativos — zero modificación CSS/JS para la integración base. El esfuerzo principal es contenido (S01–S02) y luego integración HTML (S04). S03 multimedia es viable: este período tuvo fotografía real — Antonio Pozzo documentó la Conquista del Desierto (1879), existen retratos fotográficos de Mitre, Sarmiento, Roca y Alberdi en Wikimedia Commons.

La diferencia estructural respecto a M003 es intencional (D003): M004 es **panorámico**, sin sub-nav, sin sub-períodos, sin expand/collapse masivo. El layout simple es correcto. Una timeline animada 1860–1900 (siguiendo el patrón de `revolucion-timeline`) es el elemento multimedia más robusto para S03.

## Recommendation

**3 slices funcionales:**

- **S01**: Research, content draft y verificación histórica (7 eventos, certeza classification, Alberdi quotes)
- **S02**: Wikimedia image sourcing (7 cards con fotografías reales de época)
- **S03+S04**: HTML integration (reemplazar stubs) + timeline animada 1860–1900 + animación de datos opcional

Riesgo mayor: precisión histórica en S01. Images: riesgo medio (fotografía real existe). HTML integration: riesgo bajo (templates establecidos).

**El cierre de Alberdi es el ítem más sensible.** Hay conflicto de fechas en fuentes:
- Retorno a Argentina: mayoría dice **1879** (hacer.org, cadep.ufm.edu, ensayistas.org) — usar 1879
- Muerte: **July 19, 1884** (ensayistas.org, Losada) vs June 19 (AbeBooks/planetadelibros) — usar July 19, flagear [VERIFICACIÓN PENDIENTE]
- Lugar: **Neuilly-sur-Seine** (Francia) — confirmado por múltiples fuentes

## Implementation Landscape

### Key Files

- `index.html` líneas 964–1000 — `#periodo-nacional` con 3 stubs en `.events-grid` (SIN `events-grid--certeza`, SIN imágenes, SIN `data-certeza`). Target principal de S04.
- `styles.css` — Cards templates (líneas 773–1160), `.period--nacional .event-card` (línea 488), `.alberdi-quote`, sistema reveal. No se necesitan clases nuevas para cards base.
- `app.js` línea 421 — `initImageFallbacks()` auto-descubre `.card-image img` en DOMContentLoaded. Sin cambios para imágenes nuevas.
- `initSubNav()` (línea 327) — hardcoded a `#periodo-revolucion`. **No tocar.** M004 no usa sub-nav.

### Content Plan: 7 Event Cards

| # | Año | Evento | Certeza | Ángulo Alberdi |
|---|-----|--------|---------|----------------|
| 1 | 1862–1880 | Presidencias históricas (Mitre, Sarmiento, Avellaneda) | hecho | Alberdi como crítico desde París — enemigo ideológico de ambos |
| 2 | 1865–1870 | Guerra de la Triple Alianza | hecho | *El crimen de la guerra* (ca. 1870) — quote disponible y verificable |
| 3 | 1878–1885 | Conquista del Desierto | hecho (+ nota historiográfica) | Alberdi regresa 1879 como diputado — narrativa paralela |
| 4 | 1880 | Federalización de Buenos Aires / 1ª presidencia de Roca | hecho | Ambivalencia alberdiana: diseñó el proyecto, desconfió de la ejecución |
| 5 | 1880–1900 | Generación del 80 / inmigración / modelo agroexportador | hecho | Prescripciones de *Bases* parcialmente realizadas |
| 6 | 1890 | Crisis del 90 / Revolución del Parque / nacimiento UCR | hecho | Alberdi muerto desde 1884 — el liberalismo continúa sin él |
| 7 | 1884 | Últimos años: retorno, diputado, muerte, legado | opinión/hecho | Cierre del arco narrativo central |

Distribución certeza estimada: 5–6 hecho, 1–2 opinión, 0–1 rumor. Proporción correcta para período panorámico.

### Hechos Verificados Clave

**Presidencias históricas (1862–1880):**
- Mitre 1862–1868; Sarmiento 1868–1874; Avellaneda 1874–1880
- Logros: ejército nacional institucionalizado, Código Civil (Vélez Sarsfield), sistema educativo, Colegio Militar (1869), Escuela Naval (1872), expansión ferroviaria, primer barco frigorífico *Le Frigorifique* (1876)
- Alberdi: revocado de funciones diplomáticas tras Pavón (1861), residió en París como abogado, escribió polémicas contra Mitre y Sarmiento

**Guerra de la Triple Alianza (1864/65–1870):**
- Inicio: diciembre 1864 (Paraguay vs. Brasil en Mato Grosso)
- Argentina entró mayo 1865 (Paraguay ocupó Corrientes)
- Tratado de la Triple Alianza: 1 de mayo de 1865 (Buenos Aires)
- Fin: 1 de marzo de 1870, Cerro Corá (muerte de Solano López)
- Paraguay: pérdida demográfica 60–69% (de ~525.000 a ~221.000 hacia 1871)
- *El crimen de la guerra*: escrito ca. 1870, para concurso Liga Internacional y Permanente por la Paz; nunca presentado; publicado póstumamente en *Escritos Póstumos* (1895) — **distinguir "escrito" (1870) de "publicado" (1895)**
- Quote verificable de *El crimen de la guerra*: «el derecho de la guerra, es… el derecho del homicidio, del robo, del incendio, de la devastación en la más grande escala posible» — citado en CADEP 2022 y scielo.org.ar

**Conquista del Desierto (1878–1885):**
- Iniciada 1878 bajo Avellaneda; Roca como Ministro de Guerra
- Abril–mayo 1879: 6.000 soldados en 5 columnas; alcanzaron Río Negro
- Cifras: 1.313 nativos muertos; 10.500+ capturados (Memoria Departamento de Guerra y Marina 1879)
- Fotógrafo oficial: **Antonio Pozzo** — fotos auténticas 1879 disponibles en Wikimedia Commons
- Quote Roca (múltiples fuentes): «Tenemos seis mil soldados armados con los últimos inventos modernos de la guerra, para oponerlos a dos mil indios que no tienen otra defensa que la dispersión ni otras armas que la lanza primitiva»
- Clasificar como **hecho** con nota historiográfica explícita sobre el debate genocidio vs. construcción del Estado

**Federalización / Roca (1880):**
- 20 de septiembre 1880: Congreso sancionó Ley 1029 de capitalización
- Roca asumió 12 de octubre de 1880, lema «Paz y Administración»
- Fundación de La Plata (1882) como nueva capital provincial
- Ley 1420 (1884): educación laica, gratuita, obligatoria

**Generación del 80 / Inmigración:**
- Ley Avellaneda (Ley 817, 1876): ley de inmigración y colonización
- Censo 1869: 1.830.214 habitantes; para 1914 un tercio de la población era extranjera
- Buenos Aires creció de ~180.000 (1869) a ~670.000 (1895)
- Modelo agroexportador: carne + trigo + lana; ferrocarriles como columna vertebral

**Crisis 1890 / Revolución del Parque / UCR:**
- Junio 1890: cesación de pagos de deuda con Baring Brothers
- 26 de julio 1890: Revolución del Parque — Unión Cívica (Alem, Mitre, Del Valle, H. Yrigoyen)
- Derrotada militarmente; Juárez Celman renunció 6 agosto 1890; asumió Pellegrini
- 1891: Unión Cívica se fracturó → UCR (Alem) + Unión Cívica Nacional (Mitre)
- Hipólito Yrigoyen (sobrino de Alem) fue figura central de la UCR en formación

**Alberdi final años (1879–1884):**
- 1879: regresó a Argentina, elegido diputado por Tucumán
- Elegido vicepresidente de la Cámara (hacer.org)
- Reconcilió con Sarmiento (que era Ministro del Interior)
- 1879–1881: en Buenos Aires como diputado; presenció inicio de presidencia de Roca
- Regresó a Francia; murió en Neuilly-sur-Seine el **19 de julio de 1884** [VERIFICACIÓN PENDIENTE sobre día exacto]
- Legado: padre intelectual de la Constitución 1853, *El crimen de la guerra* como tratado proto-iusinternacionalista

### Build Order

1. **S01** (mayor riesgo): escribir `S01-CONTENT-DRAFT.md` con los 7 eventos — títulos, años, certeza, excerpt 2–4 oraciones, fuentes (≥2 para hechos), citas directas con atribución completa. No tocar HTML hasta que el draft esté verificado.
2. **S02** (riesgo medio): búsqueda Wikimedia API para imágenes de los 7 cards. Pozzo photos para Conquista del Desierto son el activo más fuerte.
3. **S03+S04** (riesgo bajo): reemplazar 3 stubs por 7 cards reales; agregar `events-grid--certeza`; stagger delays (0ms, 80ms, 160ms...); timeline animada 1860–1900; animación de datos opcional (gráfico de inmigración con barras CSS).

### Verification Approach

- Después de S01: contar 7 eventos en draft, verificar distribución certeza, confirmar todas las fechas de Alberdi
- Después de S04: abrir en browser, verificar cards, badges de certeza, reveal animations, carga de imágenes
- Verificar que `events-grid--certeza` esté en el grid container (placeholder actual lo omite)
- Verificar cierre narrativo de Alberdi como última card o elemento del período
- Mobile verification a 375px

## Common Pitfalls

- **`events-grid--certeza` faltante** — los 3 stubs están en `.events-grid` sin este modifier. Debe agregarse al reemplazar los stubs o el sizing certeza-aware no funciona.
- **Fecha publicación *El crimen de la guerra*** — escrito ca. 1870, publicado 1895 (*Escritos Póstumos*). NO decir "publicado en 1870".
- **Conflicto fecha de muerte de Alberdi** — usar July 19 con nota [VERIFICACIÓN PENDIENTE]; no usar June 19 sin verificar.
- **Fecha de retorno a Argentina** — usar 1879 (consenso de fuentes académicas). AbeBooks dice "1878" — outlier.
- **Conquista del Desierto: sensibilidad historiográfica** — usar nota de certeza explícita reconociendo el debate (patrón establecido en M003 para SP2-4). No editorializar.
- **No agregar sub-nav a M004** — `initSubNav()` está hardcoded a `#periodo-revolucion`. M004 no necesita sub-nav ni sub-periods por diseño (D003).
- **Bash heredoc** — per KNOWLEDGE.md: escribir bloques de contenido grandes con el tool `Write`, nunca con heredocs de bash.
- **Quote Alberdi sobre Paraguay** — la cita temática larga sobre "civilización" en Paraguay (de *elhistoriador.com.ar*) requiere cotejo con fuente primaria antes de HTML. La cita definitoria de apertura de *El crimen de la guerra* es segura (múltiples fuentes académicas concuerdan).

## Open Risks

- **Fecha exacta de muerte de Alberdi** (June 19 vs July 19, 1884) — requiere verificación contra obituario o *Obras Completas* t. VIII.
- **Imágenes para Crisis 1890** — Revolución del Parque puede tener menos opciones fotográficas que Conquista del Desierto. Retratos de Alem o Juárez Celman deben existir en Wikimedia.
- **Timeline 1860–1900 marker density** — 40 años, 6–7 eventos clave, spacing holgado. Alternating labels (D025) probablemente NO necesario (eventos más espaciados que 1800–1860). Confirmar en implementación.
- **Animación de datos immigration** — si se implementa, usar CSS puro (barras `@keyframes`) activadas por reveal system. Evitar canvas/SVG por complejidad.

## Image Candidates (Wikimedia Commons)

| Card | Candidato | Notas |
|------|-----------|-------|
| Presidencias históricas | `Sarmiento_1868.jpg` o `Bartolome_Mitre.jpg` | PD-old |
| Guerra del Paraguay | Fotos de la campaña (muchas en Wikimedia) | PD |
| Conquista del Desierto | Fotos Antonio Pozzo 1879 | PD, históricamente significativas |
| Federalización / Roca | `Julio_Argentino_Roca.jpg` retrato | PD-old |
| Generación del 80 | Foto Buenos Aires 1880s o llegada inmigrantes | PD |
| Crisis 1890 | Retrato Leandro Alem o foto Parque Artillería | PD-old |
| Alberdi legado | Retrato Alberdi (ya usado en M003 — aceptable para cierre) | Mismo archivo Wikimedia |

Usar Wikimedia API (`/w/api.php?action=query&titles=File:NOMBRE&prop=imageinfo&iiprop=url&iiurlwidth=500`) para obtener URLs de thumbnails verificadas. Pozzo expedition photos son el activo visual más fuerte de este período.

## Sources

- Presidencias históricas: Wikipedia es, argentina.gob.ar, aacademica.org
- Guerra Triple Alianza: Wikipedia es, elhistoriador.com.ar, museodelacuerdo.cultura.gob.ar
- Alberdi / *El crimen de la guerra*: hacer.org, cadep.ufm.edu, scielo.org.ar, cancilleria.gob.ar, ensayistas.org, editorial Losada
- Conquista del Desierto: Wikipedia es/en, elhistoriador.com.ar, casarosada.gob.ar
- Revolución del Parque: Wikipedia es, ucr.org.ar, elhistoriador.com.ar
- Inmigración: scielo.org.mx (análisis censos INDEC)
