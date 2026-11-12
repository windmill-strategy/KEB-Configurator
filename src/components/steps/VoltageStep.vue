<template>
  <div>
    <div class="unit-row">
      <button
        v-for="u in ['IEC', 'UL']"
        :key="u"
        class="unit-btn"
        :class="{ on: voltStd === u }"
        @click="$emit('switch-std', u)"
      >
        {{ u }}
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
        <div class="opt-label">{{ o }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  options: { type: Array, required: true },
  selected: { type: String, default: null },
  voltStd: { type: String, required: true },
})

defineEmits(['pick', 'switch-std'])
</script>
