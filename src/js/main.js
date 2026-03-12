const io = new IntersectionObserver(
  e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('on'); }),
  { threshold: 0.06, rootMargin: '0px 0px -20px 0px' }
);
document.querySelectorAll('.r').forEach(el => io.observe(el));
