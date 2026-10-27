# INNOXONE website

Responsive pages for INNOXONE personal golf mobility.

## Website

- Home: https://ausystems.github.io/innoxone/
- Golf Carts & Products: https://ausystems.github.io/innoxone/golf-carts-products/
- About Us: https://ausystems.github.io/innoxone/about/
- Contact Us: https://ausystems.github.io/innoxone/contact/

## Editorial design across all four pages

The product collection uses an asymmetrical vehicle gallery, persistent model shortcuts, redesigned native product dialogs, a full-width ROBOCADDY silhouette reveal, a Gallery invitation and a compact FAQ layout. Every cart remains available through its existing dialog and quote path.

About Us is an editorial sequence with a founder portrait and quote, a large interview film with chapter navigation, an offset design-photo composition, Harold’s owner film, the mobility vision and a Gallery invitation. Contact uses an open masthead, direct phone and email links, a spacious inquiry form and a Gallery panel. The five original fields, categories, validation and honest email handoff remain intact.

The homepage now uses a composed founder cinema, a tighter F2 product spread, an inset CONNECT caption and clearer inquiry panels. The collection adds an expandable INNO-F1 comparison with links into the existing dialogs. About pairs ROBOCADDY and CONNECT with their own photography. The Contact Gallery appears alongside the opening invitation on desktop, with the form first on mobile. A photographic menu and larger footer signature connect the four pages.

Shared refinements live in `source/editorial.css`. Each page loads only its own additional styles from `source/home-editorial.css`, `source/products-editorial.css`, `source/about-editorial.css` or `source/contact-editorial.css`. No new client-side libraries are required.

## Editing and building

Homepage content, rendering and styles live in `source/content.json`, `source/page.js` and `source/style.css`.

The products collection uses `source/products.json`, `source/build-products.cjs`, `source/products.css` and `source/products.js`. Product details open in native dialogs on the collection page. Product anchors support shared links, browser Back and Forward, and focus restoration when a card closes. JavaScript-free visitors can read the details inline. No individual product pages or checkout are created.

The About Us page uses `source/about.json`, `source/build-about.cjs`, `source/about.css` and `source/about.js`. It includes the founder portrait, Young Kim’s chaptered interview, Harold’s owner film, the company’s mobility vision and a Gallery invitation. Both films use English captions and load only after the visitor chooses to play.

The Contact page uses `source/contact.json`, `source/build-contact.cjs`, `source/contact.css` and `source/contact.js`. It preserves Full Name, Email Address, Phone Number, Subject and Your Message, plus General Inquiry, Technical Support and Partnership Inquiries. Product and experience links prefill a known subject and category, while keeping the fields editable.

The products, About and Contact pages share navigation and base styles through `source/site-shell.cjs` and `source/site.css`. All four pages use the shared footer in `source/site-shell.cjs` and `source/footer.css`, including the visible sitemap and an XML sitemap link. `source/motion.js` and `source/motion.css` provide soft, once-only letter fades on explicitly marked hero and editorial headlines, capped at 1.28 seconds, with restrained image, menu and product-dialog animation. The early `source/motion-head.js` gate prevents a visible title flash before setup and fails open if setup cannot complete. Product names, forms, FAQs and footer headings remain immediately readable. Button and arrow feedback stays consistent across all four pages. Reduced-motion preferences are respected, and all content remains visible without JavaScript.

Build all four pages with:

```sh
node source/build.cjs
```

Or rebuild only the products collection:

```sh
node source/build-products.cjs
```

Commit generated HTML and sitemaps with their source changes. GitHub Pages publishes the root of `main`. No package installation is required.

The site uses responsive WebP photography, captioned video on the homepage and About page, and self-hosted Mona Sans. Navigation and assets support the GitHub Pages project subpath.

Scrolling stays native on all four pages. The homepage product showcase uses direct model tabs on desktop and a swipeable track on mobile, without a pinned scroll sequence or external animation libraries. Persistent navigation, larger touch targets, compact landscape layouts, reduced-motion support and verified legal links are shared across the journey. Phone and email are available before the Contact form on mobile. Offscreen videos use lazy loading where supported, with native video fallbacks elsewhere.

All four pages use their actual GitHub Pages URLs as their canonicals, matching `sitemap.xml`. The organization’s official URL remains https://www.innoxone.com/. Update the `meta.canonical` values in `source/content.json`, `source/products.json`, `source/about.json`, `source/contact.json`, the sitemap base and structured-data asset URLs when migrating domains. Inquiry actions lead to the new Contact page with model or visit context, while phone and direct email links remain available.

The Products page opens directly with the model cards. Each card offers product details in a dialog and a context-specific quote inquiry.

The homepage background uses an unchanged copy of the original INNOXONE hero film from https://www.innoxone.com/wp-content/uploads/2026/05/Innoxone-Home-Page-Vid-Final.mp4. The 1920 × 1080, 71.98-second film is 12,025,440 bytes, with SHA-256 `95e6705a2932c45c5afd700dd8a282bced4bc660f987c1f192e955a55a95d6b6`. Responsive WebP poster frames are taken from the same film.

No speculative pricing, stock claims or product specifications are included. ROBOCADDY is a 2027 collection preview. Photography, product footage and brand assets are supplied for this INNOXONE project. The font license is in `assets/Mona-Sans-OFL.txt`.

## Contact delivery

The GitHub Pages preview uses an explicit email handoff to `info@innoxone.com`. “Continue in email” validates the five fields and prepares an email; the visitor must finish sending it in their email application. The page never reports that a message was delivered. Long inquiries offer a copy-and-paste flow, and clipboard permission failures reveal selectable text. No form data is saved to browser storage or sent to a third-party service. A visible link to the existing online contact form is available. Without JavaScript, the native email action and online form link remain usable.

The existing WordPress form uses Elementor on page 47. It does not allow the GitHub preview origin to read its form responses. No WordPress endpoint, CORS policy, or production recipient was changed, and no real test inquiry was sent. Direct web submission needs an approved form-service connection or integration on the primary domain; the email handoff is not a direct-submission backend.

Contact validation completed at 320, 390, 768, 1024 and 1440 pixels, including required-field and email validation, inquiry categories, sixteen subject mappings, long-message handling, clipboard fallback, keyboard navigation, reduced motion and JavaScript-free access. Local audits verify performance, accessibility, best practices and SEO; these are laboratory checks rather than field results. Email handoff tests intercepted the email link without sending messages.

The latest editorial release was checked in Chromium and WebKit at phone, tablet and desktop widths. Verification covers the new comparison disclosure, modal focus restoration, navigation, no-flash headline setup, reduced motion, JavaScript-free content, video chapters and inquiry prefills.
