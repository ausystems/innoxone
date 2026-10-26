// Shared navigation and footer for the collection and company pages.
const common = require('./content.json');
const products = require('./products.json').products;
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
const mark = `<svg viewBox="${common.logo.viewBox}" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="${common.logo.ink}"/><path fill="var(--green)" fill-rule="evenodd" d="${common.logo.green}"/></svg>`;
const logo = `<a class="wordmark" href="../" aria-label="INNOXONE home">${mark}</a>`;
const pages = [{id:'home',name:'Home',href:'../'},{id:'products',name:'Golf Carts & Products',href:'../golf-carts-products/'},{id:'about',name:'About Us',href:'../about/'},{id:'contact',name:'Contact Us',href:'../contact/'}];
const contactURL = '../contact/';
const nav = current => pages.filter(page => page.id !== 'contact').map(page => `<a href="${page.href}"${page.id === current ? ' aria-current="page"' : ''}>${esc(page.name)}</a>`).join('');
function header(current) {
  return `<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="wrap header-inner"><nav class="nav-left" aria-label="Main navigation">${nav(current)}</nav><button class="menu-button" type="button" data-open="site-menu" aria-controls="site-menu" aria-expanded="false"><span class="menu-lines" aria-hidden="true"></span>Menu</button>${logo}<div class="nav-right"><a href="${contactURL}"${current === 'contact' ? ' aria-current="page"' : ''}>Contact</a><a class="pill" href="${current === 'contact' ? '#contact-form' : contactURL}" data-inquiry="general"><span class="cta-wide">${current === 'contact' ? 'Start an inquiry' : 'Request a quote'}</span><span class="cta-short">Inquire</span></a></div></div></header>`;
}
function menu(current) {
  return `<dialog class="menu-dialog" id="site-menu" aria-label="Main menu">${logo}<button class="dialog-close" type="button" data-close aria-label="Close menu" autofocus><span class="cross" aria-hidden="true"></span></button><nav aria-label="Mobile navigation">${nav(current)}<a href="${contactURL}"${current === 'contact' ? ' aria-current="page"' : ''}>Contact / Request a quote</a></nav><div class="menu-contact"><a href="tel:${common.contact.tel}">${common.contact.phone}</a><a href="mailto:${common.contact.email}">${common.contact.email}</a><p>${common.contact.address}</p></div></dialog>`;
}
function footer(current) {
  const base = current === 'home' ? '' : '../';
  const home = base || './';
  const productBase = current === 'products' ? '' : base + 'golf-carts-products/';
  const footerMark = current === 'home' ? `<svg viewBox="${common.logo.viewBox}" aria-hidden="true"><use href="#inno-wordmark"/></svg>` : mark;
  const arrow = '<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7"/></svg>';
  return `<footer class="global-footer ${current === 'home' ? 'inno-footer' : 'site-footer'}" id="site-footer"><div class="wrap">
    <div class="footer-signature"><div><a class="footer-brand" href="${home}" aria-label="INNOXONE home">${footerMark}</a><h2 class="footer-promise" data-reveal-title>Personal golf mobility.<br>Designed around you.</h2></div><a class="text-link" href="${base}contact/?interest=test-ride" data-inquiry="test-ride">Arrange a test ride${arrow}</a></div>
    <div class="footer-map" id="footer-sitemap">
      <nav aria-labelledby="sitemap-title"><h3 id="sitemap-title">Sitemap</h3><ul>${pages.map(page=>`<li><a href="${current === 'home' ? (page.href.replace('../','') || './') : page.href}"${page.id === current ? ' aria-current="page"' : ''}>${esc(page.name)}</a></li>`).join('')}<li><a href="https://www.xonegolf.com/">XONE Golf Club</a></li></ul></nav>
      <nav aria-labelledby="footer-mobility-title"><h3 id="footer-mobility-title">Golf mobility</h3><ul>${products.map(product=>`<li><a href="${productBase}#product-${product.id}"${current === 'products' ? ` data-open="product-${product.id}" aria-haspopup="dialog"` : ''}>${esc(product.name)}</a></li>`).join('')}<li><a href="${productBase}#robocaddy">ROBOCADDY</a></li><li><a href="${home}#connect">INNOXONE CONNECT</a></li></ul></nav>
      <div class="footer-contact"><h3>Visit. Call. Say hello.</h3><ul><li><a href="tel:${common.contact.tel}" data-inquiry="general">949-384-9663</a></li><li><a href="mailto:${common.contact.email}" data-inquiry="general">${common.contact.email}</a></li><li><a href="https://www.innoxone.com/support/">Product support</a></li></ul><address>31896 Plaza Dr Suite D2<br>San Juan Capistrano, CA 92675</address><a class="footer-directions" href="${esc(common.contact.map)}">Get directions${arrow}</a></div>
    </div>
    <div class="footer-last"><nav class="footer-utility" aria-label="Legal and sitemap"><a href="https://www.innoxone.com/privacy-policy/">Privacy Policy</a><a href="https://www.innoxone.com/terms-of-service/">Terms of Service</a><a href="${base}sitemap.xml">XML Sitemap</a></nav><nav class="footer-networks" aria-label="Social media">${common.footer.socials.map(social=>`<a href="${esc(social.href)}">${esc(social.name)}</a>`).join('')}</nav><a class="back-top" href="#top">Back to top${arrow}</a></div><p class="footer-copyright">© 2026 INNOXONE. All rights reserved.</p>
  </div></footer>`;
}
module.exports = {header, menu, footer, esc, mark, logo};
