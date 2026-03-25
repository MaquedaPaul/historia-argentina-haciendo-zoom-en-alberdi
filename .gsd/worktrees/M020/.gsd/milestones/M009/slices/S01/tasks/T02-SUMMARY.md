---
id: T02
parent: S01
milestone: M009
provides:
  - GitHub Pages enabled on MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi (source: main, path: /)
  - Site live at https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/ returning HTTP 200
key_files: []
key_decisions:
  - Pages API returned status:null on POST (not yet "building") — waited 60s then confirmed status:built without additional retries needed
patterns_established:
  - GitHub Pages POST response contains status:null (not "building") until the first build job starts; polling the GET endpoint is still the correct way to wait for built state
observability_surfaces:
  - gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --jq '.status,.html_url,.source'
  - gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages/builds/latest --jq '.error.message' (if status is "errored")
  - curl -sI https://MaquedaPaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/ (HTTP headers probe)
duration: ~2m (including 60s build wait)
verification_result: passed
completed_at: 2026-03-23
blocker_discovered: false
---

# T02: Habilitar GitHub Pages y verificar URL pública

**GitHub Pages activado en rama main; sitio histórico live en https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/ respondiendo HTTP 200 con contenido verificado.**

## What Happened

1. Called `gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --method POST -f "source[branch]=main" -f "source[path]=/"` — API responded with HTTP 201, `source.branch=main`, `source.path=/`, `public=true`, `html_url` set correctly. No 409 conflict (Pages was not previously enabled).
2. Waited 60 seconds for GitHub's build pipeline to complete.
3. Polled `gh api .../pages --jq '.status + " " + .html_url'` → `built https://maquedapaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/` — built on first check, no retries needed.
4. Confirmed HTTP 200: `curl -s -o /dev/null -w "%{http_code}" https://MaquedaPaul.github.io/...` → `200`.
5. Confirmed content: `curl -s ... | grep -c "Historia Argentina"` → `15` occurrences.
6. Fixed pre-flight item: added failure-path diagnostic check to `S01-PLAN.md` Verification section.

## Verification

- Pages POST → HTTP 201, `source.branch=main`, `source.path=/` ✅
- Pages GET after 60s → `status=built` ✅
- `curl` HTTP status → `200` ✅
- `grep -c "Historia Argentina"` → `15` (≥ 1 required) ✅
- Slice check: `gh repo view ... --json visibility -q .visibility` → `PUBLIC` ✅
- Slice check: `gh repo view ... --json defaultBranchRef -q .defaultBranchRef.name` → `main` ✅

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | `gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --method POST -f "source[branch]=main" -f "source[path]=/"` | 0 | ✅ pass | <2s |
| 2 | `gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --jq '.status + " " + .html_url'` (after 60s wait) | 0 | ✅ pass (`built`) | ~62s total |
| 3 | `curl -s -o /dev/null -w "%{http_code}" https://MaquedaPaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/` | 0 | ✅ pass (`200`) | <2s |
| 4 | `curl -s ... \| grep -c "Historia Argentina"` | 0 | ✅ pass (`15`) | <2s |
| 5 | `gh repo view ... --json visibility -q .visibility` | 0 | ✅ pass (`PUBLIC`) | <1s |
| 6 | `gh repo view ... --json defaultBranchRef -q .defaultBranchRef.name` | 0 | ✅ pass (`main`) | <1s |

## Diagnostics

- **Pages status:** `gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages --jq '.status,.html_url,.source'` — check build state (null/building/built/errored)
- **Build error detail:** `gh api repos/MaquedaPaul/historia-argentina-haciendo-zoom-en-alberdi/pages/builds/latest --jq '.error.message'` — use if status is `errored`
- **HTTP headers probe:** `curl -sI https://MaquedaPaul.github.io/historia-argentina-haciendo-zoom-en-alberdi/` — confirms live delivery, CDN headers, HTTPS enforcement

## Deviations

None. The plan steps were followed exactly. The optional retry loop (step 4–5 in the plan) was not needed since the site built within the initial 60-second wait.

## Known Issues

None.

## Files Created/Modified

- `.gsd/milestones/M009/slices/S01/S01-PLAN.md` — added failure-path diagnostic check to Verification section (pre-flight fix)
- `.gsd/milestones/M009/slices/S01/tasks/T02-SUMMARY.md` — this file
