export interface SkillCategory {
  name: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Front-End',
    skills: ['Vue 3', 'Nuxt 3', 'TypeScript', 'Pinia', 'Tailwind CSS', 'React', 'PWA']
  },
  {
    name: 'Game Development',
    skills: ['Casino / Slot Games', 'Gameplay Mechanics', 'Collect Trails & Respins', 'Audio Integration']
  },
  {
    name: 'Back-End & Cloud',
    skills: ['Laravel', 'MySQL', 'AWS', 'Docker', 'Stripe']
  },
  {
    name: 'Design & Leadership',
    skills: ['Figma', 'UI/UX', 'Code Review', 'Scrum Master', 'Mentoring']
  }
]

export interface SkillProof {
  /** Company, project, or game the skill was used at. */
  where: string
  detail: string
}

// Where each skill was used, shown when a skill pill is clicked. Keyed by the
// skill names above; keep every claim backed by experience.ts / projects.ts / games.ts.
export const skillProof: Record<string, SkillProof[]> = {
  'Vue 3': [
    { where: 'Appetiser', detail: '8 years leading front-end on client web apps' },
    { where: 'BxLink · Lumea', detail: 'Built the Vue 3 front end of a pathology platform' }
  ],
  'Nuxt 3': [
    { where: 'Appetiser', detail: 'Architecture and code review for Nuxt 3 apps' },
    { where: 'HireSpy Spaces', detail: 'Hourly space-hire marketplace built as a Nuxt 3 PWA' }
  ],
  'TypeScript': [
    { where: 'Appetiser', detail: 'Front-end architecture for Vue 3 / Nuxt 3 / TypeScript apps' }
  ],
  'Pinia': [
    { where: 'HireSpy Spaces', detail: 'App state for the Vue 3 / Nuxt 3 marketplace' }
  ],
  'Tailwind CSS': [
    { where: 'iamorly.com', detail: 'This site, built with Nuxt 4, Nuxt UI, and Tailwind CSS v4' }
  ],
  'React': [
    { where: 'Archistar · Adaca', detail: 'Front-end components in StencilJS, Vue, and React' }
  ],
  'PWA': [
    { where: 'HireSpy Spaces', detail: 'Installable marketplace PWA' },
    { where: 'Flikit', detail: 'Retailer web app shipped as a PWA with Stripe payments' }
  ],
  'Casino / Slot Games': [
    { where: 'Play\'n GO', detail: 'Front-end game developer on 7 released slots' }
  ],
  'Gameplay Mechanics': [
    { where: 'Play\'n GO', detail: 'PPS, collect trails, and respins with maximum caps' }
  ],
  'Collect Trails & Respins': [
    { where: 'Mega Don Triple Threat', detail: 'Built from the ground up, including the RUF collect trail' }
  ],
  'Audio Integration': [
    { where: 'Play\'n GO', detail: 'Wiring game audio into gameplay with the audio team' }
  ],
  'Laravel': [
    { where: 'Appetiser', detail: 'Backend work when projects needed it' }
  ],
  'MySQL': [
    { where: 'BxLink · Lumea', detail: 'Moved to the back-end team (PHP, Yii, MySQL)' },
    { where: 'Appetiser', detail: 'Backend and infrastructure alongside Laravel' }
  ],
  'AWS': [
    { where: 'Appetiser', detail: 'Infrastructure work on client projects' }
  ],
  'Docker': [
    { where: 'Appetiser', detail: 'Infrastructure work on client projects' }
  ],
  'Stripe': [
    { where: 'HireSpy Spaces', detail: 'Payments for hourly space bookings' },
    { where: 'Flikit', detail: 'Payments in the retailer PWA' }
  ],
  'Figma': [
    { where: 'Freelance', detail: 'Designing small-business sites in Figma before building them' }
  ],
  'UI/UX': [
    { where: 'Mynd Consulting', detail: 'Grew from junior developer into front-end and UI/UX work' },
    { where: 'Freelance', detail: 'Site audits and design through to launch since 2015' }
  ],
  'Code Review': [
    { where: 'Appetiser', detail: 'Front-end code review and platform council standards' }
  ],
  'Scrum Master': [
    { where: 'Play\'n GO', detail: 'Daily with game design, art, audio, QA, and backend teams' }
  ],
  'Mentoring': [
    { where: 'Appetiser', detail: 'Assessed developers, assigned work, and onboarded new hires' }
  ]
}
