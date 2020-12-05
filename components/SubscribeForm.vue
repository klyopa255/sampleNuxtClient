<template>
  <div>
    <form
      class="subscribe__form"
      :class="getClasses"
      @submit.prevent="sendForm"
    >
      <input
        v-model="email"
        class="subscribe__input"
        type="email"
        name="main-subscribe-input"
        placeholder="Email"
      />
      <button class="subscribe__submit-btn" type="submit">Subscribe</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    classes: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    email: '',
    // eslint-disable-next-line
    reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
  }),
  computed: {
    getClasses() {
      return this.classes === 'footer' ? ' subscribe__form--footer' : ''
    },
  },
  methods: {
    async sendForm() {
      let flag = true
      const popupData = {
        title: '',
        icon: '',
        message: '',
      }
      if (this.email === null || this.email === '') {
        popupData.message = 'Please Enter Email'
        flag = false
      } else if (!this.reg.test(this.email)) {
        popupData.message = 'Please Enter Correct Email'
        flag = false
      }
      if (flag) {
        try {
          const response = await this.$pubAPI.$post('/subscribe', {
            user_email: this.email,
          })
          if (response.status === 'success') {
            this.email = ''
            popupData.title = ''
            popupData.icon = 'envelop'
            popupData.message =
              'Thank you for your subscription!<br> We’ll be in touch'
          } else {
            this.successHide = false
          }
        } catch (err) {
          popupData.title = 'Error'
          popupData.icon = 'error'
          popupData.message = err
        }
      } else {
        popupData.title = 'Error'
        popupData.icon = 'error'
      }
      this.$nuxt.$emit('call-popup', popupData)
    },
  },
}
</script>
