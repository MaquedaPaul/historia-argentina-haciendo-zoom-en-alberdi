# S01: Sourcing y reemplazo de los tres tracks — UAT

**Milestone:** M006
**Written:** 2026-03-20

## UAT Type

- UAT mode: live-runtime + human-experience
- Why this mode is sufficient: El deliverable principal es audio que suena en el browser. Los checks de artifact (tamaños de archivo, headers ID3) son necesarios pero no suficientes — el oyente debe confirmar perceptualmente que la música es apropiada para cada período histórico.

## Preconditions

1. Servidor HTTP corriendo en puerto 8090:
   ```bash
   npx http-server /c/Users/gabri/Desktop/historia -p 8090 --cors -c-1
   ```
2. Navegar a `http://localhost:8090` (no a un path dentro del worktree — el servidor debe apuntar al repo raíz para que `audio/*.mp3` resuelva correctamente).
3. Abrir DevTools → Console para ver mensajes `[Sound]`.

## Smoke Test

Hacer clic en el botón 🔇 (mute) en la barra de navegación. Si aparece en consola `[Sound] User unmuted — playing sound-colonial` y el ícono cambia, el sistema de audio está activo. Detener aquí si esto falla — los demás casos no aplican.

---

## Test Cases

### 1. Archivos MP3 son reales y tienen tamaño correcto

**Propósito:** Confirmar que no son placeholders silenciosos.

```bash
ls -la audio/*.mp3
```

**Expected:**
- `audio/colonial.mp3` → ~1.23MB (1,231,571 bytes)
- `audio/revolucion.mp3` → ~1.95MB (1,950,496 bytes)
- `audio/nacional.mp3` → ~1.47MB (1,477,530 bytes)
- Todos > 10KB (descarta placeholder de 0 bytes)
- Todos < 2MB (dentro del máximo del task plan)

```bash
xxd audio/colonial.mp3 | head -2
```
**Expected:** Primera línea muestra `4944 33` (ID3 tag) con título legible "Prelude No." — no bytes cero.

---

### 2. Track colonial reproduce al activar sonido

**Propósito:** El primer track (período 1500-1800) inicia al desmutear.

1. Navegar a `http://localhost:8090` desde la sección colonial (arriba de la página).
2. Hacer clic en el botón 🔇.
3. En DevTools → Console, verificar: `[Sound] Fade-in done → sound-colonial (vol 0.15)`
4. En DevTools → Console (browser_evaluate):
   ```javascript
   const a = document.getElementById('sound-colonial');
   ({ paused: a.paused, duration: a.duration, readyState: a.readyState, error: a.error })
   ```

**Expected:**
- `paused: false` — reproduciendo
- `duration: ~55.2` — audio de 55 segundos (no NaN, no 0)
- `readyState: 4` — HAVE_ENOUGH_DATA
- `error: null` — sin error de decode

**Human check:** ¿Se escucha música de teclado barroco (Bach)? ¿Suena apropiado para el siglo XVIII colonial?

---

### 3. Track switch: colonial → revolución

**Propósito:** Al navegar al período 1800-1860, la música cambia con fade.

1. Con el sonido activo y colonial reproduciéndose, hacer scroll o click en "1800-1860" en el menú.
2. En Console, verificar: `[Sound] Track switch: periodo-colonial → periodo-revolucion`
3. Verificar fade-out de colonial y fade-in de revolución:
   ```javascript
   const c = document.getElementById('sound-colonial');
   const r = document.getElementById('sound-revolucion');
   ({ colonial_paused: c.paused, revolucion_paused: r.paused, revolucion_duration: r.duration })
   ```

**Expected:**
- `colonial_paused: true` — colonial detuvo (fade-out completado)
- `revolucion_paused: false` — revolución reproduciendo
- `revolucion_duration: ~91.6` — Mozart de 91 segundos

**Human check:** ¿Se escucha música clásica (Mozart, estilo operístico)? ¿El cambio tiene fade suave sin click?

---

### 4. Track switch: revolución → nacional

**Propósito:** Al navegar al período 1860-1900, la música cambia correctamente.

1. Con revolución reproduciéndose, hacer scroll o click en "1860-1900" en el menú.
2. En Console, verificar: `[Sound] Track switch: periodo-revolucion → periodo-nacional`
3. Verificar estado:
   ```javascript
   const r = document.getElementById('sound-revolucion');
   const n = document.getElementById('sound-nacional');
   ({ revolucion_paused: r.paused, nacional_paused: n.paused, nacional_duration: n.duration })
   ```

**Expected:**
- `revolucion_paused: true` — revolución detuvo
- `nacional_paused: false` — nacional reproduciendo
- `nacional_duration: ~36.8` — Chopin de 36 segundos

**Human check:** ¿Se escucha música romántica (Chopin, piano)? ¿Es distinta de los otros dos tracks?

---

### 5. Mute/unmute no produce errores

**Propósito:** Confirmar que activar y desactivar el audio no genera errores en consola.

1. Con un track reproduciéndose, hacer clic en el botón de sonido (mutear).
2. En Console: no debe aparecer ningún error `Uncaught` ni `DOMException`.
3. Hacer clic nuevamente (desmutear).
4. En Console: `[Sound] User unmuted — playing sound-X` debe aparecer. Audio reanuda.

**Expected:** Cero errores de JavaScript. El ícono del botón refleja el estado actual.

---

### 6. Sin errores 404 ni decode error en network

**Propósito:** Confirmar que los archivos se sirven correctamente.

1. En DevTools → Network, filtrar por "media" o buscar "colonial.mp3".
2. Con el sonido activo, verificar la request del archivo MP3.

**Expected:**
- Status: `206` (Partial Content = streaming correcto) o `200`
- No `404 Not Found` para ninguno de los tres archivos de audio
- No `net::ERR_INVALID_RESPONSE` ni similar

---

## Edge Cases

### Loop sin click audible

1. Navegar al período colonial con el sonido activo.
2. Esperar a que el track de 55 segundos llegue al final (o buscar en DevTools → el `currentTime` del elemento audio).
3. Escuchar si hay un click/glitch audible en el punto de loop.

**Expected:** El audio hace loop silenciosamente sin click perceptible. (Nota: el browser HTML5 audio hace loop nativo — la calidad del crossfade depende del contenido del archivo en el punto de corte.)

---

### Navegación rápida entre períodos

1. Con el sonido activo, cambiar rápidamente entre los tres períodos (click en colonial → revolución → nacional → colonial) en menos de 3 segundos.
2. Verificar en Console que no hay errores de estado de audio.
3. Verificar que el track correcto sigue reproduciéndose al finalizar.

**Expected:** El fade chain maneja la interrupción gracefully. El último período seleccionado es el que reproduce. No hay `DOMException: play() request was interrupted` en la consola.

---

## Failure Signals

- `audio.error !== null` → 404 (archivo no existe en esa ruta) o decode error (archivo corrupto)
- `audio.duration === NaN` o `audio.duration === 0` → placeholder silencioso todavía en su lugar
- `audio.readyState < 2` → archivo no accesible desde el servidor (verificar que el servidor apunta a `historia/`, no al worktree)
- Console `404` para `audio/colonial.mp3`, `audio/revolucion.mp3`, o `audio/nacional.mp3` → archivos no están en el directorio correcto del repo raíz
- No aparece `[Sound]` en Console al activar sonido → el script de audio no se cargó (verificar `app.js`)

## Not Proven By This UAT

- **Calidad perceptual humana** — si la música es la "correcta" para cada período es una apreciación subjetiva que requiere el usuario final (milestone DoD requiere confirmación humana explícita)
- **Comportamiento en móvil** — Safari iOS tiene restricciones de autoplay que pueden requerir interacción explícita antes de que `play()` funcione. No testeado en este UAT.
- **Comportamiento en múltiples tabs simultáneos** — no probado
- **Loop quality en revolucion.mp3 (91s) y nacional.mp3 (36s)** — el punto de corte de cada archivo puede o no ser ideal para loop; verificación auditiva recomendada para cada track

## Notes for Tester

- El botón de sonido tiene ícono 🔇 (muted) al inicio — hacer clic lo activa (unmutes)
- Los mensajes `[Sound]` en consola son la fuente de verdad más confiable para el estado del sistema de audio
- El único 404 esperado en consola es de una imagen de Wikipedia preexistente (no relacionado con audio) — ignorar ese error específico
- Si los archivos no suenan, verificar que el servidor HTTP apunta a `/c/Users/gabri/Desktop/historia` (el repo raíz), no al worktree en `.gsd/worktrees/M006`
- Para verificar qué archivo se está sirviendo: `curl -I http://localhost:8090/audio/colonial.mp3` debe retornar `Content-Length: 1231571` y `Content-Type: audio/mpeg`
