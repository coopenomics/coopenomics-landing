/**
 * Theme — светлая/тёмная тема
 */
(function () {
  const STORAGE_KEY = 'coop-theme';
  function getSystemTheme() { return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'; }
  function getEffectiveTheme() { return localStorage.getItem(STORAGE_KEY) || getSystemTheme(); }
  function applyTheme(t) {
    const theme = t !== undefined ? t : (localStorage.getItem(STORAGE_KEY) || null);
    document.documentElement.removeAttribute('data-theme');
    if (theme) document.documentElement.setAttribute('data-theme', theme);
    const effective = theme || getSystemTheme();
    const icon = document.querySelector('#theme-toggle .theme-icon');
    if (icon) {
      icon.className = 'theme-icon theme-icon-' + effective;
      icon.closest('button').setAttribute('title', effective === 'light' ? 'Тема: светлая' : 'Тема: тёмная');
    }
  }
  function cycleTheme() {
    const current = getEffectiveTheme();
    const next = current === 'light' ? 'dark' : 'light';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }
  const toggle = document.getElementById('theme-toggle');
  if (toggle) toggle.addEventListener('click', cycleTheme);
  applyTheme();
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => { if (!localStorage.getItem(STORAGE_KEY)) applyTheme(); });
})();

/**
 * Nav — эффект фона при скролле
 */
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20), { passive: true });
}

/**
 * Reveal — анимация появления (unobserve после показа для снижения нагрузки)
 */
const io = new IntersectionObserver(
  e => e.forEach(x => {
    if (x.isIntersecting) {
      x.target.classList.add('on');
      io.unobserve(x.target);
    }
  }),
  { threshold: 0.06, rootMargin: '0px 0px -20px 0px' }
);
document.querySelectorAll('.r').forEach(el => io.observe(el));

/**
 * Hero grid — пауза CSS-анимации вне viewport (без RAF)
 */
(function heroGridAnimation() {
  const bg = document.getElementById('hero-bg');
  const hero = document.getElementById('hero');
  if (!bg || !hero || typeof IntersectionObserver === 'undefined') return;

  new IntersectionObserver((e) => {
    bg.classList.toggle('bg-playing', e[0].isIntersecting);
  }, { threshold: 0 }).observe(hero);
})();
