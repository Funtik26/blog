# Repository Guidelines

This blog runs on Next.js 16 with the App Router, Tailwind CSS, and Contentlayer 2. Use this guide as a quick reference when contributing changes so that docs, code, and content stay in sync with production.

## Project Structure & Module Organization
- `app/` holds route entries (e.g., `app/page.tsx`, `app/blog/[slug]/page.tsx`) and shared layout wiring.
- `components/` hosts reusable UI, navigation, and MDX presentation helpers.
- `data/` and `contentlayer.config.ts` track MDX front matter and schema logic; generated types live under `.contentlayer/`.
- `public/` stores static assets like favicons and `/static/images` used in posts.

## Build, Test, and Development Commands
- `yarn dev` – Launches the local dev server with hot reload and Contentlayer watch.
- `yarn build` – Produces the production bundle and runs `scripts/postbuild.mjs` to refresh search metadata.
- `yarn start` – Serves the output of `yarn build` for smoke-testing production mode.
- `yarn lint` – Executes Next.js lint across `app`, `components`, `layouts`, and `scripts` with auto-fixes enabled.

## Coding Style & Naming Conventions
- Prettier (with the Tailwind plugin) and ESLint enforce formatting; 2-space indentation in TS/TSX.
- PascalCase React components in `components/`; kebab-case directories for routes under `app/`.
- Prefer Tailwind utility classes; keep custom CSS inside `css/` when utilities fall short.

## Testing Guidelines
- No dedicated test suite yet—run `yarn lint` and load key pages (`/`, `/blog`, `/projects`) before submitting.
- When adding tests, colocate them near the feature and document the command in this file.
- Validate new MDX in `data/blog` by launching `yarn dev` and checking generated types in `.contentlayer/`.

## Commit & Pull Request Guidelines
- Follow present-tense, imperative commits (e.g., "Add tag filter to blog index").
- In PRs, summarize intent, link tracking issues, and note any config changes.
- Include before/after screenshots or recordings for UI adjustments and confirm `yarn lint`/`yarn build` output.

## Content Workflow
- Add posts under `data/blog/*.mdx`; keep media in `public/static/images/<post-slug>/`.
- Fill required front matter (`title`, `date`, `summary`, `tags`) so Contentlayer generates the page.
- Run `yarn dev` to preview drafts and verify the sitemap/feed after `yarn build` if URLs change.
