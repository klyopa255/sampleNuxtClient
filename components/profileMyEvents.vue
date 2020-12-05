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
      <nuxt-link
        v-if="
          $route.params.id && $auth.loggedIn
            ? $isMine($route.params.id, $auth.user.id)
            : true
        "
        to="/event-creation"
        class="profile-info__create-event-button"
        >Create Event</nuxt-link
      >
      <ul
        v-if="storedEvents && storedEvents.length > 0"
        class="profile-info__events-list"
      >
        <li
          v-for="(event, index) of storedEvents"
          :key="index"
          class="profile-info__event-item"
        >
          <article class="profile-info__event event event--no-hover">
            <h3 class="event__title">
              <nuxt-link
                :to="'/events/' + event.id"
                class="event__title-link"
                >{{ event.title }}</nuxt-link
              >
            </h3>
            <Promotion
              v-if="$isMine(event.user_id, $auth.loggedIn ? $auth.user.id : -1)"
              :data="event"
              type="event"
            />
            <nuxt-link
              :to="'/events/' + event.id"
              class="event__img-link event__img-link--max-height"
            >
              <img
                :src="
                  event.background
                    ? $nuxt.context.env.storageBaseUrl +
                      '/' +
                      (event.background.path
                        ? event.background.path
                        : event.background)
                    : require('@/assets/img/defaultBackground.png')
                "
                :alt="event.title"
                width="321"
                height="226"
                class="event__img"
              />
            </nuxt-link>
            <img
              class="event__type-icon event__type-icon--low"
              width="32"
              height="32"
              :src="
                $nuxt.context.env.storageServerBaseUrl +
                event.event_type_id.icons
              "
              :alt="event.event_type_id.name"
            />
            <ToCalendar
              modifier="event__to-calendar--low"
              :event-data="event"
            />
            <div class="event__one-line-wrapper">
              <p class="event__time-price event__time-price--inline">
                <time
                  class="event__time"
                  :datetime="$stringifyToISO(event.begin_at)"
                  >{{ $stringifyToISO(event.begin_at) }}</time
                >
                <span v-if="event.price" class="event__price">$44</span>
              </p>
              <nuxt-link
                :to="'/profile/' + event.user_id"
                class="event__host event__host--inline"
                >{{ event.place }}</nuxt-link
              >
            </div>
            <ul
              v-if="event.artists && event.artists.length > 0"
              class="event__addition event__addition--flex"
            >
              <li
                v-for="(artist, indexB) of event.artists.slice(0, 3)"
                :key="indexB"
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
      return this.$route.name === 'profile'
        ? this.$store.getters['myEvents/getMyEvents']
        : this.$store.getters['events/events']
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

    if (this.$route.name === 'profile') {
      this.$store.dispatch('myEvents/fetchMyEvents').then(() => {
        this.myEvents.data.forEach((event) => {
          this.storedEvents.push(event)
        })
      })
    } else if (this.$route.name === 'profile-id') {
      this.$store
        .dispatch(
          'events/fetchEvents',
          '?organizer_id=' + this.$route.params.id
        )
        .then(() => {
          this.myEvents.data.forEach((event) => {
            this.storedEvents.push(event)
          })
        })
    }

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
        `page=${this.myEvents.currentPage + 1}`
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
          ? `${page}&type[]=` + this.currentFilterType + '&'
          : `${page}&`

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

      if (this.$route.name === 'profile') {
        this.$store
          .dispatch('myEvents/fetchMyEvents', addressSrting)
          .then(() => {
            this.myEvents.data.forEach((event) => {
              this.storedEvents.push(event)
            })
          })
      } else if (this.$route.name === 'profile-id') {
        this.$store
          .dispatch(
            'events/fetchEvents',
            '?' + addressSrting + 'organizer_id=' + this.$route.params.id
          )
          .then(() => {
            this.myEvents.data.forEach((event) => {
              this.storedEvents.push(event)
            })
          })
      }
    },
  },
}
</script>
