# S02: De Tucumán a Buenos Aires — primeros pasos (1824–1833) — UAT

**Milestone:** M007
**Written:** 2026-03-20

## UAT Type

- UAT mode: artifact-driven + live-runtime
- Why this mode is sufficient: S02 is a static HTML integration slice — no backend, no API, no user input. Artifact-driven checks (grep, node) verify structural integrity. Live-runtime browser checks verify the reveal animation system, stagger timing, and JS console signals. A human reading the content in sequence verifies narrative coherence. All three layers were exercised in T03.

## Preconditions

1. `index.html` is the working file in the M007 worktree at `C:/Users/gabri/Desktop/historia/.gsd/worktrees/M007/index.html`
2. A local HTTP server is available to serve the file (e.g., `npx serve .` or VS Code Live Server on port 5500/8787)
3. Browser DevTools console is open before loading the page
4. The browser is not already scrolled — load from the top each time to test reveal animations correctly

## Smoke Test

Open `index.html` in a browser via local server. In the JS console, confirm:
```
[Reveal] Initialized with 61 elements
[SubNav] Initialized with 5 sub-periods, 5 links
```
If both messages appear, the page loaded correctly and the new cards are registered by the animation system.

---

## Test Cases

### 1. Quantitative card count verification

Run from shell in the worktree directory:

```bash
node -e "const h=require('fs').readFileSync('index.html','utf8'); const m=h.match(/data-certeza/g); console.log('data-certeza:', m?m.length:0);"
grep -c 'BIOG-[5678]' index.html
grep -c 'card-nota-certeza' index.html
```

1. Execute the three commands above.
2. **Expected:**
   - `data-certeza: 42`
   - `4` (BIOG-5, BIOG-6, BIOG-7, BIOG-8 comment markers)
   - `10` (4 from S01 + 6 new inline epistemic flags from S02)

---

### 2. Cards are inserted inside #rev-alberdi-formacion

```bash
grep -n 'rev-alberdi-formacion' index.html
grep -n 'BIOG-[5678]' index.html
```

1. Execute both commands.
2. **Expected:**
   - `rev-alberdi-formacion` appears on lines 327 (nav link), 344 (div open), 544 (div close comment)
   - BIOG-5..BIOG-8 all appear on lines between 344 and 544 (i.e., inside the sub-period div)

---

### 3. No new CSS or JS introduced

```bash
git diff --stat HEAD -- styles.css app.js
```

1. Execute the command.
2. **Expected:** Empty output (no lines changed in styles.css or app.js). Only `index.html` was modified.

---

### 4. Reveal animation system registers new cards

1. Open the site in a browser at the **top of the page** (not scrolled down).
2. Open DevTools → Console tab.
3. Reload the page.
4. Look for: `[Reveal] Initialized with 61 elements`
5. **Expected:** Exactly 61 (pre-S02 baseline was 57; 4 new cards add 4 reveal elements).

---

### 5. New cards reveal on scroll with stagger

1. Open the site in a browser.
2. Navigate to the "Infancia y Formación" sub-section (click the sub-nav link or scroll to `#rev-alberdi-formacion`).
3. Slowly scroll down through the section.
4. **Expected:** BIOG-5 slides in first (320ms delay), then BIOG-6 (400ms), then BIOG-7 (480ms), then BIOG-8 (560ms). Each card slides up from below with a distinct stagger — not all four appearing simultaneously.

---

### 6. Sub-nav is not disrupted

1. Open the site in a browser.
2. In DevTools → Console, check for: `[SubNav] Initialized with 5 sub-periods, 5 links`
3. Scroll to the #periodo-revolucion section.
4. Observe the sticky sub-navigation bar.
5. **Expected:** 5 links visible (S02 adds no new sub-nav link — `#rev-alberdi-formacion` already existed from S01). The sub-nav updates its active link as you scroll through sub-periods.

---

### 7. BIOG-5 card content and sources

1. In the browser, scroll to BIOG-5 ("El viaje a Buenos Aires: el Colegio de Ciencias Morales y Miguel Cané").
2. Read the card excerpt.
3. **Expected:**
   - Year label: `1824`
   - Mentions Felipe organizing the trip and the scholarship
   - Mentions Miguel Cané as "compañero de banco" at the Colegio
   - `card-nota-certeza` note about "ca. 1818" for the Colegio founding and "Martín Rodríguez" for the scholarship governance
   - Footer `<cite>` includes: JURSOC UNLP, elhistoriador.com.ar, Infobae, Yanzi Ferreira ANCMYP 2002, larramendi.es
   - Does NOT say "Colegio fundado en 1823" (planning error corrected)

---

### 8. BIOG-7 card: verified employment (not "copista en escribanía")

1. In the browser, scroll to BIOG-7 ("La tienda de Maldes, Volney y el piano de Mariquita").
2. Read the card excerpt.
3. **Expected:**
   - Mentions "dependiente en la tienda de don J. B. Maldes" — NOT "copista en escribanía"
   - Mentions Volney's *Las ruinas de Palmira* as first book read outside the Colegio
   - Mentions the room rented from Mariquita Sánchez de Thompson and her piano
   - Mentions 1832 music publications (*El espíritu de la música*, *Ensayo sobre un método nuevo*)
   - `card-nota-certeza` clarifies music was documented as artistic activity, not a paid job
   - Data-certeza = `hecho`, not `opinion`

---

### 9. BIOG-8 card: opinion classification with attribution

1. In the browser, scroll to BIOG-8 ("El derecho como instrumento: de la Academia de Jurisprudencia al título en Córdoba").
2. Read the card.
3. **Expected:**
   - Card renders with the **opinion card style** (different visual from hecho cards — blockquote, attribution footer)
   - `data-certeza="opinion"` in HTML
   - Year label: `ca. 1827–1834`
   - Mentions the Bachiller degree: "24 de mayo de 1834" and "Universidad de Córdoba"
   - Mentions the Academia de Jurisprudencia as a distinct institution from the Colegio
   - Attribution footer reads: "Lectura historiográfica de sus biógrafos, consistente con *Fragmento preliminar* (1837) y *Bases* (1852)"
   - `card-nota-certeza` notes that "motivación política" is historiographic reading, not a primary-source statement
   - Does NOT conflate Colegio de Ciencias Morales, UBA Facultad, Universidad de Córdoba, and Academia — names each distinctly

---

### 10. Narrative coherence S01 → S02

1. In the browser, scroll from BIOG-4 through BIOG-8 in sequence.
2. Read each card's opening and closing sentences.
3. **Expected transitions:**
   - **BIOG-4 → BIOG-5**: BIOG-4 ends with the beca that "en 1824, llevaría al joven tucumano a Buenos Aires"; BIOG-5 opens with "En 1824, con 14 años, Juan Bautista Alberdi emprendió el viaje desde Tucumán a Buenos Aires". No date contradiction, no repeated information.
   - **BIOG-5 → BIOG-6**: BIOG-5 establishes arrival and enrollment; BIOG-6 narrates the exit from the internado. The temporal flow is ca. 1824 → ca. 1825–1826. Consistent.
   - **BIOG-6 → BIOG-7**: BIOG-6 narrates departure from the Colegio; BIOG-7 narrates life after — the tienda, the books, the music. The period ca. 1825–1832 covers BIOG-7's entire span. Temporal overlap with BIOG-6 is expected and narratively coherent.
   - **BIOG-7 → BIOG-8**: BIOG-7 shows the independent period; BIOG-8 opens with the return to formal study. Clear cause/effect narrative: from wandering to purposeful legal training.

---

## Edge Cases

### Browser DevTools console shows N < 61 for Reveal

1. Open DevTools → Console.
2. Run: `document.querySelectorAll('.reveal').length`
3. If result < 61, run from shell: `grep -A2 'BIOG-[5678]' index.html | grep 'reveal-slide'`
4. **Expected:** 4 lines (one per new card). If fewer, a card is missing the `reveal reveal-slide` class.

### data-certeza count is 38 (baseline unchanged)

1. Run: `grep -n 'BIOG-[5678]' index.html`
2. **Expected:** 4 lines between L440–L544. If absent, the card insertion failed — inspect the Node.js splice output from T02.

### BIOG-8 renders visually as a hecho card (green indicator, no blockquote)

1. Run: `grep -A3 'BIOG-8' index.html | grep 'data-certeza'`
2. **Expected:** `data-certeza="opinion"`. If `data-certeza="hecho"`, the card was written with wrong certeza.

### card-nota-certeza count drops below 10

1. Run: `grep -c 'card-nota-certeza' index.html`
2. **Expected:** 10. A count < 10 means an epistemic flag was accidentally deleted — compare against T02/T03 baseline.

---

## Failure Signals

- `[Reveal] Initialized with N elements` where N < 61 → a new card is missing the `reveal` CSS class
- `[SubNav] Initialized with 5 sub-periods, 5 links` showing 4 → a sub-period div or nav link was accidentally deleted
- BIOG-7 mentions "copista" or "escribanía" → planning error was not corrected; the verified content (tienda de Maldes) must be used
- BIOG-8 rendered as a green hecho card → wrong certeza classification; should be blue opinion card with blockquote
- `data-certeza` count in shell returns 38 → cards were not inserted; T02 incomplete
- Any card in BIOG-5..8 is visible without scrolling to it (no reveal animation) → reveal classes missing or stagger delays set to 0

---

## Not Proven By This UAT

- **S03 continuity**: this UAT does not verify that BIOG-8's closing narrative (degree in Córdoba, Academia de Jurisprudencia) connects seamlessly with S03's opening (Tucumán 1833). That transition is S03's responsibility.
- **Mobile layout**: the four new cards follow established card templates — no new CSS was introduced — so mobile rendering should be identical to BIOG-1..4. Formal mobile verification at 375px and 320px was not run for S02 specifically (already verified for the card pattern in M003–M005).
- **Image rendering**: BIOG-5..8 have no images (per the draft). Image fallback behavior is not tested here.
- **Accessibility (keyboard navigation, screen reader)**: not explicitly tested in S02. The card HTML follows the same structure as S01–S04 cards which were audited in earlier milestones.
- **Historical depth (human judgement)**: the UAT tests structure, coherence, and source attribution but does not replace a human reader confirming that the content is "históricamente sólido y narrativamente coherente" as required by the M007 milestone UAT criteria.

---

## Notes for Tester

- **The temporal overlap between BIOG-6 and BIOG-7 is intentional.** BIOG-6 (ca. 1825–1826, abandono del internado) and BIOG-7 (ca. 1825–1832, tienda de Maldes y música) cover overlapping periods because they narrate different thematic threads happening simultaneously. This is not an error.
- **Two `card-nota-certeza` flags in BIOG-6**: one flags the quote attribution, one flags the uncertain abandonment date. Both are intentional and represent open research questions, not integration errors.
- **BIOG-8 year range is "ca. 1827–1834"**: this wider range captures the return to studies (ca. 1827), the law enrollment (ca. 1831–1832), and the Córdoba degree (1834). The card intentionally spans the full arc of the legal training period.
- **Do not attempt to look up "copista en escribanía" in the rendered site** — it is intentionally absent. The verified fact (tienda de Maldes) replaced the planning document's unverified claim.
