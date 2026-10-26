// Soft, once-only title fades. Layout and accessible names remain stable.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
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
  }
  const titleObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){titleFade(entry.target);titleObserver.unobserve(entry.target);}
  }),{threshold:.18});
  document.querySelectorAll('main h1,main h2,[data-reveal-title]').forEach(title=>{
    if(!title.matches('.sr-only')&&!title.querySelector('a,button'))titleObserver.observe(title);
  });
  // Photos gently settle into place without delaying their visibility.
  const mediaObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const animation=entry.target.animate([{transform:'scale(1.025)'},{transform:'scale(1)'}],{duration:850,easing:'cubic-bezier(.22,1,.36,1)'});
    animations.add(animation);animation.onfinish=()=>animations.delete(animation);mediaObserver.unobserve(entry.target);
  }),{threshold:.2});
  document.querySelectorAll('.visit-image img,.contact-gallery-photo img,.gallery-photo img,.benefit-photo img').forEach(image=>mediaObserver.observe(image));
  function finish(){animations.forEach(animation=>animation.finish());animations.clear();}
  reduced.addEventListener('change',()=>{if(reduced.matches){titleObserver.disconnect();mediaObserver.disconnect();finish();}});
  window.addEventListener('beforeprint',finish);
  window.addEventListener('pageshow',event=>{if(event.persisted)finish();});
  window.INNO_MOTION={finish};
})();
