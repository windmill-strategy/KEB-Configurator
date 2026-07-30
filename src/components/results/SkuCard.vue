<template>
  <div class="sku-card" :class="{ exp: expanded }" @click="$emit('toggle')">
    <div class="sku-card__top">
      <div class="sku-card__number">{{ product.Part_Number }}</div>
      <div class="sku-card__toggle">
        {{ expanded ? 'Hide' : 'Show' }} specs
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
    <div v-if="expanded" class="sku-card__specs">
      <div v-for="col in specColumns" :key="col" class="sku-card__spec">
        <div class="sku-card__spec-key">{{ formatLabel(col) }}</div>
        <div class="sku-card__spec-val">{{ product[col] || '—' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { SPEC_COLUMNS } from '@/data/steps'

defineProps({
  product: { type: Object, required: true },
  expanded: { type: Boolean, default: false },
})

defineEmits(['toggle'])

const specColumns = SPEC_COLUMNS

function formatLabel(col) {
  return col.replace(/_/g, ' ').replace(/%/g, '%')
}
</script>

<style lang="scss" scoped>
.sku-card {
  @include card;
  overflow: hidden;
  margin-bottom: 8px;
  cursor: pointer;

  &:hover {
    border-color: $border-hover;
  }

  &.exp {
    border-color: $accent;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 18px;
  }

  &__number {
    font-family: $font-mono;
    font-size: 16px;
    font-weight: 600;
    color: $accent;
    letter-spacing: 0.02em;
  }

  &__toggle {
    font-size: 11px;
    color: $text-3;
    display: flex;
    align-items: center;
    gap: 4px;

    svg {
      width: 14px;
      height: 14px;
      transition: transform 0.2s ease;
    }
  }

  &.exp &__toggle svg {
    transform: rotate(180deg);
  }

  &__specs {
    padding: 0 18px 16px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 6px;
  }

  &__spec {
    background: $surface-2;
    border-radius: 6px;
    padding: 9px 11px;
  }

  &__spec-key {
    font-size: 9px;
    font-weight: 600;
    color: $text-3;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 1px;
  }

  &__spec-val {
    font-family: $font-mono;
    font-size: 12px;
    font-weight: 500;
    color: $text-1;
  }
}
</style>
