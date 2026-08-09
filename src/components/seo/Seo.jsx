import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { SEO_META, SITE_URL } from "../../data/seo"

function upsertMeta(selector, attr, value) {
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement("meta")
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

export default function Seo() {
  const { pathname } = useLocation()
  const meta = SEO_META[pathname] || SEO_META["*"]

  useEffect(() => {
    document.title = meta.title

    upsertMeta('meta[name="description"]', "content", meta.description || meta.title)
    upsertMeta('meta[name="robots"]', "content", meta.robots)

    const noindex = meta.robots.startsWith("noindex")
    const canonicalUrl = noindex
      ? undefined
      : `${SITE_URL}${pathname === "/" ? "/" : pathname.replace(/\/+$/, "")}`
    let canonical = document.querySelector('link[rel="canonical"]')
    if (canonicalUrl) {
      if (!canonical) {
        canonical = document.createElement("link")
        canonical.rel = "canonical"
        document.head.appendChild(canonical)
      }
      canonical.href = canonicalUrl
    } else if (canonical) {
      canonical.remove()
    }

    upsertMeta('meta[property="og:title"]', "content", meta.title)
    upsertMeta('meta[property="og:description"]', "content", meta.description || meta.title)
    upsertMeta('meta[property="og:url"]', "content", canonicalUrl || SITE_URL)
    upsertMeta('meta[property="og:type"]', "content", "website")
    upsertMeta('meta[name="twitter:title"]', "content", meta.title)
    upsertMeta('meta[name="twitter:description"]', "content", meta.description || meta.title)
    upsertMeta('meta[name="twitter:card"]', "content", "summary_large_image")
  }, [meta, pathname])

  return null
}
