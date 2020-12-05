<template>
  <div v-if="popupHide" class="user-form-wrapper user-form-wrapper--popup">
    <div class="overlay-popup" @mousedown.prevent="closePopup"></div>
    <section class="user-form">
      <h2 class="user-form__header">{{ title }}</h2>
      <svg-icon
        :name="icon"
        alt="Staj"
        width="88"
        height="88"
        class="user-form__icon"
      />
      <!-- eslint-disable-next-line -->
      <p class="user-form__text user-form__text--low-mb" v-html="message"></p>
      <div v-if="type === 'alert'" class="flex-container">
        <button
          type="submit"
          class="subscribe__submit-btn"
          @click.prevent="closePopup"
        >
          Ok
        </button>
      </div>
      <div v-if="type === 'dialog'" class="flex-container">
        <button
          type="submit"
          class="subscribe__submit-btn"
          @click.prevent="emitResult(true)"
        >
          Ok
        </button>
        <button
          type="submit"
          class="subscribe__submit-btn"
          @click.prevent="emitResult(false)"
        >
          Cancel
        </button>
      </div>
      <button
        class="user-form__close-btn"
        type="button"
        @click.prevent="closePopup"
      >
        <span class="visually-hidden">Close</span>
      </button>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    popupHide: false,
    // Neme of event to listen
    eventName: '',
    // Popup type (alert/dialog)
    type: '',
    // Popup title text
    title: '',
    // Name of icon (name of svg file in '~assets/svg' folder)
    icon: '',
    // Text of popup message
    message: '',
  }),
  created() {
    this.$nuxt.$on('call-popup', (popupData) => {
      this.popupHide = true
      this.type = popupData.type ? popupData.type : 'alert'
      this.eventName = popupData.eventName ? popupData.eventName : ''
      this.title = popupData.title
      this.icon = popupData.icon
      this.message = popupData.message
    })
  },
  methods: {
    closePopup() {
      this.popupHide = false
    },
    emitResult(result) {
      if (result) {
        this.$nuxt.$emit(this.eventName)
      }
      this.closePopup()
    },
  },
}
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  justify-content: space-around;
}
</style>
