import { ref } from 'vue'
import { marked } from 'marked'
import { STEPS } from '@/data/steps'
import { STEP_CONTENT, HEATSINK_CONTENT } from '@/data/content'

export function heatsinkSlug(opt) {
  return opt
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/\s*\/\s*/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function useSideContent() {
  const sideHtml = ref('')
  const sideLoading = ref(false)
  const cache = {}

  async function fetchMd(path, fallback) {
    if (cache[path]) return cache[path]
    try {
      const res = await fetch(path)
      if (res.ok) {
        const text = await res.text()
        cache[path] = text
        return text
      }
    } catch {
      // fall through
    }
    cache[path] = fallback
    return fallback
  }

  async function preloadAll() {
    const stepFetches = STEPS.map((s) =>
      fetchMd(`content/step-${s.id}.md`, STEP_CONTENT[s.id] || ''),
    )
    const hsFetches = Object.keys(HEATSINK_CONTENT).map((slug) =>
      fetchMd(`content/heatsink-${slug}.md`, HEATSINK_CONTENT[slug] || ''),
    )
    await Promise.allSettled([...stepFetches, ...hsFetches])
  }

  async function loadContent(stepId, heatsinkSelection = null) {
    // Heatsink option-specific content
    if (stepId === 'heatsink' && heatsinkSelection) {
      const slug = heatsinkSlug(heatsinkSelection)
      const path = `content/heatsink-${slug}.md`

      if (cache[path]) {
        sideHtml.value = marked(cache[path])
        return
      }

      sideLoading.value = true
      const md = await fetchMd(
        path,
        HEATSINK_CONTENT[slug] || STEP_CONTENT.heatsink || '',
      )
      sideHtml.value = marked(md)
      sideLoading.value = false
      return
    }

    // Default step-level content
    const path = `content/step-${stepId}.md`

    if (cache[path]) {
      sideHtml.value = marked(cache[path])
      return
    }

    sideLoading.value = true
    const md = await fetchMd(path, STEP_CONTENT[stepId] || '')
    sideHtml.value = marked(md)
    sideLoading.value = false
  }

  return {
    sideHtml,
    sideLoading,
    preloadAll,
    loadContent,
  }
}
