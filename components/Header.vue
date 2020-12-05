<template>
  <header :class="'header ' + headerClasses">
    <div class="header__wrapper">
      <a href="#" class="header__burg" @click.prevent="toggleMobileMenu">
        <div class="header__burg-element"></div>
        <div class="header__burg-element"></div>
        <div class="header__burg-element"></div>
      </a>
      <div class="header__logo-wrapper header-logo">
        <nuxt-link class="header-logo__link" to="/">
          <siteLogo
            v-if="logoColor === 'white'"
            width="146"
            height="40"
            alt="Staj logo"
          />
          <siteLogoBlack
            v-if="logoColor === 'black'"
            width="146"
            height="40"
            alt="Staj logo"
          />
        </nuxt-link>
      </div>
      <div class="header__interaction-group" :data-visible="isMobileMenuOpen">
        <div class="header__mobile-title">
          <a
            href="#"
            class="header__close-btn"
            @click.prevent="toggleMobileMenu"
          >
          </a>
          <p v-if="!isAuth">Menu</p>
          <img
            src="~/assets/img/sign_logo.svg"
            alt="Staj"
            width="51"
            height="32"
          />
        </div>
        <div v-if="isAuth" class="header__mobile-switcher">
          <a
            :class="selectedNav === 0 ? 'active' : ''"
            href="#"
            @click.prevent="setNavSelection(0)"
            >Menu</a
          >
          <a
            :class="selectedNav === 1 ? 'active' : ''"
            href="#"
            @click.prevent="setNavSelection(1)"
            >User</a
          >
        </div>
        <button type="button" @click="getMessage">Emit</button>
        <Search />
        <Navbar :selected-nav="selectedNav" />
      </div>
    </div>
  </header>
</template>

<script>
import siteLogo from '@/assets/img/logo.svg?inline'
import siteLogoBlack from '@/assets/img/logo-black.svg?inline'
export default {
  components: {
    siteLogo,
    siteLogoBlack,
  },
  data: () => ({
    isMobileMenuOpen: 'false',
    selectedNav: 0,
    messageRxd: '',
  }),
  mounted() {
    this.socket = this.$nuxtSocket({ channel: '/index' })
  },
  computed: {
    isAuth() {
      return this.$auth.loggedIn
    },
    headerClasses() {
      return this.$store.getters['classes/getHeaderClasses']
    },
    headerSearchClasses() {
      return this.$store.getters['classes/getHeaderSearchClasses']
    },
    searchIcon() {
      return this.headerSearchClasses === '' ? 'icn_search' : 'icn_search-gray'
    },
    logoColor() {
      return this.headerSearchClasses === '' ? 'white' : 'black'
    },
  },
  methods: {
    setNavSelection(input) {
      this.selectedNav = input
    },
    toggleMobileMenu() {
      const root = document.getElementsByTagName('html')[0]

      if (this.isMobileMenuOpen === 'true') {
        root.classList.remove('overflow-hidden')
        this.isMobileMenuOpen = 'false'
      } else {
        root.classList.add('overflow-hidden')
        this.isMobileMenuOpen = 'true'
      }
    },
    getMessage() {
      return new Promise(
        (resolve) => {
          this.socket.emit('getMessage', 'Sasai cudsasai', (resp) => {
            this.messageRxd = resp
            console.log(resp)
            resolve()
          })
        },
        (reject) => {
          console.logp(reject)
        }
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  position: relative;
  z-index: 3;
  &__mobile-switcher,
  &__mobile-title {
    display: none;
  }

  &__burg {
    width: 24px;
    height: 24px;
    position: relative;
    display: none;
    justify-content: space-around;
    flex-direction: column;
  }

  &__burg-element {
    background-color: #fff;
    width: 100%;
    height: 3px;
  }

  &__interaction-group {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
  }

  &__wrapper {
    display: flex;
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    justify-content: space-between;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 24px;
  }

  &__logo-wrapper {
    transform: translateY(4px);
  }

  &__search-form {
    max-width: 440px;
    position: relative;
    margin-left: 105px;
    flex-basis: 440px;
    margin-right: 20px;
  }

  &__search-input {
    width: 100%;
    margin: 0;
    padding: 0;
    padding-top: 4px;
    padding-left: 60px;
    border: none;
    height: 100%;
    background: #000;
    opacity: 0.5;
    border-radius: 4px;
    font-family: Jost, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 29px;
    color: #fff;
    max-height: 47px;

    &::placeholder {
      font-family: Jost, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      color: #fff;
    }
  }

  &__search-label {
    position: absolute;
    z-index: 2;
    top: 8px;
    left: 10px;
  }

  &__nav {
    &--home,
    &--transparent {
      width: 500px;
    }
  }

  &--transparent {
    border-bottom: 2px solid rgba(0, 0, 0, 0.25);
    padding-bottom: 24px;
    background-color: #fff;

    .header__search-input {
      background: #f1f1f1;
      color: #000;
      &::placeholder {
        color: rgba(94, 94, 94, 1);
      }
    }
  }
}

@media screen and (max-width: 1184px) and (min-width: #{$mobile-menu + 1}) {
  .header__search-form {
    margin-left: 20px;
  }
}

@media screen and (max-width: $mobile-menu) {
  .header {
    position: static;
    z-index: 9999;

    &__burg {
      display: flex;
    }

    &__close-btn {
      position: relative;
      width: 23px;
      height: 23px;

      &::before {
        position: absolute;
        content: '';
        width: 27px;
        height: 3px;
        left: -2px;
        background-color: #fff;
        transform: rotate(45deg);
        top: 11px;
      }

      &::after {
        position: absolute;
        content: '';
        width: 27px;
        height: 3px;
        left: -2px;
        background-color: #fff;
        transform: rotate(-45deg);
        top: 11px;
      }
    }

    &__wrapper {
      padding-top: 8px;
      padding-left: 20px;
      padding-right: 20px;
      align-items: center;
    }

    &__logo-wrapper {
      svg {
        width: 116px;
        height: 32px;
      }
    }

    &__mobile-switcher a,
    &__mobile-title p {
      color: #fff;
      font-size: 24px;
      font-family: Jost, sans-serif;
      font-weight: bold;
      margin-top: 0;
      margin-left: 13px;
    }

    &__mobile-switcher {
      display: flex;
      margin-left: -15px;
      margin-right: -15px;
      margin-bottom: 10px;
      justify-content: space-evenly;

      a {
        flex-basis: 50%;
        text-align: center;
        height: 43px;
        border-bottom: 1px solid rgba($color: #fff, $alpha: 0.5);
        margin: 0;
        transition: 0.3s ease-in-out border;
      }

      a.active {
        border-bottom: 5px solid white;
      }
    }

    &__mobile-title {
      display: flex;
      align-items: flex-start;
      position: relative;
      padding-top: 3px;
      margin-bottom: 20px;

      img {
        position: absolute;
        right: 5px;
      }
    }

    &__interaction-group {
      padding: 15px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 3;
      flex-direction: column;
      justify-content: flex-start;
      background: linear-gradient(180deg, #000 0%, #68030d 100%);
      transition: transform 0.3s ease-in-out;
      transform: translate(0, 0);
      overflow-x: hidden;

      &[data-visible='false'] {
        transform: translate(-100%, 0);
      }
    }

    &__search-form {
      flex-basis: auto;
      margin: 0;
      border-bottom: 1px solid white;
      padding-bottom: 5px;
      max-width: auto;

      &--transparent {
        transform: none;
      }
    }

    &__search-input {
      padding-left: 40px;
    }

    &__search-label {
      top: auto;
      left: auto;

      svg {
        width: 24px;
        height: 24px;
      }
    }

    &--transparent {
      .header__burg-element {
        background: #000;
      }
    }

    &__nav {
      width: auto;
    }
  }
}
</style>
