<template>
  <div class="type-cards">
    <div
      v-for="card in cards"
      :key="card.key"
      class="type-card"
      :class="{ unavailable: !card.available }"
    >
      <div class="type-card__label">{{ card.label }}</div>
      <img :src="card.img" :alt="card.label" class="type-card__img" />
      <div class="type-card__action">
        <button @click.stop="$emit('pick', card.key)">Select {{ card.key }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { TYPE_CARD_DATA } from '@/data/typeCards'

const props = defineProps({
  options: { type: Array, required: true },
})

defineEmits(['pick'])

const cards = computed(() => {
  const available = new Set(props.options)
  return Object.entries(TYPE_CARD_DATA).map(([key, data]) => ({
    key,
    ...data,
    available: available.has(key),
  }))
})
</script>

<style lang="scss" scoped>
.type-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}

.type-card {
  @include card;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    @include card-hover;
  }

  &.unavailable {
    opacity: 0.35;
    pointer-events: none;
  }

  &__label {
    text-align: center;
    padding: 12px 12px 8px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: $text-1;
  }

  &__img {
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: contain;
    background: $surface-2;
    padding: 8px;
  }

  &__action {
    padding: 10px;

    button {
      width: 100%;
      padding: 10px 12px;
      background: $accent;
      color: #fff;
      border: none;
      border-radius: $radius;
      font-family: $font-sans;
      font-size: 13px;
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

@media (max-width: $bp-mobile) {
  .type-cards {
    grid-template-columns: 1fr;
  }
}
</style>
