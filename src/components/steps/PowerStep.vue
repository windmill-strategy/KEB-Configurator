<template>
  <div>
    <div class="unit-row">
      <button
        v-for="u in units"
        :key="u.key"
        class="unit-btn"
        :class="{ on: powerUnit === u.key }"
        @click="$emit('switch-unit', u.key)"
      >
        {{ u.display }}
      </button>
    </div>
    <p v-if="options.length === 1" class="single-note">Only one option available — auto-selected.</p>
    <div class="options">
      <div
        v-for="o in options"
        :key="o"
        class="opt"
        :class="{ sel: selected === o, only: options.length === 1 }"
        @click="$emit('pick', o)"
      >
        <div class="opt-radio" />
        <div class="opt-label">{{ o }} {{ displayUnit }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { POWER_UNITS } from '@/data/steps'

const props = defineProps({
  options: { type: Array, required: true },
  selected: { type: String, default: null },
  powerUnit: { type: String, required: true },
})

defineEmits(['pick', 'switch-unit'])

const units = POWER_UNITS
const displayUnit = computed(() => units.find((u) => u.key === props.powerUnit)?.display || '')
</script>
