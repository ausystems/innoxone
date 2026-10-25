# INNOXONE website

Responsive pages for INNOXONE personal golf mobility.

## Website

- Home: https://ausystems.github.io/innoxone/
- Golf Carts & Products: https://ausystems.github.io/innoxone/golf-carts-products/
- About Us: https://ausystems.github.io/innoxone/about/

## Editing and building

Homepage content, rendering and styles live in `source/content.json`, `source/page.js` and `source/style.css`.

The products collection uses `source/products.json`, `source/build-products.cjs`, `source/products.css` and `source/products.js`. Product details open in native dialogs on the collection page. Product anchors also support shared links; JavaScript-free visitors can read the details inline. No individual product pages or checkout are created.

The About Us page uses `source/about.json`, `source/build-about.cjs`, `source/about.css` and `source/about.js`. It includes the founder portrait, Young Kim’s chaptered interview, Harold’s owner film, the company’s mobility vision and a Gallery invitation. Both films use English captions and load only after the visitor chooses to play.

The products and About pages share their navigation, footer and base styles through `source/site-shell.cjs` and `source/site.css`.

Build all three pages with:

```sh
node source/build.cjs
```

Or rebuild only the products collection:

```sh
node source/build-products.cjs
```

Commit generated HTML and sitemaps with their source changes. GitHub Pages publishes the root of `main`. No package installation is required.

The site uses responsive WebP photography, captioned video on the homepage and About page, and self-hosted Mona Sans. Navigation and assets support the GitHub Pages project subpath.

The homepage canonical remains https://www.innoxone.com/. The products and About pages use their actual GitHub Pages URLs as their canonicals until they are deployed to the primary domain. Update `source/products.json`, `source/about.json` and the structured-data asset URLs when migrating domains. Inquiry actions currently use the existing INNOXONE contact page, telephone and email. Product email subjects identify the selected model; the external contact form's prefilling behavior is not assumed.

No speculative pricing, stock claims or product specifications are included. ROBOCADDY is a 2027 collection preview. Photography, product footage and brand assets are supplied for this INNOXONE project. The font license is in `assets/Mona-Sans-OFL.txt`.
