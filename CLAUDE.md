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
    SectionHeading.vue      -- plain left-bordered <h2> used by every section
    FullName.vue            -- the page's only <h1>: "ORLY / JOHN / YANSON" with the glitch effect
    SocialLinks.vue          -- GitHub/Twitter/LinkedIn/Mail row
    layout/
      AppShell.vue           -- two-column page shell (LeftSider + RightSider) + <EasterEggs />
      LeftSider.vue           -- sticky photo/name pane with backdrop image
      RightSider.vue          -- social links, intro, and content sections (one left-aligned column)
    easter-eggs/
      EasterEggs.vue          -- console greeting, "orly"/Konami key listeners, GLITCH MODE overlay
      EggTerminal.vue         -- hidden terminal (commands: help, whoami, hire, spin, ...)
    sections/
      IntroSection.vue        -- name, headline, Email / Download resume buttons
      ProfileSection.vue
      ProjectsSection.vue     -- web projects grid; first 6 shown, the rest behind "Show all"
      GamesSection.vue        -- slot machine + Play'n GO games grid behind a toggle
      SlotMachine.vue         -- 3-reel slot built from the released games' key art
      ExperienceSection.vue
      ExperienceCard.vue
      SkillsSection.vue       -- skill groups + "where I've used it" panel
      SkillPill.vue           -- clickable skill pill with pop/particle animation
      RecommendationsSection.vue / RecommendationCard.vue
      ContactSection.vue      -- closing contact block + footer
  composables/
    useEasterEggs.ts         -- shared egg state (terminal open, glitch mode, slot requests)
    useSlotSounds.ts         -- Web Audio synthesized slot machine sound effects
  data/
    socialLinks.ts           -- also exports contactEmail
    experience.ts
    skills.ts
    projects.ts
    games.ts
    companies.ts
    recommendations.ts
  pages/
    index.vue               -- renders <AppShell />, sets SEO/OG meta
public/
  images/                    -- back-img.jpg, profile-image.webp, projects/, games/
  favicon.ico, pp.jpg        -- favicon + OG/Twitter share image
```

## Design system

Defined in `app/assets/css/main.css`:

- **Colors** (Tailwind v4 `@theme`): `--color-ink` (#020403), `--color-paper` (#fff),
  `--color-glitch-pink` (#ff00c1), `--color-glitch-cyan` (#00fff9). These generate
  utilities like `bg-ink`, `text-paper`, `border-glitch-pink`.
- **Font**: Inconsolata (weights 200-900), configured in `nuxt.config.ts` under
  `fonts.families` and applied globally via `* { font-family: ... }`.
- **Glitch effect**: `.glitch-text` (the element carrying `data-text`) inside
  `.glitch-always`, used only by `FullName`. Section headings (`SectionHeading`) are
  plain on purpose so the page stays easy to read. The
  `@keyframes glitch-anim` and `glitch-skew` blocks are **static,
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
  roles by prepending an entry with a unique `id`. `logo` is optional (square images
  in `public/images/companies/`, taken from each company's site icon or LinkedIn page) —
  when unset, `ExperienceCard` falls back to a `UAvatar` with the company's initials.
- **Skills** (`app/data/skills.ts`): array of `SkillCategory` (`name` + `skills[]`),
  rendered as `SkillPill` buttons in `SkillsSection`. Clicking a pill pops it and
  opens a panel listing where the skill was used, from `skillProof` in the same file
  (keyed by skill name, so names must be unique; keep every claim backed by the
  experience/projects/games data).
- **Projects** (`app/data/projects.ts`): array of `Project` (`title`, `company`,
  `description`, optional `href`/`image`/`gradient`), rendered as a grid in
  `ProjectsSection`. Order matters: the first 6 are shown, the rest sit behind "Show all".
- **Games** (`app/data/games.ts`): array of `Game` (`title`, optional `role`, `href`,
  `image`). Images in `public/images/games/` are 960x393 crops of each game's
  Play'n GO page. Unreleased games have no `href`/`image` and show a "SOON" tile.
  Released games are also the symbols on `SlotMachine`'s reels: each symbol is the
  bottom-left corner of the key art, where every game's logo sits, so new art needs
  its logo there too. The machine features the game that lands on the payline (the
  matching one on a 2x/3x hit); `BIG_WIN_CHANCE` forces a triple now and then.
  The reels also carry a FREE SPINS scatter: three on the payline starts an auto-played
  bonus round (CRT reboot, tinted cabinet, scanlines, better odds). When the first two
  reels match, the third gets a suspense run (others dim, slow `easeOutQuint` crawl),
  and a losing tease often lands one short so the match slides past (near miss).
  Wins use glitch effects, not confetti: screen tear, RGB split, noise blocks, and a
  sliced glitch banner. All odds and timings are constants at the top of the file.
  Sound effects come from `app/composables/useSlotSounds.ts`, synthesized with the
  Web Audio API (no audio files). Sound is on by default (audio starts on the first
  Spin click, which satisfies autoplay rules); the speaker button in the machine's
  header mutes it, saved in localStorage (`iamorly:slot-sound`).
  Spins are a `requestAnimationFrame` loop with an `easeOutBack` stop per reel.
  Click-triggered one-shot animations (reel roll, BIG WIN, confetti, skill pill pop)
  always play; only looping/flashing effects are disabled under
  `prefers-reduced-motion` (Windows turns that on whenever "Animation effects" is off).
- **Social links** (`app/data/socialLinks.ts`): array of `{ label, href }`.

## Easter eggs

Three hidden extras, all client-only (`<ClientOnly>` in `AppShell`):

1. **Console greeting**: ASCII "ORLY" plus a hint, logged by `EasterEggs.vue`.
2. **Hidden terminal** (`EggTerminal.vue`): opens when someone types `orly` anywhere on
   the page or double-clicks the `iamorly` badge in `LeftSider`. Commands read the real
   data files (`whoami` years come from `careerStartDate`, `hire` respects `openToWork`);
   `cat .secrets` lists all three eggs, and `clue` (aliases `hint`, `clues`) gives
   escalating hints per egg (riddle -> hint -> answer, edit `CLUES`), ticking off the
   ones `useEasterEggs().found` has seen (terminal, Konami). Add a command by adding an entry to `commands`
   (give it `help` text to list it in `help`; leave it out to keep it secret).
3. **Konami code** (↑↑↓↓←→←→BA): GLITCH MODE tears the whole page (`.glitch-mode
   #__nuxt` in `main.css`) and the slot machine starts a 10-spin SUPER BONUS via
   `useEasterEggs().requestSlot`. The overlay and terminal are teleported to `<body>`
   because the page tear transforms `#__nuxt`, which would break `position: fixed`.

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
