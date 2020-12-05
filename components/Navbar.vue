<template>
  <nav
    :class="selectedNav === 0 ? 'navigation' : 'navigation navigation--offset'"
  >
    <ul :class="'header__nav user-nav ' + navbarClasses">
      <li v-if="isAuth" class="user-nav__item">
        <nuxt-link
          exact
          no-prefetch
          class="user-nav__link"
          active-class="user-nav__link--bold"
          to="/feed"
        >
          Feed
        </nuxt-link>
      </li>
      <li class="user-nav__item">
        <nuxt-link
          exact
          no-prefetch
          class="user-nav__link"
          active-class="user-nav__link--bold"
          to="/user-search"
        >
          Users
        </nuxt-link>
      </li>
      <li class="user-nav__item" style="display: none">
        <nuxt-link
          class="user-nav__link"
          active-class="user-nav__link--bold"
          to="/venues"
        >
          Venues
        </nuxt-link>
      </li>
      <li class="user-nav__item">
        <nuxt-link
          class="user-nav__link"
          active-class="user-nav__link--bold"
          to="/events"
        >
          Events
        </nuxt-link>
      </li>
      <li class="user-nav__item" style="margin-right: 0">
        <SecondaryNavbar />
      </li>
      <li v-if="!isAuth" class="user-nav__item">
        <a
          href="#"
          class="user-nav__link"
          @click.prevent="togglePopup('sign-up')"
          >Sign&nbsp;Up</a
        >
        <SignUp v-if="isSIgnupOpend" @click="togglePopup" />
      </li>
      <li v-if="!isAuth" class="user-nav__item user-nav__item--marked">
        <a
          href="#"
          class="user-nav__link user-nav__link--sign-in"
          @click.prevent="togglePopup('sign-in')"
          >Sign In</a
        >
        <Login
          v-if="isSIgninOpend"
          :notice="noticeForLogIn"
          @click="togglePopup"
          @click-forgot="togglePopupFrogot"
        />
      </li>
      <li v-if="!isAuth" class="">
        <a
          href="#"
          class="visually-hidden"
          @click.prevent="togglePopup('forgot')"
          >isForgotOpend</a
        >
        <ForgotPassword
          v-if="isForgotOpend"
          :initial-email="enteredEmail"
          @click="togglePopup"
          @click-forgot="togglePopupFrogot"
        />
      </li>
    </ul>
    <ul
      v-if="isAuth"
      :class="'user-nav__login-block user-nav ' + navbarClasses"
    >
      <li v-if="isAuth" class="user-nav__item user-nav__item--location">
        <button
          type="button"
          href="#"
          class="user-nav__link user-nav__link--button user-nav__link--arrow"
          @click.stop="toggleLocationPopover"
        >
          <svg-icon
            name="icn_location-marker"
            width="32"
            height="32"
            :class="'user-nav__icn ' + navbarIconClasses"
          />
          Chicago, IL
        </button>
        <LocationPopover
          v-if="isLocationPopoverOpened"
          @click="toggleLocationPopover"
        />
      </li>
      <li class="user-nav__item">
        <nuxt-link
          to="/messages"
          :event="isClickable"
          class="user-nav__link user-nav__link--button"
        >
          <span class="visible-mobile-menu">Messages</span>
          <svg-icon
            name="icn_message"
            :class="'user-nav__icn ' + navbarIconClasses"
          />
          <span class="user-nav__note-count user-nav__note-count--pink">7</span>
        </nuxt-link>
      </li>
      <li class="user-nav__item">
        <nuxt-link
          to="/notifications"
          :event="isClickable"
          class="user-nav__link user-nav__link--button"
        >
          <span class="visible-mobile-menu">Notifications</span>
          <svg-icon
            name="icn_notification"
            :class="'user-nav__icn ' + navbarIconClasses"
          />
          <span
            v-if="notificationsAmount > 0"
            class="user-nav__note-count user-nav__note-count--purple"
            >{{ notificationsAmount }}</span
          >
        </nuxt-link>
      </li>
      <li
        class="user-nav__item user-nav__item--flex"
        style="position: relative"
      >
        <nuxt-link
          to="/profile"
          :event="isClickable"
          class="user-nav__link user-nav__link--button"
        >
          <span class="visible-mobile-menu">Profile</span>
          <div class="user-nav__user-avatar-wrapper">
            <img
              class="hidden-mobile-menu"
              width="33"
              height="30"
              :src="
                this.$auth.user.photo
                  ? userAvatar
                  : require('@/assets/img/defaultAva.png')
              "
              alt="Your avatar"
            />
          </div>
        </nuxt-link>
        <button
          type="button"
          class="user-nav__link user-nav__link--button user-nav__link--user hidden hidden-mobile-menu"
          @click.stop="toggleUserPopover"
        >
          <span class="visually-hidden">Open menu</span>
        </button>
        <UserPopover v-if="isUserPopoverOpened" @click="toggleUserPopover" />
      </li>
      <li v-if="!isAuth" class="user-nav__item">
        <a href="#" class="user-nav__link">Advertising order</a>
      </li>
      <li v-if="isAuth" class="user-nav__item visible-mobile-menu">
        <a href="#" class="user-nav__link" @click.prevent="$logout">Log out</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    selectedNav: {
      type: Number,
      default() {
        return 0
      },
    },
  },
  data: () => ({
    isSIgnupOpend: false,
    isSIgninOpend: false,
    isForgotOpend: false,
    isUserPopoverOpened: false,
    isLocationPopoverOpened: false,
    enteredEmail: '',
    noticeForLogIn: '',
  }),
  computed: {
    isAuth() {
      return this.$auth.loggedIn
    },
    isPopupOpened() {
      return this.isSIgninOpend || this.isSIgnupOpend || this.isForgotOpend
    },
    navbarClasses() {
      return this.$store.getters['classes/getNavbarClasses']
    },
    navbarIconClasses() {
      return this.$store.getters['classes/getNavbarIconClasses']
    },
    userAvatar() {
      return this.$nuxt.context.env.storageBaseUrl + '/' + this.$auth.user.photo
    },
    notificationsAmount() {
      return this.$store.getters['notifications/getAmount']
    },
    isClickable() {
      return this.isUserPopoverOpened ? '' : 'click'
    },
  },
  mounted() {
    if (this.$route.query.target === 'loginPopup') {
      this.togglePopup('sign-in')
    } else if (this.$route.query.target === 'registerPopup') {
      this.togglePopup('sign-up')
    }
    this.$nuxt.$on('click-outside-popover', this.closeLocationPopover)
    this.$nuxt.$on('click-outside-popover', this.closeUserPopover)
    this.$nuxt.$on('please-login', (payload) => {
      this.togglePopup('sign-in')
      this.noticeForLogIn = payload.message
    })
    if (this.isAuth) {
      this.$setStoreDispatchTimeout(
        'notifications/fetchNotificationsAmount',
        5000
      )
    }
  },
  methods: {
    closeLocationPopover() {
      if (this.isLocationPopoverOpened) {
        this.isLocationPopoverOpened = false
      }
    },
    closeUserPopover() {
      if (this.isUserPopoverOpened) {
        this.isUserPopoverOpened = false
      }
    },
    toggleLocationPopover() {
      this.isLocationPopoverOpened = !this.isLocationPopoverOpened
    },
    toggleUserPopover() {
      this.isUserPopoverOpened = !this.isUserPopoverOpened
    },
    togglePopup(popupName) {
      if (popupName === 'sign-up') {
        this.isSIgnupOpend = !this.isSIgnupOpend
      } else if (popupName === 'sign-in') {
        this.isSIgninOpend = !this.isSIgninOpend
      } else if (popupName === 'forgot') {
        this.isForgotOpend = !this.isForgotOpend
      } else if (popupName === 'both') {
        this.isSIgnupOpend = !this.isSIgnupOpend
        this.isSIgninOpend = !this.isSIgninOpend
      }
      if (this.isPopupOpened) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
      this.noticeForLogIn = ''
    },
    togglePopupFrogot(email) {
      this.isForgotOpend = !this.isForgotOpend
      this.isSIgninOpend = !this.isSIgninOpend
      this.enteredEmail = email
      if (this.isPopupOpened) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.user-nav {
  @include list-reset();

  display: flex;
  justify-content: flex-end;
  color: #fff;

  &__login-block {
    display: flex;
    @include list-reset();
  }

  &__note-count {
    position: absolute;
    font-weight: bold;
    font-size: 15px;
    line-height: 19px;
    text-align: center;
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    top: 6px;
    right: -7px;

    &--pink {
      background: #ff496d;
    }

    &--purple {
      background: #925ffe;
    }
  }

  &__link {
    font-family: Jost, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 29px;
    color: #fff;
    display: block;
    margin-top: 10px;

    &--arrow {
      position: relative;

      &::before {
        position: absolute;
        content: '';
        width: 12px;
        height: 12px;
        border: 2px solid transparent;
        background-color: transparent;
        border-left-color: white;
        border-bottom-color: white;
        top: 12px;
        right: -20px;
        z-index: 5;
        transform: rotateZ(-45deg);
      }
    }

    &--bold {
      font-weight: 600;
    }

    &--sign-in {
      margin-top: 0;
      padding-top: 10px;
      padding-bottom: 9px;
      font-weight: 600;
      display: block;
      width: 141px;
      text-align: center;
      background: #d6a94f;
      border-radius: 4px;
      color: #000;
    }

    &--button {
      margin: 0;
      padding: 0;
      padding-top: 9px;
      border: none;
      background-color: transparent;
      border-radius: 50%;
      display: inline-flex;
      position: relative;
      white-space: nowrap;

      &:focus {
        outline: none;
      }

      img {
        width: 36px;
        height: 36px;
        overflow: hidden;
        transform: translateY(-4px);
      }
    }

    &--user {
      padding-right: 10px;
      margin-left: 20px;

      &::after {
        position: absolute;
        content: '';
        width: 12px;
        height: 12px;
        border: 2px solid white;
        background-color: transparent;
        border-right-color: transparent;
        border-top-color: transparent;
        top: 14px;
        right: 50%;
        z-index: 5;
        transform: translateX(50%) rotateZ(-45deg);
      }
    }
  }

  &--transparent {
    color: #000;

    .user-nav__link {
      color: #000;
      &--user::after {
        border-color: black;
        border-right-color: transparent;
        border-top-color: transparent;
      }

      &--arrow {
        &::before {
          border: 2px solid transparent;
          background-color: transparent;
          border-left-color: black;
          border-bottom-color: black;
        }
      }
    }

    .user-nav__note-count {
      color: #fff;
    }
  }

  &__item {
    display: block;
    margin-right: 25px;

    &--for-mobile {
      @media (min-width: 960px) {
        display: none;
      }
    }

    &:last-child {
      margin-right: 0;
    }

    &--flex {
      display: flex;
      flex-wrap: nowrap;
    }

    &--user {
      position: relative;
    }

    &--active {
      position: relative;

      &::before {
        position: absolute;
        content: '';
        width: 40px;
        height: 40px;
        top: 5px;
        right: -6px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.1);
      }
    }

    &--hidden {
      display: none;
    }

    &--popover {
      position: relative;
      display: flex;

      &--left {
        min-width: 176px;
        min-height: 47px;
      }
    }

    &--location {
      position: relative;
      width: 150px;
      padding-right: 10px;
      margin-right: 10px;

      &:focus {
        outline: none;
      }
    }
  }

  &__user-avatar-wrapper {
    overflow: hidden;
    position: relative;
    width: 36px;
    height: 36px;
    border-radius: 50%;

    & img {
      width: 100%;
      height: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__pop-over {
    position: absolute;
    right: 0;
    top: 100%;

    &--user {
      top: 0;
      right: -18px;
    }
  }

  &__icn {
    width: 30px;
    height: 30px;
    fill: #fff;
    stroke: #fff;

    &--black {
      fill: #000;
      stroke: #000;
    }
  }
}
@media screen and (max-width: 1080px) and (min-width: #{$mobile-menu + 1}) {
  .user-nav__login-block {
    flex-wrap: wrap;
    // width: 202px;
    width: 130px; // TEMP: until menu items are hidden
    justify-content: flex-end;
  }

  .user-nav__item--location {
    order: 1;
  }

  .user-nav__item--flex {
    margin-right: 16px;
  }
}

//mobile menu
@media screen and (max-width: $mobile-menu) {
  .user-nav {
    flex-direction: column;
  }

  .user-nav__icn--black {
    fill: #fff;
    stroke: #fff;
  }

  .user-nav__link--sign-in {
    margin-top: 50px;
    width: auto;
  }

  .secondary-nav__link,
  .user-nav__link:not(.user-nav__link--sign-in) {
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 0;
  }

  .secondary-nav__item,
  .user-nav__item {
    margin-right: 0;
    color: #fff;
  }

  .user-nav__login-block {
    flex-direction: column;
    position: absolute;
    left: 100vw;
    width: 100%;
  }

  .user-nav--transparent .user-nav__link {
    color: #fff;
  }

  .user-nav__link--button {
    width: 100%;
    justify-content: space-between;
  }

  .user-nav__item--location {
    width: 100%;
    .user-nav__link--button {
      justify-content: flex-start;

      &::before {
        right: 0;
      }
    }
  }
}
</style>
