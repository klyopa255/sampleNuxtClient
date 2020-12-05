<template>
  <div
    class="main__about-info about-info about-info--high-top about-info--contact"
  >
    <h1 class="about-info__title about-info__title--contact-us">Contact us</h1>
    <p class="about-info__text about-info__text--form" style="max-width: 480px">
      Please send all inquiries and questions to
      <a href="mailto:info@staj.co"> info@staj.co</a>, or complete the form
      below.
    </p>
    <section class="user-form user-form--contact-us">
      <form
        id="sign-in-form"
        class="user-form__form"
        @submit.prevent="sendForm"
      >
        <fieldset class="user-form__fieldset">
          <div class="user-form__fieldset-wrapper">
            <label class="user-form__label user-form__label--inner" for="name"
              >Name
              <input
                id="name"
                v-model="name"
                type="text"
                class="user-form__input"
                name="name"
                placeholder="Name"
                required
              />
            </label>
            <label class="user-form__label user-form__label--inner" for="email"
              >Email
              <input
                id="email"
                v-model="email"
                type="email"
                class="user-form__input"
                name="email"
                placeholder="Email"
                required
              />
            </label>
          </div>
        </fieldset>
        <label class="user-form__label" for="message">Message</label>
        <textarea
          id="message"
          v-model="message"
          type="text"
          class="user-form__input user-form__input--textarea"
          name="message"
          rows="8"
          placeholder="Message"
        ></textarea>
      </form>

      <button
        class="user-form__submit-btn user-form__submit-btn--contact-us"
        form="sign-in-form"
        type="submit"
      >
        Send
      </button>
    </section>
  </div>
</template>

<script>
export default {
  auth: false,
  data: () => ({
    name: '',
    email: '',
    message: '',
  }),
  methods: {
    async sendForm() {
      const popupData = {
        title: '',
        icon: '',
        message: '',
      }
      try {
        await this.$pubAPI.$post('/contacts', {
          name: this.name,
          email: this.email,
          message: this.message,
        })
        popupData.title = ''
        popupData.icon = 'envelop'
        popupData.message = 'Message sent!'
        this.name = ''
        this.email = ''
        this.message = ''
      } catch (err) {
        popupData.title = 'Error'
        popupData.icon = 'error'
        popupData.message = err.response.data.message
      }
      this.$nuxt.$emit('call-popup', popupData)
    },
  },
  head() {
    return {
      title: 'Staj | Contact Us',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Let's get in touch`,
        },
      ],
    }
  },
}
</script>
