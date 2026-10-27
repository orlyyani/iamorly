// Loads Umami (cookie-free analytics) only when a website ID is configured, and only
// counts visits on the real domain, so local dev and preview builds stay out of the stats.
export default defineNuxtPlugin(() => {
  const { umamiWebsiteId } = useRuntimeConfig().public
  if (!umamiWebsiteId) return

  useHead({
    script: [{
      'src': 'https://cloud.umami.is/script.js',
      'defer': true,
      'data-website-id': umamiWebsiteId,
      'data-domains': 'iamorly.com,www.iamorly.com'
    }]
  })
})
