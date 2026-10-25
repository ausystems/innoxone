(() => {
  document.documentElement.classList.add('has-js');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const films = [...document.querySelectorAll('.story-film')];
  async function playFilm(id, time, scroll = false) {
    const film = document.getElementById(id);
    if (!film) return;
    const cover = film.closest('.film').querySelector('.film-cover');
    if (cover?.currentSrc) film.poster = cover.currentSrc;
    film.closest('.film').classList.add('is-playing');
    document.getElementById(id + '-status').hidden = true;
    films.forEach(other => { if (other !== film) other.pause(); });
    if (Number.isFinite(time)) film.currentTime = time;
    if (scroll) film.closest('.film').scrollIntoView({behavior:reduced.matches ? 'instant' : 'smooth',block:'center'});
    try { await film.play(); } catch { /* Native controls remain available for a retry. */ }
    film.focus({preventScroll:true});
  }
  document.querySelectorAll('[data-play-film]').forEach(button => button.addEventListener('click', event => {
    event.preventDefault();
    playFilm(button.dataset.playFilm, button.hasAttribute('data-time') ? Number(button.dataset.time) : undefined, button.dataset.scroll === 'true');
  }));
  films.forEach(film => {
    film.addEventListener('play', () => {
      film.closest('.film').classList.add('is-playing');
      films.forEach(other => { if (other !== film) other.pause(); });
    });
    film.addEventListener('error', () => {document.getElementById(film.id + '-status').hidden = false;});
  });
  const founder = document.getElementById('founder-film');
  const chapters = [...document.querySelectorAll('.film-chapters [data-time]')];
  founder.addEventListener('timeupdate', () => chapters.forEach((chapter,index) => {
    const active = founder.currentTime >= Number(chapter.dataset.time) && (index === chapters.length - 1 || founder.currentTime < Number(chapters[index+1].dataset.time));
    if (active) chapter.setAttribute('aria-current','true'); else chapter.removeAttribute('aria-current');
  }));
  document.addEventListener('visibilitychange', () => {if(document.hidden) films.forEach(film => film.pause());});

  const menu = document.getElementById('site-menu');
  const menuButton = document.querySelector('[data-open="site-menu"]');
  if (typeof menu.showModal === 'function') {
    menuButton.addEventListener('click', () => {
      films.forEach(film => film.pause());
      menu.showModal();
      document.body.classList.add('dialog-open');
      menuButton.setAttribute('aria-expanded','true');
      menu.querySelector('[data-close]').focus();
    });
    menu.querySelector('[data-close]').addEventListener('click', () => menu.close());
    menu.addEventListener('close', () => {
      document.body.classList.remove('dialog-open');
      menuButton.setAttribute('aria-expanded','false');
      menuButton.focus({preventScroll:true});
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => menu.close()));
    menu.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const items = [...menu.querySelectorAll('a[href],button')], first = items[0], last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
    });
  } else document.documentElement.classList.add('dialog-fallback');

  // A restrained image-settling motion directs attention to the real photographs.
  // Content stays visible if animation or JavaScript is unavailable.
  const animations = new Set();
  if (!reduced.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const animation = entry.target.animate([{transform:'scale(1.035)'},{transform:'scale(1)'}],{duration:1100,easing:'cubic-bezier(.22,1,.36,1)'});
      animations.add(animation);animation.onfinish=()=>animations.delete(animation);observer.unobserve(entry.target);
    }), {threshold:.2});
    document.querySelectorAll('.media-reveal img').forEach(image => observer.observe(image));
    reduced.addEventListener('change', () => {if(reduced.matches){observer.disconnect();animations.forEach(animation=>animation.cancel());animations.clear();}});
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-inquiry]');
    if (!link) return;
    window.dispatchEvent(new CustomEvent('innoxone:conversion',{detail:{action:link.protocol==='tel:'?'phone':link.protocol==='mailto:'?'email':'inquiry',interest:link.dataset.inquiry,section:'about'}}));
  });
  window.INNO_ABOUT_REVIEW = {prepare:() => {
    films.forEach(film => film.pause());animations.forEach(animation=>animation.finish());
    document.querySelectorAll('img').forEach(image=>image.loading='eager');
    document.querySelectorAll('.film').forEach(frame=>frame.classList.remove('is-playing'));
    window.scrollTo({top:0,behavior:'instant'});
  }};
})();
