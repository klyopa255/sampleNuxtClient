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
                :key="filter.name"
                :value="filter.id"
              >
                {{ filter.name }}
              </option>
            </select>
          </li>
          <li class="filters__item">
            <input
              id="music-events-recent"
              v-model="isRecent"
              class="visually-hidden"
              type="checkbox"
              name="music-events-time"
              @input="getRecent"
            />
            <label for="music-events-recent" class="filters__label"
              >Recent</label
            >
          </li>
          <li class="filters__item">
            <input
              id="music-events-week"
              v-model="isThisWeek"
              class="visually-hidden"
              type="checkbox"
              name="music-events-time"
              @input="getThisWeek"
            />
            <label for="music-events-week" class="filters__label"
              >This Week</label
            >
          </li>
          <li class="filters__item" @click.stop="">
            <input
              id="music-events-time"
              v-model="isTime"
              class="visually-hidden"
              type="checkbox"
              name="music-events-time"
              @input="isCalendarPopup = !isCalendarPopup"
            />
            <label
              for="music-events-time"
              class="filters__label filters__label--select filters__label--button"
              >By Date</label
            >
            <div
              class="filters__popover pop-over"
              :class="isCalendarPopup ? ' pop-over--visible' : ''"
            >
              <v-date-picker v-model="filterDate" :dark="true" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="cancelTime"> Cancel </v-btn>
                <v-btn text color="primary" @click="getByDate"> OK </v-btn>
              </v-date-picker>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="profile-info__events-section">
      <h2 class="visually-hidden">Events</h2>
      <ul
        v-if="storedEvents && storedEvents.length > 0"
        class="profile-info__events-list"
      >
        <li
          v-for="(event, index) of storedEvents"
          :key="index"
          class="profile-info__event-item"
        >
          <Event :event="event" />
        </li>
      </ul>
      <p v-else>There are no events yet</p>
      <button
        v-if="myEvents.nextPageUrl"
        class="main__more-button"
        type="button"
        @click="getNextPage"
      >
        Explore More
      </button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterTypes: [],
      storedEvents: [],
      currentPage: 1,
      isRecent: false,
      isTime: false,
      isThisWeek: false,
      filterDate: '',
      currentFilterType: false,
      isCalendarPopup: false,
    }
  },
  computed: {
    myEvents() {
      return this.$store.getters['events/events']
    },
    eventTypes() {
      return this.$store.getters['eventTypes/getTypes']
    },
  },
  beforeMount() {
    this.$nuxt.$on('click-outside-popover', () => {
      if (this.isTime && this.isCalendarPopup) {
        this.isTime = false
        this.isCalendarPopup = false
        this.clearFilterDate()
      }
    })

    this.$store
      .dispatch(
        'events/fetchEvents',
        '?artist_id=' +
          (this.$route.params.id ? this.$route.params.id : this.$auth.user.id)
      )
      .then(() => {
        this.myEvents.data.forEach((event) => {
          this.storedEvents.push(event)
        })
      })
    if (this.eventTypes.length < 1) {
      this.$store.dispatch('eventTypes/getEventTypes').then(() => {
        this.eventTypes.forEach((filterType) => {
          this.filterTypes.push(filterType)
        })
      })
    } else {
      this.filterTypes = this.eventTypes
    }
  },
  methods: {
    getNextPage() {
      this.handleFilterChange(
        {
          target: {
            value: this.currentFilterType,
          },
        },
        `?page=${this.myEvents.currentPage + 1}`
      )
    },
    cancelTime() {
      this.isTime = false
      if (this.isCalendarPopup) {
        this.clearFilterDate()
      }
      this.isCalendarPopup = false
    },
    getRecent() {
      this.isThisWeek = false
      this.isTime = false
      this.isRecent = !this.isRecent
      this.handleFilterChange({
        target: {
          value: this.currentFilterType,
        },
      })
    },
    getThisWeek() {
      this.isRecent = false
      this.isTime = false
      this.isThisWeek = !this.isThisWeek
      this.handleFilterChange({
        target: {
          value: this.currentFilterType,
        },
      })
    },
    getByDate() {
      this.isRecent = false
      this.isThisWeek = false
      this.isTime = true
      this.isCalendarPopup = !this.isCalendarPopup
      this.handleFilterChange({
        target: {
          value: this.currentFilterType,
        },
      })
    },
    clearFilterDate() {
      this.filterDate = ''
      this.isCalendarPopup = false
    },
    clearTimeFilters() {
      this.isCalendarPopup = false
      this.isThisWeek = false
      this.isRecent = false
      this.isTime = false
    },
    handleFilterChange(e, page = 'page=1') {
      if (page === 'page=1') {
        this.storedEvents = []
      }
      const id = String(e.target.value || String(this.currentFilterType))
      this.currentFilterType = id
      let addressSrting =
        this.currentFilterType !== 'false'
          ? `?${page}&type[]=` + this.currentFilterType + '&'
          : `?${page}&`

      if (this.isTime) {
        addressSrting += 'byDate=' + this.filterDate + '&'
      } else if (this.isRecent) {
        addressSrting += 'recent=1&'
      } else if (this.isThisWeek) {
        addressSrting += 'week=1&'
      } else {
        this.clearTimeFilters()
        this.clearFilterDate()
      }

      addressSrting +=
        'artist_id=' +
        (this.$route.params.id ? this.$route.params.id : this.$auth.user.id)

      this.$store.dispatch('events/fetchEvents', addressSrting).then(() => {
        this.myEvents.data.forEach((event) => {
          this.storedEvents.push(event)
        })
      })
    },
  },
}
</script>
