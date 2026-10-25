const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const common = JSON.parse(fs.readFileSync(path.join(__dirname, 'content.json'), 'utf8'));
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'), 'utf8'));
const shell = require('./site-shell.cjs');
const css = fs.readFileSync(path.join(__dirname, 'site.css'), 'utf8') + fs.readFileSync(path.join(__dirname, 'products.css'), 'utf8');
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
const photo = (product, extra = '') => `<img src="${asset(product.image)}" srcset="${srcset(product.srcset)}" sizes="(max-width:599px) 90vw, 45vw" width="${product.width}" height="${product.height}" alt="${esc(product.alt)}" loading="lazy" decoding="async" ${extra}>`;

function header() { return shell.header('products'); }
function intro() {
  return `<section class="collection-intro wrap" aria-labelledby="page-title"><div class="collection-heading"><h1 id="page-title"><span>Golf carts &amp;</span><span>products.</span></h1><p><strong>Personal golf mobility.</strong><br>For your game. For your course.</p></div><div class="hero-stage"><div class="hero-copy"><p class="hero-family">INNO-F1</p><h2><span>One player.</span><span>One cart.</span></h2><p>Single-rider electric golf carts that give every golfer a ride of their own.</p><a class="text-link" href="#lineup">Explore the lineup${arrow}</a></div><div class="hero-product"><img src="${asset('f1-original.webp')}" srcset="${srcset('f1-original-600.webp 600w, f1-original-900.webp 900w, f1-original.webp 1200w')}" sizes="(max-width:767px) 95vw, 65vw" width="1200" height="700" alt="Green INNO-F1 Original electric golf cart, designed for one golfer and their clubs." fetchpriority="high" decoding="async"></div><p class="hero-caption">INNO-F1 Original</p></div><nav class="collection-jumps" aria-label="Product families"><a href="#lineup">INNO-F1${arrow}</a><a href="#inno-f2">INNO-F2${arrow}</a><a href="#robocaddy">ROBOCADDY${arrow}</a></nav></section>`;
}
function card(product) {
  const id = 'product-' + product.id;
  return `<article class="product-card" data-model="${product.id}" id="${product.id}"><div class="card-top"><p class="card-audience">${esc(product.audience)}</p><a class="card-detail-link" href="#${id}" data-open="${id}" aria-haspopup="dialog" aria-label="View ${esc(product.name)} details">${plus}</a></div><a class="card-visual" href="#${id}" data-open="${id}" aria-haspopup="dialog" aria-label="Explore ${esc(product.name)}">${photo(product)}</a><h3>${esc(product.name)}</h3><p class="card-description">${esc(product.summary)}</p><div class="card-actions"><a class="pill pill-dark" href="#${id}" data-open="${id}" aria-haspopup="dialog" aria-label="View details for ${esc(product.name)}">View details</a><a class="text-link" href="${contactURL(product.inquiry)}" data-inquiry="${product.id}" aria-label="Inquire about ${esc(product.name)}">Inquire${arrow}</a></div></article>`;
}
function lineup() {
  return `<section class="product-lineup wrap" id="lineup" aria-labelledby="lineup-title"><div class="section-heading"><h2 id="lineup-title">Find your ride.</h2><p>Explore each model. Find the right fit for you or your course team.</p></div><div class="product-grid">${data.products.map(card).join('')}</div><p class="lineup-note">Contact our team for pricing, specifications and availability.</p></section>`;
}
function productDialog(product) {
  const id = 'product-' + product.id;
  return `<dialog class="product-dialog" id="${id}" data-product="${product.id}" aria-labelledby="${id}-title">${close}<div class="dialog-body"><div class="dialog-visual${product.id === 'inno-f2' ? ' is-f2' : ''}">${photo(product)}<ul class="dialog-facts" aria-label="Model highlights">${product.facts.map(fact => `<li>${esc(fact)}</li>`).join('')}</ul></div><div class="dialog-copy"><p class="dialog-family">${esc(product.audience)}</p><h2 id="${id}-title">${esc(product.name)}</h2><p class="dialog-lead">${esc(product.headline)}</p><p class="dialog-description">${esc(product.description)}</p><dl class="dialog-features">${product.features.map(feature => `<div><dt>${esc(feature.title)}</dt><dd>${esc(feature.text)}</dd></div>`).join('')}</dl></div><div class="dialog-order"><div><h3>Make it your own.</h3><p>Our team will confirm specifications, configuration, pricing and delivery.</p><div class="dialog-contact"><a href="tel:${common.contact.tel}" data-inquiry="${product.id}" aria-label="Call INNOXONE about ${esc(product.name)}">Call our team</a><a href="${esc(mailURL(product.name))}" data-inquiry="${product.id}" aria-label="Email INNOXONE about ${esc(product.name)}">Email us</a></div></div><a class="pill" href="${contactURL(product.inquiry)}" data-inquiry="${product.id}" aria-label="Request a quote for ${esc(product.name)}">Request a quote${arrow}</a></div></div></dialog>`;
}
function robo() {
  return `<section class="robo-section on-dark" id="robocaddy" aria-labelledby="robo-title"><div class="robo-heading"><p class="robo-brand">ROBOCADDY<sup>®</sup></p><h2 id="robo-title"><span>Coming soon at the</span><span>2027 Orlando PGA Show</span></h2><p>Walk or Ride. The Choice Is Yours.</p></div><figure class="robo-image"><img src="${asset('robocaddy-teaser-1920.webp')}" srcset="${srcset('robocaddy-teaser-768.webp 768w, robocaddy-teaser-1280.webp 1280w, robocaddy-teaser-1920.webp 1920w')}" sizes="100vw" width="1920" height="768" alt="Four ROBOCADDY product concepts shown in dark silhouette for the 2027 collection preview." loading="lazy" decoding="async"></figure><div class="wrap robo-bottom"><p>Orlando, Florida · January 2027<span>2027 collection preview</span></p><a class="text-link" href="#product-robocaddy" data-open="product-robocaddy" aria-haspopup="dialog">Discover what’s next${arrow}</a></div></section>`;
}
function roboDialog() {
  return `<dialog class="product-dialog robo-dialog" id="product-robocaddy" data-product="robocaddy" aria-labelledby="product-robocaddy-title">${close}<div class="dialog-body"><div class="dialog-visual"><img src="${asset('robocaddy-teaser-1280.webp')}" width="1280" height="512" alt="The ROBOCADDY collection in silhouette." loading="lazy" decoding="async"><p class="dialog-facts">2027 collection preview</p></div><div class="dialog-copy"><p class="dialog-family">Coming January 2027</p><h2 id="product-robocaddy-title">ROBOCADDY®</h2><p class="dialog-lead">The Future of Personal Golf Mobility.</p><p class="dialog-description">Walk or Ride. The Choice Is Yours. ROBOCADDY introduces INNOXONE’s next chapter of Walk &amp; Ride Golf, with a family of personal mobility concepts.</p><dl class="dialog-features"><div><dt>The 2027 reveal</dt><dd>Coming soon at the 2027 Orlando PGA Show.</dd></div><div><dt>A first look</dt><dd>The collection remains in silhouette ahead of its introduction.</dd></div><div><dt>Stay in touch</dt><dd>Ask our team about the reveal and future availability.</dd></div></dl></div><div class="dialog-order"><div><h3>Ask about the 2027 reveal.</h3><p>Contact INNOXONE for information about the upcoming collection.</p><div class="dialog-contact"><a href="tel:${common.contact.tel}" data-inquiry="robocaddy-2027">Call our team</a><a href="${esc(mailURL('ROBOCADDY 2027 reveal'))}" data-inquiry="robocaddy-2027">Email us</a></div></div>${inquiry('Inquire', 'robocaddy-2027')}</div></div></dialog>`;
}
function visit() {
  return `<section class="visit-section wrap" aria-labelledby="visit-title"><div class="visit-grid"><figure class="visit-image"><img src="${asset('gallery-1600.webp')}" srcset="${srcset('gallery-640.webp 640w, gallery-1600.webp 1600w')}" sizes="(max-width:767px) 90vw, 45vw" width="1600" height="900" alt="INNOXONE golf carts on display in the San Juan Capistrano showroom." loading="lazy" decoding="async"></figure><div class="visit-copy"><p class="eyebrow">Experience INNOXONE</p><h2>Find the right fit.<br>In person.</h2><p>See the design up close. Talk through your needs. Arrange a showroom visit with our team.</p>${inquiry('Arrange a visit', 'showroom-visit')}<address>31896 Plaza Dr Suite D2<br>San Juan Capistrano, CA 92675<br><a href="${esc(common.contact.map)}">Get directions</a></address></div></div></section>`;
}
function questions() {
  return `<section class="questions-section wrap" aria-labelledby="questions-title"><div class="questions-grid"><div class="questions-intro"><h2 id="questions-title">A few things<br>you might ask.</h2><p>Questions about models or ordering?</p><a class="text-link" href="tel:${common.contact.tel}" data-inquiry="general">Talk to our team${arrow}</a></div><div class="question-list">${data.faq.map(item => `<details class="question"><summary>${esc(item.q)}${plus}</summary><p>${esc(item.a)}</p></details>`).join('')}</div></div></section>`;
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
const fallbackCSS = '.product-dialog:not([open]){display:block;position:static;width:calc(100% - 40px);max-width:1152px;max-height:none;margin:32px auto;background:#fff;border:1px solid var(--line)}.product-dialog .dialog-close,.menu-button{display:none}.dialog-order{position:static}.site-header .nav-left{display:flex;gap:16px}.site-header .nav-left>a:not([aria-current]){display:none}.site-header .nav-left>a{font-size:11px}.site-header .wordmark{width:110px}.site-header .nav-right{display:none}.site-header .header-inner{grid-template-columns:1fr auto}';
const html = `<!doctype html><html lang="en-US"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#ffffff">
<title>${esc(data.meta.title)}</title><meta name="description" content="${esc(data.meta.description)}"><meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${data.meta.canonical}"><link rel="icon" href="../assets/innoxone-logo.svg" type="image/svg+xml">
<meta property="og:type" content="website"><meta property="og:site_name" content="INNOXONE"><meta property="og:locale" content="en_US"><meta property="og:title" content="${esc(data.meta.title)}"><meta property="og:description" content="${esc(data.meta.description)}"><meta property="og:url" content="${data.meta.canonical}"><meta property="og:image" content="https://ausystems.github.io/innoxone/assets/products-social.webp"><meta property="og:image:alt" content="INNO-F1 Original single-rider electric golf cart by INNOXONE"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(data.meta.title)}"><meta name="twitter:description" content="${esc(data.meta.description)}"><meta name="twitter:image" content="https://ausystems.github.io/innoxone/assets/products-social.webp">
<link rel="preload" href="../assets/mona-sans-homepage.woff2" as="font" type="font/woff2" crossorigin>
<style>${css}\n${fallbackCSS.split('}').filter(Boolean).map(rule => {const [selectors,body]=rule.split('{'); return selectors.split(',').map(selector => '.dialog-fallback '+selector).join(',')+'{'+body+'}';}).join('')}</style><noscript><style>${fallbackCSS}</style></noscript>
<script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script>
</head><body>${header()}<main id="main">${intro()}${lineup()}${data.products.map(productDialog).join('')}${robo()}${roboDialog()}${visit()}${questions()}</main>${footer()}${menu()}<script>${runtime}</script></body></html>`;
const target = path.join(ROOT, 'golf-carts-products');
fs.mkdirSync(target, {recursive:true});
fs.writeFileSync(path.join(target, 'index.html'), html);
fs.writeFileSync(path.join(ROOT, 'sitemap-products.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${data.meta.canonical}</loc><lastmod>2026-10-25</lastmod></url></urlset>\n`);
console.log('Built products collection:', Buffer.byteLength(html), 'bytes;', data.products.length, 'models + ROBOCADDY preview');
