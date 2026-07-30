<template>
  <div class="ctrl-cards">
    <div
      v-for="card in cards"
      :key="card.key"
      :class="[`ctrl-card ctrl-card--tier-${card.tier.toLowerCase() }`, { unavailable: !card.available }]"
    >
      <div class="ctrl-card__tier">{{ card.tier }}</div>
      <div class="ctrl-card__badge" :class="card.badgeClass">{{ card.badge }}</div>
      <div class="ctrl-card__rows">
        <div class="ctrl-card__row" v-for="field in fields" :key="field.key">
          <div class="ctrl-card__row-label">{{ field.label }}</div>
          <div class="ctrl-card__row-value">{{ card[field.key] }}</div>
        </div>
      </div>
      <div class="ctrl-card__action">
        <button @click.stop="$emit('pick', card.key)">Select {{ card.key }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CTRL_CARD_DATA } from '@/data/controlCards'

const props = defineProps({
  options: { type: Array, required: true },
})

defineEmits(['pick'])

const fields = [
  { key: 'safety', label: 'Safety Function' },
  { key: 'protocol', label: 'Safety Protocol' },
  { key: 'fieldbus', label: 'Fieldbus' },
  { key: 'encoder', label: 'Encoder' },
]

const cards = computed(() => {
  const available = new Set(props.options)
  return Object.entries(CTRL_CARD_DATA).map(([key, data]) => ({
    key,
    ...data,
    available: available.has(key),
  }))
})
</script>

<style lang="scss" scoped>
.ctrl-cards {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2rem 1rem;
  margin-bottom: 24px;

  @media (max-width: $bp-mobile) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.ctrl-card {
  @include card;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &:hover {
    @include card-hover;
  }
  
  &--tier-basic {
    grid-column: span 6;
  }
  
  &--tier-standard {
    grid-column: span 2;
  }

  &--tier-high {
    grid-column: span 3;
  }

  &.unavailable {
    opacity: 0.35;
    pointer-events: none;
  }

  &__tier {
    text-align: center;
    padding: 8px 8px 4px;
    font-size: 11px;
    font-weight: 600;
    color: $text-2;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__badge {
    text-align: center;
    padding: 5px 8px;
    margin: 0 10px 8px;
    border-radius: 5px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.02em;

    &.compact     { background: #1a8a8a; color: #b8f0f0; }
    &.application { background: #8a7a1a; color: #f0e8b8; }
    &.pro         { background: #8a1a3a; color: #f0b8c8; }
  }

  &__rows {
    flex: 1;
    padding: 0 10px;
    .ctrl-card--tier-basic & {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__row {
    padding: 7px 0;
    border-bottom: 1px solid $border;

    &:last-child {
      border-bottom: none;
    }
  }

  &__row-label {
    font-size: 8px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: $text-3;
    margin-bottom: 2px;
  }

  &__row-value {
    font-size: 11px;
    color: $text-1;
    font-weight: 500;
    line-height: 1.45;
  }

  &__action {
    padding: 10px;
    margin-top: auto;

    button {
      width: 100%;
      padding: 9px 12px;
      background: $accent;
      color: #fff;
      border: none;
      border-radius: $radius;
      font-family: $font-sans;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all $transition;

      &:hover {
        background: #5A9DE6;
        box-shadow: 0 4px 12px rgba(74, 144, 217, 0.3);
      }
    }
  }
}
</style>
