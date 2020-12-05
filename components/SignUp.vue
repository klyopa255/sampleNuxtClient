<template>
  <div
    class="user-form-wrapper user-form-wrapper--fullscreen"
    data-name="sign-up"
    @mousedown="$emit('click', $event.target.dataset.name)"
  >
    <section class="user-form user-form--registration">
      <div class="user-form__logo-wrapper">
        <img
          src="~/assets/img/sign_logo.svg"
          alt="Staj"
          width="61"
          height="38"
          class="user-form__logo"
        />
      </div>
      <h2 class="user-form__header">Create Your Account</h2>
      <form class="user-form__form">
        <label class="user-form__label" for="account-type">Account type</label>
        <select
          id="account-type"
          v-model="accountType"
          class="user-form__input user-form__input--select"
          :data-prev="'accountType'"
          :data-next="'userType'"
          @change="initSub"
        >
          <option v-for="(type, key) in userTypes" :key="key" :value="type">
            {{ type.name }}
          </option>
        </select>
        <fieldset
          v-if="isTypeHasSubtypes(userTypes, accountType)"
          class="user-form__fieldset"
        >
          <label class="user-form__label" for="user-type"
            ><span class="user-form__capitalize">{{ accountType.name }} </span
            >type</label
          >
          <select
            id="user-type"
            v-model="userType"
            class="user-form__input user-form__input--select user-form__input--block"
            :data-prev="'userType'"
            :data-next="'userSubtype'"
            @change="initSub"
          >
            <option
              v-for="(subType, key) in accountType.type"
              :key="key"
              :value="subType"
            >
              {{ subType.name }}
            </option>
          </select>
        </fieldset>
        <fieldset
          v-if="isTypeHasSubtypes(accountType.type, userType)"
          class="user-form__fieldset"
        >
          <label class="user-form__label" for="user-type"
            ><span class="user-form__capitalize">{{ userType.name }} </span
            >type</label
          >
          <multiselect
            v-model="userSubtype"
            :options="userType.type"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            label="name"
            track-by="name"
            :searchable="false"
            :max="userType.length !== -1 ? userType.length : false"
          ></multiselect>
        </fieldset>
        <fieldset class="user-form__fieldset">
          <label class="user-form__label" for="name">
            <span class="user-form__capitalize">{{ accountType.name }} </span>
            Name
          </label>
          <input
            id="name"
            v-model="name"
            type="text"
            :class="'user-form__input' + invalidClass('name')"
            placeholder="Name"
            required
          />
        </fieldset>
        <label :class="'user-form__label user-form__label--inner'" for="email"
          >Email</label
        >
        <input
          id="email"
          v-model="email"
          type="email"
          :class="'user-form__input' + invalidClass('email')"
          placeholder="Email"
          required
        />
        <label :class="'user-form__label user-form__label--inner'" for="zip"
          >Zip</label
        >
        <input
          id="zip"
          v-model="zip"
          maxlength="5"
          type="text"
          :class="'user-form__input' + invalidClass('zip')"
          placeholder="Zip code"
          required
          @input="validateZip"
        />
        <label
          :class="'user-form__label user-form__label--inner'"
          for="password"
          >Password</label
        >
        <input
          id="password"
          v-model="password"
          type="password"
          :class="'user-form__input' + invalidClass('password')"
          placeholder="Password"
          required
        />
        <p class="user-form__checkbox-wrapper">
          <input
            id="agreeForm"
            v-model="hasAgreed"
            class="fake-checkbox__input"
            type="checkbox"
          />
          <label class="fake-checkbox__wrapper" for="agreeForm"
            >I agree to the
            <a href="/terms" target="_blank">terms of use</a> and
            <a href="/policy" target="_blank">privacy policy</a></label
          >
        </p>
      </form>
      <FormNotice v-if="notice" :message="notice" />
      <FormNotice
        v-if="responseErrors.message"
        :message="responseErrors.message"
      />
      <button
        class="user-form__submit-btn"
        form="sign-in-form"
        type="submit"
        :disabled="!hasAgreed"
        @click.prevent="register"
      >
        Sign up
      </button>
      <div class="user-form__alt-auth alt-auth">
        <button
          class="alt-auth__btn alt-auth__btn--facebook"
          type="button"
          @click.prevent="registerWithFb"
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
          @click.prevent="registerWithGoogle"
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
          >Sign In</a
        >
      </p>
      <button
        class="user-form__close-btn"
        type="button"
        data-name="sign-up"
        @click.prevent="$emit('click', $event.target.dataset.name)"
      >
        <span class="visually-hidden">Close</span>
      </button>
    </section>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  components: { Multiselect },
  data: () => ({
    validationErrors: [],
    hasAgreed: false,
    signUpPopup: false,
    accountType: '',
    userType: '',
    userSubtype: '',
    zip: '',
    name: '',
    email: '',
    password: '',
    notice: '',
  }),
  computed: {
    responseErrors() {
      return this.$store.getters['register/getMessage'] || { fields: [] }
    },
    userTypes() {
      return this.$store.getters['userTypes/getTypes']
    },
  },
  beforeMount() {
    if (!this.$store.getters['userTypes/getTypes'].length) {
      this.$store.dispatch('userTypes/getUserTypes').then(() => {
        this.accountType = this.userTypes[0]
      })
    }
  },
  mounted() {
    if (this.$route.query.target === 'registerPopup') {
      this.notice = this.$route.query.message
    }
    if (this.userTypes.length) {
      this.accountType = this.userTypes[0]
    }
  },
  methods: {
    register() {
      const data = {
        account_type: this.accountType.name,
        user_type: this.userType ? this.userType.name : '',
        user_sub_type:
          this.userType && this.userSubtype ? this.userSubtype.name : '',
        name: this.name,
        zip_code: this.zip,
        email: this.email,
        phone_number: this.phone,
        password: this.password,
      }

      const subTypeArr = []
      if (this.userSubtype !== '') {
        if (Array.isArray(this.userSubtype)) {
          this.userSubtype.forEach((el) => {
            subTypeArr.push(el.name)
          })
        } else {
          subTypeArr.push(this.userSubtype.name)
        }
      }
      data.user_sub_type = subTypeArr

      this.$store.dispatch('register/register', data)

      if (this.responseErrors.fields === []) {
        this.name = this.email = this.zip = this.password = ''
      }
    },
    registerWithGoogle() {
      location.href = this.$pubAPI.defaults.baseURL + '/register/google'
    },
    registerWithFb() {
      location.href = this.$pubAPI.defaults.baseURL + '/register/facebook'
    },
    validateZip(e) {
      const input = e.target.value
      this.zip = input.replace(/\D+/gi, '')
    },
    invalidClass(name) {
      const fieldMap = {
        name: 'name',
        zip: 'zip_code',
        email: 'email',
        password: 'password',
      }
      if (this.responseErrors.fields.includes(fieldMap[name])) {
        return ' user-form__input--invalid'
      } else {
        return ''
      }
    },
    isTypeHasSubtypes(typesArr, currentTypeObj) {
      if (typesArr && currentTypeObj) {
        const typeObj = typesArr.find(
          (type) => type.name === currentTypeObj.name
        )
        return typeObj ? typeObj.type.length : false
      } else {
        return false
      }
    },
    initSub(e) {
      const subType = this[e.target.dataset.prev].type[0]
      this[e.target.dataset.next] = subType || ''
    },
  },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
