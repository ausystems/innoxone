// Soft, once-only title fades. Layout and accessible names remain stable.
(() => {
  const boot = window.INNO_TITLE_BOOT;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (!boot?.active || reduced.matches) { boot?.release(); return; }
  const played = new WeakSet(), animations = new Set();
  const graphemes = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter('en', {granularity:'grapheme'}) : null;
  const letters = text => graphemes ? [...graphemes.segment(text)].map(item=>item.segment) : Array.from(text);
  function titleFade(title) {
    if (played.has(title) || reduced.matches) return;
    played.add(title);
    title.setAttribute('data-letter-title','');
    title.setAttribute('aria-label', (title.innerText || title.textContent).replace(/\s+/g,' ').trim());
    const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT), nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    const characterCount=nodes.reduce((count,node)=>count+letters(node.textContent.replace(/\s/g,'')).length,0);
    const stagger=Math.min(22,720/Math.max(1,characterCount-1));
    let index=0;
    for(const node of nodes){
      const fragment=document.createDocumentFragment();
      for(const word of node.textContent.split(/(\s+)/)){
        if(!word.trim()){fragment.append(document.createTextNode(word));continue;}
        const group=document.createElement('span');group.className='title-word';group.setAttribute('aria-hidden','true');
        for(const letter of letters(word)){
          const character=document.createElement('span');character.className='title-letter';character.textContent=letter;group.append(character);
          const animation=character.animate([{opacity:0},{opacity:1}],{duration:560,delay:index++*stagger,easing:'cubic-bezier(.25,.1,.25,1)',fill:'backwards'});
          animations.add(animation);animation.onfinish=()=>animations.delete(animation);
        }
        fragment.append(group);
      }
      node.replaceWith(fragment);
    }
    // The parent becomes visible only after every letter has its hidden start state.
    title.setAttribute('data-title-started','');
  }
  const titleObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){
      try{titleFade(entry.target);}catch(error){finish();console.error('Title reveal could not start.',error);}
      titleObserver.unobserve(entry.target);
    }
  }),{threshold:.18});
  const titles=[...document.querySelectorAll('[data-reveal-title]')];
  function begin(){
    if(!boot.active || reduced.matches)return;
    titles.forEach(title=>titleObserver.observe(title));
    clearTimeout(boot.timer);
  }
  // Let the display font settle, without making slow connections wait indefinitely.
  Promise.race([document.fonts.ready,new Promise(resolve=>setTimeout(resolve,600))]).then(begin);
  // Photos gently settle into place without delaying their visibility.
  const mediaObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const animation=entry.target.animate([{transform:'scale(1.025)'},{transform:'scale(1)'}],{duration:850,easing:'cubic-bezier(.22,1,.36,1)'});
    animations.add(animation);animation.onfinish=()=>animations.delete(animation);mediaObserver.unobserve(entry.target);
  }),{threshold:.2});
  document.querySelectorAll('.visit-image img,.contact-gallery-photo img,.gallery-photo img,.benefit-photo img').forEach(image=>mediaObserver.observe(image));
  function finish(){
    titleObserver.disconnect();mediaObserver.disconnect();
    animations.forEach(animation=>animation.finish());animations.clear();
    boot.release();
  }
  reduced.addEventListener('change',()=>{if(reduced.matches)finish();});
  window.addEventListener('beforeprint',finish);
  window.addEventListener('pageshow',event=>{if(event.persisted)finish();});
  window.INNO_MOTION={finish};
})();
