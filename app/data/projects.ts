export interface Project {
  title: string
  company: string
  period?: string
  description: string
  skills?: string[]
  skillsMore?: number
}

export const projects: Project[] = [
  {
    title: 'HireSpy Spaces',
    company: 'Appetiser Pty Ltd',
    period: 'Oct 2023 - Apr 2024',
    description: 'A marketplace connecting hosts with unique spaces to creators and brands looking to hire them by the hour for content shoots.',
    skills: ['Vue 3', 'Nuxt.js'],
    skillsMore: 1
  },
  {
    title: 'BxLink',
    company: 'Lumea',
    period: 'Dec 2021 - Feb 2024',
    description: 'A platform that integrates with lab devices to give pathologists customizable dashboards, faster sign-offs, and real-time updates for clinicians. Built the front end in Vue 3, then moved to the back end while maintaining both the legacy and new UIs.',
    skills: ['Vue 3', 'Yii'],
    skillsMore: 5
  },
  {
    title: 'Archistar',
    company: 'Adaca',
    description: 'Custom front-end components for Archistar\'s design platform, built with StencilJS, Vue, and React.'
  },
  {
    title: 'Dimers',
    company: 'Appetiser Pty Ltd',
    description: 'A sports prediction web app built at Appetiser Melbourne. Dimers.com launched in the US market and raised $5M in funding to scale globally.'
  },
  {
    title: 'LinkU',
    company: 'Appetiser Pty Ltd',
    description: 'An on-demand marketplace connecting Australians with vetted, insured local businesses for any job, anywhere, anytime.'
  },
  {
    title: 'PETstock',
    company: 'Adaca',
    description: 'Full-stack development on PETstock\'s e-commerce platform as part of a large team, built with CodeIgniter.'
  }
]
