<template>
  <section v-if="searchResults" class="notifications">
    <h1 class="visually-hidden">Search users</h1>
    <div
      class="filters__wrapper filters__wrapper--max-width filters__wrapper--less"
    >
      <ul class="filters__list filters__list--justify">
        <li class="filters__item">
          <select
            name="types"
            class="filters__label filters__label--select filters__label--select--long"
            @input.stop="handleFilterChange"
          >
            <option value="">Show All</option>
            <option
              v-for="filter of filterTypes"
              :key="filter.name"
              :value="filter.name"
            >
              {{ filter.name }}
            </option>
          </select>
        </li>
        <li class="filters__item">
          <select
            name="types"
            class="filters__label filters__label--select filters__label--select--long"
            @input.stop="handleCategoryChange"
          >
            <option value="">Show All</option>
            <option
              v-for="filter of categories"
              :key="filter.name"
              :value="filter.name"
            >
              {{ filter.name }}
            </option>
          </select>
        </li>
      </ul>
    </div>
    <div class="notifications__section">
      <input
        id="search"
        v-model="query"
        class="notifications__search-input"
        placeholder="Search users"
        type="text"
        name="search"
        @input="sendRequest"
      />
    </div>
    <ul
      v-if="
        searchResults && searchResults.data && searchResults.data.length > 0
      "
      class="notifications__list"
    >
      <li
        v-for="(user, index) of searchResults.data"
        :key="index"
        class="notifications__item"
      >
        <div class="notifications__section">
          <nuxt-link
            :to="'/profile/' + user.id"
            class="notifications__avatar-wrapper"
          >
            <img
              :src="
                user.photo
                  ? $nuxt.context.env.storageBaseUrl + '/' + user.photo
                  : require('@/assets/img/defaultAva.png')
              "
              width="48"
              height="48"
              alt="name"
              class="notification__avatar"
            />
          </nuxt-link>
          <h2 class="notifications__title">
            <nuxt-link
              :to="'/profile/' + user.id"
              class="notifications__title-link"
              >{{ user.name }}</nuxt-link
            >
          </h2>
        </div>
      </li>
    </ul>
    <p v-else>Noobody was found</p>
    <button
      v-if="searchResults.next_page_url"
      type="button"
      class="main__more-button"
      @click="getNextPage"
    >
      Explore More
    </button>
  </section>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      categories: [],
      query: '',
      currentType: '',
      currentCategory: '',
      isNextPageRequest: false,
    }
  },
  computed: {
    filterTypes() {
      return this.$store.getters['userTypes/getTypes']
    },
    searchResults() {
      return this.$store.getters['searchUsers/getUsers'].data
    },
  },
  beforeMount() {
    if (!this.filterTypes.data) {
      this.$store.dispatch('userTypes/getUserTypes')
    }
    this.sendRequest()
  },
  methods: {
    handleFilterChange(e) {
      const type = e.target.value
      if (!type || type === 'false') {
        this.currentCategory = ''
        this.currentType = ''
        this.categories = []
        this.sendRequest()
      } else {
        const typeObject = this.filterTypes.find(
          (it) => String(it.name) === String(type)
        )

        this.currentType = type
        this.currentCategory = ''
        this.categories = typeObject.type.slice()
        this.sendRequest()
      }
    },
    handleCategoryChange(e) {
      if (!e.target.value || e.target.value === 'false') {
        this.currentCategory = ''
        this.sendRequest()
      }
      this.currentCategory = e.target.value
      this.sendRequest()
    },
    sendRequest() {
      let params = '?search=' + this.query

      if (this.currentType !== '') {
        params += '&account_type=' + this.currentType
      }
      if (this.currentCategory !== '') {
        params += '&user_type=' + this.currentCategory
      }

      if (this.isNextPageRequest) {
        params += '&page=' + (Number(this.searchResults.current_page) + 1)
      }
      const payload = {
        query: params,
        isNext: this.isNextPageRequest,
      }
      this.$store.dispatch('searchUsers/findUsers', payload)
    },
    getNextPage() {
      this.isNextPageRequest = true
      this.sendRequest()
      this.isNextPageRequest = false
    },
  },
  head() {
    return {
      title: 'Staj | Users search',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Find intresting people',
        },
      ],
    }
  },
}
</script>
