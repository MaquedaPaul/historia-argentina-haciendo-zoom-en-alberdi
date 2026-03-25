#!/usr/bin/env node
/**
 * verify-s02.js — Structural verification gate for M013/S02
 *
 * Verifies that index.html, app.js, and styles.css contain all required
 * elements for the lightbox modal feature. Intended as a pre-deploy gate
 * and regression guard for future modifications.
 *
 * Usage (from worktree root):
 *   node .gsd/milestones/M013/slices/S02/verify-s02.js
 *
 * Exit 0 = all checks passed. Exit 1 = one or more checks failed.
 *
 * Observability:
 *   - Each check prints [PASS] or [FAIL] with a description.
 *   - Summary line at the end: "All N checks passed. ✓" or "N/M checks failed. ✗"
 *   - JS syntax check uses new Function() (not eval) — catches parse errors without executing.
 *   - If a file is missing, the script prints [FAIL] for all checks in that file and continues.
 */

'use strict';

const fs = require('fs');
const path = require('path');

// Resolve worktree root: script lives in .gsd/milestones/M013/slices/S02/
// Path: S02/ → slices/ → M013/ → milestones/ → .gsd/ → worktree_root (5 levels)
const ROOT = path.resolve(__dirname, '../../../../../');

// ── File loading ────────────────────────────────────────────────────────────

function readFile(relPath) {
  const abs = path.join(ROOT, relPath);
  try {
    return fs.readFileSync(abs, 'utf8');
  } catch (err) {
    return null;
  }
}

const html = readFile('index.html');
const js   = readFile('app.js');
const css  = readFile('styles.css');

// ── Check runner ────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;
const results = [];

function check(description, condition) {
  const verdict = !!condition;
  if (verdict) {
    passed++;
    results.push(`  [PASS] ${description}`);
  } else {
    failed++;
    results.push(`  [FAIL] ${description}`);
  }
}

// ── HTML checks ─────────────────────────────────────────────────────────────

if (html === null) {
  check('HTML file readable (index.html)', false);
} else {
  check('HTML: id="img-modal" exists',           html.includes('id="img-modal"'));
  check('HTML: role="dialog" on modal',          html.includes('role="dialog"'));
  check('HTML: aria-modal="true" on modal',      html.includes('aria-modal="true"'));
  check('HTML: hidden attribute present on modal', /id="img-modal"[^>]*hidden/.test(html));
  check('HTML: .modal-close button exists',      html.includes('modal-close'));
  check('HTML: .img-modal__img element exists',  html.includes('img-modal__img'));

  const cardImageCount = (html.match(/class="card-image"/g) || []).length;
  check(
    `HTML: .card-image count >= 50 (found ${cardImageCount})`,
    cardImageCount >= 50
  );

  // Verify modal HTML appears BEFORE the app.js script tag (critical ordering constraint)
  const modalPos  = html.indexOf('id="img-modal"');
  const scriptPos = html.indexOf('src="app.js"');
  check(
    'HTML: modal element appears before <script src="app.js">',
    modalPos !== -1 && scriptPos !== -1 && modalPos < scriptPos
  );
}

// ── JavaScript checks ───────────────────────────────────────────────────────

if (js === null) {
  check('JS file readable (app.js)', false);
} else {
  check('JS: initImageModal function present',   js.includes('initImageModal'));
  check('JS: document.body event delegation',    js.includes('document.body'));
  check('JS: Escape key handler present',        js.includes('Escape'));
  check('JS: openModal function present',        js.includes('openModal'));
  check('JS: closeModal function present',       js.includes('closeModal'));

  // Syntax check via new Function() — parses without executing
  let syntaxOk = false;
  let syntaxError = '';
  try {
    new Function(js); // eslint-disable-line no-new-func
    syntaxOk = true;
  } catch (err) {
    syntaxError = err.message;
  }
  check(
    syntaxOk ? 'JS: syntax valid (new Function())' : `JS: syntax INVALID — ${syntaxError}`,
    syntaxOk
  );
}

// ── CSS checks ──────────────────────────────────────────────────────────────

if (css === null) {
  check('CSS file readable (styles.css)', false);
} else {
  check('CSS: img-modal styles present',    css.includes('img-modal'));
  check('CSS: modal-close styles present',  css.includes('modal-close'));
}

// ── Report ───────────────────────────────────────────────────────────────────

const total = passed + failed;
console.log('');
console.log('verify-s02.js — M013/S02 Structural Verification');
console.log('='.repeat(52));
results.forEach((line) => console.log(line));
console.log('='.repeat(52));

if (failed === 0) {
  console.log(`  All ${total} checks passed. ✓`);
  console.log('');
  process.exit(0);
} else {
  console.log(`  ${failed}/${total} checks FAILED. ✗`);
  console.log('');
  process.exit(1);
}
