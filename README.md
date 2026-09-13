# Shura Studios — website

The studio site for **Shura Studios**, published with GitHub Pages. It carries the
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

| App | Package | Notes |
|---|---|---|
| Kuro: Private Diary Journal | `com.shura.studios.diary` | Local storage, optional Drive `appdata` backup, AdMob, Firebase |
| Tengu: Bird ID & Sounds | `com.shura.studios.birds` | Photo + BirdNET sound ID, AdMob, Firebase |
| Shura Kids Piano | `com.shura.studios.kids.piano` | Families policy, fully offline, no advertising ID, no analytics |

When a new app ships, add a card to `index.html`, a row to the table in
`privacy.html` §2, and name it in §1 of both legal pages.

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
