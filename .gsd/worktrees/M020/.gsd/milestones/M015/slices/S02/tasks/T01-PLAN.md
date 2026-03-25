---
estimated_steps: 4
estimated_files: 2
---

# T01: Splice section block and sub-nav link into index.html

**Slice:** S02 — Integración HTML
**Milestone:** M015

## Description

Insert the complete HTML block from `S01-CONTENT-DRAFT.md` into `index.html` at two confirmed splice points. The HTML was fully authored and verified in S01 — this task is purely mechanical insertion. No new HTML needs to be written.

Two Edit operations:
1. Insert the `<div id="rev-generacion-37" ...>` section block after `</div><!-- /#rev-1820-1835 -->` (line 1439).
2. Insert the sub-nav `<a href="#rev-generacion-37" ...>` link after the `<a href="#rev-1820-1835" ...>` link (line 330).

**Critical constraint:** The sub-nav HTML in S01-CONTENT-DRAFT.md line 310 uses a bare `<span>` — this is incorrect. All existing sub-nav links use `<span class="sub-nav__link-label">`. The correct sub-nav HTML to insert is:
```html
              <a href="#rev-generacion-37" class="sub-nav__link">1830–1837<span class="sub-nav__link-label">Generación del 37</span></a>
```

## Steps

1. Read `S01-CONTENT-DRAFT.md` lines 219–300 to get the exact section block HTML (the code block under "S02 debe insertar el siguiente bloque completo").

2. Use Edit on `index.html` to insert the section block. The `oldText` anchor is exactly:
   ```
           </div><!-- /#rev-1820-1835 -->
   ```
   The `newText` is that same line followed by the full section block (preserving the blank line before `<!-- SUB-PERÍODO ROSAS` that follows).

3. Use Edit on `index.html` to insert the sub-nav link. The `oldText` anchor is:
   ```
             <a href="#rev-1820-1835" class="sub-nav__link">1820–1835<span class="sub-nav__link-label">Anarquía y Guerras Civiles</span></a>
   ```
   The `newText` is that same line followed by the new link (with the corrected `sub-nav__link-label` class).

4. Verify with grep commands.

## Must-Haves

- [ ] `grep -c 'data-certeza=' index.html` returns 98
- [ ] `grep -n "rev-generacion-37" index.html` returns ≥3 lines (section div opening, section div closing comment, sub-nav href)
- [ ] The sub-nav link contains `sub-nav__link-label` class on its `<span>` (not a bare `<span>`)
- [ ] The inserted section block appears between `/#rev-1820-1835` and `#periodo-rosas` in the file

## Verification

```bash
grep -c 'data-certeza=' index.html
# → 98

grep -n "rev-generacion-37" index.html
# → ≥3 lines: one in sub-nav (line ~331), one opening div (~1440), one closing comment (~1530)

grep -n "rev-generacion-37" index.html | grep "sub-nav__link-label"
# → 1 line
```

## Inputs

- `.gsd/milestones/M015/slices/S01/S01-CONTENT-DRAFT.md` — complete HTML block (lines 219–300) and sub-nav HTML (line 310). Use the section block verbatim. **Do NOT use the bare-`<span>` sub-nav from line 310** — use the corrected version with `class="sub-nav__link-label"` instead.
- `index.html` — splice target. Anchor strings are stable: `</div><!-- /#rev-1820-1835 -->` and `<a href="#rev-1820-1835" class="sub-nav__link">1820–1835<span class="sub-nav__link-label">Anarquía y Guerras Civiles</span></a>`.

## Expected Output

- `index.html` — modified with 5 new cards in `#rev-generacion-37` section, sub-nav link for `1830–1837`, `data-certeza` count of 98.
