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
    ),url(${userBackground})`,
      }"
    ></div>
    <!-- END User background -->

    <div class="main__wrapper">
      <!-- BEGIN Media component -->
      <Media
        v-if="userEdit.media"
        :target="userEdit.mediaTarget"
        page="user"
        mode="single"
        @click="toggleMedia"
        @emit-photo="setPhoto"
        @emit-background="setBackground"
      />
      <!-- END Media component -->
      <section
        v-if="isHeaderShouldAppear"
        class="main__container main__container--flex personal-info"
      >
        <!-- BEGIN User avatar section -->
        <div v-if="!userEdit.state" class="personal-info-wrapper">
          <div class="personal-info__avatar">
            <img v-if="user.photo" :src="storageBaseUrl + '/' + user.photo" />
          </div>
          <button
            v-if="!isMobile"
            class="personal-info__btn personal-info__btn--edit"
            type="button"
            @click.prevent="toggleEdit"
          >
            Edit Profile
          </button>
        </div>
        <!-- END User avatar section -->
        <!-- BEGIN Edit user avatar section -->
        <div
          v-if="userEdit.state"
          class="personal-info__wrapper personal-info__wrapper--min-mar-top"
        >
          <button
            class="personal-info__img-button"
            type="button"
            @click.prevent="toggleMedia('emit-background')"
          >
            <svg-icon
              name="icn_camera"
              width="32"
              height="32"
              class="personal-info__icon"
            />
            Upload Background
          </button>
          <div class="personal-info__avatar">
            <button
              class="personal-info__img-button personal-info__img-button--avatar"
              type="button"
              @click.prevent="toggleMedia('emit-photo')"
            >
              <div class="personal-info__ava-change">
                <svg-icon
                  name="icn_camera"
                  width="32"
                  height="32"
                  class="personal-info__icon"
                />
                Upload image
              </div>
              <img
                v-if="userEdit.photo"
                :src="
                  (userEdit.isSAva ? storageBaseUrl : tempStorageBaseUrl) +
                  '/' +
                  userEdit.photo
                "
              />
            </button>
          </div>
        </div>
        <!-- END Edit user avatar section -->
        <div
          v-if="!userEdit.state"
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
            <dt
              class="followers-info__following followers-info__following--term"
              :class="
                activeTab === 'profileFavorites' &&
                followingType === 'favorites'
                  ? 'followers-info__following--active'
                  : ''
              "
              @click="toggleFollow('profileFavorites', 'favorites')"
            >
              Favorites
            </dt>
            <dd
              class="followers-info__following followers-info__following--description"
            >
              <svg-icon
                name="icn_added_to_favorites"
                width="32"
                height="32"
                class="followers-info__icon"
              />
              {{ user.favorite_count }}
            </dd>
          </dl>
          <div
            class="summary-artist-info__more-btn-wrapper more-btn"
            @click.stop
          >
            <button
              class="summary-artist-info__more-btn more-btn__button"
              type="button"
              @click.prevent="toggleProfilePopover"
            >
              <span class="visually-hidden">More</span>
              <svg-icon
                name="icn_more"
                width="32"
                height="32"
                class="followers-info__icon"
              />
            </button>
            <ProfilePopover
              v-if="isProfilePopoverOpened"
              @click-toggle-edit="toggleEdit"
            />
          </div>
        </div>
        <div
          v-if="userEdit.state"
          class="personal-info__summary-artist-info summary-artist-info"
        >
          <div class="summary-artist-info__container">
            <h1 class="summary-artist-info__name">Edit Profile</h1>
          </div>
        </div>
      </section>
      <section
        class="main__container main__container--flex main__container--pos-rel profile-info-wrapper"
      >
        <button
          v-if="isMobile && !userEdit.state"
          class="personal-info__btn personal-info__btn--edit"
          type="button"
          @click.prevent="toggleEdit"
        >
          Edit Profile
        </button>
        <Sidebar v-if="!isMobile" :active-tab="activeTab" />
        <section v-if="!userEdit.state" class="profile-info">
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
                <h2 class="contacts__title">My Links</h2>
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
            <ProfileEvents v-else-if="activeTab === 'events'" />
            <ProfileFeed v-else-if="activeTab === 'myFeed'" />
            <ProfilePosted
              v-else-if="activeTab === 'posted'"
              :user="{
                id: user.id,
                name: user.name,
                photo: user.photo,
              }"
            />
            <ProfileMedia v-else-if="activeTab === 'media'" />
            <ProfileMyEvents v-else-if="activeTab === 'myEvents'" />
            <ProfileEventsWithMe v-else-if="activeTab === 'eventsWithMe'" />
            <ProfileFollowings
              v-else-if="activeTab === 'profileFollowings'"
              :following-type="followingType"
              :following-id="followingId"
            />
            <ProfileFavorites v-else-if="activeTab === 'profileFavorites'" />
          </div>
        </section>
        <section
          v-if="userEdit.state"
          class="profile-info profile-info--min-mar-top"
        >
          <div
            class="profile-info__input-wrapper profile-info__input-wrapper--transparent"
          >
            <label
              class="profile-info__input-label profile-info__input-label--full-width"
              for="name"
            >
              {{ user.user_type === 'venue' ? 'Venue name' : 'Name' }}
              <input
                id="name"
                v-model="userEdit.name"
                class="profile-info__edit-input"
                type="text"
                name="name"
                placeholder="Name"
                required
              />
            </label>
          </div>
          <div v-if="user.account_type !== 'user'">
            <div
              v-if="
                user.account_type === 'organizer' && user.user_type === 'Venue'
              "
            >
              <label
                class="profile-info__input-label profile-info__input-label--full-width"
              >
                Venue type
                <multiselect
                  v-model="userEdit.userSubtype"
                  :options="subtypeArr('organizer', 'Venue')"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  label="name"
                  track-by="name"
                  :searchable="false"
                  :max="1"
                ></multiselect>
              </label>
            </div>
            <div v-if="user.account_type === 'artist'">
              <label class="profile-info__input-label">
                Artist type
                <select
                  v-model="userEdit.userType"
                  class="profile-info__edit-input profile-info__edit-input--select"
                  @change="clearModel('userSubtype')"
                >
                  <option
                    v-for="(type, key) in userTypes.find((el) => {
                      return el.name === 'artist'
                    }).type"
                    :key="key"
                    :value="type.name"
                  >
                    {{ type.name }}
                  </option>
                </select>
              </label>
              <label
                v-if="userEdit.userType === 'Musician'"
                class="profile-info__input-label"
              >
                Musician type
                <multiselect
                  v-model="userEdit.userSubtype"
                  :options="subtypeArr('artist', 'Musician')"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  label="name"
                  track-by="name"
                ></multiselect>
              </label>
            </div>
          </div>
          <div class="profile-info__input-wrapper">
            <label class="profile-info__input-label" for="country"
              >Country
              <country-select
                v-model="userEdit.country"
                :country="userEdit.country"
                top-country="US"
                class="profile-info__edit-input profile-info__edit-input--select"
                name="country"
              />
            </label>
            <label class="profile-info__input-label" for="tel"
              >Phone number
              <input
                id="tel"
                v-model="userEdit.phone"
                class="profile-info__edit-input"
                type="tel"
                name="tel"
                placeholder="Phone number"
                required
              />
            </label>
            <label class="profile-info__input-label" for="zip"
              >Zip code
              <input
                id="zip"
                v-model="userEdit.zip"
                class="profile-info__edit-input"
                type="number"
                name="zip"
                placeholder="Zip code"
                required
              />
            </label>
          </div>
          <h2 class="profile-info__title">
            <label for="bio">{{
              user.account_type === 'user'
                ? 'Biography'
                : user.account_type === 'artist'
                ? 'Artist Biography'
                : 'Information'
            }}</label>
          </h2>
          <textarea
            id="bio"
            v-model="userEdit.biography"
            class="profile-info__edit-input profile-info__edit-input--textarea"
            placeholder="Biography"
            name="bio"
            cols="30"
            rows="10"
          >
Hailing from Bangor and Donaghadee, Northern Ireland, Two Door Cinema Club features singer/guitarist/programmer Alex Trimble, guitarist/singer Sam Halliday, and bassist/singer Kevin Baird. Trimble and Halliday met in school, and then hooked up with Baird through mutual friends. The trio began playing as Two Door Cinema Club in 2007 and skipped going to university to focus on the band. Fortunately, the gamble paid off -- the band's debut EP, Four Words to Stand On, was released in January 2009 by the hip French label Kitsuné to positive reviews and music blog buzz, which grew with the release of April's single "Something Good Can Work."</textarea
          >
          <h2 class="profile-info__title">
            <label for="address">Address</label>
          </h2>
          <textarea
            id="address"
            v-model="userEdit.adress"
            class="profile-info__edit-input profile-info__edit-input--textarea"
            placeholder="Address"
            name="address"
            cols="30"
            rows="2"
          ></textarea>
          <h2 class="profile-info__title">Contacts</h2>
          <ul class="profile-info__contacts-list">
            <li class="profile-info__contacts-item">
              <svg-icon
                name="icn_link-black"
                width="32"
                height="32"
                class="profile-info__contacts-icon"
              />
              <input
                id="url"
                v-model="userEdit.website"
                class="profile-info__contacts-link"
                placeholder="https://your.site.com"
                type="url"
                name="url"
              />
              <button
                class="profile-info__contacts-delete-btn"
                @click.prevent="clearModel('website')"
              >
                <span class="visually-hidden">Delete</span>
                <svg-icon
                  name="icn_close-small"
                  width="24"
                  height="24"
                  class="profile-info__contacts-icon profile-info__contacts-icon--black"
                />
              </button>
            </li>
            <li class="profile-info__contacts-item">
              <svg-icon
                name="icn_share_twitter"
                width="32"
                height="32"
                class="profile-info__contacts-icon"
              />
              <input
                v-model="userEdit.twitter"
                type="text"
                class="profile-info__contacts-link"
                placeholder="https://twitter.com/you"
              />
              <button
                class="profile-info__contacts-delete-btn"
                @click.prevent="clearModel('twitter')"
              >
                <span class="visually-hidden">Delete</span>
                <svg-icon
                  name="icn_close-small"
                  width="24"
                  height="24"
                  class="profile-info__contacts-icon profile-info__contacts-icon--black"
                />
              </button>
            </li>
            <li class="profile-info__contacts-item">
              <svg-icon
                name="icn_share_instagram"
                width="32"
                height="32"
                class="profile-info__contacts-icon"
              />
              <input
                v-model="userEdit.instagram"
                type="text"
                class="profile-info__contacts-link"
                placeholder="https://instagram.com/you"
              />
              <button
                class="profile-info__contacts-delete-btn"
                @click.prevent="clearModel('instagram')"
              >
                <span class="visually-hidden">Delete</span>
                <svg-icon
                  name="icn_close-small"
                  width="24"
                  height="24"
                  class="profile-info__contacts-icon profile-info__contacts-icon--black"
                />
              </button>
            </li>
            <li class="profile-info__contacts-item">
              <svg-icon
                name="icn_share_facebook"
                width="32"
                height="32"
                class="profile-info__contacts-icon"
              />
              <input
                v-model="userEdit.facebook"
                type="text"
                class="profile-info__contacts-link"
                placeholder="https://facebook.com/you"
              />
              <button
                class="profile-info__contacts-delete-btn"
                @click.prevent="clearModel('facebook')"
              >
                <span class="visually-hidden">Delete</span>
                <svg-icon
                  name="icn_close-small"
                  width="24"
                  height="24"
                  class="profile-info__contacts-icon profile-info__contacts-icon--black"
                />
              </button>
            </li>
          </ul>
          <div class="section-flexline profile-info__section-flexline">
            <button
              class="profile-info__reset-btn section-flexline__left-block"
              @click.prevent="toggleEdit"
            >
              Cancel
            </button>
            <button
              class="profile-info__confirm-btn section-flexline__right-block"
              @click.prevent="edit"
            >
              Save Changes
            </button>
          </div>
        </section>
      </section>
    </div>
  </main>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Vue from 'vue'
import vueCountryRegionSelect from 'vue-country-region-select'
import NuxtSSRScreenSize from 'nuxt-ssr-screen-size'
Vue.use(vueCountryRegionSelect)
export default {
  components: { Multiselect },
  mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],
  layout: 'profile',
  fetch() {
    switch (this.user.account_type) {
      case 'organizer':
        this.tabs = this.$addToObj(
          this.tabs,
          'myEvents',
          { text: 'My events', img: 'tabs_cal' },
          2
        )
        break
      case 'artist':
        this.tabs = this.$addToObj(
          this.tabs,
          'eventsWithMe',
          { text: 'My events', img: 'tabs_cal' },
          2
        )
        break
    }
  },
  data: () => ({
    isProfilePopoverOpened: false,
    file: '',
    tabs: {
      info: {
        text: 'Info',
        img: 'tabs_info',
      },
      events: {
        text: 'Events',
        img: 'tabs_cal',
      },
      posted: {
        text: 'Posts',
        img: 'tabs_add',
      },
      media: {
        text: 'Media',
        img: 'tabs_media',
      },
    },
    activeTab: 'info',

    userEdit: {
      state: false,
      media: false,
      isSAva: true,
      isSBackrgound: true,
      mediaTarget: '',
      userType: {},
      userSubtype: {},
      name: '',
      biography: '',
      adress: '',
      phone: '',
      zip: '',
      website: '',
      twitter: '',
      instagram: '',
      facebook: '',
      country: '',
      photo: '',
      background: '',
    },
    followingType: '',
    followingId: null,
  }),
  computed: {
    user() {
      return this.$auth.user
    },
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
    userTypes() {
      return this.$store.getters['userTypes/getTypes']
    },
    storageBaseUrl() {
      return this.$nuxt.context.env.storageBaseUrl
    },
    tempStorageBaseUrl() {
      return this.$nuxt.context.env.storageServerBaseUrl
    },
    userBackground() {
      if (this.userEdit.state) {
        if (!this.userEdit.background) {
          return ''
        } else {
          return (
            (this.userEdit.isSBackrgound
              ? this.storageBaseUrl
              : this.tempStorageBaseUrl) +
            '/' +
            this.userEdit.background
          )
        }
      } else {
        return this.user.background
          ? this.storageBaseUrl + '/' + this.user.background
          : ''
      }
    },
  },
  mounted() {
    this.$nuxt.$on('profile-edit', this.setLocalMedia)
    this.$nuxt.$on('click-outside-popover', this.closeProfilePopover)
  },
  methods: {
    closeProfilePopover() {
      this.isProfilePopoverOpened = false
    },
    toggleProfilePopover() {
      this.isProfilePopoverOpened = !this.isProfilePopoverOpened
    },
    toggleTab(tabName) {
      this.activeTab = tabName
    },
    toggleEdit() {
      const subTypeArr = []
      if (this.user.user_sub_type) {
        this.user.user_sub_type.forEach((el) => {
          subTypeArr.push({ name: el })
        })
      }

      this.userEdit.name = this.user.name
      this.userEdit.userType = this.user.user_type
      this.userEdit.userSubtype = subTypeArr
      this.userEdit.biography = this.user.biography
      this.userEdit.adress = this.user.address
      this.userEdit.phone = this.user.phone_number
      this.userEdit.zip = this.user.zip_code
      this.userEdit.country = this.user.country
      this.userEdit.website = this.user.website
      this.userEdit.photo = this.user.photo
      this.userEdit.background = this.user.background
      if (this.user.social_links) {
        this.userEdit.twitter =
          'https://twitter.com' + this.user.social_links.tw
        this.userEdit.instagram =
          'https://instagram.com' + this.user.social_links.i
        this.userEdit.facebook =
          'https://facebook.com' + this.user.social_links.f
      }

      if (!this.userTypes.length) {
        this.$store.dispatch('userTypes/getUserTypes').then(() => {
          this.userEdit.state = !this.userEdit.state
        })
      } else {
        this.userEdit.state = !this.userEdit.state
      }

      this.userEdit.isSAva = true
      this.userEdit.isSBackrgound = true
    },
    toggleMedia(target) {
      if (!this.userEdit.media) {
        this.userEdit.mediaTarget = target
      }
      this.userEdit.media = !this.userEdit.media
    },
    edit() {
      const userSave = async () => {
        const data = {
          name: this.userEdit.name,
          account_type: this.user.account_type,
          user_type: this.userEdit.userType,
          photo: this.userEdit.photo,
          background: this.userEdit.background,
          country: this.userEdit.country,
          phone_number: this.userEdit.phone,
          zip_code: this.userEdit.zip,
          address: this.userEdit.adress,
          biography: this.userEdit.biography,
          website: this.userEdit.website,
          facebook: this.userEdit.facebook,
          instagram: this.userEdit.instagram,
          twitter: this.userEdit.twitter,
        }
        if (
          this.userEdit.userSubtype !== '' &&
          Array.isArray(this.userEdit.userSubtype)
        ) {
          const subTypeArr = []
          this.userEdit.userSubtype.forEach((el) => {
            subTypeArr.push(el.name)
          })
          data.user_sub_type = subTypeArr
        }

        try {
          const resp = await this.$privAPI.$put('/profile', data, {
            headers: { Authorization: this.$auth.getToken('local') },
          })
          if (resp.status === 'success') {
            await this.$auth.fetchUser()
            this.userEdit.state = !this.userEdit.state
          }
        } catch (e) {
          // eslint-disable-next-line
          console.log(e)
        }
      }
      const localMedia = { items: [] }
      if (!this.userEdit.isSAva) {
        localMedia.items.push(this.userEdit.photo)
      }
      if (!this.userEdit.isSBackrgound) {
        localMedia.items.push(this.userEdit.background)
      }
      if (localMedia.items.length) {
        this.$store
          .dispatch('userMedia/confirmUploadMedia', localMedia)
          .then(() => {
            userSave()
          })
      } else {
        userSave()
      }
    },
    setPhoto(data) {
      this.userEdit.isSAva = true
      this.toggleMedia()
      this.userEdit.photo = data.path
      this.cropImg(this.storageBaseUrl + '/' + this.userEdit.photo)
    },
    setLink(link) {
      return link.startsWith('http://') || link.startsWith('https://')
        ? link
        : 'http://' + link
    },
    setBackground(data) {
      this.userEdit.isSBackrgound = true
      this.toggleMedia()
      this.userEdit.background = data.path
    },
    setLocalMedia(data) {
      if (this.userEdit.mediaTarget === 'emit-background') {
        this.userEdit.isSBackrgound = false
        this.userEdit.background = data
      } else {
        this.userEdit.isSAva = false
        this.userEdit.photo = data
        this.cropImg(this.tempStorageBaseUrl + '/' + data)
      }
      this.toggleMedia()
    },
    cropImg(url) {
      const eventName = 'event' + new Date()
      this.$nuxt.$emit('call-crop', {
        eventName,
        img: url,
      })
      this.$nuxt.$on(eventName, (payload) => {
        this.userEdit.isSAva = false
        this.userEdit.photo = payload.data
      })
    },
    clearModel(modelKey) {
      this.userEdit[modelKey] = ''
    },
    subtypeArr(accountType, userType) {
      return this.userTypes
        .find((el) => {
          return el.name === accountType
        })
        .type.find((el) => {
          return el.name === userType
        }).type
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
@import 'vue-multiselect/dist/vue-multiselect.min.css';
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
