# Shura Studios — website

The studio site for **Shura Studios**, published on Cloudflare Pages at https://shurastudios.com (GitHub Pages mirror at thangpq46.github.io). It carries the
home page plus the **single privacy policy and terms of service shared by every app
we publish**, so each Play Store listing can point at one stable URL.

| Page | Purpose |
|---|---|
| `index.html` | Studio home — apps, principles, contact |
| `privacy.html` | Privacy policy for the whole catalogue |
| `terms.html` | Terms of service for the whole catalogue |
| `assets/site.css` | Shared styles (both legal pages and the home page) |
| `assets/home.css` | Home-page-only styles |
| `assets/site.js` | Reveal-on-scroll, starfield, tilt, counters, progress bar |
| `assets/logo.svg` | The studio mark, also used as the favicon |
| `assets/app-*.png` | 256px app icons, exported from each project's Play Store icon |

## Apps covered

`privacy.html` covers the four apps below; every other app has its own `<slug>-privacy.html`.
`terms.html` covers all twelve.

| App | Package | Privacy policy |
|---|---|---|
| Kuro: Private Diary Journal | `com.shura.studios.kuro.diary` | `privacy.html` (app site: kuro.shurastudios.com) |
| Tengu: Bird ID & Sounds | `com.shura.studios.birds` | `privacy.html` |
| Shura Kids Piano | `com.shura.studios.kids.piano` | `privacy.html` |
| Shu Sketch | `com.shura.studios.sketch` | `privacy.html` |
| Capydoku: Cozy Logic Puzzle | `com.shurastudios.capydoku` | `capydoku-privacy.html` |
| Geni Fighter | `com.shurastudios.genifighter` | `genifighter-privacy.html` |
| Grill Party: Skewer Sort | `com.shurastudios.grillparty` | `grillparty-privacy.html` |
| Munchie Live: ASMR Eating | `com.shurastudios.munchielive` | `munchielive-privacy.html` |
| PetDom: Pocket Pixels | `com.shura.studios.pets.dom` | `petdom-privacy.html` |
| Pets Jump | `com.shura.studios.pets.jump` | `petsjump-privacy.html` |
| Shura Film: 35mm Film Camera | `com.shurastudios.shurafilm` | `shurafilm-privacy.html` |
| ShuraPS2 | `com.shura.emulator.ps2` | `shuraps2-privacy.html` |

When a new app ships, add a card to `index.html` (icon in `assets/app-<slug>.png`), a footer link,
a chip and a §1 entry in `terms.html`, and either name it in `privacy.html` or give it its own policy.

## Local preview

No build step and no dependencies: plain HTML, CSS and a little vanilla JavaScript.
Open `index.html` in a browser, edit, refresh. Or serve it:

```sh
python3 -m http.server 8000
```

## Publishing

Push to `main` and enable GitHub Pages for the repository (Settings → Pages →
Deploy from a branch → `main` / root). `.nojekyll` is present so Pages serves the
files as-is.

## House rules

* Every animation is behind `@media (prefers-reduced-motion: reduce)`.
* Legal text must describe what the apps actually do — check the manifest and the
  Gradle dependencies before claiming an app collects nothing.
* The effective date at the top of `privacy.html` and `terms.html` changes only
  when the substance changes, not on a typo fix.
