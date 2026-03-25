---
estimated_steps: 4
estimated_files: 1
---

# T02: Verificar imágenes via Wikimedia API y actualizar draft

**Slice:** S01 — Investigación y borrador
**Milestone:** M018

## Description

Confirmar los `thumburl` exactos de las 3 imágenes candidatas via Wikimedia API y anotarlos en el draft. S02 necesita estas URLs para los atributos `src` de los `<img>` — no debe re-consultar la API durante la integración HTML. Si alguna imagen falla, identificar alternativa antes de cerrar S01.

## Steps

1. Leer `.gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` para confirmar los filenames candidatos en CAM-1, CAM-2, CAM-3.
2. Para cada imagen, consultar la Wikimedia API con `curl` o `node fetch`. Usar **Wikipedia EN** (no ES) ya que los archivos están en Commons y el API endpoint EN es fiable para Commons. URL patrón:
   ```
   https://en.wikipedia.org/w/api.php?action=query&titles=File:FILENAME&prop=imageinfo&iiprop=url%7Csize&iiurlwidth=500&format=json
   ```
   **CRÍTICO:** Usar `%7C` (no coma) entre `url` y `size` — D052/KNOWLEDGE.md documenta que la coma devuelve imageinfo vacío sin error HTTP.
3. Extraer `thumburl` y dimensiones del JSON de respuesta. Si el campo `missing` está presente en la respuesta, el filename no existe → buscar alternativa en Wikimedia search API.
4. Anotar en cada sección ## CAM-N del draft:
   ```
   **Imagen verificada:** CONFIRMADO
   **thumburl:** https://upload.wikimedia.org/...500px-...
   **Dimensiones originales:** WxH px
   ```
   O si falla:
   ```
   **Imagen verificada:** FALLO — [motivo]
   **Alternativa:** [nuevo filename encontrado]
   **thumburl alternativa:** https://...
   ```

## Must-Haves

- [ ] Las 3 imágenes candidatas consultadas contra la API (no asumir URLs)
- [ ] `thumburl` completo anotado en el draft para cada imagen confirmada
- [ ] Ninguna imagen queda en estado PENDIENTE sin resolución
- [ ] No reutilizar `Batalla_de_Caseros_3_Febrero_1852.jpg` (ya en SP3-6) ni `Justo_Jose_de_Urquiza.jpg` si ya está en uso en otras cards del sitio

## Verification

```bash
grep -c "CONFIRMADO" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md
# → debe ser >= 3

# No deben quedar PENDIENTE sin resolución
grep "PENDIENTE" .gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md && echo "ADVERTENCIA: hay imágenes pendientes" || echo "OK"
```

## Inputs

- `.gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` — producido por T01, con filenames candidatos en cada sección CAM

**Filenames candidatos (del S01-RESEARCH.md):**
- CAM-1: `Justo_J._Urquiza._Presidente_of_the_Argentine_Confederation.jpg` (retrato, distinto al usado en SP3-6 y SP4-1)
- CAM-2: `Batalha_dos_Santos_Logares_(3_de_fevereiro_de_1852).jpg` (grabado época brasileño sobre la campaña en Banda Oriental)
- CAM-3: `La_Batalla_de_Caseros_2.JPG` (panorámica de la batalla — DISTINTA a `Batalla_de_Caseros_3_Febrero_1852.jpg` que ya está en SP3-6)

**API patrón Node.js si curl da problemas en Windows:**
```js
const https = require('https');
const fn = encodeURIComponent('File:La_Batalla_de_Caseros_2.JPG');
const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${fn}&prop=imageinfo&iiprop=url%7Csize&iiurlwidth=500&format=json`;
https.get(url, { headers: { 'User-Agent': 'historia-arg/1.0' } }, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => console.log(JSON.parse(d)));
});
```

**Nota D052 (KNOWLEDGE.md):** `iiprop=url,size` devuelve `imageinfo: []` sin error. Siempre usar `iiprop=url%7Csize`.

**Nota KNOWLEDGE.md (Wikimedia rate-limits):** Curl sin User-Agent puede devolver 429. Agregar `-H "User-Agent: historia-arg/1.0"` o usar Node.js con headers.

## Expected Output

- `.gsd/milestones/M018/slices/S01/S01-CONTENT-DRAFT.md` — actualizado con `thumburl` CONFIRMADO (o alternativa documentada) para ≥3 imágenes. Este archivo es el único entregable de S01 y el input completo para S02.
