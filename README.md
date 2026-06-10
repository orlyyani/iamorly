# iamorly

Personal portfolio of Orly John Yanson, built with [Nuxt 4](https://nuxt.com) and [Nuxt UI](https://ui.nuxt.com), deployed as a static site on Cloudflare Pages.

## Setup

```bash
npm install
```

## Development

Start the dev server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build a static site (output in `.output/public`):

```bash
npm run generate
```

Preview the generated site locally:

```bash
npm run preview
```

## Linting & type-checking

```bash
npm run lint
npm run typecheck
```

## Deployment

The site is deployed to [Cloudflare Pages](https://pages.cloudflare.com) as a static export:

- Build command: `npm run generate`
- Output directory: `.output/public`

See [CLAUDE.md](./CLAUDE.md) for project structure and content-editing notes.
