---
estimated_steps: 5
estimated_files: 0
---

# T02: Habilitar GitHub Pages y verificar URL pública

**Slice:** S01 — Crear repo, push y habilitar Pages
**Milestone:** M009

## Description

Con el repositorio ya creado y `main` pusheado (T01), este task activa GitHub Pages vía API REST y verifica que la URL pública responde HTTP 200 con el contenido del sitio.

GitHub Pages para un repo de usuario (no de organización) se activa con `POST /repos/{owner}/{repo}/pages` configurando `source.branch=main` y `source.path=/`. El build tarda normalmente 30–90 segundos.

## Steps

1. Activar Pages con la API de GitHub:
   ```
   gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages \
     --method POST \
     -f "source[branch]=main" \
     -f "source[path]=/"
   ```
   Si Pages ya está activo (error 409), continuar sin problema — ya está habilitado.
2. Esperar el build inicial: `sleep 60`.
3. Verificar estado: `gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --jq '.status + " " + .html_url'`. Debe mostrar `built https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi`.
4. Si el estado es `building`, esperar 30s más y reintentar hasta 3 veces.
5. Confirmar HTTP 200: `curl -s -o /dev/null -w "%{http_code}" https://MaquedaPaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/`.
6. (Opcional) Confirmar el título del sitio: `curl -s https://MaquedaPaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/ | grep -c "Historia Argentina"` → `>= 1`.

## Must-Haves

- [ ] GitHub Pages está habilitado (source: `main`, path: `/`)
- [ ] El estado de Pages es `built` (no `errored`)
- [ ] `curl` a la URL pública retorna HTTP `200`
- [ ] El HTML de la página contiene el texto `Historia Argentina`

## Verification

- `curl -s -o /dev/null -w "%{http_code}" https://MaquedaPaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/` → `200`
- `curl -s https://MaquedaPaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/ | grep -c "Historia Argentina"` → `>= 1`

## Observability Impact

- Signals added/changed: `gh api .../pages --jq '.status'` — devuelve `building` → `built` o `errored`
- How a future agent inspects this: `gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --jq '.status,.html_url,.source'`
- Failure state exposed: Si el estado es `errored`, `gh api .../pages/builds/latest --jq '.error.message'` muestra la causa

## Inputs

- T01 completado: repositorio público existe, branch `main` tiene todos los commits del sitio
- Cuenta `MaquedaPaul` autenticada con scope `repo` (incluye acceso a Pages API)

## Expected Output

- GitHub Pages activo en `https://MaquedaPaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/`
- La URL devuelve HTTP 200 con el HTML del sitio histórico
- El milestone M009 está completo: todos los success criteria del roadmap verificados
