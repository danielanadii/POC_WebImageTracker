# Muara's Property AR

This is a self-hosted 8th Wall XR Engine experience. The landing page provides the brochure, launch button, and scanning instructions. Scan the supplied brochure to reveal the 3D house, then pinch to resize it.

The house only supports pinch-to-resize. To raise or lower it above the brochure, change `HOUSE_LIFT` in `app.js`: positive values lift it away from the brochure; negative values move it closer.

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
