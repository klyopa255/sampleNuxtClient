<template>
  <section class="main__top-events top-events">
    <div class="top-events__title-wrapper">
      <h2 class="visually-hidden">Top events</h2>
    </div>
    <div v-swiper:mySwiper="swiperOption" class="top-events__wrapper">
      <ul class="top-events__list swiper-wrapper">
        <li
          v-for="(event, index) of loadedEvents"
          :key="index"
          class="top-events__item swiper-slide"
        >
          <article class="top-events__event event event--title">
            <h3 class="event__title">
              <nuxt-link
                :to="'/events/' + event.id"
                class="event__title-link"
                >{{ event.title }}</nuxt-link
              >
            </h3>
            <nuxt-link
              :to="'/events/' + event.id"
              class="event__img-link event__img-link--hero-section"
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
                width="436"
                height="260"
                class="event__img"
              />
            </nuxt-link>
            <img
              class="event__type-icon event__type-icon--top"
              width="32"
              height="32"
              :src="
                $nuxt.context.env.storageServerBaseUrl +
                event.event_type_id.icons
              "
              :alt="event.event_type_id.name"
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
                v-for="(artist, indexA) of event.artists.slice(0, 1)"
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
      <ul class="top-events__pagination pagination"></ul>
    </div>
  </section>
</template>

<script>
import { Swiper, Pagination } from 'swiper'
Swiper.use([Pagination])
export default {
  data() {
    return {
      loadedEvents: [],
      swiperOption: {
        grabCursor: true,
        spaceBetween: 20,
        slidesPerView: 'auto',
        watchOverflow: false,
        slidesPerGroup: 3,
        pagination: {
          bulletActiveClass: 'pagination__pag-item--top--current',
          bulletClass: 'pagination__pag-item--top',
          el: '.pagination',
          hiddenClass: 'pagination__pag-item--hidden',
          totalClass: 'pagination__pag-item--top',
          type: 'bullets',
          bulletElement: 'li',
          clickable: true,
        },
        breakpoints: {
          320: {
            slidesPerGroup: 1,
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 25,
          },
          520: {
            slidesPerGroup: 1,
            slidesPerView: 'auto',
          },
          768: {
            centeredSlides: false,
          },
        },
      },
    }
  },
  computed: {
    events() {
      return this.$store.getters['mainPageEvents/promotions']
    },
  },
  beforeMount() {
    this.events.forEach((it) => {
      this.loadedEvents.push(it)
    })
  },
}
</script>
