/**
 * Machine-readable versions of the portfolio for recruiter tools, search
 * engines and AI agents: schema.org JSON-LD (in the page head), a JSON Resume
 * (/resume.json) and a plain-text summary (/llms.txt). Everything is built
 * from app/data, so editing the portfolio keeps them in sync.
 */
import { openToWork, workPreferences } from '../app/data/availability'
import { education } from '../app/data/education'
import { careerStartDate, experience } from '../app/data/experience'
import { skillCategories } from '../app/data/skills'
import { contactEmail, socialLinks } from '../app/data/socialLinks'

export const SITE_URL = 'https://iamorly.com'

const person = {
  name: 'Orly John Yanson',
  label: 'Lead Front-End Developer · Game Developer · Web/UI Designer',
  image: `${SITE_URL}/pp.jpg`,
  city: 'Polomolok',
  region: 'South Cotabato',
  countryCode: 'PH'
}

const profiles = socialLinks.filter(l => !l.href.startsWith('mailto:'))
const allSkills = [...new Set(skillCategories.flatMap(c => c.skills))]

function yearsOfExperience(now = new Date()): number {
  const years = now.getFullYear() - careerStartDate.getFullYear()
  const beforeAnniversary = now.getMonth() < careerStartDate.getMonth()
    || (now.getMonth() === careerStartDate.getMonth() && now.getDate() < careerStartDate.getDate())
  return beforeAnniversary ? years - 1 : years
}

function summary(): string {
  const base = `Front-end and game developer with ${yearsOfExperience()} years of experience building web apps, full products and casino games for teams in Australia, the US and the Philippines. Core stack: Vue 3, Nuxt, TypeScript, Pinia and Tailwind CSS, with Laravel, MySQL, AWS and Docker. Works remotely from the Philippines.`
  return openToWork ? `${base} ${workPreferences.summary}` : base
}

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

/** "Apr 2024" → "2024-04", "2015" → "2015", "Present" → undefined (JSON Resume's convention for ongoing). */
function isoDate(d: string): string | undefined {
  if (/present/i.test(d)) return undefined
  const m = d.trim().match(/^([a-z]{3})[a-z]*\s+(\d{4})$/i)
  if (m) return `${m[2]}-${String(MONTHS.indexOf(m[1]!.toLowerCase()) + 1).padStart(2, '0')}`
  return d.trim().match(/^\d{4}$/) ? d.trim() : undefined
}

const current = experience.filter(e => /present/i.test(e.endDate))

/** schema.org ProfilePage + Person, for the page's JSON-LD script. */
export function profileJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    'url': `${SITE_URL}/`,
    'mainEntity': {
      '@type': 'Person',
      'name': person.name,
      'jobTitle': person.label,
      'description': summary(),
      'url': `${SITE_URL}/`,
      'image': person.image,
      'email': `mailto:${contactEmail}`,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': person.city,
        'addressRegion': person.region,
        'addressCountry': person.countryCode
      },
      'sameAs': profiles.map(p => p.href),
      'knowsAbout': allSkills,
      'worksFor': current.map(e => ({ '@type': 'Organization', 'name': e.company })),
      'alumniOf': education.map(e => ({ '@type': 'CollegeOrUniversity', 'name': e.institution })),
      'hasCredential': education.map(e => ({
        '@type': 'EducationalOccupationalCredential',
        'credentialCategory': 'degree',
        'name': `${e.degree} in ${e.field}`,
        'recognizedBy': { '@type': 'CollegeOrUniversity', 'name': e.institution }
      })),
      ...(openToWork
        ? {
            seeks: {
              '@type': 'Demand',
              'description': workPreferences.summary,
              'itemOffered': workPreferences.roles.map(r => ({ '@type': 'Service', 'name': r }))
            }
          }
        : {})
    }
  }
}

/** JSON Resume (https://jsonresume.org/schema), served at /resume.json. */
export function jsonResume() {
  return {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: person.name,
      label: person.label,
      image: person.image,
      email: contactEmail,
      url: `${SITE_URL}/`,
      summary: summary(),
      location: { city: person.city, region: person.region, countryCode: person.countryCode },
      profiles: profiles.map(p => ({
        network: p.label,
        url: p.href,
        username: p.href.replace(/\/+$/, '').split('/').pop()
      }))
    },
    work: experience.map(e => ({
      name: e.company,
      position: e.roleDetail ? `${e.role} (${e.roleDetail})` : e.role,
      location: e.location,
      startDate: isoDate(e.startDate),
      endDate: isoDate(e.endDate),
      summary: e.description,
      highlights: e.highlights ?? []
    })),
    education: education.map(e => ({
      institution: e.institution,
      studyType: e.degree,
      area: e.field,
      startDate: e.startDate,
      endDate: e.endDate
    })),
    skills: skillCategories.map(c => ({ name: c.name, keywords: c.skills })),
    languages: [{ language: 'English', fluency: 'Professional working proficiency' }],
    meta: {
      canonical: `${SITE_URL}/resume.json`,
      lastModified: new Date().toISOString().slice(0, 10)
    }
  }
}

/** Plain-text profile for AI agents and recruiter bots (https://llmstxt.org), served at /llms.txt. */
export function llmsTxt(): string {
  const lines = [
    `# ${person.name}`,
    '',
    `> ${summary()}`,
    '',
    `- Title: ${person.label}`,
    `- Location: ${person.city}, ${person.region}, Philippines (UTC+8), works remotely`,
    `- Contact: ${contactEmail}`,
    ...(openToWork ? [`- Availability: ${workPreferences.summary}`, `- Roles of interest: ${workPreferences.roles.join('; ')}`] : []),
    '',
    '## Experience',
    ...experience.map(e => `- ${e.role} at ${e.company} (${e.startDate} – ${e.endDate}, ${e.location}): ${e.description}`),
    '',
    '## Skills',
    ...skillCategories.map(c => `- ${c.name}: ${c.skills.join(', ')}`),
    '',
    '## Education',
    ...education.map(e => `- ${e.degree} in ${e.field}, ${e.institution} (${e.startDate}–${e.endDate})`),
    '',
    '## Links',
    `- [Portfolio](${SITE_URL}/)`,
    `- [Resume (JSON Resume)](${SITE_URL}/resume.json)`,
    `- [Resume (PDF)](${SITE_URL}/Orly-John-Yanson-Resume.pdf)`,
    ...profiles.map(p => `- [${p.label}](${p.href})`)
  ]
  return `${lines.join('\n')}\n`
}
