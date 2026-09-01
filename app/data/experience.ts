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
  skillsMore?: number
}

export const experience: ExperienceEntry[] = [
  {
    id: 'appetiser',
    company: 'Appetiser Pty Ltd',
    role: 'Lead Front-End Developer',
    roleDetail: 'Platform Council',
    startDate: 'Jul 2018',
    endDate: 'Present',
    duration: '8 yrs',
    location: 'Melbourne, Victoria, Australia · Remote',
    description: 'I lead front-end technical direction across client web applications and sit on the platform council, which sets development standards and platform decisions.',
    highlights: [
      'Lead front-end architecture across client web apps — Vue 3, Nuxt 3, TypeScript, Pinia, Tailwind CSS, Vee-Validate/Yup',
      'Platform council: assess developer skill levels, assign tasks, and contribute to platform decisions and development standards',
      'Own front-end code review — logic, component architecture, state management, and maintainability',
      'Recruitment: technical evaluation of front-end candidates, and onboarding buddy for new developers',
      'Backend and infrastructure when needed: Laravel + Sanctum, MySQL, AWS S3/EC2, Docker',
      'Estimation and Agile: sprint planning, PWA feature decomposition, and retrospectives'
    ],
    skills: ['Vue 3', 'Nuxt 3', 'TypeScript', 'Pinia', 'Tailwind CSS', 'Laravel', 'AWS', 'Docker', 'Stripe', 'PWA']
  },
  {
    id: 'freelance',
    company: 'Freelance',
    role: 'Web Designer & Developer',
    employmentType: 'Self-employed',
    startDate: '2017',
    endDate: 'Present',
    duration: '9 yrs',
    location: 'Philippines · Remote',
    description: 'I scope, estimate, and deliver fixed-rate website projects for small businesses, from the initial audit through to go-live.',
    highlights: [
      'End-to-end delivery: audit, content consolidation, design, build, and go-live',
      'Figma to responsive pages on Squarespace, WordPress, and custom builds',
      'Domain/DNS and Cloudflare setup, with documented handover so clients can manage their own sites'
    ],
    skills: ['Figma', 'Squarespace', 'WordPress', 'Nuxt', 'Tailwind CSS', 'Cloudflare']
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
    description: 'Working through CoDev, I was deployed to Lumea as a Vue 3 front-end engineer on BxLink, their pathology platform, and later moved to the back-end team while continuing to maintain both the legacy and new UIs. I also contributed to CoDev\'s internal Bench Team Tracking System, used to track team members and their work assignments.',
    skills: ['Vue 3', 'Full-Stack Development', 'Yii', 'PHP', 'MySQL', 'REST APIs']
  },
  {
    id: 'adaca',
    company: 'Adaca',
    role: 'Web Developer',
    startDate: 'Dec 2021',
    endDate: 'Sep 2023',
    duration: '1 yr 10 mos',
    location: 'Australia · Remote',
    description: 'Contract development across two client products.',
    highlights: [
      'Archistar: custom front-end components built with StencilJS, Vue, and React',
      'PETstock: full-stack development on a large team, working in CodeIgniter'
    ],
    skills: ['StencilJS', 'Vue.js', 'React', 'CodeIgniter', 'PHP']
  },
  {
    id: 'mynd-consulting',
    company: 'Mynd Consulting',
    role: 'Web/UI Designer & Developer',
    roleDetail: 'First professional role',
    startDate: 'Apr 2016',
    endDate: 'Aug 2018',
    duration: '2 yrs 5 mos',
    location: 'Davao City, Philippines',
    description: 'My first professional role, where I started as a junior developer and spent nearly two and a half years refining my front-end and UI/UX skills across a range of teams. Mynd built the official Dr. Oz app, published by Sharecare Inc.',
    skills: ['WordPress', 'HTML & CSS', 'JavaScript', 'jQuery', 'Photoshop']
  }
]
