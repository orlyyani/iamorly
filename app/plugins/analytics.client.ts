// Loads the free, cookie-free analytics scripts, each only when its build variable is set:
// - Umami (custom events), counting only the real domain so dev/preview stay out of the stats
// - Cloudflare Web Analytics (traffic), which only reports hostnames configured for the token
const SITE_HOSTS = ['iamorly.com', 'www.iamorly.com']

export default defineNuxtPlugin(() => {
  const { umamiWebsiteId, cfBeaconToken } = useRuntimeConfig().public
  const scripts = []

  if (umamiWebsiteId) {
    scripts.push({
      'src': 'https://cloud.umami.is/script.js',
      'defer': true,
      'data-website-id': umamiWebsiteId,
      'data-domains': SITE_HOSTS.join(',')
    })
  }

  if (cfBeaconToken && SITE_HOSTS.includes(window.location.hostname)) {
    scripts.push({
      'src': 'https://static.cloudflareinsights.com/beacon.min.js',
      'defer': true,
      'data-cf-beacon': JSON.stringify({ token: cfBeaconToken })
    })
  }

  if (scripts.length) useHead({ script: scripts })
})
