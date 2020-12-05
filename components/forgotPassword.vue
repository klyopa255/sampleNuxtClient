<template>
  <div
    class="user-form-wrapper user-form-wrapper--fullscreen"
    data-name="forgot"
    @mousedown="$emit('click', $event.target.dataset.name)"
  >
    <section v-if="successHide" class="user-form">
      <div class="user-form__logo-wrapper">
        <img
          src="~assets/img/sign_logo.svg"
          alt="Staj"
          width="61"
          height="38"
          class="user-form__logo user-form__logo-wrapper--reset"
        />
      </div>
      <p class="user-form__text">
        To restore access to your account, we will send you a letter via the
        mail
      </p>
      <form id="sign-in-form" class="user-form__form">
        <label class="user-form__label" for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="user-form__input"
          placeholder="email"
          required
        />
      </form>
      <button
        v-if="successHide"
        class="user-form__submit-btn user-form__submit-btn--reset"
        form="sign-in-form"
        type="button"
        @click.prevent="resetPassword"
      >
        Reset the Password
      </button>

      <button
        class="user-form__close-btn user-form__close-btn--back"
        type="button"
        data-name="forgot-from"
        @click.prevent="$emit('click-forgot', $event.target.dataset.name)"
      >
        Back
      </button>
      <FormNotice v-if="error" :message="error" />
      <button
        class="user-form__close-btn"
        type="button"
        data-name="forgot"
        @click.prevent="$emit('click', $event.target.dataset.name)"
      >
        <span class="visually-hidden">Close</span>
      </button>
    </section>
    <section v-if="!successHide" class="user-form user-form--email-bg">
      <div class="user-form__logo-wrapper">
        <img
          src="~assets/img/sign_logo.svg"
          alt="Staj"
          width="61"
          height="38"
          class="user-form__logo"
        />
      </div>
      <h2 class="user-form__header">Check your Email</h2>

      <p class="user-form__text user-form__text--low-mb">
        We sent you an email with instructions <br />
        to reset your password
      </p>

      <button
        class="user-form__close-btn"
        type="button"
        data-name="forgot"
        @click.prevent="$emit('click', $event.target.dataset.name)"
      >
        <span class="visually-hidden">Close</span>
      </button>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    initialEmail: {
      type: [String],
      default() {
        return ''
      },
    },
  },
  data: () => ({
    email: '',
    successHide: true,
    message: '',
    error: false,
    isForgotOpend: false,
    isForgotPassword: false,
  }),
  computed: {
    inputClass() {
      return this.notice !== '' ? 'user-form__input--invalid' : ''
    },
    responseMessage() {
      return this.message
    },
  },
  mounted() {
    if (this.$route.query.target === 'isForgotOpend') {
      this.notice = this.$route.query.message
    }
    this.email = this.initialEmail
  },
  methods: {
    async resetPassword() {
      try {
        const resp = await this.$privAPI.$post(
          this.$privAPI.defaults.baseURL + '/password/forgot',
          {
            email: this.email,
          }
        )
        if (resp.status === 'error') {
          this.error = resp.data
        } else {
          this.successHide = false
        }
      } catch (err) {
        this.error = 'Something went wrong. Try again later.'
      }
    },
    isset(error, name) {
      return error !== undefined && error[name] !== undefined
        ? error[name][0]
        : ''
    },
  },
}
</script>
