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
