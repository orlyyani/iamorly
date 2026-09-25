export interface Project {
  title: string
  company: string
  period?: string
  description: string
  /** Live URL of the project, when publicly reachable. */
  href?: string
  /** Screenshot path under /public/images/projects/, when available. */
  image?: string
  /** CSS gradient used as a frame behind the screenshot, tuned to the site's theme. */
  gradient?: string
}

// The first six are featured; the rest appear behind "Show all" in ProjectsSection.
export const projects: Project[] = [
  {
    title: 'HireSpy Spaces',
    company: 'Appetiser Pty Ltd',
    period: 'Oct 2023 - Apr 2024',
    description: 'A marketplace where creators and brands hire unique spaces by the hour for content shoots. Built as a PWA with Vue 3, Nuxt 3, Pinia, and Stripe.',
    href: 'https://hirespyspaces.com.au/',
    image: '/images/projects/hirespy-spaces.jpg',
    gradient: 'linear-gradient(135deg, #6366f1, #a855f7)'
  },
  {
    title: 'Waggy Paths',
    company: 'Appetiser Pty Ltd',
    description: 'An app for Western Australian dog owners to find and review dog-friendly parks, trails, vets, groomers, and cafés, with community-verified place details.',
    href: 'https://www.waggypaths.com.au/',
    image: '/images/projects/waggy-paths.jpg',
    gradient: 'linear-gradient(135deg, #14532d, #4ade80 55%, #bef264)'
  },
  {
    title: 'Rainscape',
    company: 'Appetiser Pty Ltd',
    description: 'A premium rain sounds app for sleep, focus, and relaxation, with over 500 recordings, mood playlists, and sessions up to 10 hours.',
    href: 'https://rainscape.io/',
    image: '/images/projects/rainscape.jpg',
    gradient: 'linear-gradient(135deg, #0b0b2e, #6d28d9 55%, #d946ef)'
  },
  {
    title: 'BxLink',
    company: 'Lumea',
    period: 'Dec 2021 - Feb 2024',
    description: 'A digital pathology platform that connects to lab devices and gives pathologists customizable dashboards and faster sign-outs. I built the Vue 3 front end, then maintained both the legacy and new UIs from the back-end team.',
    href: 'https://lumeadigital.com/bxlink/',
    image: '/images/projects/bxlink.jpg',
    gradient: 'linear-gradient(135deg, #0f1535, #4c1d95 55%, #f76c6c)'
  },
  {
    title: 'Flikit',
    company: 'Appetiser Pty Ltd',
    description: 'The retailer web app for Flikit, built as an installable PWA with Stripe payments. One of two web developers in a team with Android, iOS, QA, and PM.',
    href: 'https://www.flikit.co/',
    image: '/images/projects/flikit.jpg',
    gradient: 'linear-gradient(135deg, #7c2d12, #f97316 55%, #fdba74)'
  },
  {
    title: 'Dimers',
    company: 'Appetiser Pty Ltd',
    description: 'A sports prediction web app that launched in the US market and raised $5M in funding to scale globally.',
    href: 'https://dimers.com/',
    image: '/images/projects/dimers.png',
    gradient: 'linear-gradient(135deg, #0b1033, #1d4ed8 60%, #d4e157)'
  },
  {
    title: 'TradieWayz',
    company: 'Appetiser Pty Ltd',
    description: 'An app for Australian tradies that handles route optimisation, job tracking, and scheduling so crews can fit more jobs into the week.',
    href: 'https://www.tradiewayz.com/',
    image: '/images/projects/tradiewayz.jpg',
    gradient: 'linear-gradient(135deg, #1d4ed8, #60a5fa 55%, #facc15)'
  },
  {
    title: 'Tradies4All',
    company: 'Appetiser Pty Ltd',
    description: 'A marketplace where homeowners and businesses post jobs and verified local tradespeople view and bid on work nearby.',
    href: 'https://www.tradies4all.com.au/',
    image: '/images/projects/tradies4all.jpg',
    gradient: 'linear-gradient(135deg, #020617, #1e40af 55%, #2563eb)'
  },
  {
    title: 'Tradie Lady Hire',
    company: 'Appetiser Pty Ltd',
    description: 'A platform connecting clients with skilled female tradespeople for one-off jobs, long-term employment, and apprenticeships.',
    href: 'https://www.tradieladyhire.com.au/',
    image: '/images/projects/tradie-lady-hire.jpg',
    gradient: 'linear-gradient(135deg, #1e1b4b, #7c3aed 55%, #d946ef)'
  },
  {
    title: 'Archistar',
    company: 'Adaca',
    description: 'Custom front-end components for Archistar\'s design platform, built with StencilJS, Vue, and React.',
    href: 'https://www.archistar.ai/aiprecheck/',
    image: '/images/projects/archistar.jpg',
    gradient: 'linear-gradient(135deg, #818cf8, #6ee7b7)'
  },
  {
    title: 'PETstock',
    company: 'Adaca',
    description: 'Full-stack development on PETstock\'s e-commerce platform as part of a large team, built with CodeIgniter.',
    href: 'https://www.petstock.com.au/',
    image: '/images/projects/petstock.jpg',
    gradient: 'linear-gradient(135deg, #1d4ed8, #f59e0b)'
  }
]
