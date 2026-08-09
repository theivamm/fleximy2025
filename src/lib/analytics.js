export function track(event, props = {}) {
  if (import.meta.env.DEV) {
    console.debug("[analytics]", { event, props, path: window.location.pathname })
  }
  window.dispatchEvent(new CustomEvent("fleximy:analytics", { detail: { event, props } }))
}

export function initAnalytics() {
  document.addEventListener("click", (e) => {
    const el = e.target?.closest?.("[data-track], a[href^='https://wa.me/']")
    if (!el) return
    if (el.hasAttribute("data-track")) {
      let props = {}
      if (el.dataset.trackProps) {
        try {
          props = JSON.parse(el.dataset.trackProps)
        } catch {
          props = {}
        }
      }
      track(el.getAttribute("data-track"), props)
    } else if (el.tagName.toLowerCase() === "a") {
      track("click_whatsapp", { url: el.getAttribute("href") })
    }
  })
}
