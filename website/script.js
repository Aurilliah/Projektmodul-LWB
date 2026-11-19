// Mobiles Menü ein-/ausklappen
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
});

// Menü nach Klick auf einen Link schließen (mobil)
navLinks.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// Angebote live filtern
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
