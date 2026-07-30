<template>
  <div class="app-wrapper">
    <AppHeader />

    <!-- Loading -->
    <div v-if="state === 'loading'" class="loading">
      <div class="spinner" />
      <span>Loading product data…</span>
    </div>

    <!-- Upload fallback -->
    <FileUpload v-if="state === 'upload'" @file-selected="handleFileUpload" />

    <!-- ===== Active form ===== -->
    <template v-if="state === 'active'">
      <div class="main-grid">
        <div class="main-col">
          <ProgressBar
            :steps="steps"
            :current-index="idx"
            :match-count="matchCount"
            :match-class="matchClass"
          />

          <transition name="fade" mode="out-in">
            <div :key="idx">
              <div class="step-num">STEP {{ idx + 1 }}</div>
              <div class="step-title">{{ cur.label }}</div>
              <div v-if="cur.desc" class="step-desc">{{ cur.desc }}</div>

              <!-- Step-specific components -->
              <VoltageStep
                v-if="cur.id === 'voltage'"
                :options="opts"
                :selected="sels[cur.id]"
                :volt-std="voltStd"
                @pick="onPick(cur.id, $event)"
                @switch-std="switchVoltStd"
              />

              <PowerStep
                v-else-if="cur.id === 'power'"
                :options="opts"
                :selected="sels[cur.id]"
                :power-unit="powerUnit"
                @pick="onPick(cur.id, $event)"
                @switch-unit="switchPowerUnit"
              />

              <TypeStep
                v-else-if="cur.id === 'type'"
                :options="opts"
                @pick="onPickAndAdvance('type', $event)"
              />

              <ControlStep
                v-else-if="cur.id === 'control'"
                :options="opts"
                @pick="onPickAndAdvance('control', $event)"
              />

              <DefaultStep
                v-else
                :options="opts"
                :selected="sels[cur.id]"
                @pick="onPick(cur.id, $event)"
              />

              <StepNav
                :can-back="idx > 0"
                :can-next="canNext"
                :is-last="isLast"
                @back="onBack"
                @next="onNext"
              />
            </div>
          </transition>
        </div>

        <SidePanel :html="sideHtml" :loading="sideLoading" />
      </div>
    </template>

    <!-- ===== Results ===== -->
    <template v-if="state === 'results'">
      <div class="main-grid">
        <div class="main-col">
          <ResultsView
            :products="final"
            :done-steps="doneSteps"
            :disp-sel="dispSel"
            :selections="{ ...sels, voltStd, powerUnit }"
            @back="backFromResults(); loadContent(steps[idx].id)"
            @restart="onRestart"
          />
        </div>

        <SidePanel html="<h2>Product Specifications</h2><p>Click on a product card to expand its full specifications. Use the <strong>Download PDF</strong> button to save a spec sheet.</p><h3>Need Help?</h3><p>Fill out the contact form to receive the 3D STEP file for your selected product.</p>" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import { useProductFilter } from '@/composables/useProductFilter'
import { useSideContent } from '@/composables/useSideContent'

import AppHeader from '@/components/AppHeader.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import SidePanel from '@/components/SidePanel.vue'
import StepNav from '@/components/StepNav.vue'
import FileUpload from '@/components/FileUpload.vue'
import VoltageStep from '@/components/steps/VoltageStep.vue'
import PowerStep from '@/components/steps/PowerStep.vue'
import TypeStep from '@/components/steps/TypeStep.vue'
import ControlStep from '@/components/steps/ControlStep.vue'
import DefaultStep from '@/components/steps/DefaultStep.vue'
import ResultsView from '@/components/results/ResultsView.vue'

const {
  state, idx, sels, voltStd, powerUnit,
  steps, cur, opts, matchCount, matchClass,
  canNext, isLast, final, doneSteps,
  pick, next, back, backFromResults, restart,
  switchVoltStd, switchPowerUnit, dispSel,
  loadCSV, handleFileUpload,
} = useProductFilter()

const {
  sideHtml, sideLoading,
  preloadAll, loadContent,
} = useSideContent()

// ---- Event handlers ----
function onPick(id, val) {
  pick(id, val)
  if (id === 'heatsink') {
    nextTick(() => loadContent('heatsink', val))
  }
}

function onPickAndAdvance(id, val) {
  sels.value[id] = val
  nextTick(() => onNext())
}

function onNext() {
  next()
  nextTick(() => loadContent(steps[idx.value].id, sels.value.heatsink))
}

function onBack() {
  back()
  loadContent(steps[idx.value].id, sels.value.heatsink)
}

function onRestart() {
  restart()
  loadContent(steps[0].id)
}

// ---- Init ----
onMounted(async () => {
  const loaded = await loadCSV()
  if (loaded) {
    nextTick(() => {
      loadContent(steps[0].id)
      preloadAll()
    })
  }
})
</script>

<style lang="scss" scoped>
.app-wrapper {
  max-width: $max-width;
  margin: 0 auto;
  padding: 24px 20px 100px;
}

.main-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 28px;
  align-items: start;

  @media (max-width: $bp-tablet) {
    grid-template-columns: 1fr;

    :deep(.side-panel) {
      display: none;
    }
  }
}

.main-col {
  min-width: 0;
}

.step-num {
  @include mono-label;
  color: $accent;
  margin-bottom: 4px;
}

.step-title {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin-bottom: 4px;
}

.step-desc {
  font-size: 13px;
  color: $text-2;
  line-height: 1.5;
  margin-bottom: 20px;
}
</style>
