<template>
  <div class="side-panel">
    <div v-if="loading" class="side-panel__shimmer">
      <div class="line h18 w70" />
      <div class="line w100" />
      <div class="line w85" />
      <div class="line w100" />
      <div class="line w50" />
    </div>
    <div v-else v-html="html" />
  </div>
</template>

<script setup>
defineProps({
  html: { type: String, default: '' },
  loading: { type: Boolean, default: false },
})
</script>

<style lang="scss" scoped>
.side-panel {
  background: $surface;
  border: 1px solid $border;
  border-radius: $radius-lg;
  padding: 24px;
  position: sticky;
  top: 24px;
  max-height: calc(100vh - 48px);
  overflow-y: auto;

  :deep(h2) {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 12px;
    letter-spacing: -0.02em;
    color: $text-1;
  }

  :deep(h3) {
    font-size: 13px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 6px;
    color: $accent;
  }

  :deep(p) {
    font-size: 13px;
    line-height: 1.65;
    color: $text-2;
    margin-bottom: 10px;
  }

  :deep(strong) {
    color: $text-1;
    font-weight: 600;
  }

  :deep(ul),
  :deep(ol) {
    font-size: 13px;
    color: $text-2;
    padding-left: 18px;
    margin-bottom: 10px;
    line-height: 1.6;
  }

  &__shimmer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 4px 0;

    .line {
      height: 12px;
      background: $surface-3;
      border-radius: 4px;
      animation: shimmer 1.2s ease-in-out infinite alternate;

      &.h18 { height: 18px; margin-bottom: 4px; }
      &.w70 { width: 70%; }
      &.w85 { width: 85%; }
      &.w100 { width: 100%; }
      &.w50 { width: 50%; }

      @for $i from 2 through 5 {
        &:nth-child(#{$i}) {
          animation-delay: #{($i - 1) * 0.1}s;
        }
      }
    }
  }
}

@keyframes shimmer {
  from { opacity: 0.4; }
  to   { opacity: 0.7; }
}
</style>
