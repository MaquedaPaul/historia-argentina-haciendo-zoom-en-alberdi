---
status: done
result: success
observability_surfaces:
  - test -s .gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md → confirms draft file exists
  - node -e entity check on T02 Recipe block → PASS (no non-ASCII bytes)
  - grep 'card-nota-historiografica' .gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md → confirms three-position nota is present in draft
---

# T01: Author S19-CONTENT-DRAFT.md with historical prose and entity-encoded T02 Recipe HTML

**T01 was auto-stub'd by `/gsd doctor`; the S19-CONTENT-DRAFT.md file did not exist. T02 authored the file as a prerequisite before executing the splice.**

## What Happened

T01 was originally marked done by the executor but left no content draft file. The `/gsd doctor` tool detected this and generated a stub summary. T02 discovered the missing file at splice precondition check and authored `S19-CONTENT-DRAFT.md` in full before proceeding.

The content draft contains:

- **S19-1** — framing card, `card-opinion`, `data-certeza="debatido"`, no image, picks up S18-1's explicit forward reference, sources: Sarmiento *Facundo* (1845), Mitre *Historia de Belgrano* (1857), Myers *Orden y virtud* (1995).
- **S19-2** — three-position nota historiográfica card, `card-opinion`, `data-certeza="debatido"`, `--reveal-delay: 80ms`, sources: Lynch cap. 10 (1981), Halperín Donghi (1972), Myers (1995), Irazusta (1941), Rosa (1964).

The T02 Recipe block was written with all non-ASCII characters entity-encoded (`&#xBF;`, `&#xF3;`, `&#xE1;`, em-dash `&#x2014;`, etc.). A Node.js ASCII-only check was run on the block and returned PASS before splice.

Scope boundary note is explicit in the draft: S19 nota is confined to domestic tiranía — represión, libertades civiles, personalismo. Soberanía exterior and bloqueos argument is explicitly reserved for S22.

Lynch citation chain maintained: cap. 6 used in S18, cap. 7 used in S16, cap. 10 used in S19 (historiographic debate chapter — the correct chapter for this topic).

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `test -s .gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md` | 0 | ✅ pass (file exists, non-empty) | <1s |
| 2 | Node.js ASCII-only check on T02 Recipe block | 0 | ✅ pass (PASS — no non-ASCII bytes) | <1s |
| 3 | `grep -c 'card-nota-historiografica' S19-CONTENT-DRAFT.md` | 0 | ✅ pass (present in draft) | <1s |

## Diagnostics

- `test -s .gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md` — file presence and non-empty check; the primary artifact of T01
- Node.js entity check: `node -e "const f=require('fs').readFileSync('.gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md','utf8'); const block=f.split('T02 Recipe')[1]||''; const n=block.split('\n').filter(l=>/[^\\x00-\\x7F]/.test(l)); console.log(n.length===0?'PASS':'FAIL:'+n.length);"` — run against the Recipe block to verify entity encoding
- Three-position nota presence: `grep -c 'card-nota-historiografica' .gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md`

## Deviations

T01 was auto-stub'd by `/gsd doctor`. The actual content draft was authored during T02 execution as a prerequisite. No other deviations.

## Known Issues

None.

## Files Created/Modified

- `.gsd/milestones/M008/slices/S19/S19-CONTENT-DRAFT.md` — created during T02 as T01's missing artifact
