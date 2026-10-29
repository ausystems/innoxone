const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const common = JSON.parse(fs.readFileSync(path.join(__dirname, 'content.json'), 'utf8'));
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'), 'utf8'));
const shell = require('./site-shell.cjs');
const css = fs.readFileSync(path.join(__dirname, 'site.css'), 'utf8') + fs.readFileSync(path.join(__dirname, 'products.css'), 'utf8') + fs.readFileSync(path.join(__dirname,'footer.css'),'utf8') + fs.readFileSync(path.join(__dirname,'editorial.css'),'utf8')+fs.readFileSync(path.join(__dirname,'products-editorial.css'),'utf8')+fs.readFileSync(path.join(__dirname,'product-stories.css'),'utf8')+fs.readFileSync(path.join(__dirname,'motion.css'),'utf8');
const runtime = fs.readFileSync(path.join(__dirname, 'products.js'), 'utf8');
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
const asset = name => '../assets/' + name;
const srcset = value => value.split(', ').map(value => '../assets/' + value).join(', ');
const arrow = '<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7"/></svg>';
const plus = '<span class="plus" aria-hidden="true"></span>';
const close = '<button class="dialog-close" type="button" data-close aria-label="Close product details" autofocus><span class="cross" aria-hidden="true"></span></button>';
const mark = `<svg viewBox="${common.logo.viewBox}" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="${common.logo.ink}"/><path fill="var(--green)" fill-rule="evenodd" d="${common.logo.green}"/></svg>`;
const logo = `<a class="wordmark" href="../" aria-label="INNOXONE home">${mark}</a>`;
const contactURL = interest => '../contact/' + (interest ? '?interest=' + encodeURIComponent(interest) : '');
const mailURL = product => 'mailto:' + common.contact.email + '?subject=' + encodeURIComponent(product + ' inquiry');
const inquiry = (label, interest, cls = 'pill') => `<a class="${cls}" href="${contactURL(interest)}" data-inquiry="${esc(interest || 'general')}">${esc(label)}</a>`;
const photo = (product, extra = '', dialog = false) => `<img src="${asset(product.image)}" srcset="${srcset(product.srcset)}" sizes="${product.id==='inno-f2'?'(max-width:767px) 280px, 340px':dialog?'(max-width:767px) 360px, 620px':'(max-width:359px) 280px, (max-width:767px) 360px, (max-width:1100px) 420px, 500px'}" width="${product.width}" height="${product.height}" alt="${esc(product.alt)}" loading="${product.id==='inno-f1-original'?'eager':'lazy'}" decoding="async" ${extra}>`;

function header() { return shell.header('products'); }
function intro() {
  return `<section class="collection-intro wrap" aria-labelledby="page-title"><p class="collection-label">Golf Carts &amp; Products</p><div class="collection-heading"><h1 id="page-title" data-reveal-title>Golf carts. Made personal.</h1><p>Find your own way around the course. Explore golf carts for players and course teams.</p></div></section><nav class="collection-navigation" aria-label="Product models"><div class="wrap collection-jumps"><a href="#inno-f1-original" aria-label="Explore INNO-F1 Original">Original</a><a href="#inno-f1-light" aria-label="Explore INNO-F1 Light">Light</a><a href="#inno-f1-marshal" aria-label="Explore INNO-F1 Marshal">Marshal</a><a href="#inno-f2">INNO-F2</a><a href="#robocaddy">ROBOCADDY</a></div></nav>`;
}
function card(product) {
  const id = 'product-' + product.id;
  return `<article class="product-card" data-model="${product.id}" id="${product.id}"><div class="card-top"><div><p class="card-audience">${esc(product.audience)}</p><h3>${esc(product.name)}</h3></div><a class="card-detail-link" href="#${id}" data-open="${id}" aria-haspopup="dialog" aria-label="View ${esc(product.name)} details">${plus}</a></div><a class="card-visual" href="#${id}" data-open="${id}" aria-haspopup="dialog" aria-label="Explore ${esc(product.name)}">${photo(product, product.id === 'inno-f1-original' ? 'fetchpriority="high"' : '')}</a><div class="card-bottom"><p class="card-description">${esc(product.summary)}</p><div class="card-actions"><a class="pill pill-dark" href="#${id}" data-open="${id}" aria-haspopup="dialog" aria-label="View details for ${esc(product.name)}">View details</a><a class="text-link" href="${contactURL(product.inquiry)}" data-inquiry="${product.id}" aria-label="Get a quote for ${esc(product.name)}">Get a quote${arrow}</a></div></div></article>`;
}
function lineup() {
  return `<section class="product-lineup wrap" id="lineup" aria-labelledby="lineup-title"><h2 class="sr-only" id="lineup-title">Explore our golf carts</h2><div class="product-grid">${data.products.map(card).join('')}</div><p class="lineup-note">Contact our team for pricing, specifications and availability.</p></section>`;
}
function comparison() {
  return `<section class="model-guide wrap" aria-labelledby="model-guide-title"><details class="model-comparison" open><summary><span><span class="guide-label">A closer look</span><span id="model-guide-title">Which INNO-F1 fits your round?</span></span><span class="guide-toggle">Compare models${plus}</span></summary><div class="comparison-content"><table><caption class="sr-only">INNO-F1 model comparison</caption><thead><tr><th scope="col">Model</th><th scope="col">Designed for</th><th scope="col">Configuration</th><th scope="col"><span class="sr-only">Product details</span></th></tr></thead><tbody>${data.products.filter(p=>p.family==='INNO-F1').map(p=>`<tr><th scope="row">${esc(p.name)}</th><td>${p.id==='inno-f1-marshal'?'Marshals and course staff':'Individual golfers'}</td><td>${p.id==='inno-f1-original'?'Single seat, armrests and golf-bag space':p.id==='inno-f1-light'?'Single seat, slim roof frame and golf-bag space':'Single seat and rear utility box'}</td><td><a class="text-link" href="#product-${p.id}" data-open="product-${p.id}" aria-haspopup="dialog" aria-label="View details for ${esc(p.name)}">View details${arrow}</a></td></tr>`).join('')}</tbody></table><p>Our team can help you confirm the right configuration for your needs.</p></div></details></section>`;
}
function storyChapter(product) {
  const story=product.story;
  const visual=story.image?`<figure class="story-photo"><img src="${asset(story.image)}" srcset="${srcset(story.srcset)}" sizes="(max-width:767px) 100vw, 580px" width="${story.width}" height="${story.height}" alt="${esc(story.alt)}" loading="lazy" decoding="async"><figcaption>${esc(story.caption)}</figcaption></figure>`:`<div class="story-statement" aria-hidden="true"><p>${story.statement.map(line=>`<span>${esc(line)}</span>`).join('')}</p><span class="statement-caption">${esc(story.caption)}</span></div>`;
  return `<section class="story-chapter" aria-labelledby="${product.id}-story-title"><div class="story-chapter-copy"><p class="story-label">${esc(story.label)}</p><h3 id="${product.id}-story-title">${esc(story.title)}</h3>${story.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}</div>${visual}</section>`;
}
function storyPerspectives(product) {
  return `<section class="story-perspectives" aria-label="Who ${esc(product.name)} is for">${product.perspectives.map(item=>`<article><p class="story-label">${esc(item.label)}</p><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join('')}</section>`;
}
function founderNote(product) {
  if(!product.founder)return '';
  const founder=product.founder;
  return `<figure class="story-founder"><img src="${asset('about-young-kim-480.webp')}" width="480" height="480" alt="Young Kim, founder of INNOXONE." loading="lazy" decoding="async"><div><blockquote>“${esc(founder.quote)}”</blockquote><figcaption>${esc(founder.name)}<span>${esc(founder.role)}</span></figcaption></div></figure>`;
}
function storyInvitation(product) {
  const invite=product.invitation;
  return `<section class="story-invitation" aria-labelledby="${product.id}-invitation-title"><p class="story-label">A personal introduction</p><h3 id="${product.id}-invitation-title">${esc(invite.title)}</h3><p>${esc(invite.text)}</p><div>${inquiry(invite.action,invite.interest,'text-link')}${`<a class="story-email" href="${esc(mailURL(product.name))}" data-inquiry="${product.id}">Email our team</a>`}</div></section>`;
}
function storyOrder(product,robo=false) {
  return `<div class="dialog-order"><div class="order-summary"><h3>${esc(product.orderTitle)}</h3><p>${robo?'2027 collection preview':'Let’s talk about your golf cart.'}</p></div><div class="dialog-order-actions"><div class="dialog-contact"><a href="tel:${common.contact.tel}" data-inquiry="${product.id}" aria-label="Call our team about ${esc(product.name)}">Call our team</a></div><a class="pill" href="${contactURL(robo?'robocaddy-2027':product.inquiry)}" data-inquiry="${product.id}" aria-label="${robo?'Ask about 2027: the ROBOCADDY reveal':'Request a quote for '+esc(product.name)}">${robo?'Ask about 2027':'Request a quote'}${arrow}</a></div></div>`;
}
function productDialog(product) {
  const id='product-'+product.id;
  return `<dialog class="product-dialog story-dialog" id="${id}" data-product="${product.id}" aria-labelledby="${id}-title"><div class="story-topbar"><span>INNOXONE collection</span>${close}</div><div class="dialog-body story-scroll" tabindex="0" role="region" aria-label="${esc(product.name)} story"><div class="dialog-story-hero"><div class="dialog-copy"><p class="dialog-family">${esc(product.audience)}</p><h2 id="${id}-title">${esc(product.name)}</h2><p class="dialog-lead">${esc(product.headline)}</p><p class="dialog-description">${esc(product.description)}</p></div><div class="dialog-visual${product.id==='inno-f2'?' is-f2':''}">${photo(product,'',true)}<ul class="dialog-facts" aria-label="Model highlights">${product.facts.map(f=>`<li>${esc(f)}</li>`).join('')}</ul></div></div>${storyChapter(product)}${storyPerspectives(product)}<section class="story-details" aria-labelledby="${product.id}-details-title"><p class="story-label">A closer look</p><h3 id="${product.id}-details-title">${product.id==='inno-f1-marshal'?'Considered for course duties.':'The details around your day.'}</h3><dl class="dialog-features">${product.features.map(f=>`<div><dt>${esc(f.title)}</dt><dd>${esc(f.text)}</dd></div>`).join('')}</dl></section>${founderNote(product)}${storyInvitation(product)}</div>${storyOrder(product)}</dialog>`;
}
function robo() {
  return `<section class="robo-section on-dark" id="robocaddy" aria-labelledby="robo-title"><div class="wrap robo-heading"><p class="robo-brand">ROBOCADDY<sup>®</sup></p><h2 id="robo-title" data-reveal-title>Coming soon at the<br>2027 Orlando PGA Show</h2></div><figure class="robo-image"><img src="${asset('robocaddy-teaser-1920.webp')}" srcset="${srcset('robocaddy-teaser-768.webp 768w, robocaddy-teaser-1280.webp 1280w, robocaddy-teaser-1920.webp 1920w')}" sizes="100vw" width="1920" height="768" alt="Four ROBOCADDY product concepts shown in dark silhouette for the 2027 collection preview." loading="lazy" decoding="async"></figure><div class="wrap robo-bottom"><div><p class="robo-promise">Walk or Ride.<br>The Choice Is Yours.</p><p class="robo-date">Orlando, Florida · January 2027</p></div><div class="robo-invitation"><p>A new family of personal golf mobility. Preview the silhouettes ahead of the reveal.</p><a class="text-link" href="#product-robocaddy" data-open="product-robocaddy" aria-haspopup="dialog">Discover what’s next${arrow}</a></div></div></section>`;
}
function roboDialog() {
  const p=data.robocaddy;
  return `<dialog class="product-dialog story-dialog robo-dialog" id="product-robocaddy" data-product="robocaddy" aria-labelledby="product-robocaddy-title"><div class="story-topbar"><span>INNOXONE · The next chapter</span>${close}</div><div class="dialog-body story-scroll" tabindex="0" role="region" aria-label="The ROBOCADDY story"><div class="robo-story-hero"><p class="dialog-family">${esc(p.audience)}</p><h2 id="product-robocaddy-title">${esc(p.name)}</h2><p class="dialog-lead">${esc(p.headline)}</p><img src="${asset('robocaddy-teaser-1280.webp')}" width="1280" height="512" alt="Four ROBOCADDY concepts kept in silhouette ahead of the 2027 reveal." loading="lazy" decoding="async"><p class="dialog-description">${esc(p.description)}</p><p class="robo-preview-note">2027 collection preview</p></div>${storyChapter(p)}${founderNote(p)}<section class="story-robo-family" aria-labelledby="robo-family-title"><p class="story-label">One family. More ways to play.</p><h3 id="robo-family-title">A choice for the way you move.</h3><p class="family-intro">Meet the vision for F1, F2, SOLO and DUO. The collection will be introduced at the January 2027 PGA Show in Orlando.</p><dl>${p.family.map(model=>`<div><dt>${esc(model.name)}</dt><dd>${esc(model.text)}</dd></div>`).join('')}</dl><p class="family-note">Future product concepts. Ask our team about the reveal, specifications and availability.</p></section>${storyPerspectives(p)}${storyInvitation(p)}</div>${storyOrder(p,true)}</dialog>`;
}
function visit() {
  return `<section class="visit-section wrap" aria-labelledby="visit-title"><figure class="visit-image"><img src="${asset('gallery-1600.webp')}" srcset="${srcset('gallery-640.webp 640w, gallery-1600.webp 1600w')}" sizes="(max-width:767px) 90vw, 70vw" width="1600" height="900" alt="INNOXONE golf carts on display in the San Juan Capistrano showroom." loading="lazy" decoding="async"></figure><div class="visit-copy"><p class="eyebrow">Experience INNOXONE</p><h2 id="visit-title" data-reveal-title>Your next ride.<br>Up close.</h2><p>See the design. Take a seat. Talk through the right golf cart for your game or your course.</p>${inquiry('Arrange a visit', 'showroom-visit')}<address>31896 Plaza Dr Suite D2<br>San Juan Capistrano, CA 92675</address><a class="text-link" href="${esc(common.contact.map)}">Get directions${arrow}</a></div></section>`;
}
function questions() {
  return `<section class="questions-section wrap" aria-labelledby="questions-title"><div class="questions-intro"><p class="story-label">Frequently asked questions</p><h2 id="questions-title">Your questions, answered.</h2><p>Choosing a golf cart is personal. Start here, or talk it through with our team.</p></div><div class="question-list">${data.faq.map((item,index) => `<details class="question"${index===0?' open':''}><summary>${esc(item.q)}${plus}</summary><p>${esc(item.a)}</p></details>`).join('')}</div><a class="text-link questions-contact" href="tel:${common.contact.tel}" data-inquiry="general">Still deciding? Talk to our team${arrow}</a></section>`;
}
function footer() { return shell.footer('products'); }
function menu() { return shell.menu('products'); }

const organization = {'@type':'Organization','@id':'https://www.innoxone.com/#organization',name:'INNOXONE',url:'https://www.innoxone.com/',logo:'https://ausystems.github.io/innoxone/assets/innoxone-logo.svg',telephone:common.contact.tel,email:common.contact.email,sameAs:common.footer.socials.map(s => s.href)};
const schema = {'@context':'https://schema.org','@graph':[
  organization,
  {'@type':'CollectionPage','@id':data.meta.canonical+'#webpage',url:data.meta.canonical,name:data.meta.title,description:data.meta.description,inLanguage:'en-US',publisher:{'@id':organization['@id']},mainEntity:{'@id':data.meta.canonical+'#collection'}},
  {'@type':'ItemList','@id':data.meta.canonical+'#collection',name:'INNOXONE golf carts',numberOfItems:data.products.length,itemListElement:data.products.map((product,index) => ({'@type':'ListItem',position:index+1,item:{'@type':'Product','@id':data.meta.canonical+'#product-'+product.id,name:product.name,description:product.summary,image:'https://ausystems.github.io/innoxone/assets/'+product.image,brand:{'@type':'Brand',name:'INNOXONE'},category:'Golf carts',url:data.meta.canonical+'#product-'+product.id}}))},
  {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:'https://ausystems.github.io/innoxone/'},{'@type':'ListItem',position:2,name:'Golf Carts & Products',item:data.meta.canonical}]},
  {'@type':'FAQPage','@id':data.meta.canonical+'#questions',mainEntity:data.faq.map(item => ({'@type':'Question',name:item.q,acceptedAnswer:{'@type':'Answer',text:item.a}}))}
]};
const fallbackCSS = '.story-dialog{height:auto!important;max-height:none!important;overflow:visible!important}.story-dialog .dialog-body{overflow:visible;max-height:none;height:auto}.story-topbar{display:none!important}.product-dialog:not([open]){display:block;position:static;width:calc(100% - 40px);max-width:1152px;max-height:none;margin:32px auto;background:#fff;border:1px solid var(--line)}.product-dialog .dialog-close,.menu-button{display:none}.dialog-order{position:static}.site-header .nav-left{display:flex;gap:16px}.site-header .nav-left>a:not([aria-current]){display:none}.site-header .nav-left>a{font-size:11px}.site-header .wordmark{width:110px}.site-header .nav-right{display:none}.site-header .header-inner{grid-template-columns:1fr auto}';
const html = `<!doctype html><html lang="en-US"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#ffffff">
<title>${esc(data.meta.title)}</title><meta name="description" content="${esc(data.meta.description)}"><meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${data.meta.canonical}"><link rel="sitemap" type="application/xml" href="../sitemap.xml"><link rel="icon" href="../assets/innoxone-logo.svg" type="image/svg+xml">
<meta property="og:type" content="website"><meta property="og:site_name" content="INNOXONE"><meta property="og:locale" content="en_US"><meta property="og:title" content="${esc(data.meta.title)}"><meta property="og:description" content="${esc(data.meta.description)}"><meta property="og:url" content="${data.meta.canonical}"><meta property="og:image" content="https://ausystems.github.io/innoxone/assets/products-social.webp"><meta property="og:image:alt" content="INNO-F1 Original single-rider electric golf cart by INNOXONE"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(data.meta.title)}"><meta name="twitter:description" content="${esc(data.meta.description)}"><meta name="twitter:image" content="https://ausystems.github.io/innoxone/assets/products-social.webp">
<link rel="preload" href="../assets/mona-sans-homepage.woff2" as="font" type="font/woff2" crossorigin>
<script>${fs.readFileSync(path.join(__dirname,'motion-head.js'),'utf8')}</script><style>${css}\n${fallbackCSS.split('}').filter(Boolean).map(rule => {const [selectors,body]=rule.split('{'); return selectors.split(',').map(selector => '.dialog-fallback '+selector).join(',')+'{'+body+'}';}).join('')}</style><noscript><style>${fallbackCSS}</style></noscript>
<script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script>
</head><body id="top" class="products-page">${header()}<main id="main">${intro()}${lineup()}${comparison()}${data.products.map(productDialog).join('')}${robo()}${roboDialog()}${visit()}${questions()}</main>${footer()}${menu()}<script>${runtime}</script><script>
${fs.readFileSync(path.join(__dirname,'motion.js'),'utf8')}</script></body></html>`;
const target = path.join(ROOT, 'golf-carts-products');
fs.mkdirSync(target, {recursive:true});
fs.writeFileSync(path.join(target, 'index.html'), html);
fs.writeFileSync(path.join(ROOT, 'sitemap-products.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${data.meta.canonical}</loc><lastmod>2026-10-29</lastmod></url></urlset>\n`);
console.log('Built products collection:', Buffer.byteLength(html), 'bytes;', data.products.length, 'models + ROBOCADDY preview');
