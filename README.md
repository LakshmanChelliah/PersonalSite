# Lakshman Chelliah

An interactive résumé and portfolio built with Next.js, TypeScript, Anime.js, Radix Primitives, and Tailwind CSS. Project chapters feature live-product captures and explanatory browser interactions. No backend or LLM key is required.

## Development

Requires Node.js 20.9 or newer. Run `npm ci`, then `npm run dev`. Open the Local URL printed by Next.js.

- `npm run build`: production build, including the static project routes.
- `npm start`: serve the production build.
- `npm run typecheck`: TypeScript validation.
- `npm run test:e2e`: browser, accessibility, responsive, and interaction tests. Uses installed Google Chrome; install Chrome if unavailable.
- `npm run pdf`: export the shared résumé page to `public/Lakshman-Chelliah-Resume.pdf` while the site is running.

Edit the résumé and project stories in `src/data/content.ts`. The website and PDF use this single source of content. Re-export the PDF after changing résumé data or print styles. Use Print Preview to check the intentional two-page layout.

## Product media

`scripts/capture-products.mjs` captures the public websites with Playwright. It does not submit membership applications, log into accounts, or create online game rooms. Playwright's FFmpeg installation is needed for recordings (`npx playwright install ffmpeg`). Set `CAPTURE_ONLY` to a project prefix to recapture a single project. `BEYWEB_RESEARCH_PATH` is optional and points to an authorized local clone for extracting the 3D product model; it is never sent to the browser.

`scripts/download-fonts.mjs` downloads the selected Google Fonts for local hosting. These assets are already included, so deployments need no external font requests. `scripts/verify-visuals.mjs` creates local QA screenshots; `scripts/audit-performance.mjs` measures the production server with Lighthouse.

## Vercel

Deploy as a standard Next.js project using the lockfile. No environment variables are needed. Inspect the existing Vercel account and domain configuration, and reuse the project owning `lakshmanchelliah.ca`. Create a preview deployment first. Production deployment and domain changes follow review of that preview; no deployment has been performed by this source tree alone.

Canonical URLs, sitemap, and social metadata use `https://lakshmanchelliah.ca`. The generated social PNG is `public/social.png`.

## Content boundaries

Professional descriptions reflect the supplied résumé, public LinkedIn content, and the user's confirmed GDMS title/team. The GDMS job listing provides team context, not proof of individual responsibilities. Clearance and street-address details are excluded.

Interactive maps, the QNX control path, and FileTriage sample landscapes are explanatory demonstrations. They do not operate real vehicles, join actual multiplayer matches, or access local files. AI-process descriptions are editorial explanations, not recorded agent traces.

BeyWeb is an independent fan project. Beyblade and related marks belong to their owners. Product imagery and the 3D model come from the user's authorized project and are included solely to demonstrate that work; they do not imply affiliation or endorsement.
