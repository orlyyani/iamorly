/**
 * Job-search signals for recruiter tools (structured data, /resume.json, /llms.txt).
 *
 * Nothing here is shown on the page, but it is still public: anyone can open
 * /resume.json or /llms.txt, or view the page source. Set `openToWork` to
 * false to remove every availability signal.
 */
export const openToWork = true

/** What kind of work you'd take; only published while openToWork is true. */
export const workPreferences = {
  summary: 'Open to remote contract roles with companies worldwide, working from the Philippines (UTC+8).',
  roles: ['Lead / Senior Front-End Developer', 'Vue / Nuxt Developer', 'Full-Stack Developer (Vue + Laravel)', 'Front-End Game Developer'],
  engagement: 'Independent contractor',
  timezone: 'UTC+8'
}
