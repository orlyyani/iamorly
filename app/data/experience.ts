// First day at Mynd Consulting -- the start of Orly's professional career,
// used to compute "years of experience" dynamically.
export const careerStartDate = new Date(2016, 3, 1)

export interface ExperienceEntry {
  id: string
  company: string
  logo?: string
  role: string
  roleDetail?: string
  employmentType?: string
  startDate: string
  endDate: string
  duration: string
  location: string
  description: string
  /** Bullet points rendered under the description. */
  highlights?: string[]
  skills?: string[]
}

export const experience: ExperienceEntry[] = [
  {
    id: 'playngo',
    company: 'Play\'n GO',
    role: 'Front-End Game Developer',
    roleDetail: 'Scrum Master',
    startDate: 'Apr 2024',
    endDate: 'Present',
    duration: '2 yrs 6 mos',
    location: 'Manila, Philippines · Remote',
    description: 'I develop casino slots and own major gameplay features from implementation through prototype and delivery. I joined with no professional game-development experience and grew into a main developer role.',
    highlights: [
      'Built Mega Don Triple Threat from the ground up, including core gameplay and the RUF collect trail',
      'Gameplay mechanics: PPS, collect trails, respins with maximum caps, and audio integration',
      'Scrum Master, working daily with game design, art, audio, QA, and backend teams'
    ],
    skills: ['Game Development', 'Gameplay Mechanics', 'Audio Integration', 'Scrum']
  },
  {
    id: 'appetiser',
    company: 'Appetiser Pty Ltd',
    role: 'Lead Front-End Developer',
    roleDetail: 'Platform Council',
    startDate: 'Jul 2018',
    endDate: 'Sep 2026',
    duration: '8 yrs 3 mos',
    location: 'Melbourne, Victoria, Australia · Remote',
    description: 'I led front-end technical direction across client web apps and sat on the platform council, which set development standards and platform decisions.',
    highlights: [
      'Front-end architecture and code review for Vue 3 / Nuxt 3 / TypeScript apps',
      'Assessed developer skills, assigned work, evaluated candidates, and onboarded new developers',
      'Backend and infrastructure when needed: Laravel, MySQL, AWS, Docker, and Stripe'
    ],
    skills: ['Vue 3', 'Nuxt 3', 'TypeScript', 'Pinia', 'Laravel', 'PWA']
  },
  {
    id: 'freelance',
    company: 'Freelance',
    role: 'Web Designer & Developer',
    employmentType: 'Self-employed',
    startDate: '2015',
    endDate: 'Present',
    duration: '11 yrs',
    location: 'Philippines · Remote',
    description: 'Fixed-rate websites for small businesses, from audit and Figma design through Squarespace, WordPress, or custom builds to launch, with a documented handover.',
    skills: ['Figma', 'Squarespace', 'WordPress', 'Cloudflare']
  },
  {
    id: 'codev-lumea',
    company: 'CoDev',
    role: 'Full Stack Web Developer',
    roleDetail: 'Deployed to client Lumea',
    employmentType: 'Full-time',
    startDate: 'Dec 2021',
    endDate: 'Feb 2024',
    duration: '2 yrs 3 mos',
    location: 'Utah, United States · Remote',
    description: 'Vue 3 front-end engineer on Lumea\'s BxLink pathology platform, later moving to the back-end team while maintaining both the legacy and new UIs.',
    skills: ['Vue 3', 'PHP', 'Yii', 'MySQL']
  },
  {
    id: 'adaca',
    company: 'Adaca',
    role: 'Web Developer',
    startDate: 'Dec 2021',
    endDate: 'Sep 2023',
    duration: '1 yr 10 mos',
    location: 'Australia · Remote',
    description: 'Front-end components for Archistar in StencilJS, Vue, and React, and full-stack CodeIgniter work on PETstock\'s e-commerce platform.',
    skills: ['StencilJS', 'Vue', 'React', 'CodeIgniter']
  },
  {
    id: 'mynd-consulting',
    company: 'Mynd Consulting',
    role: 'Web/UI Designer & Developer',
    startDate: 'Apr 2016',
    endDate: 'Aug 2018',
    duration: '2 yrs 5 mos',
    location: 'Davao City, Philippines',
    description: 'My first role: I started as a junior developer and grew into front-end and UI/UX work. Mynd built the official Dr. Oz app for Sharecare Inc.',
    skills: ['HTML & CSS', 'JavaScript', 'WordPress', 'Photoshop']
  }
]
