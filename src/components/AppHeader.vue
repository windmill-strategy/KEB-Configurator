<template>
  <div class="app-header">
    <div class="app-header__logo">PS</div>
    <div class="app-header__title">
      Product Selector<span>v2.1</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid $border;

  &__logo {
    width: 36px;
    height: 36px;
    background: $accent;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: $font-mono;
    font-weight: 600;
    font-size: 14px;
    color: #fff;
    flex-shrink: 0;
  }

  &__title {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.02em;

    span {
      color: $text-3;
      font-weight: 400;
      margin-left: 6px;
    }
  }
}
</style>
