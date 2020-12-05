<template>
  <ul
    class="user-nav__pop-over user-nav__pop-over--user pop-over pop-over--visible"
    @click.stop
  >
    <li class="pop-over__item pop-over__item--flex">
      <nuxt-link to="/profile" class="pop-over__name">{{ userName }}</nuxt-link>
      <button
        type="button"
        class="pop-over__link pop-over__link--no-hover pop-over__link--button"
        @click.prevent="$emit('click')"
      >
        <span class="visually-hidden">Close menu</span>
      </button>
    </li>
    <li class="pop-over__item">
      <nuxt-link to="/notifications" class="pop-over__link">
        Notifications
        <span
          v-if="notificationsAmount > 0"
          class="pop-over__notes-count pop-over__notes-count--purple"
          >{{ notificationsAmount }}</span
        >
      </nuxt-link>
    </li>
    <!-- NOTE: Temp removed -->
    <!-- <li class="pop-over__item">
      <nuxt-link to="/messages" class="pop-over__link">
        Messages
        <span class="pop-over__notes-count pop-over__notes-count--pink">7</span>
      </nuxt-link>
    </li> -->
    <!-- <li v-if="userType !== 'user'" class="pop-over__item">
      <a type="button" class="pop-over__link"> Statistics </a>
    </li>
    <li class="pop-over__item">
      <a type="button" class="pop-over__link" @click.prevent="mockPopup">
        Advertising Order
      </a>
    </li> -->
    <li class="pop-over__item">
      <a href="#" type="button" class="pop-over__link" @click.prevent="$logout">
        Log out
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    userType() {
      return this.$auth.user.user_type
    },
    userName() {
      return this.$auth.user.name
    },
    notificationsAmount() {
      return this.$store.getters['notifications/getAmount']
    },
  },
  methods: {
    mockPopup() {
      this.$nuxt.$emit('call-popup', {
        title: 'Advertising Order',
        icon: 'error',
        message: 'Advertising Order',
      })
    },
  },
}
</script>
