<template>
  <div class="upload-overlay">
    <div class="upload-overlay__box">
      <h2>Load Product Data</h2>
      <p>Drop your CSV file here or click to browse.</p>
      <label>
        Choose CSV File
        <input type="file" accept=".csv" @change="$emit('file-selected', $event)" />
      </label>
    </div>
  </div>
</template>

<script setup>
defineEmits(['file-selected'])
</script>

<style lang="scss" scoped>
.upload-overlay {
  position: fixed;
  inset: 0;
  background: rgba($bg, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  text-align: center;

  &__box {
    max-width: 400px;

    h2 {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    p {
      font-size: 13px;
      color: $text-2;
      margin-bottom: 20px;
    }

    label {
      display: inline-block;
      padding: 11px 26px;
      background: $accent;
      color: #fff;
      border-radius: $radius;
      cursor: pointer;
      font-weight: 600;
      font-size: 13px;
    }

    input {
      display: none;
    }
  }
}
</style>
