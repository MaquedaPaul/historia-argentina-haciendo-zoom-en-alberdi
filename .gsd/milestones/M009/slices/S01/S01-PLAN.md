# S01: Crear repo, push y habilitar Pages

**Goal:** Dejar el sitio live en `https://MaquedaPaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/`.
**Demo:** `curl -s -o /dev/null -w "%{http_code}" https://MaquedaPaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/` devuelve `200`.

## Must-Haves

- El repositorio público `historia-argentina-haciendo-zoom-en-alberdi` existe en GitHub bajo la cuenta `MaquedaPaul`
- La rama `main` en GitHub contiene todos los commits locales (`index.html`, `app.js`, `styles.css`, `audio/`, `README.md`)
- GitHub Pages está habilitado (fuente: rama `main`, directorio raíz `/`)
- La URL pública responde con HTTP 200

## Verification

- `gh repo view MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi --json visibility -q .visibility` → `PUBLIC`
- `gh repo view MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi --json defaultBranchRef -q .defaultBranchRef.name` → `main`
- `curl -s -o /dev/null -w "%{http_code}" https://MaquedaPaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/` → `200`

## Tasks

- [ ] **T01: Crear repositorio GitHub, configurar remote y pushear rama main** `est:15m`
  - Why: Sin repo remoto ni push no hay donde activar Pages. Ésta es la precondición de todo lo demás en este milestone.
  - Files: (no project files modified — solo operaciones git/gh)
  - Do:
    1. Confirmar que `gh auth status` muestra cuenta `MaquedaPaul` con scope `repo` (ya verificado: OK).
    2. Crear el repo público en GitHub: `gh repo create historia-argentina-haciendo-zoom-en-alberdi --public --description "Historia Argentina 1500-1900 · Haciendo zoom en Alberdi" --source . --remote origin --push` — este comando en un solo paso crea el repo, configura el remote `origin` y pushea el branch actual.
    3. Si el branch actual es `milestone/M009` (no `main`), se necesita publicarlo como `main`: agregar `--default-branch main` no existe en `gh repo create`, por lo que se debe hacer `git push origin milestone/M009:main` y luego `gh repo edit --default-branch main` si el branch no se llama `main`.
    4. Verificar que el push llegó: `gh repo view MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi --json defaultBranchRef`.
  - Verify: `gh repo view MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi --json visibility -q .visibility` → `PUBLIC` y `git ls-remote origin HEAD` devuelve un SHA.
  - Done when: El repositorio existe en GitHub como público y la rama `main` tiene el commit más reciente del worktree local (`95e54b3` o posterior).

- [ ] **T02: Habilitar GitHub Pages y verificar URL pública** `est:5m`
  - Why: El repo existe pero Pages no se activa automáticamente — requiere configuración explícita. Esta tarea cierra la entrega del milestone.
  - Files: (no project files — solo configuración de Pages via API gh)
  - Do:
    1. Habilitar Pages: `gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --method POST -f source[branch]=main -f source[path]=/` (API REST de GitHub Pages).
    2. Esperar ~60s para que GitHub construya el sitio: `sleep 60`.
    3. Verificar estado de Pages: `gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --jq '.status,.url'` — debe devolver `built` y la URL.
    4. Confirmar HTTP 200: `curl -s -o /dev/null -w "%{http_code}" https://MaquedaPaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/`.
    5. Si el status es `building` en lugar de `built`, reintentar el curl hasta 3 veces con 30s de intervalo.
  - Verify: `curl -s -o /dev/null -w "%{http_code}" https://MaquedaPaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/` → `200`
  - Done when: La URL pública devuelve HTTP 200 y el contenido incluye el título del sitio (`Historia Argentina`).

## Files Likely Touched

- (ningún archivo del proyecto modificado — este slice opera únicamente sobre infraestructura git/GitHub)
