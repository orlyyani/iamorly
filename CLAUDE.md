# CLAUDE.md

Guidance for Claude Code (and other AI tooling) working in this repository.

## Project overview

`iamorly` is a single-page personal portfolio for Orly John Yanson, deployed at
https://iamorly.com. It is built with **Nuxt 4 + Nuxt UI** and deployed as a fully
static site (`nuxi generate`) to **Cloudflare Pages**.

## Tech stack

- **Nuxt 4** (TypeScript, `app/` source directory)
- **@nuxt/ui** (v4) — paired with **Tailwind CSS v4**
- **@nuxt/image** — image optimization (uses the `ipxStatic` provider automatically
  for `nuxi generate` builds)
- **@vueuse/motion** — scroll-reveal animations via `v-motion-*` directives
- **@nuxt/fonts** (auto-registered by Nuxt UI) — self-hosts the Inconsolata font
- **npm** as the package manager

## Directory structure

```
app/
  app.vue                  -- root <UApp><NuxtPage /></UApp>
  app.config.ts            -- Nuxt UI theme (primary/neutral colors)
  error.vue                -- global error page (404 / other errors)
  assets/css/main.css      -- design tokens, glitch effect, hover-underline
  components/
    GlitchHeading.vue       -- reusable glitch <hN data-text> heading
    FullName.vue            -- "ORLY / JOHN / YANSON" via GlitchHeading
    SocialLinks.vue          -- GitHub/Twitter/LinkedIn/Mail row
    layout/
      AppShell.vue           -- two-column page shell (LeftSider + RightSider)
      LeftSider.vue           -- sticky photo/name pane with backdrop image
      RightSider.vue          -- social links, name, and content sections
    sections/
      ProfileSection.vue
      SkillsSection.vue
      ProjectsSection.vue
      ExperienceSection.vue
      ExperienceCard.vue
  data/
    socialLinks.ts
    experience.ts
    skills.ts
    projects.ts
  pages/
    index.vue               -- renders <AppShell />, sets SEO/OG meta
public/
  images/                    -- back-img.jpeg, profile-back.jpg, profile-image.webp
  favicon.ico, pp.jpg        -- favicon + OG/Twitter share image
```

## Design system

Defined in `app/assets/css/main.css`:

- **Colors** (Tailwind v4 `@theme`): `--color-ink` (#020403), `--color-paper` (#fff),
  `--color-glitch-pink` (#ff00c1), `--color-glitch-cyan` (#00fff9). These generate
  utilities like `bg-ink`, `text-paper`, `border-glitch-pink`.
- **Font**: Inconsolata (weights 200-900), configured in `nuxt.config.ts` under
  `fonts.families` and applied globally via `* { font-family: ... }`.
- **Glitch effect**: `.glitch-text` (the element carrying `data-text`) plus
  `.glitch-always` (always animating, used by `FullName`) or `.glitch-parent`
  (animates on hover, used by section headings via `GlitchHeading`). The
  `@keyframes glitch-anim`, `glitch-anim2`, and `glitch-skew` blocks are **static,
  pre-computed** (originally generated from a SCSS `@for`/`random()` loop via a
  one-off Node script) — there's no build step that regenerates them; edit the
  keyframes directly if the effect needs tuning.
- **Hover underline**: `.hover-underline` / `.hover-underline::after` — used by
  `SocialLinks` for the animated underline-on-hover links.
- **Scroll reveal**: `@vueuse/motion` preset directives (`v-motion-slide-visible-once-left`,
  `v-motion-slide-visible-once-right`, `v-motion-slide-visible-once-bottom`,
  `v-motion-pop-visible-once`). Use the `:delay="N"` (ms) prop to stagger multiple
  elements — passing an object literal as the directive value would replace the
  whole preset instead of layering on top of it, so always use `:delay`/`:duration`
  props for tweaks.

## Content editing

- **Experience** (`app/data/experience.ts`): array of `ExperienceEntry`. Add new
  roles by prepending an entry with a unique `id`. `logo` is optional — when unset,
  `ExperienceCard` falls back to a `UAvatar` with the company's initials.
- **Skills** (`app/data/skills.ts`): array of `SkillCategory` (`name` + `skills[]`),
  rendered as `UBadge` groups in `SkillsSection`.
- **Projects** (`app/data/projects.ts`): array of `Project` (`title`, `href`,
  `description`), rendered as `UCard`s in `ProjectsSection`.
- **Social links** (`app/data/socialLinks.ts`): array of `{ label, href }`.

## Components

`nuxt.config.ts` registers `app/components` with `pathPrefix: false`, so components
in subdirectories (e.g. `components/layout/LeftSider.vue`,
`components/sections/SkillsSection.vue`) are auto-imported by their plain filename
(`<LeftSider />`, `<SkillsSection />`) without a directory-based prefix.

## Commands

```bash
npm run dev         # local dev server
npm run build       # SSR build (not used for deployment)
npm run generate    # static build -> .output/public (used for Cloudflare Pages)
npm run preview     # preview the generated static build
npm run lint        # eslint
npm run typecheck   # nuxi typecheck
```

## Deployment (Cloudflare Pages)

- Build command: `npm run generate`
- Output directory: `.output/public`
- Node version: 22
- Custom domain `iamorly.com` is attached via the Cloudflare Pages project's
  Custom Domains tab (DNS is already managed in the same Cloudflare account).

## Nuxt UI skill

For component/theming questions (UCard, UBadge, UAvatar, UApp, app.config theming,
etc.), use the official Nuxt UI Claude Code skill:

```bash
claude skill add https://github.com/nuxt/ui/tree/v4/skills/nuxt-ui
```

Invoke it with `/nuxt-ui` when working on components in this repo.
