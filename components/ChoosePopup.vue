<template>
  <div class="user-form-wrapper user-form-wrapper--popup">
    <div class="overlay-popup"></div>
    <section class="user-form">
      <h2 class="user-form__header title">{{ question }}</h2>
      <div class="fieldset">
        <label
          v-for="(variant, index) in chooseList"
          :key="'var' + index"
          class="label-block"
        >
          <input v-model="choosenVar" type="radio" :value="variant" />
          {{ variant }}
        </label>
      </div>
      <div class="flex-container flex-container--between">
        <button
          type="submit"
          class="subscribe__submit-btn"
          :disabled="choosenVar === ''"
          @click.prevent="emitResult"
        >
          Ok
        </button>
        <button
          type="submit"
          class="subscribe__submit-btn"
          @click.prevent="$emit('close')"
        >
          Cancel
        </button>
      </div>
      <button
        class="user-form__close-btn"
        type="button"
        @click.prevent="$emit('close')"
      >
        <span class="visually-hidden">Close</span>
      </button>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: String,
      required: true,
      default: () => {
        return "It's time to choose"
      },
    },
    chooseList: {
      type: Array,
      required: true,
      default: () => {
        return []
      },
    },
    additionalData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data: () => {
    return {
      choosenVar: '',
    }
  },
  methods: {
    emitResult() {
      this.$emit('confirm-choose', {
        choosenVar: this.choosenVar,
        additionalData: this.additionalData,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  justify-content: space-around;
  &--between {
    justify-content: space-between;
  }
}
.label-block {
  display: block;
  font-family: Jost, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
}
.fieldset {
  margin-bottom: 1.5em;
}
.title {
  margin-bottom: 1em;
}
</style>
