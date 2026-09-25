export interface SocialLink {
  label: string
  href: string
}

export const contactEmail = 'orlyjohnyanson@gmail.com'

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/orlyyani' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/orly-yanson/' },
  { label: 'Behance', href: 'https://www.behance.net/orlyyani' },
  { label: 'X', href: 'https://x.com/orlyyani' },
  { label: 'Mail', href: `mailto:${contactEmail}` }
]
