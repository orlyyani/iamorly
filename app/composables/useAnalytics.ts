type EventData = Record<string, string | number | boolean>

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => void }
  }
}

/**
 * Custom Umami events for things a click attribute can't capture (slot results,
 * easter eggs). Link and button clicks use `data-umami-event` attributes instead.
 * A no-op when Umami isn't loaded (no website ID, local dev, ad blockers).
 */
export function useAnalytics() {
  function track(event: string, data?: EventData) {
    if (import.meta.server) return
    try {
      window.umami?.track(event, data)
    } catch {
      // Analytics must never break the page.
    }
  }

  return { track }
}
