import { llmsTxt } from '~~/shared/recruiterProfile'

// Prerendered at build time (see nitro.prerender in nuxt.config.ts)
export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return llmsTxt()
})
