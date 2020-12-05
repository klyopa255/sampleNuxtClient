<template>
  <div>
    <h1 class="main__title main__title--home">Find local artists & events</h1>
    <section class="main__top-events top-events top-events--home">
      <div class="top-events__title-wrapper top-events__title-wrapper--home">
        <h2 class="visually-hidden">Top events</h2>
        <ul
          class="top-events__pagination top-events__pagination--home pagination"
        ></ul>
      </div>
      <div
        v-swiper:mySwiper="swiperOption"
        class="top-events__wrapper top-events__wrapper--home"
      >
        <ul class="top-events__list top-events__list--home swiper-wrapper">
          <li
            v-for="(event, index) of loadedEvents.slice(0, 9)"
            :key="index"
            class="top-events__item top-events__item--home swiper-slide"
          >
            <article class="top-events__event event event--title event--home">
              <h3 class="event__title">
                <nuxt-link
                  :to="'/events/' + event.id"
                  class="event__title-link"
                  >{{ event.title }}</nuxt-link
                >
              </h3>
              <nuxt-link :to="'/events/' + event.id" class="event__img-link">
                <img
                  :src="
                    event.background
                      ? $nuxt.context.env.storageBaseUrl +
                        '/' +
                        event.background
                      : require('@/assets/img/defaultBackground.png')
                  "
                  :alt="event.title"
                  width="476"
                  height="534"
                  class="event__img"
                />
              </nuxt-link>
              <img
                class="event__type-icon event__type-icon--topc"
                width="32"
                height="32"
                :src="
                  $nuxt.context.env.storageServerBaseUrl +
                  event.event_type_id.icons
                "
                :alt="event.event_type_id.name"
              />
              <span
                v-if="event.status === 'virtual'"
                class="virtual-event event__virtual event__virtual--in-flow"
                >Virtual Event</span
              >
              <ToCalendar :event-data="event" modifier="event__to-calendar" />
              <p class="event__time-price">
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
              <p v-if="event.short_description" class="event__text">
                {{ event.short_description }}
              </p>
            </article>
          </li>
        </ul>
        <ul
          class="top-events__pagination top-events__pagination--home pagination"
        ></ul>
      </div>
    </section>
  </div>
</template>

<script>
import { Swiper, Pagination } from 'swiper'

Swiper.use([Pagination])
export default {
  data() {
    return {
      loadedEvents: [],
      swiperOption: {
        spaceBetween: 109,
        slidesPerView: 1,
        slidesPerGroup: 1,
        pagination: {
          bulletActiveClass: 'pagination__pag-item--top--current',
          bulletClass: 'pagination__pag-item--top',
          el: '.pagination',
          hiddenClass: 'pagination__pag-item--top--hidden',
          totalClass: 'pagination__pag-item',
          type: 'bullets',
          bulletElement: 'li',
          clickable: true,
        },
        breakpoints: {
          320: {
            centeredSlides: true,
            spaceBetween: 0,
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
