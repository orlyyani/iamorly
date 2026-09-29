import { SITE_URL } from '~~/shared/recruiterProfile'

// Prerendered at build time (see nitro.prerender in nuxt.config.ts)
export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  const lastmod = new Date().toISOString().slice(0, 10)
  const urls = ['/', '/resume.json', '/Orly-John-Yanson-Resume.pdf']
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${SITE_URL}${u}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}
</urlset>
`
})
