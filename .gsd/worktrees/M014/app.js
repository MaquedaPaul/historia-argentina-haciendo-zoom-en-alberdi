/* ==========================================================================
   Historia Argentina 1500–1900 — App
   ==========================================================================
   Scroll spy (Intersection Observer), smooth scroll, timeline interaction.
   No dependencies — vanilla JS only.
   ========================================================================== */

(function () {
  'use strict';

  const PREFIX = '[ScrollSpy]';
  const SECTION_IDS = ['periodo-colonial', 'periodo-revolucion', 'periodo-nacional'];

  // ---------- DOM references ----------

  const sections = SECTION_IDS.map(id => document.getElementById(id)).filter(Boolean);
  const navItems = document.querySelectorAll('.nav-item');
  const navLinks = document.querySelectorAll('.nav-link');
  const timelinePoints = document.querySelectorAll('.timeline-point');

  if (sections.length === 0) {
    console.warn(PREFIX, 'No sections found — scroll spy disabled.');
    return;
  }

  console.debug(PREFIX, `Initialized with ${sections.length} sections:`, sections.map(s => s.id));

  // ---------- State ----------

  let currentSectionId = null;

  // ---------- Helpers ----------

  /**
   * Set the active section across nav and timeline.
   * @param {string} sectionId — ID of the newly active section
   */
  function setActiveSection(sectionId) {
    if (sectionId === currentSectionId) return;
    currentSectionId = sectionId;

    console.debug(PREFIX, 'Active section →', sectionId);

    // Update nav items
    navItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      if (link && link.getAttribute('href') === '#' + sectionId) {
        item.classList.add('nav-item--active');
      } else {
        item.classList.remove('nav-item--active');
      }
    });

    // Update timeline points
    timelinePoints.forEach(point => {
      if (point.dataset.target === sectionId) {
        point.classList.add('timeline-point--active');
      } else {
        point.classList.remove('timeline-point--active');
      }
    });
  }

  // ---------- Scroll Spy via Intersection Observer ----------

  // We use a rootMargin that triggers when a section crosses the top 30% of the viewport.
  // This feels natural: the section is "active" when it occupies the upper portion.
  const observerOptions = {
    root: null,
    rootMargin: '-10% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    observer.observe(section);
  });

  // Set initial active section based on what's visible on load
  // (fallback: first section if nothing triggers yet)
  requestAnimationFrame(function () {
    if (!currentSectionId) {
      setActiveSection(SECTION_IDS[0]);
    }
  });

  // ---------- Smooth scroll ----------

  /**
   * Scroll to a section by ID with smooth behavior.
   * @param {string} targetId — section ID to scroll to
   */
  function scrollToSection(targetId) {
    const target = document.getElementById(targetId);
    if (!target) {
      console.warn(PREFIX, 'Scroll target not found:', targetId);
      return;
    }
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Nav link clicks
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.slice(1);
        scrollToSection(targetId);
        // Update URL hash without jumping
        history.pushState(null, '', href);
      }
    });
  });

  // Timeline point clicks
  timelinePoints.forEach(function (point) {
    point.addEventListener('click', function () {
      var targetId = point.dataset.target;
      if (targetId) {
        scrollToSection(targetId);
        history.pushState(null, '', '#' + targetId);
      }
    });
  });

  // ---------- Handle initial hash ----------

  if (window.location.hash) {
    var hashId = window.location.hash.slice(1);
    if (SECTION_IDS.indexOf(hashId) !== -1) {
      // Delay to let the page settle, then scroll
      setTimeout(function () {
        scrollToSection(hashId);
      }, 100);
    }
  }

  // ---------- Sub-navigation for #periodo-revolucion ----------

  initSubNav();

  // ---------- Expand/collapse toggle for detailed event cards ----------

  initExpandCollapse();

  // ---------- Hamburger menu for mobile nav ----------

  initHamburgerMenu();

  // ---------- Reveal-on-scroll ----------

  revealOnScroll();

  // ---------- Parallax on period section backgrounds ----------

  initParallax();

  // ---------- Ambient sound system ----------

  initAmbientSound();

  /**
   * Drives a subtle parallax effect on .period section backgrounds.
   * Uses a CSS custom property (--parallax-y) on each .period element,
   * consumed by the .period::before pseudo-element in styles.css.
   *
   * Observability:
   *   - Logs "[Parallax] Initialized with N sections." on startup.
   *   - Logs a warning if no .period elements are found.
   *   - The --parallax-y value is inspectable via DevTools Computed styles.
   *   - Disabled entirely when prefers-reduced-motion: reduce is active.
   *
   * Failure modes:
   *   - No .period elements → warning logged, no scroll listener attached.
   *   - prefers-reduced-motion active → returns early, no side effects.
   *   - ::before not visible → check z-index, background: inherit, inset in CSS.
   */
  function initParallax() {
    var PARALLAX_PREFIX = '[Parallax]';
    var mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (mq.matches) {
      console.debug(PARALLAX_PREFIX, 'Skipped — prefers-reduced-motion: reduce is active.');
      return;
    }

    var periodEls = document.querySelectorAll('.period');

    if (periodEls.length === 0) {
      console.warn(PARALLAX_PREFIX, 'No .period elements found — parallax idle.');
      return;
    }

    console.debug(PARALLAX_PREFIX, 'Initialized with ' + periodEls.length + ' sections.');

    var rafPending = false;

    function updateParallax() {
      rafPending = false;
      var vh = window.innerHeight;
      periodEls.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        // offset: positive when above viewport, negative when below.
        // Capped at ±30px for subtlety.
        var raw = (rect.top / vh) * -30;
        var offset = Math.max(-30, Math.min(30, raw));
        el.style.setProperty('--parallax-y', offset + 'px');
      });
    }

    window.addEventListener('scroll', function () {
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(updateParallax);
      }
    }, { passive: true });

    // Run once on init to set initial positions
    updateParallax();
  }

  /**
   * Observe elements with `.reveal` and add `.reveal--visible` when they
   * enter the viewport.  Elements already visible at page load get the
   * `.reveal--no-anim` class so they appear instantly without a flash.
   */
  function revealOnScroll() {
    var REVEAL_PREFIX = '[Reveal]';
    var revealEls = document.querySelectorAll('.reveal');

    if (revealEls.length === 0) {
      console.warn(REVEAL_PREFIX, 'No .reveal elements found — reveal system idle.');
      return;
    }

    console.debug(REVEAL_PREFIX, 'Initialized with ' + revealEls.length + ' elements.');

    // ---- Mark elements already in viewport on load (no animation) ----
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    revealEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      // Element is "already visible" if its top is above 80% of viewport
      if (rect.top < viewportHeight * 0.8 && rect.bottom > 0) {
        el.classList.add('reveal--no-anim');
        console.debug(REVEAL_PREFIX, 'Already visible (skipping animation):', elLabel(el));
      }
    });

    // ---- Stagger delay for sibling .reveal elements in the same parent ----
    applyStaggerDelays();

    // ---- Intersection Observer for remaining hidden elements ----
    var revealObserverOptions = {
      root: null,
      rootMargin: '0px 0px -15% 0px',  // trigger slightly before fully in view
      threshold: 0.15
    };

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var el = entry.target;
        // Skip already-revealed elements
        if (el.classList.contains('reveal--visible') || el.classList.contains('reveal--no-anim')) {
          revealObserver.unobserve(el);
          return;
        }
        if (entry.isIntersecting) {
          el.classList.add('reveal--visible');
          console.debug(REVEAL_PREFIX, 'Revealed:', elLabel(el));
          revealObserver.unobserve(el);
        }
      });
    }, revealObserverOptions);

    // Catch-up: for fast/large scrolls that skip past the observation zone,
    // periodically check if any unrevealed elements are above the viewport.
    var catchUpPending = false;
    function catchUpScrolledPast() {
      if (catchUpPending) return;
      catchUpPending = true;
      requestAnimationFrame(function () {
        catchUpPending = false;
        var unrevealed = document.querySelectorAll('.reveal:not(.reveal--visible):not(.reveal--no-anim)');
        unrevealed.forEach(function (el) {
          var rect = el.getBoundingClientRect();
          if (rect.bottom < 0) {
            // Element is entirely above viewport — it was scrolled past
            el.classList.add('reveal--no-anim');
            revealObserver.unobserve(el);
            console.debug(REVEAL_PREFIX, 'Scrolled past (catch-up):', elLabel(el));
          }
        });
      });
    }
    window.addEventListener('scroll', catchUpScrolledPast, { passive: true });

    revealEls.forEach(function (el) {
      // Only observe elements that aren't already visible
      if (!el.classList.contains('reveal--no-anim')) {
        revealObserver.observe(el);
      }
    });
  }

  /**
   * Apply stagger delays to consecutive `.reveal` siblings within the same parent.
   * Each sibling after the first gets an additional 80ms delay.
   */
  function applyStaggerDelays() {
    var parents = new Set();
    document.querySelectorAll('.reveal').forEach(function (el) {
      if (el.parentElement) parents.add(el.parentElement);
    });

    parents.forEach(function (parent) {
      var reveals = parent.querySelectorAll(':scope > .reveal');
      if (reveals.length <= 1) return;
      reveals.forEach(function (el, i) {
        if (i > 0) {
          el.style.setProperty('--reveal-delay', (i * 80) + 'ms');
        }
      });
    });
  }

  /**
   * Sub-navigation for #periodo-revolucion.
   * Tracks which .sub-period is in the top 30% of the viewport and
   * highlights the matching .sub-nav__link with --active class.
   * Smooth-scrolls to the target sub-period on link click.
   *
   * Inspection surfaces:
   *   .sub-nav a.sub-nav__link--active  → currently tracked sub-period
   *
   * Failure modes:
   *   - No .sub-nav found → logs a warning, function exits cleanly
   *   - No .sub-period elements → observer has nothing to watch, no error
   *   - Active class not updating → check rootMargin & threshold values
   */
  function initExpandCollapse() {
    var EXPAND_PREFIX = '[Expand]';
    var section = document.getElementById('periodo-revolucion');

    if (!section) {
      console.warn(EXPAND_PREFIX, '#periodo-revolucion not found — expand/collapse idle.');
      return;
    }

    var toggles = section.querySelectorAll('.card-expand-toggle');
    console.debug(EXPAND_PREFIX, 'Initialized with', toggles.length, 'toggle(s).');

    section.addEventListener('click', function (e) {
      var btn = e.target.closest('.card-expand-toggle');
      if (!btn) return;

      var card = btn.closest('.event-card');
      var detail = btn.nextElementSibling;

      // Guard: must be a .card-detail sibling
      if (!detail || !detail.classList.contains('card-detail')) return;

      var isExpanded = btn.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        // Collapse: remove expanded class, restore hidden after transition
        detail.classList.remove('card-detail--expanded');
        detail.addEventListener('transitionend', function onCollapse() {
          if (!detail.classList.contains('card-detail--expanded')) {
            detail.hidden = true;
          }
          detail.removeEventListener('transitionend', onCollapse);
        });
        btn.setAttribute('aria-expanded', 'false');
        btn.querySelector('.card-expand-toggle__text').textContent = 'Ver más';
      } else {
        // Expand: un-hide then animate in on next frame
        detail.hidden = false;
        requestAnimationFrame(function () {
          detail.classList.add('card-detail--expanded');
        });
        btn.setAttribute('aria-expanded', 'true');
        btn.querySelector('.card-expand-toggle__text').textContent = 'Ver menos';
      }

      var cardTitle = card ? (card.querySelector('.event-card__title') || {}).textContent : '(unknown)';
      console.debug(EXPAND_PREFIX, 'Toggled:', cardTitle.substring(0, 60), '→ expanded:', !isExpanded);
    });
  }

  /**
   * Ambient sound system — mute/unmute toggle, period-aware track switching,
   * volume cross-fades, session persistence, and autoplay rejection handling.
   *
   * Observability:
   *   - All state changes logged as console.debug('[Sound]', ...)
   *   - `document.querySelector('.sound-toggle').getAttribute('aria-pressed')` → "true"|"false"
   *   - `sessionStorage.getItem('sound-muted')` → "true"|"false"|null
   *   - `Array.from(document.querySelectorAll('audio')).map(a => ({id:a.id,paused:a.paused,volume:a.volume}))`
   *
   * Failure visibility:
   *   - Autoplay blocked → `[Sound] Autoplay blocked — waiting for user gesture`
   *   - Missing element → `[Sound] Required element missing — sound system disabled`
   *   - MutationObserver not supported → graceful fallback via scroll event
   */
  function initAmbientSound() {
    var SOUND_PREFIX = '[Sound]';

    // ---- Retrieve required DOM elements ----
    var toggle   = document.querySelector('.sound-toggle');
    var audios = {
      'periodo-colonial':   document.getElementById('sound-colonial'),
      'periodo-revolucion': document.getElementById('sound-revolucion'),
      'periodo-nacional':   document.getElementById('sound-nacional')
    };
    var navList = document.querySelector('.nav-list');

    if (!toggle || !audios['periodo-colonial'] || !audios['periodo-revolucion'] || !audios['periodo-nacional'] || !navList) {
      console.warn(SOUND_PREFIX, 'Required element missing — sound system disabled.');
      return;
    }

    // ---- Constants ----
    var MAX_VOLUME    = 0.15;   // quiet ambient ceiling
    var FADE_INTERVAL = 33;     // ~30 steps/sec
    var FADE_STEP     = 0.01;   // volume increment per tick

    // ---- Initial mute state: muted by default unless sessionStorage says otherwise ----
    var storedMuted = sessionStorage.getItem('sound-muted');
    // null (first visit) or 'true' → start muted; only 'false' → start unmuted
    var isMuted = (storedMuted !== 'false');

    // ---- Internal state ----
    var currentAudio   = null;  // the AudioHTMLElement currently playing (or last played)
    var pendingPlay    = false; // set when autoplay was blocked, retry on next gesture

    // Active fade interval handles — one per audio element, keyed by audio element
    var fadeIntervals = new WeakMap();

    // ---- Helper: stop any running fade on an audio element ----
    function clearFade(audioEl) {
      var id = fadeIntervals.get(audioEl);
      if (id !== undefined) {
        clearInterval(id);
        fadeIntervals.delete(audioEl);
      }
    }

    // ---- Helper: fade in an audio element to MAX_VOLUME ----
    function fadeIn(audioEl) {
      clearFade(audioEl);
      audioEl.volume = 0;
      console.debug(SOUND_PREFIX, 'Fade-in start →', audioEl.id);
      var id = setInterval(function () {
        var next = Math.min(audioEl.volume + FADE_STEP, MAX_VOLUME);
        audioEl.volume = next;
        if (next >= MAX_VOLUME) {
          clearInterval(id);
          fadeIntervals.delete(audioEl);
          console.debug(SOUND_PREFIX, 'Fade-in done →', audioEl.id, '(vol', audioEl.volume.toFixed(2), ')');
        }
      }, FADE_INTERVAL);
      fadeIntervals.set(audioEl, id);
    }

    // ---- Helper: fade out an audio element then pause it ----
    function fadeOut(audioEl, onDone) {
      clearFade(audioEl);
      console.debug(SOUND_PREFIX, 'Fade-out start →', audioEl.id);
      var id = setInterval(function () {
        var next = Math.max(audioEl.volume - FADE_STEP, 0);
        audioEl.volume = next;
        if (next <= 0) {
          clearInterval(id);
          fadeIntervals.delete(audioEl);
          audioEl.pause();
          console.debug(SOUND_PREFIX, 'Fade-out done →', audioEl.id, '(paused)');
          if (typeof onDone === 'function') onDone();
        }
      }, FADE_INTERVAL);
      fadeIntervals.set(audioEl, id);
    }

    // ---- Helper: determine which period is currently active from the DOM ----
    function getActivePeriodId() {
      var activeItem = navList.querySelector('.nav-item--active');
      if (!activeItem) return SECTION_IDS[0]; // fallback to first
      var link = activeItem.querySelector('.nav-link');
      if (!link) return SECTION_IDS[0];
      var href = link.getAttribute('href') || '';
      return href.startsWith('#') ? href.slice(1) : SECTION_IDS[0];
    }

    // ---- Helper: play an audio element with fade-in, handling autoplay rejection ----
    function playWithFade(audioEl) {
      fadeIn(audioEl);
      var promise = audioEl.play();
      if (promise !== undefined) {
        promise.catch(function (err) {
          clearFade(audioEl);
          audioEl.volume = 0;
          pendingPlay = true;
          console.debug(SOUND_PREFIX, 'Autoplay blocked — waiting for user gesture', '(' + err.name + ')');
        });
      }
    }

    // ---- Helper: update the toggle button's emoji and aria-pressed ----
    function updateToggleUI(muted) {
      toggle.setAttribute('aria-pressed', muted ? 'false' : 'true');
      toggle.textContent = muted ? '🔇' : '🔊';
      toggle.setAttribute('aria-label', muted ? 'Activar sonido ambiental' : 'Silenciar sonido ambiental');
    }

    // ---- Apply initial mute state without playing anything ----
    // All audio is paused (preload="none"), just set the UI
    updateToggleUI(isMuted);
    console.debug(SOUND_PREFIX, 'Initialized — muted:', isMuted, '(sessionStorage was:', storedMuted, ')');

    // ---- Mute toggle click handler ----
    toggle.addEventListener('click', function () {
      isMuted = !isMuted;
      sessionStorage.setItem('sound-muted', isMuted ? 'true' : 'false');
      updateToggleUI(isMuted);

      if (isMuted) {
        // Mute: fade out the current track (if any is playing)
        console.debug(SOUND_PREFIX, 'User muted — fading out current track');
        Object.values(audios).forEach(function (audioEl) {
          if (!audioEl.paused) {
            fadeOut(audioEl);
          } else {
            // Stop any lingering fade-in that hasn't started play() yet
            clearFade(audioEl);
          }
        });
        currentAudio = null;
      } else {
        // Unmute: play the current period's audio
        var periodId  = getActivePeriodId();
        var audioEl   = audios[periodId] || audios[SECTION_IDS[0]];
        currentAudio  = audioEl;
        console.debug(SOUND_PREFIX, 'User unmuted — playing', audioEl.id, 'for period', periodId);

        if (pendingPlay) {
          // Retry after previous autoplay rejection
          pendingPlay = false;
          console.debug(SOUND_PREFIX, 'Retrying previously blocked play()');
        }

        playWithFade(audioEl);
      }
    });

    // ---- Track switching via MutationObserver ----
    // Watch class changes on .nav-item children so we know when the active period changes.

    var lastActivePeriod = getActivePeriodId();

    function handleActiveChange(newPeriodId) {
      if (newPeriodId === lastActivePeriod) return;
      var prevPeriodId  = lastActivePeriod;
      lastActivePeriod  = newPeriodId;

      if (isMuted) return; // don't do anything while muted

      var prevAudio = audios[prevPeriodId];
      var nextAudio = audios[newPeriodId] || audios[SECTION_IDS[0]];

      if (prevAudio === nextAudio) return;

      console.debug(SOUND_PREFIX, 'Track switch:', prevPeriodId, '→', newPeriodId);
      currentAudio = nextAudio;

      // Fade out previous, then fade in next
      if (prevAudio && !prevAudio.paused) {
        fadeOut(prevAudio, function () {
          playWithFade(nextAudio);
        });
      } else {
        // Previous wasn't playing — just fade in the next one
        playWithFade(nextAudio);
      }
    }

    if (typeof MutationObserver !== 'undefined') {
      var navObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            // A nav-item's class changed — re-evaluate the active period
            var newPeriod = getActivePeriodId();
            handleActiveChange(newPeriod);
          }
        });
      });

      // Observe class changes on each .nav-item (children of navList)
      navList.querySelectorAll('.nav-item').forEach(function (item) {
        navObserver.observe(item, { attributes: true, attributeFilter: ['class'] });
      });

      console.debug(SOUND_PREFIX, 'MutationObserver attached to', navList.querySelectorAll('.nav-item').length, 'nav items.');
    } else {
      // Fallback: scroll event polling (for very old browsers)
      console.debug(SOUND_PREFIX, 'MutationObserver not available — using scroll fallback.');
      window.addEventListener('scroll', function () {
        handleActiveChange(getActivePeriodId());
      }, { passive: true });
    }

    console.debug(SOUND_PREFIX, 'Ready. Toggle at .sound-toggle, aria-pressed reflects mute state.');
  }

  function initSubNav() {
    var SUBNAV_PREFIX = '[SubNav]';
    var subNav = document.querySelector('.sub-nav');
    if (!subNav) {
      console.warn(SUBNAV_PREFIX, '.sub-nav not found — sub-navigation disabled.');
      return;
    }

    var subLinks = subNav.querySelectorAll('.sub-nav__link');
    var subPeriods = document.querySelectorAll('#periodo-revolucion .sub-period');

    if (subPeriods.length === 0) {
      console.warn(SUBNAV_PREFIX, 'No .sub-period elements found in #periodo-revolucion — sub-nav idle.');
      return;
    }

    console.debug(SUBNAV_PREFIX, 'Initialized with', subPeriods.length, 'sub-periods,', subLinks.length, 'links.');

    // ---- Smooth-scroll on link click ----
    subLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        var targetId = href.slice(1);
        var target = document.getElementById(targetId);
        if (!target) {
          console.warn(SUBNAV_PREFIX, 'Scroll target not found:', targetId);
          return;
        }
        console.debug(SUBNAV_PREFIX, 'Click → scrolling to', targetId);
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update URL hash without jumping
        history.pushState(null, '', href);
      });
    });

    // ---- Intersection Observer: set active link when sub-period enters top 30% ----
    // rootMargin '-0px 0px -70% 0px': fires when element crosses the top 30% of viewport
    var subNavObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var subPeriodId = entry.target.id;
        console.debug(SUBNAV_PREFIX, 'Active sub-period →', subPeriodId);
        // Update active class on matching link
        subLinks.forEach(function (link) {
          var linkId = link.getAttribute('href').slice(1);
          if (linkId === subPeriodId) {
            link.classList.add('sub-nav__link--active');
          } else {
            link.classList.remove('sub-nav__link--active');
          }
        });
      });
    }, {
      root: null,
      rootMargin: '0px 0px -70% 0px',  // trigger when sub-period enters top 30% of viewport
      threshold: 0
    });

    subPeriods.forEach(function (el) {
      subNavObserver.observe(el);
    });

    // Set first sub-period active on load if none are tracked yet
    requestAnimationFrame(function () {
      var hasActive = subNav.querySelector('.sub-nav__link--active');
      if (!hasActive && subLinks.length > 0) {
        subLinks[0].classList.add('sub-nav__link--active');
        console.debug(SUBNAV_PREFIX, 'Set initial active →', subLinks[0].getAttribute('href'));
      }
    });
  }

  /**
   * Return a short label for a DOM element (for debug logging).
   * @param {Element} el
   * @returns {string}
   */
  function elLabel(el) {
    var tag = el.tagName.toLowerCase();
    var cls = el.className.split(' ').filter(function (c) {
      return c && c !== 'reveal' && c !== 'reveal-fade' && c !== 'reveal-slide';
    }).join('.');
    var id = el.id ? '#' + el.id : '';
    return tag + id + (cls ? '.' + cls : '');
  }

  // ---------- Image error fallback ----------

  /**
   * For images inside .card-image, show a sepia-toned fallback with
   * descriptive text when the image fails to load.
   */
  (function initImageFallbacks() {
    var cardImages = document.querySelectorAll('.card-image img');
    cardImages.forEach(function (img) {
      img.addEventListener('error', function () {
        img.classList.add('img-error');
        var wrapper = img.closest('.card-image');
        if (wrapper) {
          // Use a short version of alt text as fallback display
          var altText = img.getAttribute('alt') || 'Imagen no disponible';
          // Truncate to first 60 chars for display
          var displayText = altText.length > 60 ? altText.substring(0, 60) + '…' : altText;
          wrapper.setAttribute('data-fallback-text', displayText);
          wrapper.classList.add('img-fallback');
        }
        console.warn('[Images] Failed to load:', img.src);
      });
    });
    console.debug('[Images] Fallback handlers set for', cardImages.length, 'card images.');
  })();

  /**
   * Hamburger menu toggle for mobile nav (≤30rem / ≈480px).
   *
   * Observability:
   *   - console.debug('[Nav]', ...) on every open/close state change
   *   - `.hamburger-toggle[aria-expanded]` reflects current state ("true"/"false")
   *   - `getComputedStyle(nav).getPropertyValue('--nav-height')` shows live nav height
   *   - Horizontal overflow detectable via:
   *     `document.documentElement.scrollWidth > document.documentElement.clientWidth`
   */
  function initHamburgerMenu() {
    var NAV_PREFIX = '[Nav]';
    var toggle = document.querySelector('.hamburger-toggle');
    var navList = document.querySelector('.nav-list');
    var nav = document.querySelector('.site-nav');

    if (!toggle || !navList || !nav) {
      console.warn(NAV_PREFIX, 'Hamburger toggle: required elements not found — skipping init.');
      return;
    }

    /** Update the --nav-height custom property so sub-nav sticky offset can use it. */
    function updateNavHeight() {
      var h = nav.offsetHeight;
      nav.style.setProperty('--nav-height', h + 'px');
      console.debug(NAV_PREFIX, '--nav-height set to', h + 'px');
    }

    /** Close the menu and reset aria state. */
    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      navList.classList.remove('nav-list--open');
      // Update height after transition completes
      navList.addEventListener('transitionend', function onEnd() {
        navList.removeEventListener('transitionend', onEnd);
        updateNavHeight();
      });
      console.debug(NAV_PREFIX, 'Menu closed (aria-expanded="false")');
    }

    /** Open the menu. */
    function openMenu() {
      toggle.setAttribute('aria-expanded', 'true');
      navList.classList.add('nav-list--open');
      navList.addEventListener('transitionend', function onEnd() {
        navList.removeEventListener('transitionend', onEnd);
        updateNavHeight();
      });
      console.debug(NAV_PREFIX, 'Menu opened (aria-expanded="true")');
    }

    // Toggle on hamburger click
    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when any nav link is clicked (smooth scroll handled by existing code)
    navList.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    // Set initial --nav-height on load
    updateNavHeight();

    console.debug(NAV_PREFIX, 'Hamburger menu initialized.');
  }

  // ============================================================
  // Lightbox Modal
  // ============================================================
  function initImageModal() {
    var modal    = document.getElementById('img-modal');
    var overlay  = modal && modal.querySelector('.img-modal__overlay');
    var closeBtn = modal && modal.querySelector('.modal-close');
    var modalImg = modal && modal.querySelector('.img-modal__img');
    var altText  = modal && modal.querySelector('.img-modal__alt-text');
    var attrEl   = modal && modal.querySelector('.img-modal__attribution');

    if (!modal || !overlay || !closeBtn || !modalImg) {
      console.warn('[Modal] Required elements not found — modal disabled.');
      return;
    }

    var lastTrigger = null;

    /** Open the modal with data from the clicked image. */
    function openModal(img) {
      // Populate image
      modalImg.src = img.src;
      modalImg.alt = img.alt || '';

      // Caption: alt text
      if (altText) altText.textContent = img.alt || '';

      // Attribution: look for .img-attribution inside the same .card-image wrapper
      var cardImage = img.closest('.card-image');
      var attribution = cardImage && cardImage.querySelector('.img-attribution');
      if (attrEl) {
        if (attribution) {
          attrEl.innerHTML = attribution.innerHTML;
          attrEl.style.display = '';
        } else {
          attrEl.textContent = '';
          attrEl.style.display = 'none';
        }
      }

      // Store trigger and show modal
      lastTrigger = img;
      modal.removeAttribute('hidden');
      closeBtn.focus();
      document.body.style.overflow = 'hidden'; // prevent background scroll
      document.documentElement.style.overflow = 'hidden'; // iOS Safari fix
    }

    /** Close the modal and restore focus. */
    function closeModal() {
      modal.setAttribute('hidden', '');
      modalImg.src = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = ''; // iOS Safari fix
      if (lastTrigger) {
        lastTrigger.focus();
        lastTrigger = null;
      }
    }

    // ---- Event: open modal on .card-image img click (event delegation) ----
    document.body.addEventListener('click', function (e) {
      var img = e.target.closest('.card-image img');
      if (!img) return;
      openModal(img);
    });

    // ---- Event: close via overlay click ----
    overlay.addEventListener('click', closeModal);

    // ---- Event: close via × button ----
    closeBtn.addEventListener('click', closeModal);

    // ---- Event: Esc closes modal; Tab cycles focus (focus trap) ----
    modal.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        return;
      }
      if (e.key === 'Tab') {
        // Focus trap: only the close button is interactive — keep focus there
        e.preventDefault();
        closeBtn.focus();
      }
    });

    // ---- Make images keyboard-accessible: Enter/Space opens modal ----
    document.body.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var img = document.activeElement;
      if (!img || !img.matches('.card-image img')) return;
      e.preventDefault();
      openModal(img);
    });

    // ---- Make .card-image img focusable and visually indicate clickability ----
    document.querySelectorAll('.card-image img').forEach(function (img) {
      img.setAttribute('tabindex', '0');
      img.style.cursor = 'zoom-in';
    });

    console.debug('[Modal] Image modal initialized.');
  }

  initImageModal();

})();
