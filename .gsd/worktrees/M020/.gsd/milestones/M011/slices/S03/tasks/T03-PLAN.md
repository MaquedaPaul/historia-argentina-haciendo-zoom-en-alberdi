---
estimated_steps: 4
estimated_files: 1
---

# T03: Verificación final y commit

**Slice:** S03 — Integración HTML
**Milestone:** M011

## Description

Check integral post-integración de todos los invariantes del slice. No hay código nuevo que escribir — este task solo lee, verifica, corrige si hay discrepancias, y commitea. Es la puerta de salida del milestone M011.

## Steps

1. **Ejecutar todos los checks de conteo**:
   ```bash
   grep -c 'data-certeza' index.html                  # debe ser 101 (93 baseline + 8 cards nuevas)
   grep -c 'reveal reveal-slide' index.html            # debe ser 106 (98+8)
   grep -c 'data-id="M011-' index.html                # debe ser 8
   grep -c 'data-certeza="hecho"' index.html           # debe ser 71 (66+5: CANE-1, MARIQ-1, RED37-1, RED37-2, ROM-1)
   grep -c 'data-certeza="debatido"' index.html        # debe ser 7 (5+2: ENC-1, CANE-2)
   grep -c 'data-certeza="rumor"' index.html           # debe ser 4 (3+1: ROM-2)
   grep -c 'card-nota-certeza' index.html              # debe ser ≥26 (23 baseline + ≥3 de MARIQ-1, CANE-2, ROM-2)
   ```
   **Nota sobre los counts exactos:** Los baselines declarados en el plan son aproximados según la exploración inicial. Si los números difieren ligeramente, verificar cuáles M011 cards están presentes con:
   ```bash
   grep 'data-id="M011-' index.html
   ```
   y confirmar que los 8 IDs están: M011-CANE-1, M011-CANE-2, M011-MARIQ-1, M011-RED37-1, M011-RED37-2, M011-ROM-1, M011-ROM-2, M011-ENC-1.

2. **Checks de failure-path (críticos)**:
   ```bash
   git diff --name-only HEAD -- styles.css app.js   # DEBE retornar vacío — si no, algo modificó CSS/JS
   grep -n '\[VERIFICAR\]' index.html               # DEBE retornar vacío — si no, hay flags de investigación sin resolver
   grep -n 'S10.*S24 cards will be appended' index.html  # DEBE retornar 1 línea — el marker existe
   grep -n 'card-nota-historiografica' index.html   # debe incluir la nota de ENC-2
   ```

3. **Si algún count está incorrecto**, identificar la card faltante:
   ```bash
   for id in M011-CANE-1 M011-CANE-2 M011-MARIQ-1 M011-RED37-1 M011-RED37-2 M011-ROM-1 M011-ROM-2 M011-ENC-1; do
     count=$(grep -c "data-id=\"$id\"" index.html)
     echo "$id: $count"
   done
   ```
   Si alguna card falta (count=0), aplicar el splice correctivo siguiendo el template y las instrucciones de T01 o T02 para esa card antes de continuar.

4. **Commit**:
   ```bash
   git add index.html
   git commit -m "feat(M011-S03): integrate 8 M011 cards into index.html

   - CANE-1: Alberdi–Cané amistad (hecho, después de BIOG-5)
   - CANE-2: despedida del exilio y el cielo (debatido, después de CANE-1)
   - MARIQ-1: Mariquita Sánchez de Thompson (hecho, después de BIOG-7)
   - RED37-1: Salón Literario cristalización de la red (hecho, después de BIOG-11)
   - RED37-2: Echeverría catalizador 1830–1837 (hecho, después de RED37-1)
   - ROM-1: patrón de discreción sentimental de Alberdi (hecho, grid 2)
   - ROM-2: Ana María Medeiros candidata sin fuente (rumor, grid 2)
   - ENC-1: lobby de Encarnación para la Suma (debatido, #periodo-rosas)
   - ENC-2 integrado como nota-historiografica inline dentro de ENC-1"
   ```

## Must-Haves

- [ ] `grep -c 'data-id="M011-' index.html` retorna 8
- [ ] `git diff --name-only HEAD -- styles.css app.js` retorna vacío
- [ ] `grep -n '\[VERIFICAR\]' index.html` retorna vacío (0 resultados)
- [ ] El marker `<!-- S10–S24 cards will be appended here -->` sigue existiendo
- [ ] Commit realizado con mensaje descriptivo

## Verification

```bash
grep -c 'data-id="M011-' index.html        # 8
git diff --name-only HEAD -- styles.css app.js  # vacío
grep -n '\[VERIFICAR\]' index.html          # vacío
grep -n 'S10.*S24 cards will be appended' index.html  # 1 línea
git log --oneline -1                        # commit visible con mensaje feat(M011-S03)
```

## Inputs

- `index.html` output de T02: 8 articles M011 integrados
- Baselines de S03-RESEARCH.md: 93 `data-certeza` pre-integración, 98 `reveal reveal-slide` pre-integración, 23 `card-nota-certeza` pre-integración
- Lista de 8 IDs esperados: M011-CANE-1, M011-CANE-2, M011-MARIQ-1, M011-RED37-1, M011-RED37-2, M011-ROM-1, M011-ROM-2, M011-ENC-1

## Expected Output

- `index.html` — estado final verificado con 8 M011 articles; commit en el repositorio
- Salida de `git log --oneline -1` muestra el commit `feat(M011-S03): integrate 8 M011 cards into index.html`
