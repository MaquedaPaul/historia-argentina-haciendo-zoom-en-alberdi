---
estimated_steps: 5
estimated_files: 1
---

# T02: Integrar ROM-1, ROM-2 en grid 2 y ENC-1+ENC-2 en #periodo-rosas

**Slice:** S03 — Integración HTML
**Milestone:** M011

## Description

Tres cards restantes en dos contenedores diferentes. Primero ROM-1 y ROM-2 en el grid 2 ("Las múltiples dimensiones de Alberdi"), después de BIOG-16. Luego ENC-1 (con ENC-2 como nota inline) en `#periodo-rosas` usando el marker de append. Los números de línea del marker habrán aumentado ~150 después de T01 — **siempre relocalizar con `grep -n` antes de insertar, nunca usar número de línea hardcodeado**.

ROM-2 usa el template card-rumor de la sección biográfica (BIOG-24 style, con `event-card__body` / `event-card__header` / `event-card__content` / `card-rumor__origin`) — no el template colonial simple (Ciudad de los Césares). ENC-2 se integra como `<p class="card-nota-historiografica">` dentro del article de ENC-1, no como article separado.

## Steps

1. **Relocalizar anchors post-T01** (los números de línea habrán aumentado):
   ```bash
   grep -n 'events-grid multifac' index.html        # cierre del grid 2; BIOG-16 está justo antes
   grep -n 'BIOG-16' index.html                     # confirmar posición
   grep -n 'S10.*S24 cards will be appended' index.html  # marker de #periodo-rosas
   grep -c 'data-id="M011-' index.html              # debe ser 5 (output de T01)
   grep -c 'reveal reveal-slide' index.html          # debe ser 103 (output de T01)
   ```

2. **Splice B1+B2: ROM-1 (hecho) y ROM-2 (rumor) en grid 2, después de BIOG-16**

   El anchor para la inserción es el cierre del article BIOG-16 (El pensador en el exilio). El bloque se inserta entre ese `</article>` y `</div><!-- /.events-grid multifacético -->`.

   ROM-1 usa `card-hecho`, `data-certeza="hecho"`, `data-id="M011-ROM-1"`, stagger 480ms. Template estándar card-hecho. El excerpt describe el patrón de discreción sentimental (sin vínculos amorosos en *Mi vida privada*) — incluir atribución a Martino (2016, *Mitolog&#xED;as Hoy*) en el `<cite>`.

   ROM-2 usa `card-rumor`, `data-certeza="rumor"`, `data-id="M011-ROM-2"`, stagger 560ms. **Usar el template BIOG-24** (complejo, no el colonial):
   ```html
   <article class="event-card card-rumor reveal reveal-slide" data-certeza="rumor" data-id="M011-ROM-2" style="--reveal-delay: 560ms">
     <div class="card-certeza-indicator">
       <span class="card-certeza-icon" aria-hidden="true">⚠️</span>
       <span class="card-certeza-badge-rumor">Rumor</span>
     </div>
     <div class="event-card__body">
       <header class="event-card__header">
         <span class="event-card__year">ca. 1838–1843</span>
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
   Completar con el excerpt y `card-nota-certeza` verbatim de S02-CONTENT-DRAFT.md § M011-ROM-2. Usar HTML entities para non-ASCII.

3. **Relocalizar marker de #periodo-rosas** (con el desplazamiento de T01 + T02-step-2):
   ```bash
   grep -n 'S10.*S24 cards will be appended' index.html
   ```
   Anotar la línea exacta. El bloque de ENC-1 se inserta ANTES del marker comment.

4. **Splice C1: ENC-1 (debatido, con ENC-2 como nota interna)**

   ENC-1 usa `card-opinion`, `data-certeza="debatido"`, `data-id="M011-ENC-1"`, stagger 0ms (nuevo grupo en #periodo-rosas).

   Estructura del article ENC-1:
   ```html
   <!-- M011-ENC-1: El lobby de Encarnación — Suma del Poder Público (1833–1835) -->
   <article class="event-card card-opinion reveal reveal-slide" data-certeza="debatido" data-id="M011-ENC-1" style="--reveal-delay: 0ms">
     <div class="card-certeza-indicator">
       <span class="card-certeza-icon" aria-hidden="true">⚖</span>
       <span class="card-certeza-label">Debatido historiogr&#xE1;ficamente</span>
     </div>
     <span class="event-card__year">1833–1835</span>
     <h3 class="event-card__title">[título de ENC-1]</h3>
     <p class="event-card__excerpt">[excerpt de ENC-1 de S01-CONTENT-DRAFT.md]</p>
     <p class="card-nota-historiografica"><strong>Nota historiogr&#xE1;fica:</strong> [contenido de ENC-2 comprimido en ~60-80 palabras: las tres posiciones historiográficas — revisionista Irazusta/Pichel, liberal Lynch, y el límite del registro documental — con atribución explícita a cada fuente]</p>
     <footer class="card-source">
       <span class="card-source__icon" aria-hidden="true">📄</span>
       <cite>[fuentes de ENC-1: Lynch 1981, Museo Histórico Nacional, Irazusta 1941, Ternavasio/UNTREF, Wikipedia EN]</cite>
     </footer>
   </article>
   ```
   Insertar el bloque completo ANTES de la línea `<!-- S10–S24 cards will be appended here by subsequent slices -->`.

5. **Verificar estado post-T02**:
   ```bash
   grep -c 'data-id="M011-' index.html               # debe ser 8
   grep -c 'reveal reveal-slide' index.html            # debe ser 106 (103+3)
   grep -c 'data-certeza' index.html                   # debe ser 101 (98+3)
   grep -q 'card-nota-historiografica' index.html && echo ok  # ENC-2 inline
   grep -n 'S10.*S24 cards will be appended' index.html       # marker sigue existiendo
   grep -c 'data-certeza="rumor"' index.html           # debe ser 4 (3+1)
   git diff --name-only HEAD -- styles.css app.js      # vacío
   ```

## Must-Haves

- [ ] ROM-1 (card-hecho, 480ms) y ROM-2 (card-rumor, 560ms) integrados en grid 2 después de BIOG-16
- [ ] ROM-2 usa el template BIOG-24 (con `event-card__body`, `event-card__header`, `event-card__content`, `card-rumor__origin`) — no el template colonial simple
- [ ] `<span class="card-nota-certeza">` de ROM-2 preservado verbatim del draft
- [ ] ENC-1 integrado en `#periodo-rosas` antes del marker de append
- [ ] ENC-2 integrado como `<p class="card-nota-historiografica">` dentro del article de ENC-1 — **no como article independiente**
- [ ] El marker `<!-- S10–S24 cards will be appended here by subsequent slices -->` sigue existiendo después de la inserción
- [ ] Anchors relocalizados con `grep -n` antes de cada splice (no hardcodear números de línea post-T01)
- [ ] `styles.css` y `app.js` no modificados

## Verification

```bash
grep -c 'data-id="M011-' index.html               # 8
grep -c 'reveal reveal-slide' index.html            # 106
grep -c 'data-certeza' index.html                   # 101
grep 'data-id="M011-ROM-1"' index.html              # 1 resultado
grep 'data-id="M011-ROM-2"' index.html              # 1 resultado
grep 'data-id="M011-ENC-1"' index.html              # 1 resultado
grep -q 'card-nota-historiografica' index.html && echo ok   # ENC-2 presente como nota
grep -n 'S10.*S24 cards will be appended' index.html        # marker existe
grep -c 'data-certeza="rumor"' index.html           # 4
git diff --name-only HEAD -- styles.css app.js      # vacío
```

## Observability Impact

- Signals added/changed: 3 nuevos `data-certeza` y `reveal reveal-slide` en el DOM; 1 `card-nota-historiografica` nueva en `#periodo-rosas`
- How a future agent inspects this: `grep 'data-id="M011-' index.html` lista las 8 cards; `grep -n 'card-nota-historiografica' index.html` localiza ENC-2 inline; `grep -n 'S10.*S24 cards will be appended' index.html` confirma que el marker de append sigue en pie para futuras slices
- Failure state exposed: Si el count `grep -c 'data-id="M011-' index.html` retorna < 8, identificar cuál falta con listado individual; si el marker desapareció, el bloque ENC-1 sobreescribió el target incorrecto — restaurar con git

## Inputs

- `.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md` — especificación de ROM-1 y ROM-2 (§ M011-ROM-1, § M011-ROM-2; incluyen excerpt verbatim y `card-nota-certeza` ya escritos)
- `.gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` — especificación de ENC-1 y ENC-2 (§ M011-ENC-1, § M011-ENC-2; incluyen excerpt verbatim y contenido de la nota historiográfica)
- `index.html` output de T01: 5 articles M011 ya integrados, `grep -c 'data-id="M011-'` retorna 5
- S03-RESEARCH.md decision: ENC-2 va como `<p class="card-nota-historiografica">` dentro de ENC-1, no como article independiente
- S03-RESEARCH.md: template card-rumor biográfico (BIOG-24 style) tiene `event-card__body` / `event-card__header` / `event-card__content` / `card-rumor__origin`; distinto del template colonial
- D052: `data-certeza="debatido"` usa clase CSS `card-opinion`
- D053: HTML entities obligatorias para non-ASCII

## Expected Output

- `index.html` — modificado con 8 articles M011 integrados total: 5 en `#rev-alberdi-formacion` (output T01) + 2 en grid 2 (ROM-1, ROM-2) + 1 en `#periodo-rosas` (ENC-1 con ENC-2 inline); `grep -c 'data-id="M011-' index.html` retorna 8; marker de append sigue existiendo
