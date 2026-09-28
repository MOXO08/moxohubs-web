const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  const tiltEls = document.querySelectorAll('.tilt');
  const MAX_DEG = 5;

  tiltEls.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform =
        `perspective(700px) rotateX(${(-py * MAX_DEG).toFixed(2)}deg) rotateY(${(px * MAX_DEG).toFixed(2)}deg) translateZ(2px)`;
    }, { passive: true });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg)';
    });
  });
}
