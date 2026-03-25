# M009: Deploy a GitHub

**Vision:** Publicar el sitio en GitHub Pages para que sea accesible públicamente en internet.

## Success Criteria

- El repositorio `historia-argentina-haciendo-zoom-en-alberdi` existe en GitHub (público)
- La rama `main` está pusheada con todos los commits locales
- GitHub Pages está habilitado y el sitio responde con HTTP 200
- La URL pública es `https://<username>.github.io/historia-argentina-haciendo-zoom-en-alberdi/`

## Key Risks / Unknowns

- `gh` CLI puede no estar instalado o autenticado — verificar primero
- El GITHUB_TOKEN puede requerir permisos `repo` y `pages`
- Los archivos de audio son ~1.4MB cada uno — dentro del límite de GitHub (100MB por archivo)

## Slices

- [x] **S01: Crear repo, push y habilitar Pages** `risk:medium` `depends:[]`
  > After this: el sitio está live en GitHub Pages y accesible vía URL pública.
