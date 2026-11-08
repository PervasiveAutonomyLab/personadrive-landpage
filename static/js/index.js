document.addEventListener('DOMContentLoaded', () => {
  // only play the looping clips that are on screen
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) e.target.play().catch(() => {});
        else e.target.pause();
      }
    }, { threshold: 0.15 });
    document.querySelectorAll('video[autoplay]').forEach((v) => observer.observe(v));
  }

  // visitor map: inject the widget script once the page has loaded, so it never delays the page
  const mapBox = document.querySelector('.visitors-map[data-src]');
  if (mapBox) {
    const loadMap = () => {
      const s = document.createElement('script');
      s.id = 'mapmyvisitors';
      s.src = mapBox.dataset.src;
      s.async = true;
      mapBox.appendChild(s);
    };
    if (document.readyState === 'complete') loadMap();
    else window.addEventListener('load', loadMap, { once: true });
  }

  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const code = document.getElementById(btn.dataset.target);
      if (!code || !navigator.clipboard) return;
      navigator.clipboard.writeText(code.innerText).then(() => {
        const label = btn.querySelector('span:last-child');
        label.textContent = 'Copied';
        setTimeout(() => { label.textContent = 'Copy'; }, 1500);
      });
    });
  });
});
