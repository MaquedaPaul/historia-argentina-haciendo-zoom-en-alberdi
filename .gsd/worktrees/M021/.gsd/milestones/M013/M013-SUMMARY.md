---
id: M013
provides:
  - Lightbox modal (initImageModal) — all 57 .card-image img elements are clickable and open a full-size accessible dialog with caption and attribution
  - Critical HTML ordering fix: #img-modal must appear before <script src="app.js"> or IIFE silently fails with no error
  - iOS Safari scroll-lock fix: documentElement.style.overflow alongside body.style.overflow in openModal/closeModal
  - 16-check Node.js structural verification gate (verify-s02.js) — exits 0, encodes the ordering invariant as a regression detector
  - All M010–M013 changes merged into main and live on GitHub Pages (https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/)
key_decisions:
  - D062: Event delegation on document.body (not individual images) — tolerates images added post-DOMContentLoaded by M012 accordion expansion
  - D063: Modal hidden via HTML hidden attribute + CSS .img-modal[hidden]{display:none} override (needed because modal uses display:flex by default)
  - D064: iOS Safari scroll-lock requires setting overflow:hidden on both body AND documentElement
  - D065: verify-s02.js 16th check encodes modal-before-script ordering as a mechanical regression detector
patterns_established:
  - IIFE-ordering invariant: HTML elements referenced by synchronous IIFE must appear before the <script> tag — tabindex="0" on .card-image img is the diagnostic signal (null = init bailed)
  - lastTrigger pattern: save trigger reference before openModal(), restore focus on closeModal(), null on close
  - Event delegation on document.body + e.target.closest('.card-image img') for future-proof click capture
  - iOS modal scroll-lock: always set both document.body.style.overflow and document.documentElement.style.overflow
  - .gsd/ force-tracked divergence resolution: git fetch + git merge origin/main + direct file rewrite (git checkout --ours fails for gitignored paths)
observability_surfaces:
  - "node .gsd/milestones/M013/slices/S02/verify-s02.js — 16-check structural gate; exits 0 if all invariants hold"
  - "document.getElementById('img-modal').hidden → true=closed, false=open"
  - "document.querySelector('.card-image img').getAttribute('tabindex') === '0' → initImageModal() completed; null = init failed (check HTML ordering)"
  - "console.debug('[Modal] Image modal initialized.') — fires on page load if init succeeded"
  - "gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --jq '.status' → Pages build state"
  - "curl -s <live-url> | grep 'id=\"img-modal\"' → content freshness probe for deployed site"
requirement_outcomes:
  - id: R005
    from_status: active
    to_status: active
    proof: M013 adds clickable image lightbox (multimedia enhancement) but R005 remains active — video embeds and full multimedia sweep are still deferred
  - id: R007
    from_status: active
    to_status: active
    proof: Modal verified on mobile 375×812 (imgWidth=360 ≤ 375, no overflow, iOS scroll-lock confirmed). R007 remains active as it covers the full 320px–1920px range across all features
duration: ~95m (S01: 35m, S02: 55m, S03: ~5m)
verification_result: passed
completed_at: 2026-03-24
---

# M013: Modal de Imágenes y Deploy

**Lightbox modal entregado y verificado en browser: todas las imágenes de cards son clickeables, el modal es accesible con focus trap y cierre completo (Esc/overlay/botón), funciona en mobile, y el sitio está live en GitHub Pages con todos los cambios M010–M013.**

## What Happened

M013 tenía dos objetivos: implementar un lightbox modal para imágenes de cards, y deployar todos los cambios acumulados desde M010 a GitHub Pages.

**S01 — Implementación del modal:** Se insertó el elemento `#img-modal` en `index.html` con todos los atributos ARIA requeridos (`role="dialog"`, `aria-modal="true"`, `hidden`). Se agregaron ~94 líneas de CSS: `position: fixed; inset: 0; z-index: 1000`, overlay semi-transparente, animación `@keyframes modal-fade-in` de 0.2s, cap de `max-height: 75vh` para mobile, y bloque `@media (prefers-reduced-motion: reduce)`. La función `initImageModal()` (105 líneas) en `app.js` implementa event delegation sobre `document.body`, openModal/closeModal con gestión de focus (lastTrigger pattern), focus trap en el botón ×, Esc/overlay/botón como mecanismos de cierre, y bloqueo de scroll del body. Decisión clave: event delegation sobre `document.body` (no listeners individuales) para capturar clicks en imágenes reveladas dinámicamente por el accordion de M012.

**S02 — Verificación visual y bug crítico:** Al cargar en browser por primera vez, hacer click en imágenes no producía respuesta — fallo completamente silencioso. Causa raíz: `<script src="app.js">` estaba en la línea 2806 y `<div id="img-modal">` en la línea 2809. El IIFE se ejecuta sincrónicamente al parsear el script tag; `document.getElementById('img-modal')` retornó `null`, el guard clause disparó, y `initImageModal()` retornó temprano sin instalar ningún event listener. Ningún error fue lanzado. **Fix 1:** Mover el bloque `<div id="img-modal">` a antes del `<script src="app.js">`. **Fix 2:** Agregar `document.documentElement.style.overflow = 'hidden'` junto a `document.body.style.overflow = 'hidden'` en openModal/closeModal — iOS Safari ignora el overflow en body solo. Tras los fixes, todos los tests de browser pasaron: modal abre en colonial, revolución, y nacional; los tres mecanismos de cierre funcionan; el focus regresa al trigger; mobile 375×812 sin overflow. T02 creó `verify-s02.js` con 16 checks (exit 0), incluyendo como 16° check la invariante de ordenamiento modal-antes-de-script como detector de regresión.

**S03 — Deploy:** Pre-flight: `node verify-s02.js` exit 0 (16/16 PASS). Merge de `milestone/M013` a `main` con `--no-ff`. Push rechazado por divergencia: `origin/main` tenía un commit extra (`6922c52 docs(S01)`) con archivos `.gsd/M009/` no presentes en local. Resolución: `git fetch origin` + `git merge origin/main`, conflictos add/add en `.gsd/milestones/M009/slices/S01/` resueltos manteniendo HEAD (más completo con tasks marcados). Push exitoso a commit `c25592c`. GitHub Pages construyó en ~37 segundos. Verificación final: HTTP 200, `id="img-modal"` presente, `class="card-detail"` (4 ocurrencias) presente en el HTML live.

La integración con M012 accordion fue verificada arquitectónicamente — event delegation en `document.body` es correcto para capturar imágenes dentro de `.card-detail` expandidos, pero los `.card-detail` actuales son text-only, por lo que la integración real no pudo testarse con contenido vivo.

## Cross-Slice Verification

| Criterio de éxito | Verificación | Resultado |
|---|---|---|
| Click en imagen de card abre modal | Browser: click en colonial, revolución, nacional — modal abre en los 3 casos | ✅ |
| Esc cierra el modal | Browser: Esc — modal se cierra, focus regresa al trigger | ✅ |
| Click fuera cierra el modal | Browser: click en overlay — modal se cierra | ✅ |
| Modal accesible (focus trap, aria-modal, keyboard) | HTML: role=dialog, aria-modal=true, aria-label; JS: focus trap en botón ×, Tab, Enter/Space, lastTrigger restore | ✅ |
| Mobile sin desbordamiento | Browser 375×812: imgWidth=360 ≤ 375; documentElement.style.overflow='hidden' con modal abierto | ✅ |
| Modal cubre imágenes post-acordeón | Arquitectural: event delegation en document.body captura clicks en cualquier .card-image img agregada dinámicamente; `.card-detail` actuales son text-only, no testeable con contenido vivo | ✅ (arch) |
| Todos los cambios pusheados a GitHub Pages | `git push origin main` OK (c25592c); Pages built in 37s; HTTP 200; id="img-modal" y class="card-detail" en HTML live | ✅ |
| `node verify-s02.js` exit 0 | 16/16 checks PASS en worktree root | ✅ |

**Definición de done:**
- Todas las slices marcadas `[x]` en M013-ROADMAP.md ✅
- S01-SUMMARY.md, S02-SUMMARY.md, S03-SUMMARY.md existen ✅
- Cross-slice integration: S01 → S02 (bug crítico encontrado y corregido), S02 → S03 (verify-s02.js exit 0 = green-light para deploy) ✅

## Requirement Changes

- R005: active → active — M013 agrega lightbox (mejora multimedia), pero R005 cubre video embeds y multimedia sweep completo que siguen deferred
- R007: active → active — Modal verificado en mobile 375×812 sin overflow e iOS scroll-lock confirmado; R007 cubre el rango completo 320px–1920px+ para todas las features

No hay transiciones de status en este milestone — los requirements relevantes permanecen en sus estados actuales. R005 y R007 son beneficiados por M013 pero no completamente satisfechos.

## Forward Intelligence

### What the next milestone should know
- El sitio está completamente live en GitHub Pages con todos los cambios M001–M013. `origin/main` es autoritativo y al día.
- El lightbox modal tiene un único elemento interactivo (botón ×). Si se agregan controles prev/next en el futuro, el focus trap debe expandirse para ciclar entre todos los focusables.
- Los `.card-detail` de M012 son text-only — no hay imágenes en ninguno de los 4 acordeones. Si se agregan imágenes a `.card-detail` en el futuro, la integración con el lightbox funcionará automáticamente (event delegation) pero debe verificarse en browser.
- `node .gsd/milestones/M013/slices/S02/verify-s02.js` debe correrse desde el **worktree root** (no desde el repo root), ya que `__dirname` determina la resolución de paths (5 niveles arriba de `slices/S02/`). Corrido desde otro directorio falla silenciosamente los primeros 3 checks.
- GitHub Pages para este repo construye desde la rama `main`, root `/`. El workflow `pages-build-deployment` completa en ~37 segundos. Si un push es rechazado, verificar primero si hay divergencia en archivos `.gsd/` force-tracked.

### What's fragile
- **Ordenamiento modal-antes-de-script** — `<div id="img-modal">` DEBE aparecer antes de `<script src="app.js">` o initImageModal() falla silenciosamente sin error. La check #16 de verify-s02.js detecta esta regresión mecánicamente.
- **verify-s02.js es CWD-sensitivo** — path resolution usa `__dirname` para encontrar el repo root 5 niveles arriba. Si el script se mueve a otro nivel de profundidad, los paths se rompen silenciosamente.
- **`.gsd/` force-tracked crea merge conflicts en push con divergencia** — cualquier milestone futuro que pushee archivos `.gsd/` a `origin/main` independientemente durante desarrollo en worktree golpeará el mismo patrón. Workaround documentado en KNOWLEDGE.md.
- **Focus trap simple** — el modal tiene un solo elemento interactivo (botón ×). Si se agregan más controles, el trap necesita actualizarse.

### Authoritative diagnostics
- `document.querySelector('.card-image img').getAttribute('tabindex') === '0'` — señal más rápida de que initImageModal() completó; `null` = init falló (verificar ordenamiento HTML primero)
- `node .gsd/milestones/M013/slices/S02/verify-s02.js` — gate más confiable; nombra el invariante exacto que falla; corre en <1s
- `curl -s https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/ | grep 'id="img-modal"'` — prueba de frescura de contenido en el sitio live

### What assumptions changed
- **Asunción original:** S01 entregó el modal funcionando. **Realidad:** El modal tenía un bug crítico de ordenamiento que causó fallo silencioso total — ningún click delegation instalado, ningún error visible, solo funcionalidad ausente. S02 descubrió esto en el primer test de browser.
- **Asunción S01:** `<div id="img-modal">` después del script funcionaría porque DOMContentLoaded espera el DOM completo. **Realidad:** El IIFE se ejecuta sincrónicamente al parsear el script tag, antes de que los elementos posteriores al script existan en el DOM.
- **Asunción S02:** Un solo `git push` después del merge `--no-ff`. **Realidad:** Requirió un segundo merge para absorber un commit divergido en `origin/main` antes de que el push tuviera éxito.
- **Asunción plan:** `.card-detail` de M012 contienen imágenes. **Realidad:** Todos los `.card-detail` son text-only; la integración accordion+modal es arquitectónicamente correcta pero no testeable con contenido actual.

## Files Created/Modified

- `index.html` — Agregado `<div id="img-modal">` (16 líneas) antes de `<script src="app.js">` (orden crítico); modal moved from after script to before script in S02
- `styles.css` — Agregados ~94 líneas de CSS lightbox al final del archivo (de ~2607 a ~2701 líneas)
- `app.js` — Agregada `initImageModal()` (105 líneas) y su llamada; iOS scroll-lock fix en openModal/closeModal; archivo de 810 → 915 líneas
- `.gsd/milestones/M013/slices/S01/S01-SUMMARY.md` — Slice summary
- `.gsd/milestones/M013/slices/S01/tasks/T01-SUMMARY.md` — Task summary
- `.gsd/milestones/M013/slices/S01/tasks/T02-SUMMARY.md` — Task summary
- `.gsd/milestones/M013/slices/S02/verify-s02.js` — 16-check structural verification gate; exits 0 on all pass
- `.gsd/milestones/M013/slices/S02/S02-SUMMARY.md` — Slice summary
- `.gsd/milestones/M013/slices/S02/tasks/T01-SUMMARY.md` — Task summary
- `.gsd/milestones/M013/slices/S02/tasks/T02-SUMMARY.md` — Task summary
- `.gsd/milestones/M013/slices/S03/S03-SUMMARY.md` — Slice summary
- `.gsd/milestones/M013/slices/S03/tasks/T01-SUMMARY.md` — Task summary
- `.gsd/milestones/M013/M013-ROADMAP.md` — All slices marked [x]
- `.gsd/milestones/M013/M013-SUMMARY.md` — This file
