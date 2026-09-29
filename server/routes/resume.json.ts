import { jsonResume } from '~~/shared/recruiterProfile'

// Prerendered at build time (see nitro.prerender in nuxt.config.ts)
export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'application/json; charset=utf-8')
  return JSON.stringify(jsonResume(), null, 2)
})
