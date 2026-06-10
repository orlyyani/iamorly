export interface SkillCategory {
  name: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Front-End',
    skills: ['Vue.js', 'Nuxt', 'TypeScript', 'JavaScript', 'React', 'StencilJS', 'Tailwind CSS', 'HTML & CSS']
  },
  {
    name: 'Back-End',
    skills: ['PHP', 'CodeIgniter', 'Laravel', 'Node.js', 'REST APIs', 'GraphQL', 'MySQL']
  },
  {
    name: 'CMS & Platforms',
    skills: ['WordPress']
  },
  {
    name: 'Tools & DevOps',
    skills: ['Git', 'Docker', 'Cloudflare', 'AWS', 'CI/CD']
  }
]
