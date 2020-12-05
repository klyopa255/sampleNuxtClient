<template>
  <div class="user-form__wrapper">
    <form
      class="user-form__form user-form__form--centered user-form__form--mar-bot"
      @submit.prevent="resetPassword"
    >
      <div class="user-form__logo-wrapper user-form__logo-wrapper--reset">
        <img
          src="~assets/img/sign_logo.svg"
          alt="Staj"
          width="61"
          height="38"
          class="user-form__logo"
        />
      </div>
      <p class="user-form__text">Create new pasword</p>
      <label class="user-form__label" for="password">Password</label>
      <input
        id="password"
        v-model="password"
        class="user-form__input"
        :class="isInputsEqual ? '' : 'user-form__input--invalid'"
        type="password"
        placeholder="Password"
        @input="validateInputs"
      />
      <label class="user-form__label" for="repeat-password"
        >Repeat password</label
      >
      <input
        id="repeat-password"
        v-model="repeatPassword"
        class="user-form__input"
        :class="isInputsEqual ? '' : 'user-form__input--invalid'"
        type="password"
        placeholder="Repeat password"
        @input="validateInputs"
      />
      <p v-if="isMessageShown" class="message">
        Sorry, the passwords you entered do not match
      </p>
      <button
        type="submit"
        class="user-form__submit-btn user-form__submit-btn--low user-form__submit-btn--reset"
      >
        Save new password
      </button>
    </form>
  </div>
</template>

<script>
export default {
  auth: false,
  data: () => ({
    password: '',
    repeatPassword: '',
    isInputsEqual: true,
    isMessageShown: false,
  }),
  computed: {
    token() {
      return this.$route.query.token
    },
    email() {
      return this.$route.query.mail
    },
  },
  methods: {
    async resetPassword() {
      if (this.isInputsEqual) {
        try {
          await this.$pubAPI
            .$post(this.$pubAPI.defaults.baseURL + '/password/reset', {
              token: this.token,
              email: this.email,
              password: this.password,
              password_confirmation: this.repeatPassword,
            })
            .then((response) => {
              this.$auth.setUserToken(response.token)
              this.$router.push('/')
            })
        } catch (e) {
          alert(e)
        }
      } else {
        this.isMessageShown = !this.isInputsEqual
      }
    },
    validateInputs() {
      this.isInputsEqual = this.password === this.repeatPassword
      this.isMessageShown = !this.isInputsEqual
    },
  },
}
</script>
