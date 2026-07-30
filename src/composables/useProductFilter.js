import { ref, computed, watch, nextTick } from 'vue'
import Papa from 'papaparse'
import { STEPS, VOLT_COL_MAP, POWER_COL_MAP } from '@/data/steps'

export function useProductFilter() {
  const state = ref('loading')
  const allProducts = ref([])
  const idx = ref(0)
  const sels = ref({})
  const voltStd = ref('UL')
  const powerUnit = ref('KW')

  const steps = STEPS

  // ---- Filtering engine ----
  function filterTo(n) {
    let pool = allProducts.value
    for (let i = 0; i < n; i++) {
      const step = steps[i]
      const val = sels.value[step.id]
      if (val == null) continue

      switch (step.id) {
        case 'voltage':
          pool = pool.filter((r) => String(r[VOLT_COL_MAP[voltStd.value]]) === String(val))
          break
        case 'power':
          pool = pool.filter((r) => String(r[POWER_COL_MAP[powerUnit.value]]) === String(val))
          break
        case 'heatsink':
          pool = pool.filter((r) => String(r.Heatsink) === String(val))
          break
        default:
          if (step.id === 'type') pool = pool.filter((r) => String(r.Type) === String(val))
          else if (step.id === 'emi') pool = pool.filter((r) => String(r.EMI) === String(val))
          else if (step.id === 'overload') pool = pool.filter((r) => String(r.Rated_kHz) === String(val))
          else if (step.id === 'control') pool = pool.filter((r) => String(r.Ctrl_Board) === String(val))
      }
    }
    return pool
  }

  const filtered = computed(() => filterTo(idx.value))
  const matchCount = computed(() => filtered.value.length)
  const matchClass = computed(() =>
    matchCount.value <= 5 ? 'danger' : matchCount.value <= 20 ? 'warn' : 'ok',
  )
  const cur = computed(() => steps[idx.value])
  const isLast = computed(() => idx.value === steps.length - 1)
  const final = computed(() => filterTo(steps.length))

  // ---- Options for current step ----
  const opts = computed(() => {
    const step = cur.value
    const pool = filtered.value

    const unique = (col) =>
      [...new Set(pool.map((r) => String(r[col])))].filter((x) => x && x !== 'undefined')

    switch (step.id) {
      case 'voltage':
        return unique(VOLT_COL_MAP[voltStd.value]).sort()
      case 'power':
        return unique(POWER_COL_MAP[powerUnit.value]).sort(
          (a, b) => parseFloat(a) - parseFloat(b),
        )
      case 'type':
        return unique('Type').sort()
      case 'emi':
        return unique('EMI').sort()
      case 'heatsink':
        return unique('Heatsink')
          .filter((x) => !x.toLowerCase().includes('oil'))
          .sort()
      case 'overload':
        return unique('Rated_kHz').sort((a, b) => parseFloat(a) - parseFloat(b))
      case 'control':
        return unique('Ctrl_Board').sort()
      default:
        return []
    }
  })

  // Auto-select when only one option
  watch(
    opts,
    (o) => {
      if (o.length === 1) {
        sels.value[cur.value.id] = o[0]
      }
    },
    { flush: 'post' },
  )

  const canNext = computed(() => sels.value[cur.value.id] != null)

  // ---- Actions ----
  function pick(id, val) {
    if (opts.value.length > 1) {
      sels.value[id] = val
    }
  }

  function switchVoltStd(u) {
    if (u === voltStd.value) return
    delete sels.value['voltage']
    voltStd.value = u
  }

  function switchPowerUnit(u) {
    if (u === powerUnit.value) return
    delete sels.value['power']
    powerUnit.value = u
  }

  function next() {
    if (isLast.value) {
      state.value = 'results'
      return
    }
    idx.value++
    nextTick(() => {
      if (opts.value.length === 1) {
        sels.value[steps[idx.value].id] = opts.value[0]
      }
    })
  }

  function back() {
    if (idx.value > 0) {
      delete sels.value[steps[idx.value].id]
      idx.value--
    }
  }

  function backFromResults() {
    state.value = 'active'
  }

  function restart() {
    idx.value = 0
    sels.value = {}
    voltStd.value = 'UL'
    powerUnit.value = 'KW'
    state.value = 'active'
  }

  // ---- Selections display ----
  const doneSteps = computed(() => steps.filter((s) => sels.value[s.id] != null))

  function dispSel(step) {
    const val = sels.value[step.id]
    if (step.id === 'power') {
      const unit = step.id === 'power' ? (powerUnit.value === 'KW' ? 'kW' : 'Hp') : ''
      return `${val} ${unit}`
    }
    if (step.id === 'voltage') return `${val} (${voltStd.value})`
    return val ?? '—'
  }

  // ---- CSV loading ----
  function parseCSV(text) {
    const parsed = Papa.parse(text.trim(), {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
    })
    allProducts.value = parsed.data
    state.value = 'active'
    nextTick(() => {
      if (opts.value.length === 1) {
        sels.value[steps[0].id] = opts.value[0]
      }
    })
  }

  async function loadCSV() {
    const filenames = ['data.csv', 'selector.csv', 'webselector.csv']
    for (const name of filenames) {
      try {
        const res = await fetch(name)
        if (res.ok) {
          parseCSV(await res.text())
          return true
        }
      } catch {
        // continue
      }
    }
    state.value = 'upload'
    return false
  }

  function handleFileUpload(event) {
    const file = event.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => parseCSV(e.target.result)
    reader.readAsText(file)
  }

  return {
    // State
    state,
    allProducts,
    idx,
    sels,
    voltStd,
    powerUnit,

    // Computed
    steps,
    cur,
    opts,
    filtered,
    matchCount,
    matchClass,
    canNext,
    isLast,
    final,
    doneSteps,

    // Methods
    pick,
    next,
    back,
    backFromResults,
    restart,
    switchVoltStd,
    switchPowerUnit,
    dispSel,
    loadCSV,
    handleFileUpload,
  }
}
