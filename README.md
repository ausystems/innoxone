# INNOXONE website

Responsive pages for INNOXONE personal golf mobility.

## Website

- Home: https://ausystems.github.io/innoxone/
- Golf Carts & Products: https://ausystems.github.io/innoxone/golf-carts-products/
- About Us: https://ausystems.github.io/innoxone/about/
- Contact Us: https://ausystems.github.io/innoxone/contact/

## Editing and building

Homepage content, rendering and styles live in `source/content.json`, `source/page.js` and `source/style.css`.

The products collection uses `source/products.json`, `source/build-products.cjs`, `source/products.css` and `source/products.js`. Product details open in native dialogs on the collection page. Product anchors also support shared links; JavaScript-free visitors can read the details inline. No individual product pages or checkout are created.

The About Us page uses `source/about.json`, `source/build-about.cjs`, `source/about.css` and `source/about.js`. It includes the founder portrait, Young Kim’s chaptered interview, Harold’s owner film, the company’s mobility vision and a Gallery invitation. Both films use English captions and load only after the visitor chooses to play.

The Contact page uses `source/contact.json`, `source/build-contact.cjs`, `source/contact.css` and `source/contact.js`. It preserves Full Name, Email Address, Phone Number, Subject and Your Message, plus General Inquiry, Technical Support and Partnership Inquiries. Product and experience links prefill a known subject and category, while keeping the fields editable.

The products, About and Contact pages share their navigation, footer and base styles through `source/site-shell.cjs` and `source/site.css`.

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

The homepage canonical remains https://www.innoxone.com/. The products, About and Contact pages use their actual GitHub Pages URLs as their canonicals until they are deployed to the primary domain. Update `source/products.json`, `source/about.json`, `source/contact.json` and the structured-data asset URLs when migrating domains. Inquiry actions lead to the new Contact page with model or visit context, while phone and direct email links remain available.

No speculative pricing, stock claims or product specifications are included. ROBOCADDY is a 2027 collection preview. Photography, product footage and brand assets are supplied for this INNOXONE project. The font license is in `assets/Mona-Sans-OFL.txt`.

## Contact delivery

The GitHub Pages preview uses an explicit email handoff to `info@innoxone.com`. “Continue in email” validates the five fields and prepares an email; the visitor must finish sending it in their email application. The page never reports that a message was delivered. Long inquiries offer a copy-and-paste flow, and clipboard permission failures reveal selectable text. No form data is saved to browser storage or sent to a third-party service. A visible link to the existing online contact form is available. Without JavaScript, the native email action and online form link remain usable.

The existing WordPress form uses Elementor on page 47. It does not allow the GitHub preview origin to read its form responses. No WordPress endpoint, CORS policy, or production recipient was changed, and no real test inquiry was sent. Direct web submission needs an approved form-service connection or integration on the primary domain; the email handoff is not a direct-submission backend.

Validation completed at 320, 390, 768, 1024 and 1440 pixels, including required-field and email validation, inquiry categories, sixteen subject mappings, long-message handling, clipboard fallback, keyboard navigation, reduced motion and JavaScript-free access. Local mobile and desktop audits scored 100 in performance, accessibility, best practices and SEO. Email handoff tests intercepted the email link without sending messages.
