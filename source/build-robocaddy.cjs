const fs = require('fs');
const path = require('path');
const shell = require('./site-shell.cjs');
const data = require('./robocaddy.json');
const common = require('./content.json');
const ROOT = path.resolve(__dirname, '..');
const {esc} = shell;
const asset = name => '../assets/' + name;
const arrow = '<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7"/></svg>';
const paragraph = text => '<p>' + esc(text) + '</p>';
const action = (label, href, mode = '') => `<a class="pill" href="${href}"${mode ? ' data-pga-mode="' + mode + '"' : ''}>${label}${arrow}</a>`;
function photo(key, sizes, eager = false) {
  const image = data.images[key];
  return `<img src="${asset(image.base + '-1206.webp')}" srcset="${asset(image.base + '-640.webp')} 640w, ${asset(image.base + '-1206.webp')} 1206w" sizes="${sizes}" width="${image.width}" height="${image.height}" alt="${esc(image.alt)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}>`;
}
function letter(id, title, paragraphs) {
  return `<details class="robo-letter"><summary>${title}<span aria-hidden="true">+</span></summary><div class="robo-letter-body" id="${id}">${paragraphs.map(paragraph).join('')}<p class="letter-signature">Young Kim<span>Founder &amp; CEO of INNOXONE</span></p></div></details>`;
}
function hero() {
  return `<section class="robo-hero wrap" aria-labelledby="robo-page-title">
    <div class="robo-hero-copy">
      <img class="robo-official-logo" src="${asset('robocaddy-logo.webp')}" width="996" height="166" alt="RoboCaddy">
      <h1 id="robo-page-title" data-reveal-title>Walk. Ride.<br>Your choice.</h1>
      <p>Golf carts that follow you when you walk. A personal seat whenever you’re ready to ride.</p>
      ${action('Meet us at the PGA Show', '#pga-showcase')}
    </div>
    <figure class="robo-hero-media media-reveal">${photo('soloWalk','(max-width:900px) 90vw, 56vw',true)}</figure>
  </section>
  <nav class="robo-chapters" aria-label="RoboCaddy sections"><div class="wrap">
    <a href="#robo-story">Story</a><a href="#walk-ride">Walk &amp; Ride</a><a href="#solo">SOLO</a><a href="#robo-f1">F1</a><a href="#pga-showcase">PGA 2027</a>
  </div></nav>`;
}
function story() {
  return `<section class="robo-story wrap robo-section-space" id="robo-story" aria-labelledby="robo-story-title">
    <div class="robo-story-heading"><h2 id="robo-story-title" data-reveal-title>It began after<br>nine holes.</h2>
    <p>Young Kim enjoyed the walk. At the turn, he was ready for a ride. Back in the clubhouse, a sketch on a napkin became the beginning of RoboCaddy.</p></div>
    <div class="robo-founder-layout">
      <figure class="robo-founder"><img src="${asset('about-young-kim-800.webp')}" srcset="${asset('about-young-kim-480.webp')} 480w, ${asset('about-young-kim-800.webp')} 800w" sizes="(max-width:767px) 90vw, 32vw" width="800" height="491" alt="Young Kim, founder and designer of INNOXONE." loading="lazy" decoding="async"><figcaption>Young Kim<span>Founder &amp; CEO of INNOXONE</span></figcaption></figure>
      <div class="robo-founder-words"><blockquote>“Instead of playing the back nine that day, I found myself designing a new way to experience all eighteen.”</blockquote>
        <p>One compact cart could carry your bag and follow you as you walked, with a seat ready when you wanted a ride. You could choose throughout the round, according to how you felt.</p>
        ${letter('young-kim-story','Read Young Kim’s story',data.story.paragraphs)}
      </div>
    </div>
  </section>`;
}
function choice() {
  return `<section class="robo-choice robo-section-space" id="walk-ride" aria-labelledby="choice-title"><div class="wrap">
    <div class="robo-centered-heading"><h2 id="choice-title" data-reveal-title>Walk when you want.<br>Ride when you need.</h2><p>Following technology brings both choices into one electric golf cart. Your clubs travel with you, whichever way you want to play.</p></div>
    <div class="robo-mode-demo" data-mode-demo>
      <div class="robo-mode-controls" role="tablist" aria-label="See SOLO walking and riding">
        <button type="button" id="solo-walk-tab" role="tab" aria-selected="true" aria-controls="solo-walk-panel" data-mode-tab="walk">Walk. It follows.</button>
        <button type="button" id="solo-ride-tab" role="tab" aria-selected="false" aria-controls="solo-ride-panel" tabindex="-1" data-mode-tab="ride">Ride. It’s ready.</button>
      </div>
      <div class="robo-mode-panel" id="solo-walk-panel" role="tabpanel" aria-labelledby="solo-walk-tab" tabindex="0"><figure>${photo('soloWalk','(max-width:767px) 90vw, 82vw')}<figcaption>SOLO carries your clubs and follows as you walk.</figcaption></figure></div>
      <div class="robo-mode-panel" id="solo-ride-panel" role="tabpanel" aria-labelledby="solo-ride-tab" tabindex="0" hidden><figure>${photo('soloRide','(max-width:767px) 90vw, 82vw')}<figcaption>Take your seat whenever you want a ride.</figcaption></figure></div>
    </div>
  </div></section>`;
}
function solo() {
  return `<section class="robo-solo wrap robo-section-space" id="solo" aria-labelledby="solo-title">
    <div class="robo-model-copy"><p class="robo-model-name">ROBOCADDY SOLO</p><h2 id="solo-title" data-reveal-title>A smaller cart.<br>A bigger choice.</h2><p>SOLO is where the Walk &amp; Ride idea began. A compact personal golf cart that carries your bag, follows your walk and gives you a seat when you want one.</p><p>Enjoy the fairway on foot. Take a ride to your next shot. Make the choice your own, all eighteen holes.</p><a class="text-link" href="#pga-request" data-pga-mode="tour">Meet SOLO in Orlando${arrow}</a></div>
    <figure class="robo-solo-photo media-reveal">${photo('soloRide','(max-width:767px) 90vw, 58vw')}</figure>
  </section>`;
}
function f1() {
  return `<section class="robo-f1 robo-section-space" id="robo-f1" aria-labelledby="f1-title"><div class="wrap">
    <div class="robo-f1-heading"><p class="robo-model-name">ROBOCADDY F1</p><h2 id="f1-title" data-reveal-title>A familiar ride.<br>A new kind of freedom.</h2><p>A personal seat. Your own clubs within reach. Now, step out and walk. Your F1 follows you.</p></div>
    <div class="robo-f1-photos">
      <figure class="media-reveal">${photo('f1Walk','(max-width:767px) 90vw, 46vw')}<figcaption>Walk toward your next shot. F1 follows with your clubs.</figcaption></figure>
      <figure class="media-reveal">${photo('f1Ride','(max-width:767px) 90vw, 46vw')}<figcaption>Return to your seat whenever you need a ride.</figcaption></figure>
    </div>
    <div class="robo-f1-story"><div><h3>Four years of<br>moving golf forward.</h3><p class="robo-years"><span>2023</span><span aria-hidden="true">→</span><span>2027</span></p></div><div><p>INNO-F1 Original made its debut at the 2023 Orlando PGA Show, where Golf Channel featured it among its Top Five Golf Carts. RoboCaddy F1 brings that personal experience into its next chapter.</p><p>The Walk &amp; Ride philosophy shared with SOLO now comes to a full-sized, premium single-rider golf cart. Walk to enjoy the landscape or a conversation. Ride when the next part of your round calls for it.</p><a class="text-link" href="https://www.youtube.com/watch?v=PbiDwF1Hp-o">See the 2023 Golf Channel feature${arrow}</a>${letter('f1-founder-story','Read the F1 story',data.f1Story.paragraphs)}</div></div>
  </div></section>`;
}
function showcase() {
  return `<section class="robo-showcase wrap robo-section-space" id="pga-showcase" aria-labelledby="showcase-title">
    <div class="robo-showcase-heading"><p class="robo-model-name">PGA Show 2027</p><h2 id="showcase-title" data-reveal-title>Your first look.<br>By appointment.</h2><p>Step inside the INNOXONE exclusive display zone for a private introduction to the full four-model RoboCaddy family. Access is reserved for pre-registered visitors.</p></div>
    <dl class="robo-event-details"><div><dt>When</dt><dd>January 27-29, 2027</dd></div><div><dt>Where</dt><dd>Orlando, Florida</dd></div><div><dt>Find us</dt><dd>INNOXONE Booth 3217</dd></div></dl>
    <figure class="robo-booth media-reveal">${photo('booth','90vw')}<figcaption>Preview of the planned INNOXONE display at the Orange County Convention Center, West Concourse.</figcaption></figure>
    <div class="robo-visit-options"><article><h3>Come for a closer look.</h3><p>Meet our team at reception and take a guided tour inside the exclusive display zone to discover RoboCaddy.</p><a class="text-link" href="#pga-request" data-pga-mode="tour">Request a private tour${arrow}</a></article><article><h3>Let’s talk about what’s next.</h3><p>Explore collaborative launch opportunities in a private, 30-minute meeting and presentation for prospective business partners.</p><a class="text-link" href="#pga-request" data-pga-mode="business">Request a business meeting${arrow}</a></article></div>
  </section>`;
}
function registration() {
  return `<section class="robo-registration robo-section-space" id="pga-request" aria-labelledby="request-title"><div class="wrap robo-registration-grid">
    <div class="robo-registration-intro"><h2 id="request-title" data-reveal-title>Let’s meet<br>in Orlando.</h2><p>Choose a private tour or a business meeting. Tell us when you’ll be at the show, and our team will confirm the details with you.</p></div>
    ${require('./robocaddy-form.cjs').render()}
    <aside class="robo-registration-details"><div class="robo-request-event"><strong>INNOXONE Booth 3217</strong><p>January 27-29, 2027<br>Orange County Convention Center<br>Orlando, Florida</p></div><a class="text-link" href="https://www.pgashow.com/en-us/show-info.html">PGA Show information${arrow}</a><p class="robo-attendee-note">PGA Show attendee registration is required for access to the exhibition.</p><div class="robo-request-contact"><a href="mailto:${common.contact.email}">${common.contact.email}</a><a href="tel:${common.contact.tel}">${common.contact.phone}</a></div></aside>
  </div></section>`;
}
const origin = 'https://ausystems.github.io/innoxone/';
const schema = {'@context':'https://schema.org','@graph':[
  {'@type':'WebPage','@id':data.meta.canonical+'#webpage',url:data.meta.canonical,name:data.meta.title,description:data.meta.description,inLanguage:'en-US',about:[{'@type':'Thing',name:'RoboCaddy SOLO'},{'@type':'Thing',name:'RoboCaddy F1'}]},
  {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:origin},{'@type':'ListItem',position:2,name:'RoboCaddy',item:data.meta.canonical}]},
  {'@type':'Event',name:'INNOXONE RoboCaddy showcase at the 2027 PGA Show',description:'Private tours and 30-minute business meeting requests for the INNOXONE exclusive display zone at Booth 3217.',startDate:'2027-01-27T08:30:00-05:00',endDate:'2027-01-29T14:00:00-05:00',eventStatus:'https://schema.org/EventScheduled',eventAttendanceMode:'https://schema.org/OfflineEventAttendanceMode',url:data.meta.canonical+'#pga-showcase',image:origin+'assets/robocaddy-pga-showcase-1206.webp',location:{'@type':'Place',name:'INNOXONE Booth 3217, Orange County Convention Center, West Concourse',address:{'@type':'PostalAddress',addressLocality:'Orlando',addressRegion:'FL',addressCountry:'US'}},organizer:{'@type':'Organization',name:'INNOXONE',url:'https://www.innoxone.com/'}}
]};
const css = ['site.css','footer.css','editorial.css','robocaddy.css','robocaddy-form.css','motion.css'].map(file=>fs.readFileSync(path.join(__dirname,file),'utf8')).join('\n');
const js = ['robocaddy.js','robocaddy-form.js','motion.js'].map(file=>fs.readFileSync(path.join(__dirname,file),'utf8')).join('\n');
const html = `<!doctype html>
<html lang="en-US"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#ffffff">
<title>${esc(data.meta.title)}</title><meta name="description" content="${esc(data.meta.description)}">
<meta name="robots" content="index,follow,max-image-preview:large,max-video-preview:-1"><link rel="canonical" href="${data.meta.canonical}"><link rel="sitemap" type="application/xml" href="../sitemap.xml"><link rel="icon" href="../assets/innoxone-logo.svg" type="image/svg+xml">
<meta property="og:type" content="website"><meta property="og:site_name" content="INNOXONE"><meta property="og:title" content="${esc(data.meta.title)}"><meta property="og:description" content="${esc(data.meta.description)}"><meta property="og:url" content="${data.meta.canonical}"><meta property="og:image" content="${origin}assets/robocaddy-solo-follow-1206.webp"><meta property="og:image:width" content="1206"><meta property="og:image:height" content="804"><meta property="og:image:alt" content="RoboCaddy SOLO following a golfer across the fairway"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(data.meta.title)}"><meta name="twitter:description" content="${esc(data.meta.description)}"><meta name="twitter:image" content="${origin}assets/robocaddy-solo-follow-1206.webp">
<link rel="preload" href="../assets/mona-sans-homepage.woff2" as="font" type="font/woff2" crossorigin>
<script>${fs.readFileSync(path.join(__dirname,'motion-head.js'),'utf8')}</script>
<style>${css}</style>
<script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script>
</head><body id="top" class="robocaddy-page">${shell.header('robocaddy')}<main id="main">${hero()}${story()}${choice()}${solo()}${f1()}${showcase()}${registration()}</main>${shell.footer('robocaddy')}${shell.menu('robocaddy')}<script>${js}</script></body></html>`;
fs.mkdirSync(path.join(ROOT,'robocaddy'),{recursive:true});
fs.writeFileSync(path.join(ROOT,'robocaddy/index.html'),html);
fs.writeFileSync(path.join(ROOT,'sitemap-robocaddy.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${data.meta.canonical}</loc><lastmod>2026-11-21</lastmod></url></urlset>\n`);
console.log('Built RoboCaddy:',Buffer.byteLength(html),'bytes; SOLO, F1 and PGA Show requests.');
