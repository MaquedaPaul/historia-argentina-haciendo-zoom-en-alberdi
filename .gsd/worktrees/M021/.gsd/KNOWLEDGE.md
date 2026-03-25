# KNOWLEDGE

## Wikimedia Commons Image Sourcing

**Context:** M002-S02 needed public domain historical images for colonial-era cards.

- **Use the Wikimedia API** (`/w/api.php`) to verify exact thumbnail URLs rather than guessing paths. The API reliably returns valid `thumburl` fields. Direct URL construction from file names often fails due to MD5 hash-based directory paths.
- **500px thumbnails** (`/thumb/.../500px-...`) are the sweet spot for card images — large enough for quality display but small enough for fast loading. Original files can be 5000px+ and multi-MB.
- **Wikimedia rate-limits CLI requests** (curl/wget) without proper User-Agent headers, returning 429 errors. This does NOT affect browser rendering — browsers load the images fine. Don't diagnose "broken images" based on curl failures.
- **Pre-1900 artworks are public domain** — look for PD-old, PD-Art, or PD-US tags on Wikimedia. Period paintings, engravings, maps, and illustrations from the colonial era are safe to use.
- **Not everything has a suitable image** — mythical/legendary subjects (Ciudad de los Césares) may have no public domain depiction. Use a styled placeholder with descriptive alt text rather than a misleading image.
- **When a candidate filename is MISSING, use the Wikimedia search API** (`list=search&srnamespace=6`) to discover the actual filename. Common issue: filenames have accented characters (é, ó, ñ) or differ in capitalization. Always search first, then query the exact returned filename.
- **Small Wikimedia images have no 500px thumb** — the API returns the original URL without a `/thumb/` path when the source image is smaller than the requested width. In HTML, use the direct URL and set `width="100%"` on the `<img>` to fill the card container. Don't guess at thumb paths — they won't work.
- **Wikimedia search for historical events often finds PDF books, not images** — add "retrato" (portrait), "pintura" (painting), or "litografia" to narrow searches for images. For specific battles without known paintings, fall back to a period portrait of the key figure rather than a generic illustration.
- **CC BY 2.5 and CC BY-SA 4.0 images are usable** in educational/nonprofit contexts with attribution — flag them in the content draft and include attribution in HTML `<cite>` tags. Don't use CC NC or CC ND.
- **Try `commons.wikimedia.org/w/api.php` when `en.wikipedia.org/w/api.php` returns `"missing"`** — confirmed M021-S01: 4 of 7 candidate images existed only on Commons, not on English Wikipedia. Commons has much broader coverage for Latin American historical images. The fix is a single URL swap: change `en.wikipedia.org` to `commons.wikimedia.org` in the API call. Response format is identical.

## CSS Animation Integration with Reveal System

**Context:** M002-S02 added a CSS-animated timeline that triggers via the existing IntersectionObserver reveal system.

- **Pattern:** Add `.reveal .reveal-fade` classes to the animated element. The IntersectionObserver adds `.reveal--visible` on scroll, which triggers CSS `@keyframes` animations via the class change.
- **Stagger technique:** Use `nth-child` selectors with increasing `animation-delay` values. Time the delays to match any progress bar animation so markers "pop" in sequence.
- **Always add `prefers-reduced-motion`:** Include a `@media (prefers-reduced-motion: reduce)` block that sets the element to its final state with no animation. This is an accessibility requirement.

## Video Embed Availability

**Context:** M002-S02 searched for embeddable colonial Argentina videos but couldn't find a guaranteed-available option.

- **Don't assume YouTube embeds will be available** for niche historical topics. Canal Encuentro documentaries exist but may have embed restrictions.
- **CSS animation is a reliable fallback** — self-contained, no external dependencies, works offline, and can be more visually integrated with the page design than an iframe.
- **Build the responsive video CSS anyway** — the `.responsive-video` wrapper class (aspect-ratio: 16/9, max-width, centering) takes ~15 lines of CSS and enables zero-work video addition later.

## Content Draft as Intermediate Artifact

**Context:** M002-S01 created a structured content draft before touching HTML.

- **Create a content draft markdown file first** (e.g. `S01-CONTENT-DRAFT.md`) with title, date, certeza type, excerpt, sources, cite references, and image notes for each event. This catches factual errors and classification problems before the HTML integration task begins.
- **Structure each entry consistently:** Title → Date display → Certeza type → Excerpt (2-4 sentences) → Sources (≥2 for hecho) → Cite reference → Image placeholder notes. This makes the HTML integration task mechanical rather than creative.
- **Separate research from integration** — The high-risk work (historical accuracy, source verification, certeza classification) happens in the draft. The HTML integration becomes low-risk copy-paste following established templates. This decomposition proved correct in M002.

## Card Template Reuse Across Periods

**Context:** M002 colonial cards follow the same HTML structure as M001 revolución cards.

- **The three card templates are stable:** `card-hecho` (cite footer), `card-opinion` (blockquote + attribution), `card-rumor` (origin footer with amber badge). Copy structure from existing cards when adding new period content.
- **Image fallback is automatic:** The `initImageFallbacks` function in `app.js` auto-discovers all `.card-image img` elements on DOMContentLoaded. New cards with images get fallback handling for free — no per-card JS wiring.
- **Stagger delays are manual:** Set `style="--reveal-delay: Nms"` on each card. Increment by 80ms per card for smooth stagger effect. The reveal system in app.js reads this custom property.
- **The `events-grid--certeza` class** on the grid container enables the certeza-aware card sizing. Don't forget it when adding new period grids.

## Bash Heredoc Reliability on Windows/Git Bash

**Context:** T03 (M003-S01) attempted to append a large multi-line content block using a bash heredoc (`cat >> file << 'ENDOFSP3'`). The heredoc delimiter was never reached by the parser — likely due to shell state or a content parsing issue — causing a partial write before the heredoc terminated. A subsequent correct append (`cat file >> target`) duplicated the partial content.

**Avoid heredocs for content that will be appended to files.** Instead:
1. Write the content to a temp file using the `Write` tool.
2. Then `cat /path/to/temp >> /path/to/target` to append.
3. Verify event count after append: `grep -c "^## Evento SP" file`.
4. If duplicated, use Node.js (not Python — unavailable in this shell): `node -e "const fs=require('fs'); const lines=fs.readFileSync(path,'utf8').split('\n'); fs.writeFileSync(path, [...lines.slice(0,N),...lines.slice(M)].join('\n'), 'utf8');"`

**Python is not available** in this shell environment (`python3`/`python` both redirect to Microsoft Store). Use Node.js for any scripted file manipulation.

## Alberdi Quote Verification Protocol

**Context:** Multiple T01–T03 tasks needed verified Alberdi direct quotes with primary-source citations.

- **Direct quotes from *Bases y puntos de partida* (1852) are the most reliable** — the text is digitized in multiple editions and the *Obras Completas* is widely indexed. Chapter-level citations (e.g., cap. XXVII for «Gobernar es poblar») are sufficient for academic use.
- **Quotes from lesser-known exile works** (*La acción de la Europa en América*, 1842; *Memoria sobre un Congreso*, 1844) need paginación verification against a digitized text before HTML render. Flag these with `[VERIFICACIÓN PENDIENTE]` in the draft.
- **Never synthesize a direct quote** from secondary sources. If a quote is paraphrased in a biography, cite the biography not the original. Mark synthesized text clearly as `[PARÁFRASIS — NO USAR COMO CITA DIRECTA]`.
- The *Mi vida privada* (ca. 1872-1882) is the most reliable source for Alberdi biographical facts — published in *Obras Completas*, t. VIII, La Tribuna Nacional, Buenos Aires, 1886-1887.

## Reveal System: `reveal--no-anim` vs `reveal--visible` for CSS Animations

**Context:** M003-S02-T02 — revolucion-timeline animation gate.

- The `revealOnScroll()` function in `app.js` gives elements already in the viewport on page load `reveal--no-anim` (not `reveal--visible`). CSS animations gated on `.reveal--visible` will NOT fire for these elements — they appear instantly with no animation. This is intentional (avoids flash-of-animation on already-visible elements).
- **Testing tip:** To test an animation that uses `.reveal--visible` as the trigger, navigate to the page from the top (not already scrolled to the element). Calling `scrollIntoView()` before `DOMContentLoaded` fires often results in `reveal--no-anim` instead.
- **This is correct behavior** — timeline animations are progress rewards for scrolling, not guaranteed on every page load.

## Alternating Above/Below Labels for Dense Timelines

**Context:** M003-S02-T02 — 10 markers in ~800px caused label overlap for dates 2-3 years apart.

- **Pattern:** Add modifier class `.revolucion-timeline__marker--above` to flip label from `top: 1.1rem` to `bottom: 1.1rem`. Apply to markers close to the preceding marker (1820 after 1816, 1829 after 1826, 1838 after 1835).
- **Add a separate `@keyframes` for above-entering labels** — `translateY(-4px)` to `translateY(0)` instead of `translateY(4px)` to `translateY(0)`.
- **Mobile (< 30rem): hide sublabels** — `display: none` on `.revolucion-timeline__label small` reduces visual density.
- **Track margin:** Increase top margin to `3.5rem` (not just bottom) to accommodate labels above the track.

## Multiple Concurrent IntersectionObservers

**Context:** M003-S02 added a third IntersectionObserver (sub-nav) alongside the existing main scroll spy and reveal-on-scroll observers.

- **Three observers, three distinct `rootMargin` values:** Main scroll spy uses `-10% 0px -60% 0px`; sub-nav observer uses `0px 0px -70% 0px` (fires when sub-period enters top 30% of viewport); reveal-on-scroll uses `threshold: 0.15`. Any fourth observer must use a distinct rootMargin to avoid interference — document all three in code comments.
- **Scope each observer to a specific element set:** The sub-nav observer targets only `.sub-period` elements inside `#periodo-revolucion` — not all `.sub-period` or all sections. Element set scoping is the primary isolation mechanism, not just rootMargin.
- **`position:sticky` sub-navs inside their section auto-dismiss** — when the user scrolls out of the section, the sticky element naturally leaves the viewport. No explicit show/hide logic needed. Use `sticky` not `fixed` for section-scoped navigation.
- **Initial active state via `requestAnimationFrame`** — set the first link active on `requestAnimationFrame` after DOMContentLoaded. Setting it synchronously during init races with the reveal observer; rAF gives the paint cycle time to stabilize.

## Expand/Collapse CSS Transition Pattern

**Context:** M003-S02-T03 added expand/collapse toggles to event cards with smooth CSS `max-height` + `opacity` transitions.

- **rAF between `hidden=false` and adding expanded class:** When removing the `hidden` attribute and then immediately adding a CSS animation class, the browser may batch both as a single paint — resulting in no transition (instant show). Use `requestAnimationFrame(() => el.classList.add('expanded'))` to guarantee a separate paint frame.
- **Restore `hidden` after collapse via transitionend:** After removing the expanded class, the element is not hidden immediately (transition runs). Add a one-time `transitionend` listener that re-sets `hidden=true` if the expanded class is absent. This restores native semantic hiding after animation completes.
- **`max-height` transition cap:** Set the expanded `max-height` generously (e.g., 40rem) so content is never clipped. The actual rendered height will be smaller; the transition fills from 0 to the cap. Do NOT use `max-height: none` as the transition target — browsers cannot interpolate to `none`.
- **Event delegation on the section root** is more reliable than per-card listeners for dynamically revealed content, since IntersectionObserver may add classes after initial binding. `.closest('.card-expand-toggle')` on `event.target` handles clicks on child spans too.

## Nota Historiográfica Pattern for Contested-History Cards

**Context:** M004-S01-T03 — Conquista del Desierto card (Evento 3).

- **Use a `<p class="card-nota-historiografica">` inside the card body** (not a collapsible toggle) when the historiographic debate is about the *card's own classification* (e.g., "is this genocide or territorial expansion?"). The note must be visible — collapsing it would obscure an epistemic notice that readers need to see.
- **Reserve expand/collapse toggles for supplementary detail**, not for meta-epistemic notices about the card's nature.
- **Bold label convention:** `<strong>Nota historiográfica:</strong>` as the first element of the paragraph, following the existing pattern from debate-card comments in M003.
- The class `card-nota-historiografica` does not require CSS addition if the design uses existing paragraph typography — it's a semantic hook for future styling.

## Inline Epistemic Flag Pattern (card-nota-certeza)

**Context:** M004-S01-T03 — Alberdi death date uncertainty.

- **Use `<span class="card-nota-certeza">[Nota: ...]</span>` inline in prose** when a specific fact within a card has an unresolved verification flag. This makes the flag visible in rendered HTML without requiring an HTML comment that readers might miss.
- This is distinct from `[VERIFICACIÓN PENDIENTE]` in source draft files — those are for authors; the `card-nota-certeza` span is for displayed content.
- Future agents inspecting for unresolved flags: `document.querySelectorAll('.card-nota-certeza')` returns all visible epistemic notices.

## CC BY-SA Attribution Block Placement

**Context:** M004-S01-T03 — Alberdi portrait (Flickr/bastique, CC BY-SA 2.0).

- Place `<p class="img-attribution">` **inside `.card-image` immediately after the `<img>`** — not in the card footer `<cite>`. This co-locates the license attribution with the image it licenses, which is both the CC requirement convention and visually clearest for readers.
- The `card-source` footer `<cite>` is for historical source citations, not image licenses.

## Certeza Attribute Accent Normalization (`data-certeza`)

**Context:** M004-S02-T02 — verification pass CR6.

- Cards may use `data-certeza="opinion"` (no accent) **or** `data-certeza="opinión"` (with accent) depending on which period they were authored in. Both values are in use across the codebase.
- Verification queries for opinión cards must select **both variants**: `[data-certeza="opinion"], [data-certeza="opinión"]`. Querying only the accented form will return 0 results and produce a false failure.
- The same normalization pattern may apply to other values with accents (`"hecho"` has no accent issue, but future values like `"rumor"` are safe; watch for any that add diacritics).

## Photographic vs. Artistic Image Selection for Contested-History Cards

**Context:** M004-S01-T02 — choosing between Antonio Pozzo's field photograph and the Juan Manuel Blanes heroic painting for the Conquista del Desierto card.

- **Prefer primary-source documentary photographs over interpretive paintings** when the card documents a contested historical event. The Blanes painting "La conquista del desierto" (1889) takes an explicit heroic stance on an event that is historiographically disputed. The Pozzo field photograph is neutral documentation.
- **This distinction matters especially for `card-nota-historiografica` cards** — using interpretive art would editorialize the very event whose framing is flagged as contested.
- **The same photographer can reinforce cross-card narrative threads.** Antonio Pozzo photographed both the 1879 army expedition (Evento 3) and Roca as Minister of War (Evento 4). Surfacing this in captions creates a non-text visual connection between adjacent cards.

## Wikimedia Category API as Fallback for Missing Images

**Context:** M004-S01-T02 — Conquista del Desierto search returned zero results for exact Spanish terms.

- When `list=search&srnamespace=6` returns no usable images, try `list=categorymembers&cmtitle=Category:...` to browse related files by category.
- The Conquista del Desierto category yielded the Blanes painting — which confirmed the Pozzo photograph was preferable, even though the category search didn't produce the final choice.
- Category API is especially useful for events with period-specific Spanish naming (e.g., "Campaña del Desierto" vs. "Conquista del Desierto").

## Panoramic Section Calibration (7 cards covers 40 years)

**Context:** M004 panoramic scope vs. M003 detailed scope.

- **7 events / 40 years = ~1 card per 5.7 years** at panoramic density. This is the right density for a "grandes rasgos" section — each card covers a multi-year cluster, not a single event.
- **Multi-year card titles** should use date ranges (e.g., "1862–1880") not single years, to signal that the card is a cluster summary.
- **This is different from M003 (detailed)** where individual events like Caseros (1852) or the Constitución (1853) each get their own card. Don't apply the same granularity to panoramic sections.

## Animated Timeline: nth-child Offset Depends on Track Structure

**Context:** M004-S02-T01 — nacional-timeline uses a `<div class="nacional-timeline__progress">` as an explicit element (first child), unlike the colonial-timeline which uses a `::before` pseudo-element.

- **When the progress bar is an explicit child element** (not `::before`), nth-child stagger selectors for markers must start at `nth-child(2)`, not `nth-child(1)`.
- **When the progress bar is a `::before` pseudo-element**, nth-child(1) correctly targets the first marker because pseudo-elements don't participate in nth-child counting.
- Always inspect the DOM structure before setting up stagger selectors — the pattern differs between timeline variants in this codebase.

## Hamburger Nav: position:sticky is a Positioned Ancestor for Absolute Children

**Context:** M005-S01-T01 — hamburger button uses `position: absolute` inside `.site-nav` (which is `position: sticky`).

- `position: sticky` elements ARE positioned ancestors — `position: absolute` children anchor to them, same as `position: relative`. No extra `position: relative` wrapper is needed.
- When the nav list is `max-height: 0; overflow: hidden`, the `.site-nav` has no natural height from its children. Add `min-height: 44px` to the nav at mobile so the hamburger button has a visible bar to sit in.
- **transitionend for --nav-height:** Measure `nav.offsetHeight` inside a one-time `transitionend` listener on `.nav-list` rather than immediately after toggling the class — the height hasn't changed yet when the class is first applied.
- **`max-height: none` cannot be transitioned** — use a concrete pixel value like `12rem` as the open-state `max-height`. The content will render at its actual height (smaller than 12rem); the browser interpolates from 0 to 12rem for the animation.

## CSS Grid auto-fill breakpoint boundary gotcha

**Discovery:** `@media (max-width: 48rem)` catches exactly `768px` (48rem × 16px/rem = 768px), which is a common "tablet" DevTools preset. If you force `grid-template-columns: 1fr` inside this block, you prevent 2-column layout at 768px even though the container has enough space.

**Fix:** Move single-column grid overrides to `max-width: 40rem` (640px) — at this width, the minimum card width of 20rem makes 2 columns physically impossible anyway, so the override is redundant at 40rem but harmless.

**Related gotcha:** In CSS grid auto-fill, check whether 2 columns physically fit by computing `2 × min_width + 1 × column_gap ≤ container_width`. If this fails, auto-fill gives 1 column regardless of any explicit rules.

**Example:** `.events-grid--certeza` with `minmax(min(100%, 22rem), 1fr)` and `gap: 32px` at 768px (container ≈ 720px): `2×352+32=736>720` → 1 column. Reducing minmax to 20rem: `2×320+32=672<720` → 2 columns.

## Parallax ::before + Existing ::before Conflict (pseudo-element specificity)

**Context:** M005-S02-T01 — adding parallax `::before` to `.period` when `.period--featured::before` was already defined as an accent bar.

- **CSS specificity: `.period--featured::before` overrides `.period::before`.** If a more-specific pseudo-element rule already exists on a child class, adding the parallax rule to the parent class silently breaks the more-specific element (its `::before` gets the parallax transform instead of its accent bar). The solution is to migrate the existing `::before` usage to `::after` on the affected element, freeing `::before` for the inherited parallax rule.
- **Check for existing `::before` rules on child classes before adding a `::before` to a parent class.** Run `grep -n "::before" styles.css` to discover conflicts before implementation.
- **The content inside `.period` sections has no `::after` usage** — `::after` was available for the accent bar migration. Always audit `::after` availability too before choosing a resolution strategy.

## Reveal-Gated Keyframe Animation Pattern

**Context:** M005-S02-T02 — golden glow on key event cards triggered by IntersectionObserver.

- **Pattern:** `.reveal--visible.card--special { animation: my-anim ... forwards; }` — the compound selector fires the CSS animation the instant the IntersectionObserver adds `reveal--visible`. No extra JS observer is needed. The animation plays once and holds its end state (`forwards`).
- **Gate the reduced-motion override on the base class, not the compound selector:** `@media (prefers-reduced-motion: reduce) { .card--special { animation: none; } }` — targeting `.card--special` (without `.reveal--visible`) means the override applies regardless of whether the reveal class has been added yet. Overriding the compound selector would lose the race if the observer fires before the media query evaluates.
- **Add an animation-delay** (0.3s in this implementation) when combining with an existing `opacity`/`transform` reveal transition — this prevents both effects from competing at t=0 and makes each animation readable independently.
- **`box-shadow` is the right property for a "glow" effect on reveal** — it composites on the GPU without triggering layout reflow, and is compatible with existing `opacity`/`transform` transitions on the same element.

## Generating Valid Silent MP3 Placeholders Without ffmpeg

**Context:** M005-S03-T01 — audio asset sourcing when ffmpeg is unavailable.

- **Problem:** No ffmpeg means no OGG→MP3 conversion and no MP3 trimming. Freesound.org requires a registered account for downloads. Wikimedia Commons has good CC0/PD audio but mostly OGG format and often too large (1–8MB).
- **Solution:** Generate valid MPEG1 Layer3 silent MP3 files entirely in Node.js using `Buffer`. Frame structure: `0xFF 0xFB` (sync + MPEG1 + Layer3 + no CRC) + `0x90` (128kbps + 44100Hz) + `0x00` (stereo) + 413 zero bytes. Frame size = 417 bytes for 128kbps/44100Hz. 1149 frames = 30 seconds = 468KB.
- **Key formula:** `NUM_FRAMES = Math.ceil(duration * 44100 / 1152)` where 1152 = samples per MPEG1 L3 frame. Frame size = `floor(144 * bitrate_kbps * 1000 / sample_rate)` = `floor(144 * 128000 / 44100)` = 417 bytes.
- **Browser compatibility:** Chrome, Firefox, Edge, and Safari all decode these as valid 30-second silent MP3 files. `audio.onloadedmetadata` fires with `duration ≈ 29.95`.
- **Real audio swap-in:** Drop replacement files with the same names into `audio/` — zero code changes needed. This is the correct placeholder strategy when external assets are unavailable during development.

## MutationObserver on Nav Items for Sound Track Switching

**Context:** M005-S03 needed audio track switching when the scroll spy changes the active period, without modifying the scroll spy.

- **Pattern:** Attach `MutationObserver` to each `.nav-item` (children of `.nav-list`) with `{ attributes: true, attributeFilter: ['class'] }`. When any nav-item's class changes, re-read `getActivePeriodId()` from the DOM (find `.nav-item--active` → read its link href). This decouples the sound system from the scroll spy internals entirely.
- **Why not observe the list itself with subtree:true?** Subtree observation fires for all descendant mutations. Observing each `.nav-item` individually with `attributeFilter: ['class']` is precise and only fires when exactly the right thing changes.
- **Fade chain for track switching:** `fadeOut(prev, onDone)` with a callback that triggers `playWithFade(next)`. This is simpler than Promise chaining and avoids creating microtask bloat in animation-critical code.
- **WeakMap for fade interval IDs:** Storing `setInterval` IDs in a `WeakMap` keyed by the audio element gives O(1) lookup and automatic GC. More reliable than parallel arrays or element-attached data attributes.
- **Volume ceiling in fade, not in play():** Always fade from 0 → MAX_VOLUME (not from current volume). This ensures volume is deterministic regardless of prior interrupted fades.
- **Paused audio has volume:1 (browser default):** This is harmless — `playWithFade()` always resets to 0 before `play()`. Cosmetically confusing in devtools but correct behavior.

## Lighthouse Mobile Performance on Local Static Sites

**Context:** M005-S04-T03 — running Lighthouse mobile audit against a local http-server vs deployed HTTPS site.

- **Lighthouse mobile simulates 4G slow (1.6Mbps) + 4x CPU throttle.** A local uncompressed server skips gzip, making file sizes appear much larger than they'd be on GitHub Pages or Netlify (which auto-enable gzip). A 66KB CSS file transferred uncompressed kills FCP; the same file at ~12KB gzipped loads 5× faster.
- **The `content-visibility: auto` CSS property** on off-screen sections (`.period`) dramatically reduces Style & Layout work on mobile CPU. In this project: 1167ms → 859ms. Add `contain-intrinsic-size` estimate to avoid CLS from placeholder height.
- **Async font loading pattern** (`rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'"`) converts Google Fonts from a render-blocking resource to a non-blocking async load. Critical for FCP on slow connections.
- **`aspect-ratio` on image containers** (not just `<img>` elements) prevents CLS. If the container collapses before images load, it causes layout shift even if the images themselves have intrinsic dimensions.
- **Lighthouse CLI on Windows** requires full path to Chromium. Use `CHROME_PATH=".../chromium-1208/chrome-win64/chrome.exe"`. The cleanup step errors on Windows (`EPERM`) but the JSON report is still written — check `/tmp/lh-report.json`.
- **Lighthouse score variance** between runs can be ±5 points for Performance. Run at least 2 times and use the average. Accessibility and SEO are stable across runs.
- **WCAG text-muted on warm backgrounds fails.** This project uses `--color-bg-warm: #ede6d6` for the footer background. The default muted text (#7a6b5a = 4.14:1 on #ede6d6) fails AA. Fix: use `--color-text` in footer elements, or test every muted-text/bg combination.

## gh repo create --source Incompatible with Git Worktrees

**Context:** M009-S01-T01 — creating the GitHub repo from a git worktree (where `.git` is a file pointer, not a directory).

- **`gh repo create --source .` fails in git worktrees** with "current directory is not a git repository". The `gh` CLI reads `.git` and expects a directory; a worktree `.git` file (`gitdir: ...`) is not recognized.
- **Work-around:** Create the repo first without `--source` (`gh repo create OWNER/REPO --public --description "..."`), then configure the remote on the **main repo root** (the real `.git` directory parent): `git remote add origin https://github.com/OWNER/REPO.git`.
- **Remotes configured at the main repo root are inherited by all worktrees** — git worktrees share the `.git` object store and ref store, including remotes. You do not need to configure the remote separately in each worktree.
- **Push a non-main branch as main:** `git push origin non-main-branch:main`. Then set it as default: `gh repo edit OWNER/REPO --default-branch main`.
- **GitHub Pages POST response contains `status: null`** (not `"building"`) until the first build job queues. Polling the GET endpoint is the correct readiness signal — do not interpret the POST response status as a build state.

## JS Syntax Check in Node.js for Browser Code

Using `node -e "eval(require('fs').readFileSync('app.js','utf8'))"` to verify browser JS syntax will **always fail** with `ReferenceError: document is not defined` because `eval()` executes the code in the Node.js runtime where browser globals don't exist. This produces a false-positive "syntax errors found" result even when the syntax is valid.

**Correct approach:** Use `new Function(src)` which parses for syntax errors only without executing:
```bash
node -e "
try {
  new Function(require('fs').readFileSync('app.js','utf8'));
  console.log('syntax OK');
} catch(e) {
  if (e instanceof SyntaxError) console.error('SYNTAX ERROR:', e.message);
  else console.log('syntax OK (runtime-only error)');
}
"
```
`new Function()` constructs a function body from the string but does not execute it, so DOM calls are never invoked — only parse-time syntax errors surface.

## Script Tag Order vs Modal HTML in IIFE

When a vanilla JS IIFE (Immediately Invoked Function Expression) calls `document.getElementById('some-element')` during script execution, the element MUST exist in the HTML **before** the `<script>` tag. If the element is defined after the script tag, `getElementById()` returns `null` and any code that depends on it silently fails (in this codebase: `initImageModal()` logs a warning and returns early, leaving no click delegation).

**Detection:** `document.querySelector('.card-image img').getAttribute('tabindex')` returns `null` instead of `'0'` — the last step of `initImageModal()` sets `tabindex="0"` on all card images. A `null` result means the init function bailed out.

**Fix:** Move the dependent HTML (the modal `<div>`) to a position **before** the `<script src="app.js">` tag, or convert the IIFE to listen for `DOMContentLoaded`.

**In this project:** `<script src="app.js">` was at line 2806 and `<div id="img-modal">` was at line 2809 — swapping order resolved the issue.

## iOS Safari Modal Scroll-Lock: Requires Both body AND documentElement

**Context:** M013-S02-T01 — modal background scroll was not locked on iOS Safari.

- **iOS Safari ignores `document.body.style.overflow = 'hidden'` alone.** The browser treats the document root (`<html>`) as the scroll container, not `<body>`. Scroll continues in the background even with body overflow hidden.
- **Fix:** Set overflow on both elements in `openModal()` and reset both in `closeModal()`:
  ```js
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  ```
- **Verification:** In DevTools console with modal open: `document.body.style.overflow` and `document.documentElement.style.overflow` should both return `'hidden'`. If either returns `''`, scroll-lock is incomplete on iOS.
- **This is a well-known iOS Safari quirk** — applies to any fullscreen overlay/modal that needs to prevent background scroll. The fix is two lines, not a complex workaround.

## Remote Divergence on Push: .gsd Force-Tracked Files Cause add/add Conflicts

**Context:** M013-S03-T01 — pushing merged milestone/M013 branch to origin/main.

- **`.gsd/` is listed in `.gitignore` but some commits force-added files via `git add -f .gsd/...`.** This means `.gsd/` plan files appear as tracked, and both local and remote histories may independently add the same `.gsd/` file, causing an add/add merge conflict.
- **When `git push` is rejected due to remote divergence**, run `git fetch origin` + `git log --oneline origin/main..main` and `git log --oneline main..origin/main` to understand the divergence. If the remote's extra commits only touch `.gsd/` files, a safe resolution is `git merge origin/main` + keep HEAD for all conflicts.
- **`git checkout --ours <file>` does NOT work with force-added files when `.gitignore` includes the directory.** Git reports "The following paths are ignored by one of your .gitignore files: .gsd" even for force-tracked files. **Work-around:** The conflict markers are already in the file — just rewrite the file content directly (write tool) or use `git show :2:<path> > <path>` to extract the HEAD version.
- **In practice:** After a clean merge resolution, `git status` may show "all conflicts fixed but you are still merging" with zero staged changes — this happens when all conflicted files are gitignored (the resolution checkout was a no-op at the index level but the conflict was already marked resolved). In this case, `git commit --no-edit` completes the merge normally.
- **The correct pre-merge check:** `git log --oneline main..origin/main` shows commits on remote not in local; if all are `.gsd/`-only, the divergence is safe to absorb with `--ours` resolution.

## grep -A N for Sub-Period Card Counting Is Unreliable

**Context:** M021-S03 — verifying card count inside `#rev-san-martin` after injection.

- **`grep -A 200 'id="rev-san-martin"' index.html | grep -c 'data-certeza'` overcounts** when the sub-period section exceeds `N` lines — the window bleeds into adjacent sub-periods and returns inflated counts (17 instead of 10 in this case).
- **Authoritative count requires boundary-scoped Node.js:**
  ```bash
  node -e "const h=require('fs').readFileSync('index.html','utf8'); const s=h.indexOf('id=\"rev-san-martin\"'); const e=h.indexOf('</div><!-- /#rev-san-martin -->'); const sec=h.slice(s,e+30); const m=sec.match(/data-certeza/g); console.log(m?m.length:0);"
  ```
  This anchors on the exact closing comment `</div><!-- /#rev-san-martin -->` and counts only within the sub-period.
- **When writing slice plans**, prefer the Node.js boundary method over `grep -A N` for sub-period counts. The global `grep -c 'data-certeza' index.html` is still reliable for total counts.

## /gsd doctor Stubs Indicate Unexecuted Tasks

**Context:** M021-S03-T01 — task was marked `status: done` but the work was never performed.

- **If a task summary contains `result: unknown` and `doctor_generated: true` in frontmatter, and the body is just the stub text "Summary stub generated by /gsd doctor — task was marked done but no summary existed"**, the task was NOT executed. The `/gsd doctor` command generates these stubs when it detects a done-marked task with no summary file.
- **Detection:** Always verify DOM state matches expectations before writing a slice summary. If `status: done` but DOM counts are off, inspect for the `/gsd doctor` stub pattern.
- **Recovery:** Execute the task work during slice closure. The output is identical to what the executor would have produced — no downstream impact.

## CSS nth-child Stagger Table Requires Manual Extension for New Timeline Markers

**Context:** M021-S05 — inserting 4 new `revolucion-timeline` markers at intermediate DOM positions shifted the nth-child indices of existing markers.

- **Inserting markers at intermediate DOM positions shifts all subsequent nth-child indices.** If existing markers used nth-child(3)–(11) and you insert 4 new markers at positions 3, 4, 6, 7, the formerly-covered markers shift to positions 5, 8–15. Without extending the stagger table to nth-child(15), those 4 markers remain permanently at `opacity:0` — no JS error surfaces.
- **The stagger table is a manually maintained CSS block.** It does not auto-extend. Any milestone adding new timeline markers must: (1) determine the new maximum nth-child after insertion, and (2) add stagger rules up to that maximum.
- **Detection:** Count current max with `grep -E 'nth-child\([0-9]+\)' styles.css | grep -oP '\d+' | sort -n | tail -1`. Compare to total marker count via `grep -c 'revolucion-timeline__marker' index.html`. If max-nth-child < total-markers, some markers will silently fail to animate.
- **Stagger formula:** Each new rule increments by 0.15s for dots (`animation-delay`) and 0.15s for labels. Current baseline: dot nth-child(15) = 2.95s; label nth-child(15) = 3.15s. New rules should continue this progression.
- **Two CSS rules per marker:** one targeting `.revolucion-timeline__dot` and one targeting `.revolucion-timeline__label`. Missing either leaves that element unanimated (dot appears but label doesn't, or vice versa).
