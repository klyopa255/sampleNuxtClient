<template>
  <div>
    <section class="info-tabs__filters filters">
      <h2 class="visually-hidden">Filters</h2>
      <div class="filters__wrapper filters__wrapper--less">
        <ul class="filters__list filters__list--justify">
          <li class="filters__item">
            <select
              name="types"
              class="filters__label filters__label--select filters__label--select--long"
              @input.stop="handleFilterChange"
            >
              <option value="false">Show All</option>
              <option
                v-for="filter of filterTypes"
                :key="filter"
                :value="filter"
              >
                {{ filter }}
              </option>
            </select>
          </li>
        </ul>
      </div>
    </section>
    <section class="profile-info__events-section">
      <ul
        v-if="favorites.data.length > 0"
        class="profile-info__events-list profile-info__events-list--mg-top"
      >
        <li
          v-for="(post, index) in favorites.data"
          :key="'MP-' + index + Number(new Date())"
          class="profile-info__event-item"
        >
          <Event v-if="post.type === 'event'" :event="post" />
          <Post
            v-else
            current-line="favorites"
            :post-data="post"
            :user-data="{
              name: post.owner.name,
              photo: post.owner.photo,
            }"
          />
        </li>
      </ul>
      <button
        v-if="isNextPage"
        class="main__more-button"
        type="button"
        @click.prevent="nextPage"
      >
        Explore More
      </button>
    </section>
    <CreatePostForm v-if="$route.name === 'profile'" tab="favorites" />
  </div>
</template>

<script>
import Event from './Event.vue'
export default {
  components: { Event },
  data() {
    return {
      isCalendarPopup: false,
      filterDate: '',
      isTime: false,
    }
  },
  computed: {
    filterTypes() {
      return this.$store.getters['favorites/getFavoriteTypes']
    },
    user() {
      return this.$auth.user
    },
    favorites() {
      return this.$store.getters['favorites/getFavorites']
    },
    isNextPage() {
      return this.favorites.data.current_page !== this.favorites.data.last_page
    },
  },
  beforeMount() {
    this.$nuxt.$on('click-outside-popover', () => {
      this.filterDate = ''
      this.isTime = false
    })
    this.$store.dispatch('favorites/fetchFavorites')
    this.$store.dispatch('favorites/fetchFavoriteTypes')
  },
  methods: {
    getByDate() {
      this.isTime = true
      this.isCalendarPopup = !this.isCalendarPopup
      this.handleFilterChange({
        target: {
          value: 'false',
        },
      })
    },
    cancelTime() {},
    handleFilterChange(e) {
      const id = String(e.target.value)
      this.currentFilterType = id
      let addressSrting =
        this.currentFilterType !== 'false'
          ? `?type=` + this.currentFilterType + '&'
          : `?`

      if (this.isTime) {
        addressSrting += 'byDate=' + this.filterDate + '&'
      } else {
        this.filterDate = ''
        this.isTime = false
      }

      this.$store.dispatch('favorites/fetchFavorites', addressSrting)
    },
    nextPage() {
      if (this.isNextPage) {
        this.$store.dispatch('favorites/fetchFavorites')
      }
    },
  },
}
</script>
