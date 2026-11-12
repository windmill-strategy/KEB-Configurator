<template>
  <div class="nav">
    <button class="btn btn-ghost" :disabled="!canBack" @click="$emit('back')">← Back</button>
    <button class="btn btn-primary" :disabled="!canNext" @click="$emit('next')">
      {{ isLast ? 'Show Results' : 'Next →' }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  canBack: { type: Boolean, default: true },
  canNext: { type: Boolean, default: false },
  isLast: { type: Boolean, default: false },
})

defineEmits(['back', 'next'])
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
</style>
