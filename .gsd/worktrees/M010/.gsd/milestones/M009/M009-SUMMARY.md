---
id: M009
provides:
  - GitHub repo MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi (public, main branch, SHA 6922c52011f3a38ea59e54946d824b0fb7af1e4b)
  - Remote origin configured in local git repo (inherited by all worktrees via shared .git store)
  - GitHub Pages enabled (source: main, path: /) and serving HTTP 200
  - Site live at https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/
key_decisions:
  - Two-step gh repo create (without --source) + git remote add on main repo root + git push — because gh repo create --source does not work in git worktrees where .git is a file pointer
  - Pushed milestone/M009 as main branch (git push origin milestone/M009:main), then set default via gh repo edit --default-branch main
  - GitHub Pages enabled via REST API POST (not gh pages commands) — API returned HTTP 201 immediately; build completed within 60s
patterns_established:
  - For git worktrees, always configure remotes on the main repo root — all worktrees inherit remotes from the shared .git store
  - Pages API POST response contains status:null until the first build job starts; poll the GET endpoint (not the POST response) to confirm built state
observability_surfaces:
  - gh repo view MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi --json visibility,url,defaultBranchRef
  - gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --jq '.status,.html_url,.source'
  - curl -s -o /dev/null -w "%{http_code}" https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/
requirement_outcomes: []
duration: ~7m total (T01: ~5m, T02: ~2m including 60s build wait)
verification_result: passed
completed_at: 2026-03-23
---

# M009: Deploy a GitHub

**El sitio Historia Argentina está live en https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/ — repositorio público, rama main pusheada, GitHub Pages habilitado y respondiendo HTTP 200 con contenido verificado.**

## What Happened

M009 tenía un único slice (S01) que cubrió dos tareas secuenciales: crear el repositorio y habilitar Pages.

**T01 — Crear repositorio y pushear main:**
El plan original llamaba a `gh repo create --source . --remote origin --push` como comando único. Esto falló porque el directorio de trabajo es un git worktree (`.git` es un file pointer `gitdir: ...`), no un git root real — el CLI de `gh` rechaza esta topología al intentar resolver el root. La solución fue en dos pasos: crear el repositorio sin `--source` (`gh repo create MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi --public`), luego añadir el remote en el repo root principal (`C:/Users/gabri/Desktop/historia`) y pushear. Los git worktrees heredan remotes del store `.git` compartido, por lo que el remote quedó visible desde el worktree de inmediato. Se pusheó la rama actual `milestone/M009` como `main` (`git push origin milestone/M009:main`) y se configuró como rama default vía `gh repo edit --default-branch main`. Visibilidad: PUBLIC. SHA en remote: `6922c52011f3a38ea59e54946d824b0fb7af1e4b`.

**T02 — Habilitar Pages:**
Se llamó a la API REST de GitHub Pages (`POST .../pages`) con `source[branch]=main` y `source[path]=/`. La API respondió HTTP 201 — Pages no estaba habilitado previamente (sin conflicto 409). El POST devolvió `status: null` (no `building` como se esperaba), lo que es comportamiento normal hasta que el primer build job se encola. Tras 60 segundos, el GET endpoint devolvió `status=built`, `html_url=https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/`. HTTP 200 confirmado en el primer probe curl. Contenido: 15 ocurrencias de "Historia Argentina". No se necesitaron reintentos — el build completó dentro de la ventana de espera inicial.

## Cross-Slice Verification

Todos los criterios de éxito del roadmap M009 verificados:

| Criterio | Comando de verificación | Resultado |
|----------|------------------------|-----------|
| Repo existe en GitHub (público) | `gh repo view ... --json visibility -q .visibility` | `PUBLIC` ✅ |
| Rama main es la default | `gh repo view ... --json defaultBranchRef -q .defaultBranchRef.name` | `main` ✅ |
| Commits pusheados | `git ls-remote origin main` | SHA `6922c52...` ✅ |
| Pages habilitado y built | `gh api .../pages --jq '.status,.html_url,.source'` | `built`, URL correcta, `main:/` ✅ |
| HTTP 200 en URL pública | `curl -s -o /dev/null -w "%{http_code}" https://maquedapaul.github.io/.../` | `200` ✅ |
| Contenido correcto servido | `curl -s ... \| grep -c "Historia Argentina"` | `15` ✅ |

Definición de done: S01 completado `[x]`, S01-SUMMARY.md existe, T01-SUMMARY.md y T02-SUMMARY.md existen, ambos con `verification_result: passed`.

## Requirement Changes

No hay cambios de estado de requirements en este milestone. M009 fue exclusivamente infraestructura de deploy — no afectó ningún requirement de contenido, multimedia, o UI. Todos los requirements permanecen en su estado anterior al milestone.

## Forward Intelligence

### What the next milestone should know
- La URL canónica pública del sitio es `https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/` — usar esta URL en toda referencia futura.
- El repositorio es `MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi` en GitHub (público). El remote `origin` está configurado en el repo local y heredado por todos los worktrees.
- Actualizaciones de contenido futuras sólo requieren push a `main` — GitHub Pages hace rebuild automáticamente. No hay CI/CD ni build step (D001: zero build step).
- El repo contiene archivos de tooling `.gsd/` y algunos temporales (`temp-biog-s03.html`, `tmp-s07-biog21-22.txt`) visibles públicamente en GitHub. No son dañinos pero son visibles. No se incluyó limpieza en el scope de M009.

### What's fragile
- **GitHub Pages build time** — los builds típicamente completan en 30–90 segundos pero pueden demorar varios minutos durante alta carga en la infraestructura de GitHub. Si un milestone futuro pushea contenido y sondea inmediatamente, puede recibir HTML desactualizado. Siempre verificar `gh api .../pages/builds/latest --jq '.status'` antes de tratar un curl response como autoritativo.
- **Sin CI/CD** — no hay GitHub Actions workflow para detectar HTML roto o assets faltantes antes del deploy. Un push defectuoso queda live de inmediato. Si se añade contenido complejo en milestones futuros, considerar agregar una validación básica.
- **Sin dominio custom** — el sitio sirve desde el subdominio `github.io` por defecto. Si se configura un dominio custom en el futuro, los links internos que usen URLs absolutas necesitarán actualización.

### Authoritative diagnostics
- **Estado de Pages build:** `gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --jq '.status,.html_url,.source'` — fuente de verdad para saber si el sitio está built/building/errored.
- **Detalle de error de build:** `gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages/builds/latest --jq '.error.message'` — usar cuando status es `errored`.
- **Contenido live:** `curl -s https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/ | grep -c "Historia Argentina"` — confirma que se sirve el contenido correcto.
- **HTTP headers:** `curl -sI https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/` — confirma HTTPS enforcement, CDN headers, y status code.

### What assumptions changed
- **`gh repo create --source .` se asumió funcional** — falla en git worktrees porque `.git` es un file pointer. Siempre usar el enfoque en dos pasos (crear repo + remote add en el repo root principal) cuando se opera desde un worktree.
- **Pages POST se asumía que devolvería `building`** — en realidad devuelve `status: null` hasta que el primer build job se encola. El GET endpoint (no la respuesta del POST) es la señal correcta de readiness. Documentado en KNOWLEDGE.md.

## Files Created/Modified

- `.gsd/milestones/M009/slices/S01/tasks/T01-SUMMARY.md` — task summary (written by T01 executor)
- `.gsd/milestones/M009/slices/S01/tasks/T02-SUMMARY.md` — task summary (written by T02 executor)
- `.gsd/milestones/M009/slices/S01/S01-SUMMARY.md` — slice summary (written by S01 executor)
- `.gsd/milestones/M009/slices/S01/S01-UAT.md` — UAT script (written by S01 executor)
- `.gsd/milestones/M009/M009-SUMMARY.md` — this file
