# S03: Integración HTML — Research

**Milestone:** M011
**Slice:** S03 — Integración HTML (depends on S01, S02)
**Date:** 2026-03-24

---

## Summary

S03 es una integración HTML mecánica: los content drafts de S01 y S02 están listos, verificados, y cada card tiene instrucciones explícitas de inserción. No hay investigación nueva ni decisiones de certeza. El trabajo es leer los drafts, construir los HTML blocks, y splicearlos en `index.html` en los puntos correctos.

**Hay 9 cards para integrar** (5 de S01 + 4 de S02), en dos secciones del DOM: `#rev-alberdi-formacion` (en `#periodo-revolucion`) y `#periodo-rosas`. Todas las cards siguen templates establecidos. Ninguna requiere CSS nuevo ni cambios a `app.js`. El reveal-on-scroll funciona automáticamente para `reveal reveal-slide` elements.

La única decisión de S03 no resuelta por los drafts: si M011-ENC-2 (nota historiográfica) va como `<p class="card-nota-historiografica">` dentro del article de M011-ENC-1, o como article propio. La recomendación de S01 es integrarla como nota interna (reduce proliferación). Esta investigación confirma esa decisión: S23-2 y S24-2 ya cubren el debate de agencia de Encarnación — una tercera card independiente sería redundante. ENC-2 va como `<p class="card-nota-historiografica">` dentro de ENC-1.

También: M011-ROM-2 (certeza `rumor`, Ana María Medeiros sin fuente) debe integrarse condicionalmente. La recomendación es integrarla con span `card-nota-certeza` completo dado que el draft ya documenta el vacío y el sistema de certeza del sitio maneja rumores con transparencia. No hay razón para omitirla del HTML público.

---

## Recommendation

**Approach:** Splices quirúrgicos en `index.html` usando el patrón `Write temp block → Edit`. 9 cards en 6 puntos de inserción. Dividir en dos tareas: T01 (6 cards en `#rev-alberdi-formacion`), T02 (3 cards en `#periodo-rosas` vía append marker + verificación final T03).

No usar heredoc bash. Usar la herramienta `Write` para escribir el bloque HTML en un archivo temporal, luego `Edit` para splicear. D053 confirma que HTML entities son más seguras para non-ASCII en el entorno Windows.

---

## Implementation Landscape

### Key Files

- `index.html` — único archivo que cambia. 2808 líneas actualmente. 9 cards añadirán ~250-350 líneas.
- `.gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` — especificación completa de 5 cards (M011-ENC-1, M011-ENC-2, M011-RED37-1, M011-MARIQ-1, M011-RED37-2)
- `.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md` — especificación completa de 4 cards (M011-CANE-1, M011-CANE-2, M011-ROM-1, M011-ROM-2)
- `styles.css` — NO tocar
- `app.js` — NO tocar

### Insertion Points Mapeados

#### Grupo A — `#rev-alberdi-formacion`, Grid 1 ("Formación temprana de Alberdi 1810–1838", líneas 348–630)

BIOG-1 a BIOG-11 van en este grid, con stagger en secuencia: BIOG-1(0ms), BIOG-2(80), BIOG-3(160), BIOG-4(240), BIOG-5(320), BIOG-6(400), BIOG-7(480), BIOG-8(560), BIOG-9(640), BIOG-10(720), BIOG-11(800ms).

**Inserción A1: M011-CANE-1** — DESPUÉS de BIOG-5 (`<!-- BIOG-6: El abandono del internado -->` es el anchor), línea ~467. Card hecho, stagger continúa desde 0ms (patrón de reset confirmado en S23/S24 que usan 0ms/80ms independientemente de las cards vecinas). Las tarjetas vecinas mantienen sus delays sin editar — solo se agrega la nueva.

**Inserción A2: M011-CANE-2** — DESPUÉS de M011-CANE-1 (nueva, creada en A1). Stagger 80ms.

**Inserción A3: M011-MARIQ-1** — DESPUÉS de BIOG-7 (`<!-- BIOG-8: El regreso al estudio -->` es el anchor), línea ~519. Card hecho, stagger 0ms (nuevo grupo).

**Inserción A4: M011-RED37-1** — ANTES del cierre del Grid 1 (`</div>` en línea 630, después de BIOG-11), stagger 0ms. El anchor más fiable: cierre del article de BIOG-11 → `</article>\n\n\n\n          </div>`.

**Inserción A5: M011-RED37-2** — DESPUÉS de M011-RED37-1. Stagger 80ms.

#### Grupo B — `#rev-alberdi-formacion`, Grid 2 ("Las múltiples dimensiones de Alberdi", líneas 635–715)

Grid 2 tiene BIOG-12(80ms) a BIOG-16(400ms).

**Inserción B1: M011-ROM-1** — DESPUÉS de BIOG-16, antes del cierre `</div><!-- /.events-grid multifacético -->` (línea ~715). Anchor: `</article>\n\n          </div><!-- /.events-grid multifacético -->`. Stagger 480ms (continúa desde BIOG-16 a 400ms).

**Inserción B2: M011-ROM-2** — DESPUÉS de M011-ROM-1. Stagger 560ms.

#### Grupo C — `#periodo-rosas` events-grid

**Inserción C1: M011-ENC-1 (con ENC-2 como nota interna)** — DESPUÉS del marker `<!-- S10–S24 cards will be appended here by subsequent slices -->` (línea 2098), siguiendo el patrón de append. Stagger 0ms. ENC-2 se integra como `<p class="card-nota-historiografica">` dentro del article de ENC-1 después del excerpt.

### Templates Confirmados

**card-hecho** — ver BIOG-5 (línea 443):
```html
<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" data-id="M011-XXX" style="--reveal-delay: Nms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">✓</span>
    <span class="card-certeza-label">Hecho documentado</span>
  </div>
  <span class="event-card__year">...</span>
  <h3 class="event-card__title">...</h3>
  <p class="event-card__excerpt">... <span class="card-nota-certeza">[Nota: ...]</span> ...</p>
  <footer class="card-source">
    <span class="card-source__icon" aria-hidden="true">📄</span>
    <cite>...</cite>
  </footer>
</article>
```

**card-opinion (certeza=debatido)** — ver S14-3 (línea 1753):
```html
<article class="event-card card-opinion reveal reveal-slide" data-certeza="debatido" data-id="M011-XXX" style="--reveal-delay: Nms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">⚖</span>
    <span class="card-certeza-label">Debatido historiográficamente</span>
  </div>
  <span class="event-card__year">...</span>
  <h3 class="event-card__title">...</h3>
  <p class="event-card__excerpt">...</p>
  <p class="card-nota-historiografica"><strong>Nota historiográfica:</strong> ...</p>
  <footer class="card-source">
    <span class="card-source__icon" aria-hidden="true">📄</span>
    <cite>...</cite>
  </footer>
</article>
```

**card-rumor** — ver BIOG-24 (línea 1147). Nota: usa estructura distinta con `event-card__body`, `event-card__header`, `event-card__content`, `card-rumor__origin`, y `card-certeza-badge-rumor` (no `card-certeza-label`):
```html
<article class="event-card card-rumor reveal reveal-slide" data-certeza="rumor" data-id="M011-XXX" style="--reveal-delay: Nms">
  <div class="card-certeza-indicator">
    <span class="card-certeza-icon" aria-hidden="true">⚠️</span>
    <span class="card-certeza-badge-rumor">Rumor</span>
  </div>
  <div class="event-card__body">
    <header class="event-card__header">
      <span class="event-card__year">...</span>
      <h4 class="event-card__title">...</h4>
    </header>
    <div class="event-card__content">
      <p class="event-card__excerpt card-rumor__text">...</p>
      <p class="event-card__excerpt card-rumor__text"><span class="card-nota-certeza">...</span></p>
    </div>
    <footer class="card-rumor__origin">
      <span class="card-rumor__origin-icon" aria-hidden="true">🔍</span>
      <p class="card-rumor__origin-text"><strong>Laguna documental:</strong> ...</p>
    </footer>
  </div>
</article>
```

Alternativamente el card-rumor colonial (línea 243) usa una estructura más simple sin `event-card__body`. Usar el BIOG-24 patrón (más semánticamente elaborado, confirmado en M007).

### Build Order

**T01** — `#rev-alberdi-formacion` grid 1 y grid 2 (7 cards: CANE-1, CANE-2, MARIQ-1, RED37-1, RED37-2, ROM-1, ROM-2). Trabajo de mayor volumen pero sin dependencias — todos los puntos de inserción son independientes entre sí. El orden de splice debe ser de mayor línea a menor para evitar que inserciones previas desplacen anchors de inserciones posteriores.

**Orden recomendado (bottom-up):**
1. ROM-2 y ROM-1 (después de BIOG-16, grid 2 — línea ~714)
2. RED37-2 y RED37-1 (antes del cierre de grid 1 — línea ~628)
3. MARIQ-1 (después de BIOG-7 — línea ~518)
4. CANE-2 y CANE-1 (después de BIOG-5 — línea ~466)

**T02** — `#periodo-rosas` append (ENC-1 con ENC-2 inline). Inserción en marker line ~2098 (línea exacta puede desplazarse si T01 añade ~250 líneas, recalcular con grep antes de insertar).

**T03** — Verificación final: counts, DOM inspection, sin CSS/JS nuevos.

### Verification Approach

```bash
# Baseline actual: 93 data-certeza, 98 reveal-slide
grep -c 'data-certeza' index.html     # → debe ser 93 + 9 = 102 después de integración completa
grep -c 'reveal reveal-slide' index.html  # → debe ser 98 + 9 = 107

# Cards por sección
grep -c 'data-id="M011-' index.html   # → debe ser 9 (o 8 si ENC-2 es nota inline, no article)

# Certeza breakdown
grep -c 'data-certeza="hecho"' index.html   # baseline + 3 nuevas (CANE-1, MARIQ-1, ROM-1) ← ajustar según baseline
grep -c 'data-certeza="rumor"' index.html   # baseline + 1 (ROM-2)
grep -c 'data-certeza="debatido"' index.html  # baseline + 1 (ENC-1)
grep -c 'data-certeza="debatido".*M011-RED37\|data-certeza="hecho".*M011-RED37' index.html  # 2 (RED37-1, RED37-2)

# No CSS/JS nuevos
git diff --name-only HEAD -- styles.css app.js  # → vacío

# Spans de certeza diferenciada preservados
grep -c 'card-nota-certeza' index.html  # debe incrementar en ≥2 (MARIQ-1 Himno, CANE-2 cielo, ROM-2 Medeiros)

# Marcador de append post-integración
grep -n 'S10.*S24 cards will be appended' index.html  # aún debe existir (no eliminado)
```

---

## Constraints

- Sin CSS ni JS nuevos — hard constraint (M011-ROADMAP, D001)
- No modificar `styles.css` ni `app.js`
- Certeza `debatido` usa clase `card-opinion` CSS (D052) — no existe `card-debatido`
- Certeza `opinión` (con acento, D057) vs `opinion` (sin acento, pre-M008): las cards nuevas pueden usar el valor sin acento para evitar entidades HTML en el atributo; el selector CSS maneja ambos (D047/KNOWLEDGE.md)
- M011-ENC-1 usa `data-certeza="debatido"` (no "opinión" ni "hecho")
- M011-CANE-2 usa `data-certeza="debatido"` y clase `card-opinion`
- El quote de Alberdi sobre Mariquita ("la personalidad más importante...") debe atribuirse claramente como "atribuido en historiografía secundaria" — NO como cita directa verificada (KNOWLEDGE.md Quote Verification Protocol)
- Vicente Fidel López (el hijo, 1815–1903) debe identificarse en M011-CANE-2 — no confundir con su padre Vicente López y Planes (D065)
- Stagger delays: new card groups pueden reiniciar desde 0ms/80ms sin editar delays de cards existentes (patrón establecido en S23/S24)
- HTML entities para caracteres no-ASCII en bloques de texto que se escriben como temp files antes de splicing (D053)

## Common Pitfalls

- **Anchors de línea desplazados** — si T01 inserta ~250 líneas en la primera mitad del archivo, los números de línea del `#periodo-rosas` (grupo C) habrán aumentado ~250. Usar `grep -n` para relocalizar el marker antes de T02, no confiar en número de línea hardcodeado.

- **Cierre incorrecto de grid 1 como anchor** — el cierre del grid 1 de `#rev-alberdi-formacion` (línea ~630) no tiene comentario explícito. El anchor más fiable es el texto único: el cierre del BIOG-11 article seguido de 3 líneas en blanco y `          </div>`. Usar el texto del `<cite>` de BIOG-11 como parte del anchor oldText para asegurar unicidad.

- **ENC-2 como card independiente crearía redundancia** — S23-2 ya contiene "¿Cuánto poder propio tenía Encarnación?" con nota historiográfica de dos posiciones. S24-2 contiene "¿Era Encarnación una figura autónoma?" con nota adicional. ENC-2 como article propio se solaparía con ambas. Integrar como `<p class="card-nota-historiografica">` dentro de ENC-1.

- **card-rumor template diferente** — el patrón de card-rumor tiene dos variantes en el codebase: la del período colonial (más simple, sin `event-card__body`) y la de BIOG-24 (con header/content/body wrappers). Para consistencia con la sección biográfica donde ROM-2 se inserta, usar el patrón de BIOG-24.

- **span card-nota-certeza ya escrito en drafts** — los drafts incluyen el HTML del span verbatim. Copiar directamente sin reescribir.

- **grid 1 no tiene comentario de cierre** — a diferencia de grid 2 (`</div><!-- /.events-grid multifacético -->`), el grid 1 cierra con `</div>` sin comentario. No confundir con el cierre de `#rev-alberdi-formacion`. Contar niveles de indentación al construir el anchor.

---

## Decision: ENC-2 Integration Mode

**Integrar ENC-2 como `<p class="card-nota-historiografica">` dentro del article de ENC-1.** Rationale:
- S23-2 y S24-2 ya cubren el debate de agencia con dos notas historiográficas independientes
- ENC-2 como article propio sería la tercera card de debate sobre el mismo tema en una ventana de ~4 cards consecutivas
- El patrón de nota interna preserva el dato sin proliferación visual
- El contenido de ENC-2 (las tres posiciones: revisionista, Lynch, registro documental irresoluble) se comprime naturalmente en un párrafo de `card-nota-historiografica` de ~60–80 palabras

## Decision: ROM-2 Integration

**Integrar M011-ROM-2 con el span `card-nota-certeza` completo.** El sistema de certeza del sitio maneja explícitamente los rumores como categoría epistemológica válida (R013). La card documenta la ausencia de fuente — eso tiene valor informativo para el lector. Omitirla significaría que el sitio no aborda la vida sentimental de Alberdi en absoluto, lo que es un silencio editorial mayor. La card incluye la ruta de verificación (Mayer 1963, índice onomástico) como parte del `card-nota-certeza`.

---

## Authoritative Diagnostics Pre-Integration

```bash
grep -c 'data-certeza' index.html        # → 93 (baseline S03)
grep -c 'reveal reveal-slide' index.html  # → 98 (baseline S03)
grep -c 'data-id="M011-' index.html      # → 0 (ninguna M011 card integrada aún)
grep -n 'S10.*S24 cards will be appended' index.html  # → línea actual del marker en #periodo-rosas
grep -n '<!-- BIOG-5:' index.html        # → línea actual del anchor BIOG-5
grep -n '<!-- BIOG-7:' index.html        # → línea actual del anchor BIOG-7  
grep -n '<!-- BIOG-11:' index.html       # → línea actual del anchor BIOG-11
grep -n '\.events-grid multifac' index.html  # → línea del cierre grid multifacético
```

Post-integración completa (9 cards, ENC-2 como nota inline):
```bash
grep -c 'data-certeza' index.html        # → 102 (+9)
grep -c 'reveal reveal-slide' index.html  # → 107 (+9)
grep -c 'data-id="M011-' index.html      # → 8 (ENC-1, RED37-1, RED37-2, MARIQ-1, CANE-1, CANE-2, ROM-1, ROM-2)
git diff --name-only HEAD -- styles.css app.js  # → vacío
```
