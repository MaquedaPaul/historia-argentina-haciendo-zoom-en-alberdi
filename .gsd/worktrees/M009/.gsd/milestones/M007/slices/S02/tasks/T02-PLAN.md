---
estimated_steps: 4
estimated_files: 1
---

# T02: Integrar cards S02 en index.html

**Slice:** S02 — De Tucumán a Buenos Aires — primeros pasos (1824–1833)
**Milestone:** M007

## Description

Con el borrador `S02-CONTENT-DRAFT.md` ya verificado (T01), esta tarea integra mecánicamente los 4 bloques biográficos (BIOG-5..BIOG-8) dentro del `events-grid--certeza` existente en `#rev-alberdi-formacion`. Es trabajo de bajo riesgo: el HTML sigue el template establecido en S01, la inserción es dentro del mismo grid (no hay nuevo sub-período, no hay nueva sub-nav, no hay CSS ni JS nuevo). El único riesgo real es un error de stagger delay o un atributo `data-certeza` mal colocado — ambos verificables en ≤2 minutos con los checks de grep.

## Steps

1. **Localizar el punto de inserción en `index.html`:** Buscar el comentario `<!-- BIOG-4:` y la línea de cierre de esa card (el `</article>` que le corresponde). Las nuevas cards van inmediatamente después de ese `</article>`, antes de `</div><!-- /events-grid -->`. Confirmar con `grep -n 'BIOG-4' index.html` y `grep -n 'events-grid' index.html` que la estructura está donde se espera.

2. **Insertar las 4 cards usando los Cita-HTML del S02-CONTENT-DRAFT:** Para cada bloque (BIOG-5, BIOG-6, BIOG-7, BIOG-8), copiar el texto del campo `Cita-HTML` del borrador. El template de card a usar:
   - `card-hecho`: `<article class="event-card card-hecho reveal reveal-slide" data-certeza="hecho" style="--reveal-delay: Nms">` con `card-certeza-indicator (✓ Hecho documentado)`, `event-card__year`, `event-card__title`, `event-card__excerpt`, `footer.card-source > cite`.
   - `card-opinion`: `<article class="event-card card-opinion reveal reveal-slide" data-certeza="opinion" style="--reveal-delay: Nms">` con `card-certeza-indicator (💬 Opinión atribuida)`, `event-card__year`, `event-card__title`, `blockquote.card-opinion__quote > p + footer.card-opinion__attribution`.
   - Stagger delays: BIOG-5 → `320ms`, BIOG-6 → `400ms`, BIOG-7 → `480ms`, BIOG-8 → `560ms`.
   - Usar `<span class="card-nota-certeza">[Nota: ...]</span>` dentro del `<p>` para cualquier dato marcado como `[INCIERTO]` o `[VERIFICACIÓN PENDIENTE]` en el borrador.
   - Usar el método Write-to-temp-file seguido de append (NO heredoc) para insertar bloque a bloque — ver KNOWLEDGE.md "Bash Heredoc Reliability on Windows/Git Bash".

3. **Añadir comentario identificador a cada card:** Inmediatamente antes de cada `<article>`, añadir `<!-- BIOG-N: título breve -->` (misma convención que S01). Esto es lo que hace `grep -n 'BIOG-' index.html` útil para diagnóstico.

4. **Verificar el resultado con los checks cuantitativos:**
   ```bash
   # Count data-certeza (debe ser 42 = 38 baseline + 4 nuevas)
   node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.match(/data-certeza/g); console.log('data-certeza:', m?m.length:0);"

   # Confirmar los 4 comentarios identificadores
   grep -c 'BIOG-[5678]' index.html

   # Confirmar que el div de cierre sigue siendo correcto
   grep -n 'rev-alberdi-formacion' index.html
   # debe mostrar 4 líneas: sub-nav link, comentario, div-open, div-close
   # el div-close debe estar DESPUÉS de BIOG-8

   # Confirmar que NO se cambió CSS ni JS
   git diff --stat HEAD -- styles.css app.js
   ```

## Must-Haves

- [ ] Exactamente 4 cards nuevas insertadas (BIOG-5, BIOG-6, BIOG-7, BIOG-8) dentro de `#rev-alberdi-formacion .events-grid--certeza`.
- [ ] `data-certeza` count = 42 (38 + 4 nuevas).
- [ ] Cada card tiene comentario identificador `<!-- BIOG-N: ... -->`.
- [ ] Cada card tiene clases `reveal reveal-slide` y `style="--reveal-delay: Nms"` con los valores correctos (320, 400, 480, 560ms).
- [ ] Los datos marcados `[INCIERTO]` en el borrador tienen `card-nota-certeza` en el HTML.
- [ ] El div `#rev-alberdi-formacion` sigue cerrando correctamente después de las nuevas cards.
- [ ] Ningún cambio en `styles.css` ni en `app.js`.

## Verification

- `node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.match(/data-certeza/g); console.log(m?m.length:0);"` devuelve `42`
- `grep -c 'BIOG-[5678]' index.html` devuelve `4` (o más, si hay múltiples coincidencias por comentario + atributo — lo importante es que aparezcan las 4 referencias)
- `git diff --name-only HEAD` muestra solo `index.html` (y el CONTENT-DRAFT) — no styles.css ni app.js

## Inputs

- `.gsd/milestones/M007/slices/S02/S02-CONTENT-DRAFT.md` — fuente única de verdad; campo `Cita-HTML` de cada bloque es el texto a copiar. Los flags `[INCIERTO]` indican dónde añadir `card-nota-certeza`.
- `index.html` líneas 344–442 — estructura del sub-período `#rev-alberdi-formacion` con su `events-grid--certeza`. BIOG-4 cierra en `--reveal-delay: 240ms`; las nuevas cards arrancan en 320ms.
- `.gsd/milestones/M007/slices/S01/tasks/T02-PLAN.md` — referencia del template de integración HTML usado en S01; mismas clases, mismo patrón.
- `.gsd/KNOWLEDGE.md` — "Bash Heredoc Reliability on Windows/Git Bash": usar Write-to-temp + cat >> para inserción de bloques largos. "Card Template Reuse Across Periods": las tres clases card son estables; copiar estructura del HTML existente. "Certeza Attribute Accent Normalization": usar `data-certeza="opinion"` (sin acento) para consistencia con el baseline de S01.

## Expected Output

- `index.html` — 4 cards nuevas integradas en `#rev-alberdi-formacion`, `data-certeza` count = 42, estructura HTML válida, sin CSS ni JS nuevo.
