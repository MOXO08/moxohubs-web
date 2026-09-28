const nav = document.getElementById('nav');
addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 8);
}, { passive: true });
