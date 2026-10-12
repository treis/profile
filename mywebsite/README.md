# Thiago Reis — Portfolio

My personal portfolio site, built from scratch with React and TypeScript.

## Tech Stack

- **React 19** with the new React Compiler enabled
- **TypeScript**
- **Vite** for build tooling and dev server
- **Tailwind CSS 4**, using the newer CSS-first `@theme` configuration
- **oxlint** for fast linting

## Features

- Single-page app with a lightweight card-switching navigation (About / Contact), built with `useState` rather than a routing library, since the site is small enough not to need one
- Custom SVG assets for branding

## Getting Started

Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd mywebsite
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Deployment

The site deploys to GitHub Pages automatically on every push to `main`, via the workflow in `.github/workflows/deploy.yml` at the repo root (the app itself lives in `mywebsite/`).

One-time setup: in the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.

The live site is at `https://<your-username>.github.io/<repo-name>/`. Vite builds with a relative base (`base: './'`), so it works under any repo name.

## Project Structure

```
src/
├── App.tsx          # Main app shell, navigation, and card-switching logic
├── assets/          # SVGs, descriptions, and other static content
├── index.css        # Global styles and custom animations
└── main.tsx         # Entry point
```

## About This Project

This is where I publicly practice working in REACT with Tailwind CSS in a public repositories.
