---
estimated_steps: 3
estimated_files: 1
---

# T02: Verificar URLs Wikimedia vía API y patchear el draft

**Slice:** S01 — Investigación y borrador
**Milestone:** M017

## Description

Confirmar las URLs exactas de las dos imágenes de Wikimedia Commons que no están actualmente en uso en el sitio: el daguerrotipo de Urquiza (Fredricks, ca. 1852) y el Palacio San José. Patchear los marcadores `[URL-PENDIENTE-VERIFICAR]` en `S01-CONTENT-DRAFT.md` con las URLs confirmadas o filenames correctos.

Las imágenes ya en uso en el sitio (`Justo_José_de_Urquiza.jpg` en línea 1636 y `Justo_José_de_Urquiza_(retrato).jpg` en línea 2328) no necesitan verificación — sus rutas funcionan en producción.

Si un filename sugerido no existe en Commons, usar la API de búsqueda (`list=search&srnamespace=6`) para encontrar el filename correcto. Si no se encuentra ninguna imagen adecuada, marcar como `[NO-DISPONIBLE-EN-COMMONS]` y sugerir alternativa (ej: retrato del período disponible) o dejar la card sin imagen.

## Steps

1. Verificar daguerrotipo Fredricks: hacer request a la API de Wikimedia Commons para el filename `Daguerrotipo_de_Justo_José_de_Urquiza_(recorte).jpg` con `iiurlwidth=500`. Extraer `thumburl` del resultado. Si devuelve `missing`, buscar con `list=search&srnamespace=6&srsearch=Urquiza+daguerrotipo` o `srsearch=Urquiza+Fredricks`.

   Comando de referencia (usando curl o fetch_page con la URL API):
   ```
   https://commons.wikimedia.org/w/api.php?action=query&titles=File:Daguerrotipo_de_Justo_José_de_Urquiza_(recorte).jpg&prop=imageinfo&iiprop=url,size&iiurlwidth=500&format=json
   ```

2. Verificar Palacio San José: hacer request para `Palacio_San_José_(Entre_Ríos).jpg` con `iiurlwidth=500`. Si devuelve `missing`, buscar con `srsearch=Palacio+San+José+Urquiza` o `srsearch=Palacio+San+Jose+Entre+Rios`.

   Comando de referencia:
   ```
   https://commons.wikimedia.org/w/api.php?action=query&titles=File:Palacio_San_José_(Entre_Ríos).jpg&prop=imageinfo&iiprop=url,size&iiurlwidth=500&format=json
   ```

3. Patchear `S01-CONTENT-DRAFT.md`: reemplazar cada `[URL-PENDIENTE-VERIFICAR]` con la thumburl confirmada (o con el filename correcto si difería del sugerido, marcado como `[CONFIRMADO: filename-correcto.jpg]`). Si no se encuentra la imagen, reemplazar con `[NO-DISPONIBLE-EN-COMMONS — alternativa sugerida: ...]`.

   Usar la herramienta Edit (no bash) para los reemplazos quirúrgicos.

## Must-Haves

- [ ] API de Wikimedia consultada para ambas imágenes pendientes
- [ ] Cero marcadores `[URL-PENDIENTE-VERIFICAR]` en el draft al finalizar
- [ ] URLs confirmadas son thumburls de 500px (no URLs de archivos originales)
- [ ] Si una imagen no existe, la alternativa sugerida es concreta (nombre de archivo específico) no genérica

## Verification

- `grep "\[URL-PENDIENTE-VERIFICAR\]" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` devuelve 0 líneas (exit code 1 = no matches = pass)
- Manual review: el draft tiene exactamente 6 secciones URQ-1 a URQ-6 con imágenes resueltas

## Observability Impact

**Signals that change after T02 executes:**
- `grep "\[URL-PENDIENTE-VERIFICAR\]" S01-CONTENT-DRAFT.md` → transitions from 2 matches to 0 matches. This is the primary machine-checkable completion signal for T02.
- `grep "CONFIRMADO" S01-CONTENT-DRAFT.md` → grows from 2 entries (URQ-1, URQ-5 — images already in use) to 4 entries (adds URQ-3 and URQ-4 confirmed filenames/URLs).
- The image status table at the bottom of `S01-CONTENT-DRAFT.md` changes URQ-3 and URQ-4 rows from `⏳ [URL-PENDIENTE-VERIFICAR]` to `✅ CONFIRMADO`.

**How a future agent inspects T02's work:**
```bash
# Confirm T02 completed (should return 0 lines):
grep "\[URL-PENDIENTE-VERIFICAR\]" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md

# Confirm both images resolved (should return 4 lines):
grep -c "CONFIRMADO" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md

# See the actual confirmed URLs/filenames:
grep -A2 "CONFIRMADO" .gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md
```

**Failure state visibility:**
- If a Wikimedia API call fails (network error, rate limit), the `[URL-PENDIENTE-VERIFICAR]` marker remains — never silently replaced with a wrong URL. The grep check surfaces this immediately.
- If a filename search returns no results, the marker becomes `[NO-DISPONIBLE-EN-COMMONS — alternativa sugerida: ...]` — still machine-detectable as unresolved by S02.
- Silent bad state would be: replacing a pending marker with an unverified URL that looks valid but 404s. Prevention: only use `thumburl` from the API response, never construct URLs manually.

## Inputs

- `.gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` — producido por T01, con marcadores `[URL-PENDIENTE-VERIFICAR]` en URQ-3 (Palacio San José) y URQ-4 (daguerrotipo Fredricks)
- `.gsd/KNOWLEDGE.md` sección "Wikimedia Commons Image Sourcing" — API endpoint, fallback a búsqueda, regla de imágenes pequeñas (< 500px → no thumb path disponible)

## Expected Output

- `.gsd/milestones/M017/slices/S01/S01-CONTENT-DRAFT.md` — versión final con todas las imágenes resueltas. Este archivo es el único output de S01 y el único input que S02 necesita para la integración HTML.
