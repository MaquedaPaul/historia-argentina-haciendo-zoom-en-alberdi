---
estimated_steps: 3
estimated_files: 1
---

# T02: Escribir y ejecutar script de verificación estructural

**Slice:** S02 — Verificación visual + Fix pre-deploy
**Milestone:** M013

## Description

Crear un script Node.js que verifica mecánicamente todos los requisitos estructurales del modal antes del deploy (S03). El script sirve como gate de calidad — S03 puede leerlo como señal de green-light sin re-ejecutar verificación visual. También sirve como regresión para futuros agentes que modifiquen `index.html`, `styles.css` o `app.js`.

El script se ejecuta desde el worktree root (`C:/Users/gabri/Desktop/historia/.gsd/worktrees/M013`) con `node .gsd/milestones/M013/slices/S02/verify-s02.js` y sale con código 0 si todo pasa o código 1 si algún check falla.

## Steps

1. **Crear `verify-s02.js`** en `.gsd/milestones/M013/slices/S02/`. El script debe:
   - Resolver paths relativos al worktree root: `path.resolve(__dirname, '../../../../../')` (desde `slices/S02/` sube 5 niveles: `S02 → slices → M013 → milestones → .gsd → worktree_root`)
   - Leer `index.html` y `app.js` como strings
   - Ejecutar los checks listados abajo
   - Imprimir cada check con `[PASS]` o `[FAIL]` prefix
   - Salir con `process.exit(1)` si cualquier check falla, `process.exit(0)` si todos pasan

2. **Checks a implementar:**
   ```
   HTML: id="img-modal"                     → html.includes('id="img-modal"')
   HTML: role="dialog"                       → html.includes('role="dialog"')
   HTML: aria-modal="true"                   → html.includes('aria-modal="true"')
   HTML: hidden attribute on modal           → /id="img-modal"[^>]*hidden/.test(html) OR verifica que la línea del modal tiene "hidden"
   HTML: modal-close button                  → html.includes('modal-close')
   HTML: img-modal__img element              → html.includes('img-modal__img')
   HTML: card-image count >= 50              → (html.match(/class="card-image"/g)||[]).length >= 50
   JS: initImageModal present                → js.includes('initImageModal')
   JS: document.body delegation              → js.includes('document.body')
   JS: Escape handler                        → js.includes('Escape')
   JS: openModal function                    → js.includes('openModal')
   JS: closeModal function                   → js.includes('closeModal')
   JS: syntax check via new Function()       → try { new Function(js); } catch(e) { ... }
   CSS: img-modal in styles.css              → css.includes('img-modal')
   CSS: modal-close in styles.css            → css.includes('modal-close')
   ```

3. **Ejecutar el script** desde el worktree root:
   ```bash
   node .gsd/milestones/M013/slices/S02/verify-s02.js
   ```
   Confirmar que imprime `All X checks passed. ✓` y sale con exit 0.

**Nota importante sobre paths:** El script vive en `.gsd/milestones/M013/slices/S02/verify-s02.js`. Para acceder al worktree root: `path.resolve(__dirname, '../../../../../')` recorre: `S02/ → slices/ → M013/ → milestones/ → .gsd/ → worktree_root`. Verificar que `index.html` existe en el path calculado antes de intentar leerlo.

## Must-Haves

- [ ] El archivo `verify-s02.js` existe en `.gsd/milestones/M013/slices/S02/`
- [ ] `node .gsd/milestones/M013/slices/S02/verify-s02.js` termina con exit 0
- [ ] El script reporta al menos 15 checks individuales
- [ ] El script verifica JS syntax con `new Function()` (no con `eval()`)
- [ ] El script imprime `[FAIL]` (no lanza excepción) si algún check falla, y sale con exit 1

## Verification

```bash
node .gsd/milestones/M013/slices/S02/verify-s02.js
echo "Exit code: $?"
```

Debe imprimir todos los checks en `[PASS]` y `Exit code: 0`.

## Inputs

- T01-SUMMARY.md (o estado del worktree tras T01): `index.html`, `styles.css`, `app.js` en su estado final post-fix
- Conocimiento de que `grep` no está disponible en Windows — usar Node.js para todos los checks (patrón establecido en S01)
- Conocimiento del path: el script vive 5 niveles por debajo del worktree root

## Expected Output

- `.gsd/milestones/M013/slices/S02/verify-s02.js` — script Node.js nuevo, ~60-80 líneas
- `node .gsd/milestones/M013/slices/S02/verify-s02.js` termina con exit 0 y muestra todos los checks en PASS
