<template>
  <form :class="'header__search-form ' + headerSearchClasses">
    <label for="header-search" class="header__search-label">
      <span class="visually-hidden">Search For Events</span>
      <svg-icon
        :name="searchIcon"
        class="header__search-icon"
        width="32"
        height="32"
        aria-label="Event type"
      />
    </label>
    <input
      id="header-search"
      v-model="searchQuery"
      class="header__search-input"
      type="text"
      placeholder="Search For Events"
      @click="selectText"
      @keypress.enter.prevent="search"
    />
    <button class="header__search-btn visually-hidden" @click.prevent="search">
      Search
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
    }
  },
  computed: {
    headerSearchClasses() {
      return this.$store.getters['classes/getHeaderSearchClasses']
    },
    searchIcon() {
      return this.headerSearchClasses === '' ? 'icn_search' : 'icn_search-gray'
    },
    events() {
      return this.$store.getters['events/events']
    },
  },
  methods: {
    selectText(e) {
      e.target.select()
    },
    search() {
      this.$store.dispatch('events/storeQuery', this.searchQuery)
      this.$store
        .dispatch(
          'events/fetchEvents',
          this.searchQuery !== '' ? `?search=${this.searchQuery}` : ''
        )
        .then(() => {
          this.$router.push({
            name: 'events',
            params: {
              type: 'search',
            },
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
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

  &--transparent {
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
        top: 6px;
        position: relative;
      }
    }

    &--transparent {
      .header__search-input {
        background: none;
        color: inherit;
      }
    }
  }

  @media screen and (max-width: $mobile-menu) {
    .header {
      &--transparent {
        color: #fff;

        .header__search-input {
          color: inherit;

          &::placeholder {
            color: #fff !important;
          }
        }
      }
    }
  }
}
</style>
