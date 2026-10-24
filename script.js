(() => {
  'use strict';
  // year
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  // pointer-follow glow on buttons (rAF-throttled, passive => no INP cost)
  const links = document.querySelector('.links');
  if (!links || !matchMedia('(hover:hover)').matches) return;
  let raf = 0, ev = null;
  links.addEventListener('pointermove', (e) => {
    ev = e;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const b = ev.target.closest && ev.target.closest('.btn');
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty('--x', ev.clientX - r.left + 'px');
      b.style.setProperty('--y', ev.clientY - r.top + 'px');
    });
  }, { passive: true });
})();
