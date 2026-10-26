// Enable the title treatment before the body can paint. Fail open if setup fails.
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const root = document.documentElement;
  const boot = {
    active: true,
    release() {
      boot.active = false;
      clearTimeout(boot.timer);
      root.classList.remove('title-motion-ready');
    }
  };
  window.INNO_TITLE_BOOT = boot;
  root.classList.add('title-motion-ready');
  boot.timer = setTimeout(boot.release, 4000);
})();
