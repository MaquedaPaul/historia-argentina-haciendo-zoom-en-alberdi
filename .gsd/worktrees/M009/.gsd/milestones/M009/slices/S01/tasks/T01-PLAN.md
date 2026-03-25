---
estimated_steps: 4
estimated_files: 0
---

# T01: Crear repositorio GitHub, configurar remote y pushear rama main

**Slice:** S01 — Crear repo, push y habilitar Pages
**Milestone:** M009

## Description

Este task crea el repositorio público en GitHub, configura el remote `origin` en el worktree local y pushea todos los commits al branch `main`. Es la precondición para habilitar GitHub Pages (T02).

El worktree ya está en estado limpio (no hay cambios pendientes) con el último commit `95e54b3`. El branch actual es `milestone/M009`. El comando `gh repo create` con `--push` soporta crear el repo y pushear en un solo paso.

Cuenta autenticada: `MaquedaPaul`. Scopes confirmados: `repo`, `workflow`.

## Steps

1. Verificar que `gh auth status` muestra `MaquedaPaul` y scope `repo`: `gh auth status 2>&1 | grep -E "Logged in|repo"`.
2. Crear el repositorio público, configurar origin y pushear:
   ```
   gh repo create historia-argentina-haciendo-zoom-en-alberdi \
     --public \
     --description "Historia Argentina 1500-1900 · Haciendo zoom en Alberdi" \
     --source . \
     --remote origin \
     --push
   ```
   Este comando pushea el branch actual (`milestone/M009`) como el branch por defecto.
3. Si el branch pusheado no es `main`, crear `main` en remoto a partir del branch actual:
   ```
   git push origin milestone/M009:main
   gh repo edit MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi --default-branch main
   ```
4. Confirmar que la rama `main` remota existe y tiene el commit correcto:
   ```
   git ls-remote origin main
   ```

## Must-Haves

- [ ] El repositorio `historia-argentina-haciendo-zoom-en-alberdi` existe en GitHub como público
- [ ] El remote `origin` está configurado en el worktree local apuntando a `https://github.com/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi`
- [ ] La rama `main` en GitHub contiene los archivos del sitio: `index.html`, `app.js`, `styles.css`, `audio/colonial.mp3`, `audio/revolucion.mp3`, `audio/nacional.mp3`, `README.md`

## Verification

- `gh repo view MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi --json visibility -q .visibility` → `PUBLIC`
- `gh repo view MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi --json defaultBranchRef -q .defaultBranchRef.name` → `main`
- `git ls-remote origin main` devuelve un SHA (no vacío)

## Observability Impact

After this task completes, the following signals become inspectable:

- **Repo existence:** `gh repo view MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi --json visibility,url` → shows repo is public and accessible.
- **Remote config in worktree:** `git remote -v` → `origin https://github.com/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi (fetch/push)`.
- **Branch `main` content:** `gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/contents/index.html?ref=main` → confirms `index.html` is at root on `main`.
- **Commit SHA on remote:** `git ls-remote origin main` → SHA must match local `git rev-parse milestone/M009`.

**Failure state visibility:**
- If `gh repo create` fails, no remote is configured and `git remote -v` returns empty.
- If push fails, `git ls-remote origin main` returns empty.
- If the branch default is wrong, `gh repo view ... --json defaultBranchRef -q .defaultBranchRef.name` returns `milestone/M009` instead of `main`.

## Inputs

- Worktree limpio en `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M009` — último commit `95e54b3 feat(M008): Unitarios, Federales y la Era de Rosas`
- `gh` CLI instalado en `/c/Program Files/GitHub CLI/gh`, autenticado como `MaquedaPaul` con scope `repo`
- Branch actual: `milestone/M009`

## Expected Output

- Repositorio público en `https://github.com/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi`
- Remote `origin` configurado localmente
- Branch `main` en GitHub con todos los commits del proyecto (index.html, app.js, styles.css, audio/, README.md)
