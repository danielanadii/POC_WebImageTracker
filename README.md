# Pesona Haka Tingang — 8th Wall Image Target AR

This is a self-hosted 8th Wall XR Engine experience. Scan the supplied brochure to reveal the 3D house, then drag to rotate it or pinch to resize it.

## Run locally

```bash
npm install
npm run serve
```

Open the local URL from a phone on the same network. Camera APIs require HTTPS in production (or `localhost` during development).

## Target image

`image-targets/brochure.json` and its related images are generated from the supplied brochure. To replace it, run:

```bash
npx @8thwall/image-target-cli@latest
```

Choose a **planar** target, save it in `image-targets/`, and use the target's chosen name in both `app.js` and `xrextras-named-image-target` in `index.html`.

## Build

```bash
npm run build
```

Deploy the `dist/` directory to any HTTPS static host. Pushing to `main` also deploys it to GitHub Pages through `.github/workflows/deploy-pages.yml`; enable **Settings → Pages → Source: GitHub Actions** once in the repository. The 8th Wall hosted platform retired in February 2026; this project uses the current, self-hosted Engine binary instead.
