<template>
  <div>
    <h1 class="main__title main__title--black">Registration confirm</h1>
    <form class="user-form__form user-form__form--centered">
      <div>Please fill in the requared data to complete registation</div>
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
          name
        </label>
        <input
          id="name"
          v-model="name"
          type="text"
          class="user-form__input"
          placeholder="Name"
          required
        />
      </fieldset>
      <fieldset
        v-if="!userEmail"
        class="user-form__fieldset user-form__fieldset--flex"
      >
        <label class="user-form__label" for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="user-form__input user-form__input--block"
          placeholder="Email"
          required
        />
      </fieldset>
      <label class="user-form__label" for="zip">Zip</label>
      <input
        id="zip"
        v-model="zip"
        type="text"
        class="user-form__input user-form__input--bottom-margin"
        placeholder="Zip code"
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
          >I agree to the <a href="/terms" target="_blank">terms of use</a> and
          <a href="/policy" target="_blank">privacy policy</a></label
        >
      </p>
      <button
        class="user-form__submit-btn"
        form="sign-in-form"
        type="submit"
        :disabled="!hasAgreed"
        @click.prevent="register"
      >
        Confirm
      </button>
    </form>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  components: { Multiselect },
  auth: false,
  data: () => ({
    signUpPopup: false,
    hasAgreed: false,
    accountType: '',
    userType: '',
    userSubtype: '',
    email: '',
    zip: '',
    name: '',
  }),
  computed: {
    userTypes() {
      return this.$store.getters['userTypes/getTypes']
    },
    token() {
      return this.$route.query.token
    },
    provider() {
      return this.$route.query.provider
    },
    sid() {
      return this.$route.query.sid
    },
    userName() {
      return this.$route.query.name
    },
    message() {
      return this.$route.query.message
    },
    userEmail() {
      return this.$route.query.email
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
    if (this.message) {
      this.$router.push('/?' + this.message)
    } else {
      this.name = this.userName
    }
    if (this.userTypes.length) {
      this.accountType = this.userTypes[0]
    }
  },
  methods: {
    async register() {
      const data = {
        token: this.token,
        account_type: this.accountType.name,
        user_type: this.userType ? this.userType.name : '',
        name: this.name,
        zip_code: this.zip,
        id: this.sid,
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
      if (this.email) {
        data.email = this.email
      }
      try {
        const resp = await this.$pubAPI.$put('/register/' + this.provider, data)
        this.$auth.setUserToken(resp.accessToken)
        this.$auth.setUser(resp.data)
        this.$router.push('/')
      } catch (e) {
        alert(e.response.data.message)
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
      this[e.target.dataset.next] = this[e.target.dataset.prev].type[0]
    },
  },
  middleware({ query, redirect, error }) {
    if (query.message) {
      redirect('/?target=loginPopup&message=' + query.message)
    } else if (query.error) {
      redirect('/?target=errorPopup&message=' + query.error)
    } else if (!query.message && !query.error && !query.token) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
