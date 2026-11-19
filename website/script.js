// ===== Mobiles Menü ein-/ausklappen =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
});

navLinks.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// ===== Angebote live filtern =====
const filterInput = document.getElementById('filterInput');
const cards = document.querySelectorAll('#angebotGrid .angebot');
const noResults = document.getElementById('noResults');

filterInput.addEventListener('input', () => {
  const query = filterInput.value.trim().toLowerCase();
  let visibleCount = 0;

  cards.forEach((card) => {
    const matches = card.textContent.toLowerCase().includes(query);
    card.classList.toggle('hidden', !matches);
    if (matches) visibleCount += 1;
  });

  noResults.hidden = visibleCount > 0;
});

// ===== Scroll-Fortschrittsbalken + Nav-Schatten + Nach-oben-Button =====
const progressBar = document.getElementById('progressBar');
const siteNav = document.getElementById('siteNav');
const toTop = document.getElementById('toTop');

function onScroll() {
  const scrollTop = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (max > 0 ? (scrollTop / max) * 100 : 0) + '%';
  siteNav.classList.toggle('scrolled', scrollTop > 10);
  toTop.classList.toggle('show', scrollTop > 600);
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Scroll-Reveal-Animationen (mit leichter Staffelung) =====
const revealEls = document.querySelectorAll('.reveal');

revealEls.forEach((el, i) => {
  el.style.setProperty('--reveal-delay', `${(i % 4) * 70}ms`);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el) => revealObserver.observe(el));

// ===== Zähler-Animation bei den Kennzahlen =====
const counters = document.querySelectorAll('.fact-number[data-count]');

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const prefix = el.dataset.prefix || '';
  const duration = 1200;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = prefix + Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

counters.forEach((el) => counterObserver.observe(el));
