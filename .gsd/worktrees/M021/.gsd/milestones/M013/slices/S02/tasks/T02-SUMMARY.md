---
id: T02
parent: S02
milestone: M013
provides:
  - verify-s02.js script that mechanically validates all lightbox modal structural requirements
  - 16-check gate covering HTML structure, JS implementation patterns, CSS presence, and HTML ordering invariant
  - Pre-deploy quality gate: exit 0 = green-light for S03 deploy; exit 1 = regression detected
key_files:
  - .gsd/milestones/M013/slices/S02/verify-s02.js
key_decisions:
  - Added an 8th HTML check (modal HTML before script tag) beyond the 7 listed in the plan — this ordering invariant was the root cause discovered in T01 and is the most likely regression vector
  - Used new Function() for JS syntax validation (not eval) as specified — parses without executing, safe for untrusted-ish content
patterns_established:
  - verify-s02.js uses path.resolve(__dirname, '../../../../../') to find worktree root from 5 directory levels deep
  - Script prints [PASS]/[FAIL] per check, never throws on check failure, exits with 1 on any failure — caller-friendly CI pattern
  - Null-safe file reading: if a file is unreadable, a single [FAIL] row is emitted for that file and remaining checks for it are skipped
observability_surfaces:
  - node .gsd/milestones/M013/slices/S02/verify-s02.js — full structural check, exits 0 or 1
  - Each [FAIL] line names exactly which invariant was broken — no need to investigate further to know what to fix
  - Card-image count printed in check name: "[PASS] HTML: .card-image count >= 50 (found 57)" — visible drift over time
duration: 10m
verification_result: passed
completed_at: 2026-03-24
blocker_discovered: false
---

# T02: Escribir y ejecutar script de verificación estructural

**Created 16-check Node.js verification gate for M013/S02 lightbox modal — all checks pass, exit 0.**

## What Happened

Wrote `.gsd/milestones/M013/slices/S02/verify-s02.js` as a structural verification gate for the lightbox modal feature. The script:

1. Resolves the worktree root via `path.resolve(__dirname, '../../../../../')` (5 levels up from `slices/S02/`)
2. Reads `index.html`, `app.js`, and `styles.css` with null-safe wrappers — unreadable files emit `[FAIL]` gracefully instead of throwing
3. Runs 16 checks across three files, printing `[PASS]` or `[FAIL]` for each
4. Exits with code 0 if all pass, code 1 if any fail

Added one check beyond the 14 required by the plan: **"modal element appears before `<script src="app.js">`"**. This ordering invariant was the root cause of T01's critical bug and is the most likely regression vector for future HTML edits — it deserves explicit mechanical detection.

The JS syntax check uses `new Function(js)` (not `eval()`), which parses without executing, as specified.

## Verification

```bash
node .gsd/milestones/M013/slices/S02/verify-s02.js
echo "Exit code: $?"
```

Output:
```
verify-s02.js — M013/S02 Structural Verification
====================================================
  [PASS] HTML: id="img-modal" exists
  [PASS] HTML: role="dialog" on modal
  [PASS] HTML: aria-modal="true" on modal
  [PASS] HTML: hidden attribute present on modal
  [PASS] HTML: .modal-close button exists
  [PASS] HTML: .img-modal__img element exists
  [PASS] HTML: .card-image count >= 50 (found 57)
  [PASS] HTML: modal element appears before <script src="app.js">
  [PASS] JS: initImageModal function present
  [PASS] JS: document.body event delegation
  [PASS] JS: Escape key handler present
  [PASS] JS: openModal function present
  [PASS] JS: closeModal function present
  [PASS] JS: syntax valid (new Function())
  [PASS] CSS: img-modal styles present
  [PASS] CSS: modal-close styles present
====================================================
  All 16 checks passed. ✓

Exit code: 0
```

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `node .gsd/milestones/M013/slices/S02/verify-s02.js` | 0 | ✅ pass | <1s |
| 2 | `echo "Exit code: $?"` | — | ✅ 0 confirmed | — |

## Diagnostics

**To run the gate:**
```bash
node .gsd/milestones/M013/slices/S02/verify-s02.js
```

**What each failure means:**
- `[FAIL] HTML: modal element appears before <script src="app.js">` → The HTML ordering regression from T01 has recurred — move `<div id="img-modal">` above `<script src="app.js">` in index.html
- `[FAIL] HTML: .card-image count >= 50 (found N)` → Images were removed from content; re-check index.html
- `[FAIL] JS: syntax INVALID — <message>` → A syntax error was introduced in app.js; the message identifies the issue
- `[FAIL] CSS: img-modal styles present` → The CSS was accidentally stripped or the file renamed

**To inspect the script itself:**
```bash
node -e "const f = require('.gsd/milestones/M013/slices/S02/verify-s02.js')" 2>&1 || true
# The script is self-contained — just run it directly
```

## Deviations

**Added check 8 (modal-before-script ordering):** The plan specified 7 HTML checks + 6 JS checks + 2 CSS checks = 15 total. Added one extra HTML check validating that `id="img-modal"` appears at a lower string position than `src="app.js"` in the HTML. This directly encodes T01's root cause as a regression detector. Total: 16 checks (exceeds the 15-check minimum).

## Known Issues

None.

## Files Created/Modified

- `.gsd/milestones/M013/slices/S02/verify-s02.js` — New 16-check Node.js structural verification script; exits 0 on all pass, 1 on any fail
