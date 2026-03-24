---
estimated_steps: 6
estimated_files: 3
---

# T01: Verificación en browser y fix de regresiones

**Slice:** S02 — Verificación visual + Fix pre-deploy
**Milestone:** M013

## Description

El lightbox modal fue implementado en S01 y verificado solo estáticamente (estructura HTML, CSS presente, sintaxis JS). Esta tarea ejecuta la primera prueba real en un browser: abrir el sitio localmente, interactuar con el modal en todos los contextos relevantes (tres secciones de contenido + imágenes dentro de acordeones expandidos de M012), verificar comportamiento mobile, y aplicar fixes si se encuentran problemas.

El S01 Forward Intelligence identifica dos riesgos específicos a verificar:
1. `document.body.style.overflow = 'hidden'` puede no bloquear el scroll en iOS/mobile — puede requerir `document.body.style.position = 'fixed'` como complemento
2. La estructura `closest('.card-image img')` debe funcionar para imágenes dentro de `.card-detail` expandidos (M012)

## Steps

1. **Iniciar servidor local.** Desde el worktree root (`C:/Users/gabri/Desktop/historia/.gsd/worktrees/M013`), lanzar `npx serve . -p 3000` con `bg_shell start`. Esperar ready en puerto 3000.

2. **Verificar modal en sección colonial.** Navegar a `http://localhost:3000` con `browser_navigate`. Hacer scroll hasta la sección `#periodo-colonial`. Clickear una imagen (`.card-image img`). Verificar: (a) el modal aparece con la imagen ampliada, (b) hay caption/alt text visible, (c) no hay errores en la consola del browser.

3. **Verificar cierre por los tres mecanismos.** Desde el modal abierto: (a) presionar Esc → modal cierra y foco regresa a la imagen trigger; (b) abrir de nuevo y clickear el overlay oscuro → cierra; (c) abrir de nuevo y clickear el botón × → cierra.

4. **Verificar integración M012 accordion.** Scroll hasta la sección `#periodo-revolucion`. Localizar una card con botón `.card-expand-toggle` (texto "Ver más"). Clickearlo para expandir el `.card-detail`. Verificar que la imagen dentro del detalle expandido es clickeable y abre el modal. Si el evento no se dispara, el event delegation `document.body` no está capturando — diagnosticar y aplicar fix.

5. **Verificar mobile viewport.** Con `browser_set_viewport` en 375×812px. Navegar al sitio. Abrir el modal clickeando una imagen. Verificar: (a) la imagen no desborda el viewport (está contenida dentro del 90vh), (b) el botón × es clickeable, (c) el modal es usable sin scroll horizontal. Si el scroll del body no se bloquea en este viewport, aplicar fix en `app.js`: agregar `document.documentElement.style.overflow = 'hidden'` como complemento a `document.body.style.overflow = 'hidden'`.

6. **Aplicar fixes si se encontraron problemas.** Editar `index.html`, `styles.css`, o `app.js` según corresponda. Re-verificar con `new Function()` la sintaxis de `app.js`. Confirmar que los fixes no rompen las verificaciones estáticas de S01.

## Must-Haves

- [ ] El modal abre al clickear imágenes en la sección colonial (primera sección de contenido)
- [ ] El modal abre al clickear imágenes en sección revolución y/o nacional
- [ ] Esc cierra el modal y el foco regresa a la imagen trigger
- [ ] Click en overlay oscuro cierra el modal
- [ ] Click en botón × cierra el modal
- [ ] Imagen dentro de un `.card-detail` expandido (M012) abre el modal — event delegation funciona
- [ ] En viewport 375px: la imagen no desborda el viewport
- [ ] `app.js` pasa `new Function()` sin errores de sintaxis después de cualquier fix

## Verification

```bash
node -e "
try {
  new Function(require('fs').readFileSync('app.js', 'utf8'));
  console.log('JS syntax: OK');
} catch(e) {
  if (e instanceof SyntaxError) { console.error('SYNTAX ERROR:', e.message); process.exit(1); }
  else console.log('JS syntax: OK (runtime-only error expected)');
}
"
```

Ejecutar desde `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M013`.

## Inputs

- `index.html` — contiene `#img-modal` con estructura completa (desde S01)
- `styles.css` — contiene ~94 líneas de CSS de lightbox (desde S01)
- `app.js` — contiene `initImageModal()` de 105 líneas con event delegation (desde S01)
- S01-SUMMARY.md: Forward Intelligence documenta el riesgo de `overflow:hidden` en iOS y la dependencia de `closest('.card-image img')`

## Expected Output

- `app.js` — sintácticamente correcto, con cualquier fix mobile/accordion aplicado
- `styles.css` — con cualquier fix CSS aplicado (si necesario)
- `index.html` — sin cambios estructurales, o con fixes menores si se detectaron bugs en la estructura del modal
- Confirmación visual (via browser) de que el modal funciona en todos los contextos requeridos

## Observability Impact

**Señales que cambian con esta tarea:**
- `document.querySelector('.card-image img').getAttribute('tabindex')` pasa de `null` a `"0"` si init es exitoso
- `document.querySelector('.card-image img').style.cursor` pasa de `""` a `"zoom-in"` si init es exitoso
- Modal state inspectable via: `document.getElementById('img-modal').hasAttribute('hidden')`
- Scroll lock inspectable via: `document.body.style.overflow` y `document.documentElement.style.overflow`

**Cómo un agente futuro inspecciona esta tarea:**
1. `node -e "new Function(require('fs').readFileSync('app.js','utf8'))"` — confirma que el JS no tiene errores de sintaxis
2. `grep -n "img-modal\|app.js" index.html | head` — confirma que `#img-modal` aparece ANTES de `<script src="app.js">` (orden crítico)
3. Browser: `document.querySelector('.card-image img').getAttribute('tabindex') === '0'` → init correcto
4. Console DevTools: buscar `[Modal] Image modal initialized.`

**Estado de fallo visible:**
- `[Modal] Required elements not found — modal disabled.` en consola → `#img-modal` no estaba en DOM cuando se ejecutó el script
- `tabindex` sigue siendo `null` → `initImageModal()` no corrió o corrió con error
- El modal no abre al clickear → delegation no activa (checar orden HTML/script)

**Bug encontrado y resuelto en esta tarea:**
- `<script src="app.js">` estaba en línea 2806 y `<div id="img-modal">` en línea 2809 — el IIFE corría antes de que existiera el modal en el DOM. Fix: mover el modal HTML antes del script tag.
