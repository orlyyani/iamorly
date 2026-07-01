export interface Project {
  title: string
  company: string
  period?: string
  description: string
  skills?: string[]
  skillsMore?: number
  /** Live URL of the project, when publicly reachable. */
  href?: string
  /** Screenshot path under /public/images/projects/, when available. */
  image?: string
  /** CSS gradient used as a frame behind the screenshot, tuned to the site's theme. */
  gradient?: string
}

export const projects: Project[] = [
  {
    title: 'HireSpy Spaces',
    company: 'Appetiser Pty Ltd',
    period: 'Oct 2023 - Apr 2024',
    description: 'A marketplace connecting hosts with unique spaces to creators and brands looking to hire them by the hour for content shoots.',
    skills: ['Vue 3', 'Nuxt.js'],
    skillsMore: 1,
    href: 'https://hirespyspaces.com.au/',
    image: '/images/projects/hirespy-spaces.jpg',
    gradient: 'linear-gradient(135deg, #6366f1, #a855f7)'
  },
  {
    title: 'BxLink',
    company: 'Lumea',
    period: 'Dec 2021 - Feb 2024',
    description: 'A platform that integrates with lab devices to give pathologists customizable dashboards, faster sign-offs, and real-time updates for clinicians. Built the front end in Vue 3, then moved to the back end while maintaining both the legacy and new UIs.',
    skills: ['Vue 3', 'Yii'],
    skillsMore: 5,
    href: 'https://lumeadigital.com/bxlink/',
    image: '/images/projects/bxlink.jpg',
    gradient: 'linear-gradient(135deg, #0f1535, #4c1d95 55%, #f76c6c)'
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
    title: 'Dimers',
    company: 'Appetiser Pty Ltd',
    description: 'A sports prediction web app built at Appetiser Melbourne. Dimers.com launched in the US market and raised $5M in funding to scale globally.',
    href: 'https://dimers.com/',
    image: '/images/projects/dimers.png',
    gradient: 'linear-gradient(135deg, #0b1033, #1d4ed8 60%, #d4e157)'
  },
  {
    title: 'LinkU',
    company: 'Appetiser Pty Ltd',
    description: 'An on-demand marketplace connecting Australians with vetted, insured local businesses for any job, anywhere, anytime.'
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
