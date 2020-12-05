<template>
  <article class="profile-info__event event event--no-hover">
    <div v-if="event.isPromo" class="event__adv">
      <p class="section-flexline__advertising">Advertizing</p>
    </div>
    <h3 class="event__title">
      <nuxt-link :to="'/events/' + event.id" class="event__title-link">{{
        event.title
      }}</nuxt-link>
    </h3>
    <nuxt-link
      :to="'/events/' + event.id"
      class="event__img-link event__img-link--max-height"
    >
      <img
        :src="
          event.background
            ? $nuxt.context.env.storageBaseUrl +
              '/' +
              (event.background.path ? event.background.path : event.background)
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
      :src="$nuxt.context.env.storageServerBaseUrl + event.event_type_id.icons"
      :alt="event.event_type_id.name"
    />
    <ToCalendar modifier="event__to-calendar--low" :event-data="event" />
    <div class="event__one-line-wrapper">
      <p class="event__time-price event__time-price--inline">
        <time class="event__time" :datetime="$stringifyToISO(event.begin_at)">{{
          event.begin_at
        }}</time>
        <span v-if="event.price" class="event__price">$44</span>
      </p>
      <nuxt-link
        :to="'/profile/' + event.user_id"
        class="event__host event__host--inline"
        >{{ event.place }}</nuxt-link
      >
    </div>
    <IsInViewport
      v-if="event.isPromo"
      :in-viewport-once="true"
      :watched="{
        type: 'event',
        id: event.promo_id,
      }"
    />
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
                  ? $nuxt.context.env.storageBaseUrl + '/' + artist.photo
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
                  ? $nuxt.context.env.storageBaseUrl + '/' + artist.photo
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
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.event {
  position: relative;

  &__adv {
    position: absolute;
    width: 171px;
    top: 20px;
    right: 45px;
    z-index: 1;
  }
}
</style>
