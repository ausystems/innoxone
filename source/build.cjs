const fs=require('fs'),vm=require('vm'),path=require('path');
const ROOT=path.resolve(__dirname,'..');
const DATA=JSON.parse(fs.readFileSync(path.join(__dirname,'content.json'),'utf8'));
const css=fs.readFileSync(path.join(__dirname,'style.css'),'utf8'),js=fs.readFileSync(path.join(__dirname,'page.js'),'utf8');
const pure=js.split('// ENHANCE:')[0];
const markup=vm.runInNewContext('const DATA='+JSON.stringify(DATA)+';'+pure+';renderHeader()+`<main id="main">${renderHero()+renderHarold()+renderOrigin()+renderBenefits()+renderWhy()+renderLineup()+renderDetails()+renderF2()+renderRobo()+renderConnect()+renderGallery()+renderSister()+renderFaq()+renderInquiry()}</main>`+renderFooter()+renderQuickContact()');
const url=DATA.config.canonical;
const assetBase='https://ausystems.github.io/innoxone/';
const organization={'@type':'Organization','@id':url+'#organization',name:'INNOXONE',url,logo:assetBase+'assets/innoxone-logo.svg',telephone:DATA.contact.tel,email:DATA.contact.email,address:{'@type':'PostalAddress',streetAddress:'31896 Plaza Dr Suite D2',addressLocality:'San Juan Capistrano',addressRegion:'CA',postalCode:'92675',addressCountry:'US'},contactPoint:{'@type':'ContactPoint',telephone:DATA.contact.tel,email:DATA.contact.email,contactType:'sales and support'},sameAs:DATA.footer.socials.map(s=>s.href)};
const schema={'@context':'https://schema.org','@graph':[organization,{'@type':'WebSite','@id':url+'#website',url,name:'INNOXONE',publisher:{'@id':url+'#organization'},inLanguage:'en-US'},{'@type':['WebPage','FAQPage'],'@id':url+'#webpage',url,name:DATA.meta.title,description:DATA.meta.description,isPartOf:{'@id':url+'#website'},about:[{'@type':'Thing',name:'Personal golf mobility'},{'@type':'Thing',name:'INNO-F1 single-rider electric golf cart'},{'@type':'Thing',name:'INNO-F2 golf cart'},{'@type':'Thing',name:'ROBOCADDY Walk & Ride Golf'},{'@type':'Thing',name:'INNOXONE CONNECT and Intelligent Golf Operations'}],primaryImageOfPage:{'@type':'ImageObject',url:assetBase+'assets/social-preview.webp',width:1200,height:630},inLanguage:'en-US',mainEntity:DATA.faq.items.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))}]};
const runtime=js.slice(0,js.indexOf('function renderHeader()'))+js.slice(js.indexOf('// ENHANCE:'));
const html=`<!doctype html>
<html lang="en-US"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#ffffff">
<title>${DATA.meta.title}</title>
<meta name="description" content="${DATA.meta.description}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<link rel="canonical" href="https://www.innoxone.com/">
<meta property="og:type" content="website"><meta property="og:site_name" content="INNOXONE"><meta property="og:locale" content="en_US">
<meta property="og:title" content="${DATA.meta.title}"><meta property="og:description" content="${DATA.meta.description}">
<meta property="og:url" content="https://www.innoxone.com/"><meta property="og:image" content="${assetBase}assets/social-preview.webp"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:type" content="image/webp"><meta property="og:image:alt" content="Golfers driving INNO-F1 single-rider electric golf carts on the course">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${DATA.meta.title}"><meta name="twitter:description" content="${DATA.meta.description}"><meta name="twitter:image" content="${assetBase}assets/social-preview.webp"><meta name="twitter:image:alt" content="INNO-F1 single-rider electric golf carts on the course">
<link rel="icon" href="assets/innoxone-logo.svg" type="image/svg+xml"><link rel="preload" href="assets/mona-sans-homepage.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" as="image" media="(min-width:768px)" href="assets/hero-1920.webp" imagesrcset="assets/hero-768.webp 768w, assets/hero-1280.webp 1280w, assets/hero-1920.webp 1920w" imagesizes="100vw" fetchpriority="high">
<link rel="preload" as="image" media="(max-width:767px)" href="assets/hero-mobile-480.webp" imagesrcset="assets/hero-mobile-480.webp 480w, assets/hero-mobile-768.webp 768w" imagesizes="100vw" fetchpriority="high">
<style>${css}</style>
<script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script>
<script defer src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script><script defer src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script><script defer src="https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js"></script>
</head><body id="top"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden"><defs><symbol id="inno-wordmark" viewBox="${DATA.logo.viewBox}"><path fill="currentColor" fill-rule="evenodd" d="${DATA.logo.ink}"/><path fill="var(--green)" fill-rule="evenodd" d="${DATA.logo.green}"/></symbol></defs></svg><div id="app">${markup}</div><script>
const DATA = ${JSON.stringify({config:DATA.config,labels:DATA.labels,hero:DATA.hero,variants:DATA.variants,contact:DATA.contact}).replace(/</g,'\\u003c')};
${runtime}
</script></body></html>`;
fs.writeFileSync(path.join(ROOT,'index.html'),html);
fs.writeFileSync(path.join(ROOT,'sitemap-homepage.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.innoxone.com/</loc><lastmod>2026-10-20</lastmod></url></urlset>\n');
console.log('Built static homepage:',Buffer.byteLength(html),'bytes; FAQs:',DATA.faq.items.length);
