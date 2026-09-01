export interface SkillCategory {
  name: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Front-End (core)',
    skills: ['Vue 2/3', 'Nuxt 3', 'TypeScript', 'JavaScript', 'Pinia', 'Vue Router', 'Tailwind CSS', 'Vee-Validate', 'Yup', 'HTML & CSS']
  },
  {
    name: 'Front-End (other)',
    skills: ['React', 'StencilJS', 'jQuery', 'Bootstrap']
  },
  {
    name: 'Web Platform',
    skills: ['PWA', 'Service Workers', 'SSR', 'Firebase Cloud Messaging', 'Auth (cookies / Sanctum)']
  },
  {
    name: 'Back-End',
    skills: ['PHP', 'Laravel', 'CodeIgniter', 'Node.js', 'REST APIs', 'GraphQL', 'MySQL']
  },
  {
    name: 'Cloud & Tools',
    skills: ['AWS (S3, EC2)', 'Docker', 'Cloudflare', 'Git', 'CI/CD', 'Jira', 'ClickUp']
  },
  {
    name: 'Integrations',
    skills: ['Stripe', 'Firebase']
  },
  {
    name: 'Design',
    skills: ['Figma', 'Photoshop', 'Illustrator', 'After Effects']
  },
  {
    name: 'CMS & Platforms',
    skills: ['Squarespace', 'WordPress']
  },
  {
    name: 'Leadership',
    skills: ['Code review', 'Technical estimation', 'Mentoring', 'Candidate evaluation', 'Onboarding', 'Platform council', 'Agile/Scrum']
  }
]
