# S03: Integración HTML

**Goal:** Integrar las 8 cards nuevas de M011 (S01 + S02) en `index.html`, con ENC-2 como nota inline dentro de ENC-1, reveal-on-scroll funcionando para todos los elementos nuevos, y sin CSS ni JS nuevos.

**Demo:** `grep -c 'data-id="M011-' index.html` retorna 8; `grep -c 'reveal reveal-slide' index.html` retorna 107; `git diff --name-only HEAD -- styles.css app.js` retorna vacío.

## Must-Haves

- 8 articles `data-id="M011-*"` integrados en las secciones correctas del DOM
- ENC-2 integrado como `<p class="card-nota-historiografica">` dentro del article de ENC-1 (no como article independiente)
- Certeza correcta en cada card: CANE-1=hecho, CANE-2=debatido, MARIQ-1=hecho, RED37-1=hecho, RED37-2=hecho, ROM-1=hecho, ROM-2=rumor, ENC-1=debatido
- Spans `card-nota-certeza` preservados verbatim (MARIQ-1 Himno, CANE-2 cielo/Vicente López, ROM-2 Medeiros)
- Reveal-on-scroll funciona (clase `reveal reveal-slide` + `--reveal-delay` CSS custom property en cada card)
- `styles.css` y `app.js` sin modificar

## Proof Level

- This slice proves: final-assembly
- Real runtime required: no (grep/diff sufficient; reveal verified by class presence)
- Human/UAT required: no

## Verification

```bash
# Card count total post-integración (8 articles nuevos, ENC-2 es nota inline no article)
grep -c 'data-certeza' index.html        # debe ser 101 (93 baseline + 8 articles nuevos)
grep -c 'reveal reveal-slide' index.html  # debe ser 106 (98 baseline + 8 articles nuevos)

# M011 cards integradas
grep -c 'data-id="M011-' index.html      # debe ser 8 (ENC-1, RED37-1, RED37-2, MARIQ-1, CANE-1, CANE-2, ROM-1, ROM-2)

# Certeza breakdown (verificar incremento correcto)
grep -c 'data-certeza="hecho"' index.html    # baseline 66 + 5 nuevas hecho = 71 (CANE-1, MARIQ-1, RED37-1, RED37-2, ROM-1)
grep -c 'data-certeza="debatido"' index.html # baseline 5 + 2 nuevas debatido = 7 (ENC-1, CANE-2)
grep -c 'data-certeza="rumor"' index.html    # baseline 3 + 1 (ROM-2) = 4

# Sin CSS/JS nuevos — failure-path check clave
git diff --name-only HEAD -- styles.css app.js   # → DEBE retornar vacío

# Spans de certeza diferenciada preservados
grep -c 'card-nota-certeza' index.html    # baseline 23 + al menos 3 (MARIQ-1, CANE-2, ROM-2) = ≥26

# Marker de append sigue existiendo (no fue eliminado)
grep -n 'S10.*S24 cards will be appended' index.html  # → debe existir (1 línea)

# Failure-path: ningun VERIFICAR activo escapa al HTML
grep -n '\[VERIFICAR\]' index.html        # → DEBE retornar vacío (0 resultados)
```

## Observability / Diagnostics

- Runtime signals: Las clases `reveal reveal-slide` y `data-certeza` son el estado observable en el DOM; el sistema reveal-on-scroll de `app.js` las lee sin configuración adicional.
- Inspection surfaces: `grep -c 'data-certeza' index.html` para conteo total; `grep 'data-id="M011-' index.html` para listar cards integradas; `grep -n 'card-nota-certeza' index.html` para localizar spans de certeza diferenciada.
- Failure visibility: Si un splice falla (anchor no encontrado), `edit` retorna error; si una card se duplica, el count supera el esperado. Después de cada task: `grep -c 'data-id="M011-' index.html` muestra el estado acumulado.
- Diagnostic failure-path: Si el count de `data-certeza` no cuadra con el esperado, ejecutar `grep 'data-id="M011-' index.html | grep -o 'data-id="[^"]*"'` para listar las cards integradas y `diff <(echo 'M011-CANE-1 M011-CANE-2 M011-MARIQ-1 M011-RED37-1 M011-RED37-2 M011-ROM-1 M011-ROM-2 M011-ENC-1' | tr ' ' '\n' | sort) <(grep -o 'data-id="M011-[^"]*"' index.html | sort -u | sed 's/data-id="//;s/"//') | grep '^<'` para identificar qué cards faltan. Si el marker de append desaparece, restaurar con `git diff HEAD index.html | grep 'S10.*S24'` para diagnosticar si fue sobreescrito. Si `styles.css` o `app.js` aparecen en `git diff --name-only HEAD`, identificar el cambio exacto con `git diff HEAD -- styles.css app.js` y revertir con `git checkout HEAD -- styles.css app.js`.
- Redaction constraints: ninguna (HTML público sin secretos).

## Integration Closure

- Upstream surfaces consumed: `.gsd/milestones/M011/slices/S01/S01-CONTENT-DRAFT.md` (5 cards), `.gsd/milestones/M011/slices/S02/S02-CONTENT-DRAFT.md` (4 cards), `index.html` (DOM actual).
- New wiring introduced: 8 articles `reveal reveal-slide` — el IntersectionObserver de `app.js` los detecta automáticamente en DOMContentLoaded sin wiring adicional.
- What remains before the milestone is truly usable end-to-end: nada — S03 es el cierre de M011.

## Tasks

- [x] **T01: Integrar 5 cards en grid 1 de #rev-alberdi-formacion (CANE-1, CANE-2, MARIQ-1, RED37-1, RED37-2)** `est:40m`
  - Why: Cinco de las 8 cards van en el grid de formación (líneas ~442–629). Splicing bottom-up evita que inserciones previas desplacen anchors de inserciones posteriores. Este task cierra los grupos A1–A5 definidos en S03-RESEARCH.
  - Files: `index.html`
  - Do: Ejecutar splices en orden bottom-up: (1) RED37-2 + RED37-1 después del cierre del article BIOG-11; (2) MARIQ-1 después del cierre del article BIOG-7; (3) CANE-2 + CANE-1 después del cierre del article BIOG-5. Antes de cada splice, relocalizar el anchor con `grep -n` para confirmar número de línea actual. Usar `Write` para crear un archivo temporal con el bloque HTML, luego `edit` para splicear. Usar HTML entities para caracteres no-ASCII (&#xE9; = é, &#xF3; = ó, &#xFA; = ú, &#xED; = í, &#xE1; = á, &#xFC; = ü, &#xE8; = è) en todos los bloques HTML. Cards hecho: usar template `card-hecho` (certeza indicator ✓ + card-certeza-label). Card debatido (CANE-2): usar template `card-opinion` (certeza indicator ⚖ + card-certeza-label "Debatido historiográficamente"). Stagger: CANE-1=0ms, CANE-2=80ms; MARIQ-1=0ms (nuevo grupo); RED37-1=0ms, RED37-2=80ms.
  - Verify: `grep -c 'data-id="M011-' index.html` retorna 5; `grep -c 'reveal reveal-slide' index.html` retorna 103; `grep 'data-id="M011-CANE-1\|M011-CANE-2\|M011-MARIQ-1\|M011-RED37-1\|M011-RED37-2"' index.html` retorna 5 líneas
  - Done when: 5 articles M011 presentes en `#rev-alberdi-formacion` grid 1 con `data-certeza` y `reveal reveal-slide` correctos

- [x] **T02: Integrar 3 cards en grid 2 de #rev-alberdi-formacion (ROM-1, ROM-2) y ENC-1+ENC-2 en #periodo-rosas** `est:35m`
  - Why: ROM-1 y ROM-2 van en grid 2 (multifacético, después de BIOG-16). ENC-1 con ENC-2 inline va en `#periodo-rosas` usando el marker. Los números de línea del marker habrán aumentado ~150 después de T01 — relocalizar con `grep -n` antes de insertar. Este task cierra los grupos B1, B2 y C1.
  - Files: `index.html`
  - Do: (1) Relocalizar el cierre del grid multifacético con `grep -n '\.events-grid multifac' index.html` para confirmar que BIOG-16 sigue en esa posición. (2) Integrar ROM-1 (card-hecho, stagger 480ms) y ROM-2 (card-rumor, stagger 560ms) después del article BIOG-16 y antes del cierre `</div><!-- /.events-grid multifacético -->`. ROM-2 usa el template card-rumor de la sección biográfica (con `event-card__body`, `event-card__header`, `event-card__content`, `card-rumor__origin`), no el template colonial simple. (3) Relocalizar el marker de `#periodo-rosas` con `grep -n 'S10.*S24 cards will be appended' index.html`. (4) Integrar ENC-1 como card-opinion con `data-certeza="debatido"` (⚖ + "Debatido historiográficamente"), incluyendo ENC-2 como `<p class="card-nota-historiografica"><strong>Nota historiogr&#xE1;fica:</strong> ...</p>` dentro del article, después del excerpt. Stagger ENC-1=0ms. Insertar ANTES del marker comment, no después. Usar HTML entities para non-ASCII.
  - Verify: `grep -c 'data-id="M011-' index.html` retorna 8; `grep -c 'reveal reveal-slide' index.html` retorna 106; `grep 'data-certeza="rumor"' index.html | grep -c 'M011'` retorna 1; `grep -q 'card-nota-historiografica' index.html && echo ok`
  - Done when: 8 articles M011 presentes, ENC-2 integrado como nota dentro de ENC-1, marker de append sigue existiendo

- [x] **T03: Verificación final y commit** `est:15m`
  - Why: Cierra el slice con un check integral de todos los invariantes post-integración: counts de certeza, ausencia de flags activos, sin CSS/JS nuevos, y estado legible del DOM para el sistema de reveal.
  - Files: `index.html` (solo lectura en este task), git
  - Do: Ejecutar todos los comandos de verificación del slice plan. Confirmar: (a) `grep -c 'data-certeza' index.html` retorna 102; (b) `grep -c 'data-id="M011-' index.html` retorna 8; (c) `git diff --name-only HEAD -- styles.css app.js` retorna vacío; (d) `grep -n '\[VERIFICAR\]' index.html` retorna vacío; (e) el marker `S10.*S24 cards will be appended` sigue existiendo; (f) `grep -c 'card-nota-certeza' index.html` ≥ 26. Si algún count está incorrecto, identificar la card faltante con `grep 'data-id="M011-' index.html` y aplicar el splice correctivo antes de commitear. Hacer commit: `git add index.html && git commit -m "feat(M011-S03): integrate 8 M011 cards into index.html"`.
  - Verify: `grep -c 'data-certeza' index.html` retorna 102; `git diff --name-only HEAD -- styles.css app.js` vacío; `grep -n '\[VERIFICAR\]' index.html` vacío
  - Done when: Todos los invariantes de verificación pasan, commit realizado

## Files Likely Touched

- `index.html`
