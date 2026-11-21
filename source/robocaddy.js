(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-mode-demo]').forEach(demo => {
    const tabs = [...demo.querySelectorAll('[role="tab"]')];
    function activate(tab, focus = false) {
      tabs.forEach(item => {
        const selected = item === tab;
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
        const panel = document.getElementById(item.getAttribute('aria-controls'));
        panel.hidden = !selected;
        if (selected && !reduced.matches) {
          panel.animate([{opacity: .3}, {opacity: 1}], {duration: 480, easing: 'cubic-bezier(.22,1,.36,1)'});
        }
      });
      if (focus) tab.focus();
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) { event.preventDefault(); activate(tabs[next], true); }
      });
    });
  });
  const chapters = [...document.querySelectorAll('.robo-chapters a')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
      if (!visible.length) return;
      chapters.forEach(link => {
        if (link.hash === '#' + visible[0].target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, {rootMargin: '-145px 0px -45% 0px', threshold: 0});
    chapters.forEach(link => observer.observe(document.querySelector(link.hash)));
  }
  const menu = document.getElementById('site-menu');
  const opener = document.querySelector('[data-open="site-menu"]');
  if (typeof menu.showModal === 'function') {
    opener.addEventListener('click', () => {
      menu.showModal();
      document.body.classList.add('dialog-open');
      opener.setAttribute('aria-expanded','true');
    });
    menu.querySelector('[data-close]').addEventListener('click', () => menu.close());
    menu.addEventListener('close', () => {
      document.body.classList.remove('dialog-open');
      opener.setAttribute('aria-expanded','false');
      opener.focus({preventScroll:true});
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => menu.close()));
  } else document.documentElement.classList.add('dialog-fallback');
})();
