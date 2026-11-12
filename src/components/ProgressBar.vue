<template>
  <div class="progress">
    <div class="progress__track">
      <div
        v-for="(step, i) in steps"
        :key="i"
        class="progress__seg"
        :class="{ done: i < currentIndex, active: i === currentIndex }"
      />
    </div>
    <div class="progress__meta">
      <span class="progress__label">Step {{ currentIndex + 1 }} of {{ steps.length }}</span>
      <span class="progress__badge" :class="matchClass">
        {{ matchCount }} match{{ matchCount !== 1 ? 'es' : '' }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: { type: Array, required: true },
  currentIndex: { type: Number, required: true },
  matchCount: { type: Number, required: true },
  matchClass: { type: String, required: true },
})
</script>

<style lang="scss" scoped>
.progress {
  margin-bottom: 28px;

  &__track {
    display: flex;
    gap: 3px;
    margin-bottom: 8px;
  }

  &__seg {
    flex: 1;
    height: 3px;
    background: $surface-3;
    border-radius: 3px;
    transition: background 0.3s ease;
    overflow: hidden;
    position: relative;

    &.done {
      background: $accent;
    }

    &.active::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 50%;
      background: $accent;
      border-radius: 3px;
      animation: pulse 1.8s ease-in-out infinite;
    }
  }

  &__meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__label {
    font-size: 11px;
    font-weight: 500;
    color: $text-3;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  &__badge {
    font-family: $font-mono;
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 4px;

    &.ok    { color: $green; background: $green-dim; }
    &.warn  { color: $amber; background: $amber-dim; }
    &.danger { color: $red; background: $red-dim; }
  }
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50%      { opacity: 1; }
}
</style>
