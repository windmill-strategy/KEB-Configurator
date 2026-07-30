<template>
  <div class="result-wrap">
    <div class="result-wrap__header">
      <h2 v-if="products.length > 0">
        {{ products.length === 1 ? 'Your Product' : 'Select Your Product' }}
      </h2>
      <p v-if="products.length > 1">{{ products.length }} products match your criteria</p>
    </div>

    <!-- No match -->
    <div v-if="products.length === 0" class="result-wrap__empty">
      <h3>No exact match found</h3>
      <p>
        Your combination of selections doesn't match any product.<br />
        Try going back and adjusting your choices.
      </p>
      <button class="btn btn-primary" @click="$emit('restart')">Start Over</button>
    </div>

    <!-- SKU cards -->
    <SkuCard
      v-for="(product, i) in products"
      :key="product.Part_Number"
      :product="product"
      :expanded="expandedIndex === i"
      @toggle="expandedIndex = expandedIndex === i ? -1 : i"
    />

    <!-- Actions -->
    <div v-if="products.length > 0" class="result-wrap__actions">
      <a
        class="btn btn-outline"
        :href="selectedPdfUrl"
        target="_blank"
        rel="noopener"
        :style="selectedPdfUrl ? '' : 'pointer-events:none;opacity:.35'"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download PDF
      </a>
      <button class="btn btn-outline" @click="$emit('restart')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
        Start Over
      </button>
    </div>

    <!-- Summary -->
    <SelectionSummary
      v-if="products.length > 0"
      :steps="doneSteps"
      :display-fn="dispSel"
    />

    <!-- Contact form -->
    <ContactForm
      v-if="products.length > 0"
      :step-file="selectedStepFile"
      :part-number="selectedProduct?.Part_Number || ''"
      :selections="selections"
    />

    <!-- Back nav -->
    <div class="result-wrap__nav">
      <button class="btn btn-ghost" @click="$emit('back')">← Back</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SkuCard from './SkuCard.vue'
import SelectionSummary from './SelectionSummary.vue'
import ContactForm from './ContactForm.vue'

const props = defineProps({
  products: { type: Array, required: true },
  doneSteps: { type: Array, required: true },
  dispSel: { type: Function, required: true },
  selections: { type: Object, default: () => ({}) },
})

defineEmits(['back', 'restart'])

const expandedIndex = ref(0)

const selectedProduct = computed(() =>
  props.products[expandedIndex.value >= 0 && expandedIndex.value < props.products.length
    ? expandedIndex.value
    : 0] || null,
)

const selectedPdfUrl = computed(() => selectedProduct.value?.Pdf_Dim_File || '')
const selectedStepFile = computed(() => selectedProduct.value?.Step_File_Download || '')
</script>

<style lang="scss" scoped>
.result-wrap {
  animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  &__header {
    margin-bottom: 24px;

    h2 {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.03em;
      margin-bottom: 2px;
    }

    p {
      font-size: 13px;
      color: $text-2;
    }
  }

  &__empty {
    text-align: center;
    padding: 40px 20px;

    h3 {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 6px;
    }

    p {
      color: $text-2;
      font-size: 13px;
      line-height: 1.6;
      margin-bottom: 16px;
    }
  }

  &__actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin: 20px 0;
  }

  &__nav {
    display: flex;
    margin-top: 20px;
  }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
