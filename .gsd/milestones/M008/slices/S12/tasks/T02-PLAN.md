---
estimated_steps: 4
estimated_files: 2
---

# T02: Insertar las 2 cards S12 en index.html antes del marcador de append

**Slice:** S12 — La gobernación en un país dividido — caudillos y Buenos Aires
**Milestone:** M008

## Description

Tomar el bloque HTML de la sección "T02 Recipe" de `S12-CONTENT-DRAFT.md` (producido por T01), escribirlo en `/tmp/s12-cards.html` usando la herramienta Write (nunca heredoc), y splicearlo en `index.html` inmediatamente ANTES del marcador `<!-- S10–S24 cards will be appended here by subsequent slices -->` usando un Node.js one-liner con substring ASCII-only. Verificar que el conteo de `data-certeza` sube de 67 a 69.

## Steps

1. **Leer S12-CONTENT-DRAFT.md → sección "T02 Recipe"**: Obtener el bloque HTML completo de las 2 cards. Verificar que contiene los comentarios `<!-- S12-1: ... -->` y `<!-- S12-2: ... -->`, las clases correctas (`event-card card-hecho reveal reveal-slide`), y los stagger delays correctos (`--reveal-delay: 0ms` y `--reveal-delay: 80ms`).

2. **Ubicar el marcador de append**: Ejecutar `grep -n 'cards will be appended here by subsequent slices' index.html` para obtener el número de línea actual (se espera ~1647, pero siempre re-grep — no hardcodear). Verificar que retorna exactamente 1 resultado.

3. **Escribir el bloque de cards a `/tmp/s12-cards.html`** usando la herramienta Write (NOT bash heredoc — ver KNOWLEDGE.md). Verificar con `cat /tmp/s12-cards.html` que el contenido es correcto antes de proceder.

4. **Splice con Node.js one-liner**:
   ```bash
   node -e "
   const fs = require('fs');
   const html = fs.readFileSync('index.html', 'utf8');
   const insert = fs.readFileSync('/tmp/s12-cards.html', 'utf8');
   const marker = 'cards will be appended here by subsequent slices';
   const lines = html.split('\n');
   const idx = lines.findIndex(l => l.includes(marker));
   if (idx === -1) throw new Error('Marker not found');
   lines.splice(idx, 0, insert);
   fs.writeFileSync('index.html', lines.join('\n'), 'utf8');
   console.log('Spliced at line', idx);
   "
   ```
   **CRÍTICO**: Usar `'cards will be appended here by subsequent slices'` (ASCII-only) como substring — NO incluir el en-dash (`–`) del comentario completo. Causa fallo de encoding en Node.js one-liners (ver KNOWLEDGE.md).

## Must-Haves

- [ ] `/tmp/s12-cards.html` escrito con herramienta Write, no heredoc.
- [ ] Substring de marcador es ASCII-only: `'cards will be appended here by subsequent slices'`.
- [ ] `grep -c 'data-certeza' index.html` retorna **69** tras el splice.
- [ ] `grep -c 'S12-' index.html` retorna **2**.
- [ ] `grep -c 'cards will be appended here' index.html` retorna **1** (marcador único, no duplicado).
- [ ] `git diff --name-only HEAD -- styles.css app.js` retorna vacío (cero cambios CSS/JS).

## Verification

```bash
grep -c 'data-certeza' index.html              # 69
grep -c 'S12-' index.html                      # 2
grep -c 'cards will be appended here' index.html  # 1
git diff --name-only HEAD -- styles.css app.js # vacío
grep -n 'cards will be appended here by subsequent slices' index.html  # ~1687 (shifted ~40 lines)
```

Si el marcador aparece 2 veces (duplicado accidental), usar Node.js para eliminar la copia espuria:
```bash
# Diagnóstico: grep -n 'cards will be appended here' index.html
# Corrección: conservar solo la segunda ocurrencia (la original)
```

## Inputs

- `.gsd/milestones/M008/slices/S12/S12-CONTENT-DRAFT.md` → sección "T02 Recipe": bloque HTML completo de las 2 cards para copiar a `/tmp/s12-cards.html`.
- `index.html` — archivo a modificar; marcador en ~línea 1647 (re-grep antes de splice).
- **KNOWLEDGE.md clave**: "Write tool, not heredoc" y "Node.js en-dash/Unicode" — el substring de búsqueda debe ser ASCII-only.

## Expected Output

- `index.html` — modificado: 2 nuevas cards `article.event-card.card-hecho` insertadas antes del marcador; conteo `data-certeza` = 69; marcador intacto y único; `styles.css` y `app.js` sin cambios.
- El marcador de append se desplazará ~40 líneas hacia abajo (de ~1647 a ~1687). El próximo slice (S13) debe re-grep para obtener la línea actual.
