<template>
  <div class="page-content">
    <div>
      <div
        style="
          height: 603px;
          position: absolute;
          top: 97px;
          left: 0;
          width: 100%;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        "
        :style="{
          backgroundImage: `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 96px,
      rgba(0, 0, 0, 0.6) 603px,
      white 603px,
      white 100%
    ),url(${
      event.background
        ? $nuxt.context.env.storageBaseUrl + '/' + event.background
        : require('@/assets/img/defaultBackground.png')
    })`,
        }"
      ></div>
      <section class="main__container">
        <article class="event-banner">
          <div class="event-banner__wrapper">
            <span
              v-if="event.status === 'virtual'"
              class="virtual-event event-banner__virtual"
              >Virtual Event</span
            >
            <div class="event-banner__info">
              <img
                :src="
                  $nuxt.context.env.storageServerBaseUrl +
                  '/' +
                  event.event_type_id.icons
                "
                class="event-banner__type-icon"
                width="32"
                height="32"
                :alt="event.event_type_id.name"
              />
              <p class="event-banner__time-price">
                <time
                  class="event-banner__time"
                  :datetime="$stringifyToISO(event.begin_at)"
                  >{{ $stringifyToISO(event.begin_at) }}</time
                >
                <span v-if="event.price" class="event-banner__price">$50</span>
              </p>
              <nuxt-link
                :to="'/profile/' + event.user_id"
                class="event__host"
                >{{ event.place }}</nuxt-link
              >
            </div>
            <h1 class="event-banner__title">
              <a href="#" class="event-banner__title-link">{{ event.title }}</a>
            </h1>
            <p v-if="event.shortDescription" class="event-banner__text">
              {{ event.shortDescription }}
            </p>
            <ToCalendar
              modifier=" event-banner__to-calendar"
              :event-data="event"
            />
            <button
              v-if="isOwnEvent"
              type="button"
              class="personal-info__btn personal-info__btn--edit"
              style="width: 225px; margin: 15px 5px"
              @click.prevent="editEvent"
            >
              Edit Event
            </button>
          </div>
          <EventMedia :media="event.media" />
        </article>
      </section>
      <section
        class="main__container main__container--flex"
        :class="!isMapEnabled ? ' main__container--padding-bottom' : ''"
      >
        <h2 class="visually-hidden">Info</h2>
        <div class="main__event-info event-info">
          <div v-if="event.description" :class="'event-info__text'">
            <!-- eslint-disable-next-line -->
            <div v-html="event.description"></div>
          </div>
          <div
            class="event-info__share share-buttons"
            :class="isMapTouchable ? '' : ' share-buttons--z-min2'"
          >
            <button
              class="share-buttons__btn share-buttons__btn--likes"
              type="button"
              :disabled="isLikeDisabled"
              @click.prevent="like"
            >
              <svg-icon
                class="share-buttons__icn"
                :name="event.liked ? 'icn_liked' : 'icn_like'"
                fill="white"
              />
              {{ event.likes_count }}
            </button>
            <button
              class="share-buttons__btn share-buttons__btn--likes"
              type="button"
              disabled
            >
              <svg-icon class="share-buttons__icn" name="icn_comment-white" />
              {{ event.comments_count ? event.comments_count : '' }}
            </button>
            <button
              class="share-buttons__btn share-buttons__btn--likes"
              type="button"
              :disabled="isFavButtonDisabled"
              @click="favorites"
            >
              <svg-icon
                class="share-buttons__icn"
                :name="
                  event.favorited
                    ? 'icn_added-to-favorites'
                    : 'icn_add-to-favorites'
                "
              />
            </button>
            <button
              class="share-buttons__btn share-buttons__btn--share"
              type="button"
              @click.stop.prevent="isShareListOpened = !isShareListOpened"
            >
              <svg-icon class="share-buttons__icn" name="icn_share" />
              Share
            </button>
            <ShareItList
              :class="isShareListOpened ? ' pop-over--visible' : ''"
              :message="event.shortDescription"
              :reposted="{
                id: event.id,
                type: 'event',
              }"
            />
          </div>
          <ul
            v-if="event.tags && event.tags.length > 0"
            class="event-info__hashtags hashtags"
          >
            <li
              v-for="(tag, index) of event.tags"
              :key="index"
              class="hashtags__item"
            >
              <a class="hashtags__link" href="#">#{{ tag }}</a>
            </li>
          </ul>
          <EventMedia :media="event.media" :is-full="true" />
          <div
            class="event-comments"
            :class="isMapTouchable ? '' : 'negative-z-i'"
          >
            <Comments
              :commented-object="{
                id: event.id,
                type: 'event',
                comments: event.comments,
                commentsCount: event.comments_count,
                updateCountEventName: updateCountEventName,
              }"
              v-on="{ [updateCountEventName]: updateCommentsCount }"
            />
          </div>
        </div>
        <div class="event-info__aside-info aside-info">
          <h2 v-if="event.organizer_info.name" class="aside-info__main-title">
            {{ event.organizer_info.name }}
          </h2>
          <div
            v-if="event.organizer_info.photo"
            class="aside-info__img-wrapper"
          >
            <img
              :src="
                $nuxt.context.env.storageBaseUrl +
                '/' +
                event.organizer_info.photo
              "
              width="325"
              height="218"
              alt="Picture of the place"
            />
          </div>
          <address v-if="event.address" class="aside-info__address">
            {{ event.address }}
          </address>
          <a
            v-if="event.organizer_info.phone_number"
            class="aside-info__phone"
            :href="event.organizer_info.phone_number"
            >{{ event.organizer_info.phone_number }}</a
          >
          <a
            v-if="event.organizer_info.website"
            class="aside-info__website"
            :href="event.organizer_info.website"
            >{{ event.organizer_info.website }}</a
          >
          <div class="aside-info__list-wrapper">
            <h3 class="aside-info__title">Featured Artists</h3>
            <ul
              v-if="event.artists && event.artists.length > 0"
              class="aside-info__list"
            >
              <li
                v-for="(artist, index) in event.artists"
                :key="index"
                class="aside-info__item"
              >
                <div
                  v-if="typeof artist.id === 'number'"
                  style="width: 100%; display: flex"
                >
                  <nuxt-link
                    :to="'/profile/' + artist.id"
                    class="aside-info__list-img-wrapper"
                  >
                    <img
                      :src="
                        artist.photo
                          ? $nuxt.context.env.storageBaseUrl +
                            '/' +
                            artist.photo
                          : require('@/assets/img/defaultAva.png')
                      "
                      width="48"
                      height="48"
                      alt="Guest avatar"
                    />
                  </nuxt-link>
                  <nuxt-link
                    :to="'/profile/' + artist.id"
                    class="aside-info__link"
                    ><span>{{ artist.name }}</span></nuxt-link
                  >
                </div>
                <div v-else style="width: 100%; display: flex">
                  <a class="aside-info__list-img-wrapper">
                    <img
                      :src="
                        artist.photo
                          ? $nuxt.context.env.storageBaseUrl +
                            '/' +
                            artist.photo
                          : require('@/assets/img/defaultAva.png')
                      "
                      width="48"
                      height="48"
                      alt="Guest avatar"
                    />
                  </a>
                  <a class="aside-info__link"
                    ><span>{{ artist.name }}</span></a
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <GoogleMap
        v-if="isMapEnabled && event.address"
        class="main__map-section map-section"
        :class="isMapTouchable ? '' : ' map-section--z-min2'"
        :address="{
          address: event.address,
          coords: {
            lng: Number(event.lng),
            lat: Number(event.lat),
          },
        }"
        :hide-map-callback="hideMap"
        :marker-icon="
          $nuxt.context.env.storageServerBaseUrl +
          '/markers/' +
          event.event_type_id.icons.slice(6)
        "
      />
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  async asyncData({ $auth, $pubAPI, params, store }) {
    const query = $auth.loggedIn ? `?user_id=${$auth.user.id}` : ''
    const resp = await $pubAPI.$get(
      $pubAPI.defaults.baseURL + '/events/' + params.id + query
    )
    const event = resp.data

    return { event }
  },
  data() {
    return {
      isMapTouchable: true,
      isMapEnabled: true,
      isLikeDisabled: false,
      isShareListOpened: false,
      isFavButtonDisabled: false,
    }
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  computed: {
    isOwnEvent() {
      return this.$auth.loggedIn
        ? this.event.user_id === this.$auth.user.id
        : false
    },
    updateCountEventName() {
      return `event-${this.event.id}-count-updated`
    },
  },
  mounted() {
    this.$nuxt.$on('media-popup', () => {
      this.isMapTouchable = !this.isMapTouchable
    })
    this.$nuxt.$on('click-outside-popover', () => {
      this.isShareListOpened = false
    })
  },
  methods: {
    hideMap() {
      this.isMapEnabled = false
    },
    editEvent() {
      if (this.isOwnEvent) {
        this.$router.push('/event-creation?edit=' + this.event.id)
      }
    },
    like() {
      if (this.$auth.loggedIn) {
        this.isLikeDisabled = true
        if (!this.event.liked) {
          this.$privAPI
            .$post(
              this.$privAPI.defaults.baseURL + '/events/likes',
              {
                event_id: this.event.id,
              },
              {
                headers: { Authorization: this.$auth.getToken('local') },
              }
            )
            .then(
              () => {
                this.successHandler(1)
              },
              (e) => {
                this.errorHandler()
              }
            )
        } else {
          this.$privAPI
            .$delete(
              this.$privAPI.defaults.baseURL + `/events/likes/${this.event.id}`,
              {
                headers: { Authorization: this.$auth.getToken('local') },
              }
            )
            .then(
              () => {
                this.successHandler(-1)
              },
              (e) => {
                this.errorHandler()
              }
            )
        }
      } else {
        this.$nuxt.$emit('please-login', {
          message: 'Please sign in to like this event.',
        })
      }
    },
    successHandler(difference) {
      this.event.liked = !this.event.liked
      this.event.likes_count += difference
      this.isLikeDisabled = false
    },
    errorHandler() {
      this.$nuxt.$emit('call-popup', {
        title: 'Error',
        icon: 'error',
        message: 'Something went wrong. Please try again later.',
      })
    },
    updateCommentsCount(count) {
      this.event.comments_count = count
    },
    favorites() {
      this.isFavButtonDisabled = true
      const data = {
        favorites_id: this.event.id,
        favorites_type: 'event',
      }
      if (this.event.favorited) {
        this.$privAPI
          .$delete(
            this.$privAPI.defaults.baseURL +
              `/favorites/${data.favorites_id}/?type=${data.favorites_type}`,
            {
              headers: { Authorization: this.$auth.getToken('local') },
            }
          )
          .then(
            (resp) => {
              this.$auth.fetchUser()
              this.event.favorited = false
              this.isFavButtonDisabled = false
            },
            (e) => {
              // eslint-disable-next-line
              console.log(e)
              this.errorHandler()
            }
          )
      } else {
        this.$privAPI
          .$post(this.$privAPI.defaults.baseURL + '/favorites', data, {
            headers: { Authorization: this.$auth.getToken('local') },
          })
          .then(
            (resp) => {
              this.$auth.fetchUser()
              this.event.favorited = true
              this.isFavButtonDisabled = false
            },
            (e) => {
              // eslint-disable-next-line
              console.log(e)
              this.errorHandler()
            }
          )
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.event-info {
  width: 100%;
  padding-top: 58px;
  padding-left: 160px;
  display: flex;
  flex-direction: column;
  margin-right: 30px;
}
.event-comments {
  order: 6;
  margin-top: 20px;
}
.negative-z-i {
  z-index: -1;
}
.share-buttons {
  &__btn {
    padding-right: 8px;
  }
}
</style>
