<template>
  <div class="summary-box">
    <h3>Your Selections</h3>
    <div class="summary-box__grid">
      <div v-for="step in steps" :key="step.id" class="summary-box__row">
        <span class="summary-box__key">{{ step.label }}</span>
        <span class="summary-box__val">{{ displayFn(step) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: { type: Array, required: true },
  displayFn: { type: Function, required: true },
})
</script>

<style lang="scss" scoped>
.summary-box {
  @include card;
  padding: 18px;
  margin-top: 20px;

  h3 {
    font-size: 12px;
    font-weight: 600;
    color: $text-3;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px 20px;

    @media (max-width: $bp-mobile) {
      grid-template-columns: 1fr;
    }
  }

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    border-bottom: 1px solid $border;

    &:last-child {
      border-bottom: none;
    }
  }

  &__key {
    font-size: 12px;
    color: $text-2;
  }

  &__val {
    font-size: 12px;
    font-weight: 600;
    font-family: $font-mono;
  }
}
</style>
