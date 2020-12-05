<template>
  <div
    class="user-form-wrapper user-form-wrapper--fullscreen"
    data-name="sign-in"
    @mousedown="$emit('click', $event.target.dataset.name)"
  >
    <section class="user-form">
      <div class="user-form__logo-wrapper">
        <img
          src="~assets/img/sign_logo.svg"
          alt="Staj"
          width="61"
          height="38"
          class="user-form__logo"
        />
      </div>
      <h2 class="user-form__header">Sign in</h2>
      <form
        id="sign-in-form"
        class="user-form__form"
        @submit.prevent="userLogin"
      >
        <label class="user-form__label" for="email">E-mail</label>
        <input
          id="email"
          v-model="email"
          type="text"
          :class="'user-form__input ' + inputClass"
          placeholder="E-mail"
          required
        />
        <label class="user-form__label" for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          :class="'user-form__input ' + inputClass"
          name="password"
          placeholder="Password"
          required
        />
      </form>
      <FormNotice v-if="notice" :message="notice" />
      <a
        class="user-form__link"
        href="#"
        data-name="forgot-from"
        @click.prevent="$emit('click-forgot', email)"
      >
        Forgot Password?</a
      >
      <button class="user-form__submit-btn" form="sign-in-form" type="submit">
        Sign in
      </button>
      <div class="user-form__alt-auth alt-auth">
        <button
          class="alt-auth__btn alt-auth__btn--facebook"
          type="button"
          @click.prevent="authWithFb"
        >
          <svg-icon
            name="icn_via-facebook"
            class="alt-auth__icon"
            width="32"
            height="32"
          />
          Via Facebook
        </button>
        <button
          class="alt-auth__btn alt-auth__btn--google"
          type="button"
          @click.prevent="authWithGoogle"
        >
          <svg-icon
            name="icn_via-google"
            class="alt-auth__icon"
            width="32"
            height="32"
          />
          Via Google
        </button>
      </div>
      <p class="user-form__via-email">
        Or
        <a
          href="#"
          class="user-form__link"
          data-name="both"
          @click.prevent="$emit('click', $event.target.dataset.name)"
          >Sign Up via Email</a
        >
      </p>
      <button
        class="user-form__close-btn"
        type="button"
        data-name="sign-in"
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
    notice: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    email: '',
    password: '',
    loginPopup: false,
    isForgotPassword: false,
  }),
  computed: {
    inputClass() {
      return this.notice !== '' ? 'user-form__input--invalid' : ''
    },
  },
  mounted() {
    if (this.$route.query.target === 'loginPopup') {
      this.notice = this.$route.query.message
    }
  },
  methods: {
    loginPopupToggle() {
      this.loginPopup = !this.loginPopup
    },
    async userLogin() {
      await this.$login(this.email, this.password).then(
        () => {
          document.body.classList.remove('overflow-hidden')
        },
        (err) => {
          const email = this.isset(err.response.data.errors, 'email')
          const password = this.isset(err.response.data.errors, 'password')
          this.notice = email || password
        }
      )
    },
    authWithGoogle() {
      location.href = this.$pubAPI.defaults.baseURL + '/auth/google'
    },
    authWithFb() {
      location.href = this.$pubAPI.defaults.baseURL + '/auth/facebook'
    },
    isset(error, name) {
      return error !== undefined && error[name] !== undefined
        ? error[name][0]
        : ''
    },
  },
}
</script>
