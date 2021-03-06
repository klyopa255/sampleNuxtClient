<template>
  <section class="main__events events">
    <div class="events__title-wrapper">
      <h2 class="events__title">
        <a class="events__title-link">{{ title }}</a>
      </h2>
    </div>
    <div v-swiper:mySwiper="swiperOption" class="events__wrapper">
      <ul class="events__list swiper-wrapper">
        <li
          v-for="(event, index) of loadedEvents"
          :key="index"
          class="events__item swiper-slide"
        >
          <article class="events__event event event--no-hover">
            <h3 class="event__title">
              <nuxt-link
                :to="'/events/' + event.id"
                class="event__title-link"
                >{{ event.title }}</nuxt-link
              >
            </h3>
            <nuxt-link
              :to="'/events/' + event.id"
              class="event__img-link event__img-link--common"
            >
              <span
                v-if="event.status === 'virtual'"
                class="virtual-event event__virtual"
                >Virtual Event</span
              >
              <img
                :src="
                  event.background
                    ? $nuxt.context.env.storageBaseUrl + '/' + event.background
                    : require('@/assets/img/defaultBackground.png')
                "
                :alt="event.title"
                width="321"
                height="226"
                class="event__img"
              />
            </nuxt-link>
            <img
              class="event__type-icon"
              width="32"
              height="32"
              :src="
                $nuxt.context.env.storageServerBaseUrl +
                event.event_type_id.icons
              "
              :alt="event.event_type_id.name"
            />
            <ToCalendar
              v-if="isAuth"
              :event-data="event"
              modifier="event__to-calendar"
            />
            <p class="event__time-price">
              <time
                class="event__time"
                :datetime="$stringifyToISO(event.begin_at)"
                >{{ $stringifyToISO(event.begin_at) }}</time
              >
              <span v-if="event.price" class="event__price">$50</span>
            </p>
            <nuxt-link :to="'/profile/' + event.user_id" class="event__host">{{
              event.place
            }}</nuxt-link>
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
                  ><div class="event__addition-img-wrapper">
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
                  }}</span></nuxt-link
                >
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
      <ul class="events__pagination pagination"></ul>
    </div>
  </section>
</template>

<script>
import { Swiper, Pagination } from 'swiper'
Swiper.use([Pagination])
export default {
  props: {
    title: {
      type: [String],
      default() {
        return ''
      },
    },
  },
  data() {
    return {
      loadedEvents: [],
      swiperOption: {
        grabCursor: true,
        spaceBetween: 25,
        slidesPerView: 'auto',
        watchOverflow: false,
        slidesPerGroup: 4,
        pagination: {
          bulletActiveClass: 'pagination__pag-item--current',
          bulletClass: 'pagination__pag-item',
          el: '.pagination',
          hiddenClass: 'pagination__pag-item--hidden',
          totalClass: 'pagination__pag-item',
          type: 'bullets',
          bulletElement: 'li',
          clickable: true,
        },
        breakpoints: {
          320: {
            slidesPerGroup: 1,
            centeredSlides: true,
          },
          768: {
            slidesPerGroup: 3,
            slidesPerView: 4,
          },
          1024: {
            slidesPerGroup: 3,
            slidesPerView: 'auto',
          },
          1440: {
            slidesPerGroup: 4,
          },
        },
      },
    }
  },
  computed: {
    events() {
      return this.$store.getters[
        `mainPageEvents/${this.getStoreName(this.title.toLowerCase())}`
      ]
    },
    isAuth() {
      return this.$auth.loggedIn
    },
  },
  beforeMount() {
    this.events.forEach((it) => {
      this.loadedEvents.push(it)
    })
  },
  methods: {
    getStoreName(title) {
      if (title.includes('week')) {
        return 'week'
      } else if (title.includes('free')) {
        return 'free'
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.virtual-event {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 157px;
  height: 32px;
  padding-left: 25px;
  background-color: rgba(196, 196, 196, 0.2);
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.25 10.5C20.84 10.5 20.5 10.84 20.5 11.25H18.96C18.81 9.88 18.27 8.62 17.44 7.6L18.53 6.51L18.54 6.52C18.83 6.81 19.31 6.81 19.6 6.52C19.89 6.23 19.89 5.75 19.6 5.46L18.54 4.4C18.25 4.11 17.77 4.11 17.48 4.4C17.19 4.69 17.19 5.16 17.47 5.45L16.38 6.54C15.36 5.72 14.11 5.18 12.74 5.03V3.5H12.75C13.16 3.5 13.5 3.16 13.5 2.75C13.5 2.34 13.16 2 12.75 2H11.25C10.84 2 10.5 2.34 10.5 2.75C10.5 3.16 10.83 3.49 11.24 3.5V5.05C9.87 5.19 8.62 5.74 7.6 6.56L6.51 5.47L6.52 5.46C6.81 5.17 6.81 4.69 6.52 4.4C6.23 4.11 5.75 4.11 5.46 4.4L4.4 5.46C4.11 5.75 4.11 6.23 4.4 6.52C4.69 6.81 5.16 6.81 5.45 6.53L6.54 7.62C5.72 8.64 5.18 9.88 5.04 11.25H3.5C3.5 10.84 3.16 10.5 2.75 10.5C2.34 10.5 2 10.84 2 11.25V12.75C2 13.16 2.34 13.5 2.75 13.5C3.16 13.5 3.5 13.16 3.5 12.75H5.04C5.19 14.12 5.73 15.36 6.54 16.38L5.45 17.47C5.16 17.18 4.69 17.19 4.4 17.48C4.11 17.77 4.11 18.25 4.4 18.54L5.46 19.6C5.75 19.89 6.23 19.89 6.52 19.6C6.81 19.31 6.81 18.83 6.52 18.54L6.51 18.53L7.6 17.44C8.62 18.26 9.86 18.8 11.23 18.95V20.5C10.82 20.51 10.49 20.84 10.49 21.25C10.49 21.66 10.83 22 11.24 22H12.74C13.15 22 13.49 21.66 13.49 21.25C13.49 20.84 13.15 20.5 12.74 20.5H12.73V18.96C14.1 18.82 15.35 18.27 16.37 17.45L17.46 18.54C17.17 18.83 17.18 19.3 17.47 19.59C17.76 19.88 18.24 19.88 18.53 19.59L19.59 18.53C19.88 18.24 19.88 17.76 19.59 17.47C19.3 17.18 18.82 17.18 18.53 17.47L18.52 17.48L17.43 16.39C18.25 15.37 18.8 14.12 18.95 12.74H20.49C20.49 13.15 20.83 13.49 21.24 13.49C21.65 13.49 21.99 13.15 21.99 12.74V11.24C22 10.84 21.66 10.5 21.25 10.5ZM13.75 8C14.3 8 14.75 8.45 14.75 9C14.75 9.55 14.3 10 13.75 10C13.2 10 12.75 9.55 12.75 9C12.75 8.45 13.2 8 13.75 8ZM12 13C11.45 13 11 12.55 11 12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12C13 12.55 12.55 13 12 13ZM10.25 8C10.8 8 11.25 8.45 11.25 9C11.25 9.55 10.8 10 10.25 10C9.7 10 9.25 9.55 9.25 9C9.25 8.45 9.7 8 10.25 8ZM8.5 13C7.95 13 7.5 12.55 7.5 12C7.5 11.45 7.95 11 8.5 11C9.05 11 9.5 11.45 9.5 12C9.5 12.55 9.05 13 8.5 13ZM10.25 16C9.7 16 9.25 15.55 9.25 15C9.25 14.45 9.7 14 10.25 14C10.8 14 11.25 14.45 11.25 15C11.25 15.55 10.8 16 10.25 16ZM13.75 16C13.2 16 12.75 15.55 12.75 15C12.75 14.45 13.2 14 13.75 14C14.3 14 14.75 14.45 14.75 15C14.75 15.55 14.3 16 13.75 16ZM14.5 12C14.5 11.45 14.95 11 15.5 11C16.05 11 16.5 11.45 16.5 12C16.5 12.55 16.05 13 15.5 13C14.95 13 14.5 12.55 14.5 12Z' fill='white'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: 13px center;
  border-radius: 20px;
  font-family: Jost, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 23px;
  color: #fff;
}
</style>
