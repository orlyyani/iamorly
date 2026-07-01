export interface Recommendation {
  id: string
  name: string
  /** The recommender's role / LinkedIn headline. */
  title: string
  /** Optional link to the recommender's profile. */
  href?: string
  date: string
  /** How they worked with Orly, e.g. "Kirt managed Orly directly". */
  relationship: string
  text: string
}

export const recommendations: Recommendation[] = [
  {
    id: 'kirt-henrie',
    name: 'Kirt Henrie',
    title: 'Founder & Principal Architect',
    href: 'https://www.linkedin.com/in/kirt-henrie-b659326/',
    date: 'February 22, 2024',
    relationship: 'Kirt managed Orly directly',
    text: 'I enthusiastically recommend Orly John Yanson as a skilled front and/or back-end developer. Orly played a vital role on our team, contributing significantly to the design and construction of state-of-the-art software aimed at enhancing patient care and outcomes. His versatility was evident as he willingly took on new projects and delved into unfamiliar code bases with enthusiasm. I look forward to the chance to collaborate with him again in the future.'
  },
  {
    id: 'andy-nesbitt',
    name: 'Andy Nesbitt',
    title: 'Senior Project Manager leading global project teams in delivering Digital Transformation',
    href: 'https://www.linkedin.com/in/andy-nesbitt/',
    date: 'April 28, 2023',
    relationship: 'Andy managed Orly directly',
    text: 'Orly is a great guy to work with, and has proven himself a valuable team member. I managed Orly on a large, complicated project where we inherited an old, undocumented and poorly commented code base. Orly helped me work through this, fixing issues and building new features. He never complained and was always happy to jump in and help out, no matter the issue.'
  }
]
