<template>
  <div>
    <h1 class="visually-hidden">Find local artists & events</h1>
    <section class="main__filters filters">
      <h2 class="visually-hidden">Filters</h2>
      <div
        class="filters__wrapper"
        :class="isTypeFilterOpen ? ' filters__wrapper--less' : ''"
      >
        <h3 class="filters__title">Type:</h3>
        <ul
          ref="typeList"
          class="filters__list"
          :class="isTypeFilterOpen ? '' : ' filters__list--closed'"
        >
          <li
            v-for="(filter, index) in typeFilters"
            :key="filter.name.toLowerCase().split(' ').join('-') + 'key'"
            class="filters__item"
          >
            <input
              :id="filter.name.toLowerCase().split(' ').join('-') + 'type'"
              v-model="checkedTypes[index]"
              class="visually-hidden"
              type="checkbox"
              :name="filter.name.toLowerCase().split(' ').join('-')"
              :value="filter.id"
              @change="handleClickType()"
            />
            <label
              :for="filter.name.toLowerCase().split(' ').join('-') + 'type'"
              class="filters__label"
              >{{ filter.name }}</label
            >
          </li>
          <li
            v-if="isTypeFilterOpen && isOverflowingType"
            class="filters__item"
          >
            <button
              class="filters__more-btn filters__more-btn--less"
              type="button"
              @click.prevent="toggleTypeFilter"
            >
              Less
            </button>
          </li>
        </ul>
        <button
          v-if="!isTypeFilterOpen && isOverflowingType"
          class="filters__more-btn filters__more-btn--outside"
          type="button"
          @click.prevent="toggleTypeFilter"
        >
          More
        </button>
      </div>
      <div
        class="filters__wrapper"
        :class="isTypeFilterOpen ? ' filters__wrapper--less' : ''"
      >
        <h3 class="filters__title">Genre:</h3>
        <ul
          ref="genreList"
          class="filters__list"
          :class="isGenreFilterOpen ? '' : ' filters__list--closed'"
        >
          <li
            v-for="(filter, index) in genreFilters"
            :key="filter.name.toLowerCase().split(' ').join('-') + 'key'"
            class="filters__item"
          >
            <input
              :id="filter.name.toLowerCase().split(' ').join('-') + 'genre'"
              v-model="checkedGenres[index]"
              class="visually-hidden"
              type="checkbox"
              :name="filter.name.toLowerCase().split(' ').join('-')"
              :value="filter.id"
              @change="handleClickGenre()"
            />
            <label
              :for="filter.name.toLowerCase().split(' ').join('-') + 'genre'"
              class="filters__label"
              >{{ filter.name }}</label
            >
          </li>
          <li
            v-if="isGenreFilterOpen && isOverflowingGenre"
            class="filters__item"
          >
            <button
              class="filters__more-btn filters__more-btn--less"
              type="button"
              @click.prevent="toggleGenreFilter"
            >
              Less
            </button>
          </li>
        </ul>
        <button
          v-if="!isGenreFilterOpen && isOverflowingGenre"
          class="filters__more-btn filters__more-btn--outside"
          type="button"
          @click.prevent="toggleGenreFilter"
        >
          More
        </button>
      </div>
    </section>
    <section class="main__events events">
      <h2 class="visually-hidden">
        <a class="events__title-link">Filtered events</a>
      </h2>

      <div class="events__wrapper events__wrapper--full">
        <ul
          v-if="events.data && events.data.length > 0"
          class="events__list events__list--full"
        >
          <li
            v-for="(event, index) of storedEvents"
            :key="index"
            class="events__item"
          >
            <article class="events__event event event--no-hover">
              <h3 class="event__title">
                <a
                  href="#"
                  class="event__title-link"
                  @click.prevent="openEvent(event)"
                  >{{ event.title }}</a
                >
              </h3>
              <a
                :href="`/events/${event.id}`"
                class="event__img-link"
                @click.prevent="openEvent(event)"
              >
                <img
                  :src="
                    event.background && event.background.path
                      ? $nuxt.context.env.storageBaseUrl +
                        '/' +
                        event.background.path
                      : require('@/assets/img/defaultBackground.png')
                  "
                  :alt="event.title"
                  width="321"
                  height="226"
                  class="event__img"
                />
              </a>
              <img
                class="event__type-icon"
                width="32"
                height="32"
                :alt="event.event_type_id.name"
                :src="
                  $nuxt.context.env.storageServerBaseUrl +
                  event.event_type_id.icons
                "
              />
              <ToCalendar :event-data="event" modifier="event__to-calendar" />
              <p class="event__time-price event__time-price--mt">
                <time
                  class="event__time"
                  :datetime="$stringifyToISO(event.begin_at)"
                  >{{ $stringifyToISO(event.begin_at) }}</time
                >
                <span v-if="event.price" class="event__price">$50</span>
              </p>
              <nuxt-link
                :to="'/profile/' + event.user_id"
                class="event__host"
                >{{ event.place }}</nuxt-link
              >
              <ul
                v-if="event.artists && event.artists.length > 0"
                class="event__addition"
              >
                <li
                  v-for="(artist, indexA) of event.artists.slice(0, 3)"
                  :key="indexA"
                  class="event__addition-item"
                >
                  <nuxt-link
                    v-if="typeof artist.id === 'number'"
                    :to="'/profile/' + artist.id"
                    class="event__addition-link"
                  >
                    <div class="event__addition-img-wrapper">
                      <img
                        :src="
                          artist.photo
                            ? $nuxt.context.env.storageBaseUrl +
                              '/' +
                              artist.photo
                            : require('@/assets/img/defaultAva.png')
                        "
                        :alt="artist.name"
                        width="48"
                        height="48"
                        class="event__addition-img"
                      />
                    </div>
                    <span class="event__addition-name">{{
                      artist.name ? artist.name : 'Unknown artist'
                    }}</span>
                  </nuxt-link>
                  <a v-else class="event__addition-link">
                    <div class="event__addition-img-wrapper">
                      <img
                        :src="
                          artist.photo
                            ? $nuxt.context.env.storageBaseUrl +
                              '/' +
                              artist.photo
                            : require('@/assets/img/defaultAva.png')
                        "
                        :alt="artist.name"
                        width="48"
                        height="48"
                        class="event__addition-img"
                      />
                    </div>
                    <span class="event__addition-name">{{
                      artist.name ? artist.name : 'Unknown artist'
                    }}</span>
                  </a>
                </li>
              </ul>
            </article>
          </li>
        </ul>
        <p v-else>There are no events yet</p>
        <div>
          <button
            v-if="events.nextPageUrl"
            class="main__more-button"
            type="button"
            @click.prevent="fetchNextPageEvents"
          >
            Explore More
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  auth: false,
  async fetch({ store, route }) {
    if (route.params.type !== 'search') {
      await store.dispatch('events/fetchEvents')
    }
  },
  data: () => ({
    pageTitle: 'Events page',
    isTypeFilterOpen: false,
    isOverflowingType: false,
    typeFilters: [],
    isGenreFilterOpen: false,
    genreFilters: [],
    isOverflowingGenre: false,
    checkedTypes: [],
    checkedGenres: [],
    currentPage: 1,
    total: 0,
  }),
  computed: {
    lastPage() {
      return this.$store.getters['events/events'].lastPage
    },
    events() {
      return this.$store.getters['events/events']
    },
    storedEvents() {
      return this.$store.getters['events/events'].data
    },
    eventTypes() {
      return this.$store.getters['eventTypes/getTypes']
    },
    searchQuery() {
      return this.$store.getters['events/query'] !== ''
        ? `search=${this.$store.getters['events/query']}`
        : ''
    },
  },
  beforeMount() {
    if (this.eventTypes.length > 1) {
      this.eventTypes.forEach((filterType) => {
        this.typeFilters.push(filterType)
        this.checkedTypes.push(false)
        filterType.type.forEach((filterGenre) => {
          if (!this.genreFilters.includes(filterGenre)) {
            this.genreFilters.push(filterGenre)
            this.checkedGenres.push(false)
          }
        })
      })
    } else {
      this.$store
        .dispatch('eventTypes/getEventTypes')
        .then(() => {
          this.eventTypes.forEach((filterType) => {
            this.typeFilters.push(filterType)
            this.checkedTypes.push(false)
            filterType.type.forEach((filterGenre) => {
              if (!this.genreFilters.includes(filterGenre)) {
                this.genreFilters.push(filterGenre)
                this.checkedGenres.push(false)
              }
            })
          })
        })
        .then(() => {
          this.isOverflowingType = this.isOverflowing('typeList')
          this.isOverflowingGenre = this.isOverflowing('genreList')
        })
    }
    this.total = this.events.total
  },
  mounted() {
    this.isOverflowingType = this.isOverflowing('typeList')
    this.isOverflowingGenre = this.isOverflowing('genreList')
  },
  updated() {
    this.isOverflowingType = this.isOverflowing('typeList')
    this.isOverflowingGenre = this.isOverflowing('genreList')
  },
  methods: {
    fetchNextPageEvents() {
      if (this.currentPage < this.lastPage) {
        this.currentPage += 1
      }
      this.$store
        .dispatch(
          'events/fetchFilteredEvents',
          '?page=' +
            this.currentPage +
            '&' +
            this.getCheckedFiltersIds() +
            '&' +
            this.searchQuery
        )
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    },
    updateFilteredEvents() {
      this.$store.dispatch(
        'events/fetchFilteredEvents',
        this.getCheckedFiltersIds() + this.searchQuery
      )
    },
    handleClickType() {
      this.moveCheckedFiltersToStart('typeFilters')
      this.updateGenres()
      this.updateFilteredEvents()
    },
    updateGenres() {
      this.genreFilters = []
      this.checkedGenres = []
      if (this.checkedTypes.some((it) => it)) {
        this.checkedTypes.forEach((it, i) => {
          if (it) {
            this.typeFilters[i].type.forEach((genre) => {
              this.genreFilters.push(genre)
              this.checkedGenres.push(false)
            })
          }
        })
      } else {
        this.typeFilters.forEach((it) => {
          it.type.forEach((filterGenre) => {
            if (!this.genreFilters.includes(filterGenre)) {
              this.genreFilters.push(filterGenre)
              this.checkedGenres.push(false)
            }
          })
        })
      }
    },
    handleClickGenre() {
      this.moveCheckedFiltersToStart('genreFilters')
      this.updateFilteredEvents()
    },
    getCheckedFiltersIds() {
      const typeIds = []
      this.typeFilters.forEach((it, index) => {
        if (this.checkedTypes[index]) {
          typeIds.push(it.id)
        }
      })
      const genreIds = []
      this.genreFilters.forEach((it, index) => {
        if (this.checkedGenres[index]) {
          genreIds.push(it.id)
        }
      })
      const result = this.stringifyIds({ typeIds, genreIds })
      return result
    },
    stringifyIds({ typeIds, genreIds }) {
      const typeStringArray = typeIds.reduce((acc, it) => {
        acc += 'type[]=' + String(it) + '&'
        return acc
      }, '')
      const genreStringArray = genreIds.reduce((acc, it) => {
        acc += 'category[]=' + String(it) + '&'
        return acc
      }, '')
      const stringArray = '?' + typeStringArray + genreStringArray
      return stringArray
    },
    moveCheckedFiltersToStart(filters) {
      this[filters].forEach((it, index) => {
        const modelName =
          filters === 'typeFilters' ? 'checkedTypes' : 'checkedGenres'

        if (this[modelName][index]) {
          const [filter] = this[filters].splice(index, 1)
          this[filters].unshift(filter)

          const [typeModel] = this[modelName].splice(index, 1)
          this[modelName].unshift(typeModel)
        }
      })
    },
    openEvent(event) {
      this.$router.push('/events/' + event.id)
    },
    toggleTypeFilter() {
      this.isTypeFilterOpen = !this.isTypeFilterOpen
    },
    toggleGenreFilter() {
      this.isGenreFilterOpen = !this.isGenreFilterOpen
    },
    isOverflowing(refName) {
      const listElement = this.$refs[refName]
      return Array.from(listElement.children).some((el) => {
        return listElement.offsetTop + 8 < el.offsetTop
      })
    },
  },
  head() {
    return {
      title: 'Staj | Events',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Find an event that you like',
        },
      ],
    }
  },
}
</script>
