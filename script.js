(() => {
  const sky = document.getElementById('starfield');
  const count = Math.min(280, Math.max(150, Math.floor(window.innerWidth * .45)));
  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement('i');
    dot.className = 'star';
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.setProperty('--size', `${Math.random() * 1.8 + .65}px`);
    dot.style.setProperty('--opacity', `${Math.random() * .55 + .22}`);
    dot.style.setProperty('--duration', `${Math.random() * 4 + 3}s`);
    dot.style.setProperty('--delay', `${Math.random() * -6}s`);
    dot.style.setProperty('--drift', `${Math.random() * 7 - 3.5}px`);
    sky.appendChild(dot);
  }

  const button = document.getElementById('look-button');
  button.addEventListener('click', () => {
    document.body.classList.add('journey');
    window.setTimeout(() => document.getElementById('asteroid').scrollIntoView({ behavior: 'smooth' }), 370);
  }, { once: true });

  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.fade-in').forEach((element) => reveal.observe(element));

  const universe = document.getElementById('universe');
  let raf = 0;
  let scrollRaf = 0;
  window.addEventListener('scroll', () => {
    if (scrollRaf) cancelAnimationFrame(scrollRaf);
    scrollRaf = requestAnimationFrame(() => {
      sky.style.transform = `translate3d(0, ${window.scrollY * .92}px, 0)`;
    });
  }, { passive: true });

  universe.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const x = (event.clientX / window.innerWidth - .5) * 8;
      const y = (event.clientY / window.innerHeight - .5) * 5;
      document.querySelectorAll('.asteroid-float').forEach((art) => {
        art.style.translate = `${x * .25}px ${y * .25}px`;
      });
    });
  }, { passive: true });

  const shoot = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const meteor = document.createElement('i');
    meteor.className = 'shooting-star';
    meteor.style.left = `${Math.random() * 76 + 17}%`;
    meteor.style.top = `${Math.random() * 42 + 4}%`;
    sky.appendChild(meteor);
    window.setTimeout(() => meteor.remove(), 1900);
  };
  window.setTimeout(function scheduleMeteor() {
    shoot();
    window.setTimeout(scheduleMeteor, Math.random() * 8500 + 7000);
  }, 4200);
})();
