# M009: Deploy a GitHub

## Scope

Publicar el sitio en GitHub Pages bajo el repositorio público `historia-argentina-haciendo-zoom-en-alberdi` en la cuenta del usuario.

## Goals

1. Crear el repositorio GitHub (público) con el nombre `historia-argentina-haciendo-zoom-en-alberdi`
2. Configurar el remote `origin` en el repo local
3. Commitear los archivos modificados pendientes (`.gitignore`, `audio/*.mp3`)
4. Hacer push de la rama `main` (o `master`) a GitHub
5. Habilitar GitHub Pages desde la rama `main` (root `/`)
6. Verificar que el sitio es accesible en `https://<username>.github.io/historia-argentina-haciendo-zoom-en-alberdi/`

## Constraints

- Repositorio: público
- Nombre: `historia-argentina-haciendo-zoom-en-alberdi`
- GitHub Pages: rama main, directorio raíz
- No modificar contenido del sitio — solo infraestructura de deploy
- Requiere `gh` CLI autenticado con token del usuario

## Out of Scope

- Dominio custom
- CI/CD
- Cambios de contenido
