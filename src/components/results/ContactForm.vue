<template>
  <div class="contact-form">
    <h3>Download the 3D STEP File</h3>
    <p class="contact-form__sub">
      Fill out the form below to receive the 3D STEP file for your selected product.
    </p>

    <div class="contact-form__grid">
      <div class="contact-form__field">
        <label>Name</label>
        <input v-model="form.name" placeholder="Your full name" />
      </div>
      <div class="contact-form__field">
        <label>Company</label>
        <input v-model="form.company" placeholder="Company name" />
      </div>
      <div class="contact-form__field">
        <label>Email</label>
        <input v-model="form.email" type="email" placeholder="you@company.com" />
      </div>
      <div class="contact-form__field">
        <label>Phone</label>
        <input v-model="form.phone" type="tel" placeholder="+1 (555) 123-4567" />
      </div>
      <input type="hidden" :value="stepFile" name="step_file_download" />
    </div>

    <div class="contact-form__submit">
      <span v-if="sent" class="contact-form__msg">✓ Submitted — we'll be in touch!</span>
      <button class="btn btn-primary" :disabled="!canSubmit" @click="submit">Submit</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

const props = defineProps({
  stepFile: { type: String, default: '' },
  partNumber: { type: String, default: '' },
  selections: { type: Object, default: () => ({}) },
})

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
})

const sent = ref(false)
const canSubmit = computed(() => form.name && form.email)

function submit() {
  // In production, POST to your API endpoint
  console.log('Contact submission:', JSON.stringify({
    ...form,
    selectedProduct: props.partNumber,
    stepFile: props.stepFile,
    selections: props.selections,
  }))
  sent.value = true
}
</script>

<style lang="scss" scoped>
.contact-form {
  @include card;
  padding: 24px;
  margin-top: 20px;

  h3 {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  &__sub {
    font-size: 12px;
    color: $text-3;
    margin-bottom: 16px;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;

    @media (max-width: $bp-mobile) {
      grid-template-columns: 1fr;
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 4px;

    label {
      font-size: 11px;
      font-weight: 600;
      color: $text-3;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    input {
      background: $surface-2;
      border: 1.5px solid $border;
      border-radius: $radius;
      padding: 9px 12px;
      font-family: $font-sans;
      font-size: 13px;
      color: $text-1;
      outline: none;
      transition: border $transition;

      &:focus {
        border-color: $accent;
      }

      &::placeholder {
        color: $text-3;
      }
    }
  }

  &__submit {
    margin-top: 14px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
  }

  &__msg {
    font-size: 12px;
    color: $green;
  }
}
</style>
