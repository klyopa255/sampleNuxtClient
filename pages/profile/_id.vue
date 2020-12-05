<template>
  <main
    class="main main--white main--profile main--profile--user main--no-slider"
  >
    <!-- BEGIN User background -->
    <div
      v-if="isHeaderShouldAppear"
      class="personal-info__bg"
      :style="{
        backgroundImage: `linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 96px,
      rgba(0, 0, 0, 0.6) 575px,
      white 575px,
      white 100%
    ),url(${$nuxt.context.env.storageBaseUrl + '/' + user.background})`,
      }"
    ></div>
    <!-- END User background -->

    <div class="main__wrapper">
      <section
        v-if="isHeaderShouldAppear"
        class="main__container main__container--flex personal-info"
      >
        <!-- BEGIN User avatar section -->
        <div class="personal-info-wrapper">
          <div class="personal-info__avatar">
            <img
              v-if="user.photo"
              :src="$nuxt.context.env.storageBaseUrl + '/' + user.photo"
            />
          </div>
          <button
            class="personal-info__btn personal-info__btn--follow"
            type="button"
            :disabled="!isFollowButton"
            @click.prevent="followAction"
          >
            {{
              ($auth.loggedIn && !user.following) || !$auth.loggedIn
                ? 'Follow'
                : 'Unfollow'
            }}
          </button>
        </div>
        <!-- END User avatar section -->

        <div
          class="personal-info__summary-artist-info summary-artist-info summary-artist-info--flex-end"
        >
          <div class="summary-artist-info__container">
            <h1
              class="summary-artist-info__name summary-artist-info__name--mar-top"
            >
              <span v-if="user.name">{{ user.name }}</span>
            </h1>
            <p class="summary-artist-info__user-n-place">
              <span
                v-if="user.user_type"
                class="summary-artist-info__text summary-artist-info__text--user-type"
                >{{ user.user_type }}</span
              >
              <span class="summary-artist-info__text">{{
                user.country || 'USA'
              }}</span>
            </p>
          </div>
          <dl
            class="summary-artist-info__container summary-artist-info__container--list followers-info"
          >
            <dt
              class="followers-info__following followers-info__following--term"
              :class="
                activeTab === 'profileFollowings' &&
                followingType === 'followings'
                  ? 'followers-info__following--active'
                  : ''
              "
              @click="toggleFollow('profileFollowings', 'followings')"
            >
              Following
            </dt>
            <dd
              class="followers-info__following followers-info__following--description"
            >
              <svg-icon
                name="icn_added_to_bookmarks"
                width="32"
                height="32"
                class="followers-info__icon"
              />
              {{ user.following_count }}
            </dd>
            <dt
              class="followers-info__following followers-info__following--term"
              :class="
                activeTab === 'profileFollowings' &&
                followingType === 'followers'
                  ? 'followers-info__following--active'
                  : ''
              "
              @click="toggleFollow('profileFollowings', 'followers')"
            >
              Followers
            </dt>
            <dd
              class="followers-info__following followers-info__following--description"
            >
              <svg-icon
                name="icn_added_to_likes"
                width="32"
                height="32"
                class="followers-info__icon"
              />
              {{ user.followers_count }}
            </dd>
          </dl>
        </div>
      </section>
      <section
        class="main__container main__container--flex main__container--pos-rel profile-info-wrapper"
      >
        <Sidebar v-if="!isMobile" :active-tab="activeTab" />
        <section class="profile-info">
          <div class="profile-info__tabs info-tabs">
            <ul class="info-tabs__list">
              <li v-for="(tab, key) in tabs" :key="key" class="info-tabs__item">
                <a
                  href="#"
                  class="info-tabs__link"
                  :class="key === activeTab ? 'info-tabs__link--current' : ''"
                  :data-name="key"
                  @click.prevent="toggleTab(key)"
                >
                  <span class="info-tabs__text">{{ tab.text }} </span>
                  <img
                    class="info-tabs__icon"
                    :src="tab.img ? require(`~/assets/svg/${tab.img}.svg`) : ''"
                  />
                </a>
              </li>
            </ul>
            <div v-if="activeTab === 'info'">
              <Sidebar v-if="isMobile" :active-tab="activeTab" />
              <div v-if="user.user_sub_type && user.user_sub_type.length">
                <h2 class="info-tabs__title">{{ user.user_type }} type</h2>
                <p class="info-tabs__text">
                  <span
                    v-for="(subtype, key) in user.user_sub_type"
                    :key="key"
                    >{{
                      subtype +
                      (key !== user.user_sub_type.length - 1 ? ', ' : '')
                    }}</span
                  >
                </p>
              </div>

              <h2 class="info-tabs__title">
                {{
                  user.account_type === 'user'
                    ? 'Biography'
                    : user.account_type === 'artist'
                    ? 'Artist Biography'
                    : 'Information'
                }}
              </h2>
              <p class="info-tabs__text">
                {{ user.biography || 'No information yet...' }}
              </p>
              <div class="profile-tabs__contacts contacts">
                <h2 class="contacts__title">Contacts</h2>
                <div
                  v-if="
                    (user.address && user.address !== 'Not point') ||
                    (user.phone_number && user.phone_number !== 'Not point') ||
                    user.website ||
                    user.social_links
                  "
                >
                  <address
                    v-if="user.address && user.address !== 'Not point'"
                    class="contacts__address"
                  >
                    {{ user.address }}
                  </address>
                  <div>
                    <h2 class="contacts__zip-title">Zip code:</h2>
                    <span class="contacts__zip-code">{{ user.zip_code }}</span>
                  </div>

                  <a
                    v-if="
                      user.phone_number && user.phone_number !== 'Not point'
                    "
                    class="contacts__link contacts__link--tel"
                    :href="'tel:+' + user.phone_number"
                    >{{ user.phone_number }}</a
                  >
                  <a
                    v-if="user.website"
                    :href="setLink(user.website)"
                    class="contacts__link"
                    target="_blank"
                    >{{ user.website }}</a
                  >
                  <ul v-if="user.social_links" class="contacts__list socials">
                    <li v-if="user.social_links.tw" class="socials__item">
                      <a
                        :href="'https://twitter.com/' + user.social_links.tw"
                        class="socials__link"
                        target="_blank"
                      >
                        <span class="visually-hidden">Twitter</span>
                        <svg-icon
                          name="icn_share_twitter"
                          width="44"
                          height="44"
                          class="socials__icon socials__icon--black"
                        />
                      </a>
                    </li>
                    <li v-if="user.social_links.i" class="socials__item">
                      <a
                        :href="'https://instagram.com/' + user.social_links.i"
                        class="socials__link"
                        target="_blank"
                      >
                        <span class="visually-hidden">instagram</span>
                        <svg-icon
                          name="icn_share_instagram"
                          width="44"
                          height="44"
                          class="socials__icon socials__icon--black"
                        />
                      </a>
                    </li>
                    <li v-if="user.social_links.f" class="socials__item">
                      <a
                        :href="'https://facebook.com/' + user.social_links.f"
                        class="socials__link"
                        target="_blank"
                      >
                        <span class="visually-hidden">facebook</span>
                        <svg-icon
                          name="icn_share_facebook"
                          width="44"
                          height="44"
                          class="socials__icon socials__icon--black"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
                <p v-else>No contacts yet...</p>
              </div>
            </div>
            <ProfileMyEvents v-else-if="activeTab === 'myEvents'" />
            <ProfileEventsWithMe v-else-if="activeTab === 'eventsWithMe'" />
            <ProfilePosted
              v-else-if="activeTab === 'posted'"
              :user="{
                id: user.id,
                name: user.name,
                photo: user.photo,
              }"
            />
            <ProfileMedia v-else-if="activeTab === 'media'" />
            <ProfileFollowings
              v-else-if="activeTab === 'profileFollowings'"
              :following-type="followingType"
              :following-id="followingId"
            />
          </div>
        </section>
      </section>
    </div>
  </main>
</template>

<script>
import NuxtSSRScreenSize from 'nuxt-ssr-screen-size'
export default {
  auth: false,
  layout: 'profile',
  mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  fetch() {
    switch (this.user.account_type) {
      case 'organizer':
        this.tabs = this.$addToObj(
          this.tabs,
          'myEvents',
          { text: 'Events', img: 'tabs_cal' },
          2
        )
        break
      case 'artist':
        this.tabs = this.$addToObj(
          this.tabs,
          'eventsWithMe',
          { text: 'Events' },
          2
        )
        break
    }
  },
  async asyncData({ $auth, $pubAPI, params }) {
    const query = $auth.loggedIn ? '?following_id=' + $auth.user.id : ''
    const resp = await $pubAPI.$get(
      $pubAPI.defaults.baseURL + '/user/' + params.id + query
    )
    const user = resp.data

    return { user }
  },
  data: () => {
    return {
      tabs: {
        info: {
          text: 'Info',
          img: 'tabs_info',
        },
        posted: {
          text: 'Posted',
          img: 'tabs_add',
        },
        media: {
          text: 'Media',
          img: 'tabs_media',
        },
      },
      activeTab: 'info',
      isFollowButton: true,
      followingType: '',
      followingId: null,
    }
  },
  computed: {
    isMobile() {
      return this.$vssWidth <= 736
    },
    isHeaderShouldAppear() {
      // have to use this hack due architecture oversight
      // when on mobile, only show this block if we're at info tab
      if (!this.isMobile) {
        return true
      }
      if (this.isMobile && this.activeTab === 'info') {
        return true
      }
      return false
    },
  },
  methods: {
    toggleTab(tabName) {
      this.activeTab = tabName
    },
    setLink(link) {
      return link.startsWith('http://') || link.startsWith('https://')
        ? link
        : 'http://' + link
    },
    followAction() {
      if (this.$auth.loggedIn) {
        this.isFollowButton = false
        if (this.user.following) {
          this.$privAPI
            .$delete(
              this.$privAPI.defaults.baseURL + '/followers/' + this.user.id,
              {
                headers: { Authorization: this.$auth.getToken('local') },
              }
            )
            .then(
              (resp) => {
                this.succssesHandler(-1)
              },
              (e) => {
                this.error()
              }
            )
        } else {
          this.$privAPI
            .$post(
              this.$privAPI.defaults.baseURL + '/followers',
              {
                user_id: this.user.id,
              },
              {
                headers: { Authorization: this.$auth.getToken('local') },
              }
            )
            .then(
              (resp) => {
                this.succssesHandler(1)
              },
              (e) => {
                this.error()
              }
            )
        }
      } else {
        this.$nuxt.$emit('please-login', {
          message: 'Please sign in to follow this user.',
        })
      }
    },
    error() {
      this.$nuxt.$emit('call-popup', {
        title: 'Error',
        icon: 'error',
        message: 'Something went wrong. Try again later.',
      })
    },
    succssesHandler(countDifference) {
      this.isFollowButton = true
      this.user.following = !this.user.following
      this.user.followers_count += countDifference
    },
    toggleFollow(tabName, context) {
      this.followingType = context
      this.followingId = this.user.id
      this.activeTab = tabName
    },
  },
  head() {
    return {
      title: 'Staj | Profile',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.personal-info__btn {
  &--follow {
    color: white;
  }
}
.followers-info {
  &__following {
    &--term {
      cursor: pointer;
    }
    &--active {
      cursor: auto;
      text-decoration: underline;
    }
  }
}
</style>
