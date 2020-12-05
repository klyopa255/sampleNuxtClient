<template>
  <section class="event-form__label">
    <p class="event-form__title event-form__title--center">Adding Artist</p>
    <ul class="event-form__type-list">
      <li class="event-form__type-item">
        <a
          href="#"
          class="event-form__type-link"
          :class="tabCount === 0 ? ' event-form__type-link--current' : ''"
          @click.prevent="mutateTabCount(0)"
          >Choose Artist</a
        >
      </li>
      <li class="event-form__type-item">
        <a
          href="#"
          class="event-form__type-link"
          :class="tabCount === 1 ? ' event-form__type-link--current' : ''"
          @click.prevent="mutateTabCount(1)"
          >Add New Artist</a
        >
      </li>
    </ul>
    <div v-if="tabCount === 0">
      <div class="event-form__input-wrapper">
        <input
          v-model="searchName"
          class="event-form__input event-form__input--artist"
          type="text"
          placeholder="Search artists"
          @submit.prevent=""
          @keypress.enter="searchArtists"
        />
        <button
          v-if="searchName.length"
          type="button"
          class="event-form__input-button"
          @click="searchArtists"
        >
          Find
        </button>
      </div>
      <ul v-if="artists.length" class="event-form__follow-list follow-list">
        <li
          v-for="(artist, i) in artists"
          :key="i"
          class="follow-list__item section-flexline"
        >
          <label>
            <div
              class="section-flexline__left-block section-flexline__left-block--flex"
            >
              <span
                class="section-flexline__avatar-link section-flexline__avatar-link--mar-right"
                style="
                  width: 48px;
                  height: 48px;
                  background-color: #000;
                  overflow: hidden;
                "
              >
                <img
                  :src="
                    avatarLink(artist.photo) ||
                    require('@/assets/img/defaultAva.png')
                  "
                  :alt="artist.name"
                  class="section-flexline__avatar"
                  style="width: 100%; height: auto"
                />
              </span>
              <span class="section-flexline__name-link">{{ artist.name }}</span>
            </div>
            <div
              class="section-flexline__right-block section-flexline__right-block--flex"
            >
              <span
                class="section-flexline__follow-marker section-flexline__follow-marker--gray-text"
                >{{ isArtistChecked(artist.id) ? 'Delete' : 'Add' }}</span
              >
            </div>
            <input
              v-model="checkedArtists"
              type="checkbox"
              :value="artist"
              @change="$emit('change-artists-list', { data: artist })"
            />
          </label>
        </li>
      </ul>
      <p v-else class="event-form__search-message">Not Found</p>
    </div>
    <div v-if="tabCount === 1">
      <div class="event-form__artist-img-wrapper">
        <button
          type="button"
          class="event-form__button event-form__button--add-img"
          style="
            color: white;
            background-position: center;
            background-size: cover;
          "
          :style="
            backgroundImage()
              ? { backgroundImage: 'url(' + backgroundImage() + ')' }
              : {}
          "
          @click.prevent="toggleMedia"
        >
          <svg-icon
            width="32"
            height="32"
            class="event-form__icon"
            name="icn_camera"
          />
          Upload avatar
        </button>
        <Media
          v-if="isMedia"
          page="artist"
          target="shadow-artist-avatar"
          mode="single"
          @click="toggleMedia"
          @shadow-artist-avatar="setRemoteShadowAvatar"
        />
        <p class="event-form__img-text">
          Upload image. Jpg, Png, Gif.Not less than 320x320 pix.
        </p>
      </div>
      <fieldset class="event-form__fieldset">
        <div class="event-form__fieldset-wrapper">
          <label for="artist-name" class="event-form__label"
            >Name
            <input
              id="artist-name"
              v-model="shadowArtist.name"
              type="text"
              class="event-form__input"
              placeholder="Name"
              required
          /></label>
        </div>
      </fieldset>
    </div>
    <div style="display: flex; justify-content: space-between">
      <button
        v-if="tabCount"
        class="event-form__button event-form__button--gold"
        type="button"
        @click.prevent="createShadowArtist"
      >
        Add
      </button>
      <button
        class="event-form__button event-form__button--gold"
        type="button"
        @click.prevent="$emit('close-add-artist')"
      >
        Close
      </button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    artistsProp: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      tabCount: 0,
      checkedArtists: [],
      searchName: '',
      isMedia: false,
      shadowArtist: {
        id: '',
        name: '',
        amazonStorage: true,
        photo: '',
      },
    }
  },
  computed: {
    artists() {
      return this.$store.getters['createEvent/getArtists']
    },
    status() {
      return this.$store.getters['createEvent/getStatus']
    },
    message() {
      return this.$store.getters['createEvent/getMessage']
    },
    storageBaseUrl() {
      return this.$nuxt.context.env.storageBaseUrl
    },
    tempStorageBaseUrl() {
      return this.$nuxt.context.env.storageServerBaseUrl
    },
  },
  beforeMount() {
    if (!this.artists.length) {
      this.$store.dispatch('createEvent/getArtists')
    }
    this.artistsProp.forEach((el) => {
      this.checkedArtists.push(el)
    })
  },
  mounted() {
    this.$nuxt.$on('delete-artist-from-event', (payload) => {
      this.checkedArtists = payload
    })
    this.$nuxt.$on('artist-edit', (payload) => {
      this.shadowArtist.photo = payload
      this.shadowArtist.amazonStorage = false
      this.isMedia = false
      this.cropImg(this.backgroundImage())
    })
  },
  methods: {
    mutateTabCount(i) {
      this.tabCount = i
    },
    avatarLink(path) {
      if (path) {
        return this.storageBaseUrl + '/' + path
      }
      return false
    },
    isArtistChecked(artistId) {
      return this.checkedArtists.find((el) => {
        return el.id === artistId
      })
    },
    searchArtists() {
      this.$store.dispatch('createEvent/searchArtists', this.searchName)
    },
    createShadowArtist() {
      if (this.isValid(this.shadowArtist.name)) {
        this.shadowArtist.id = new Date()
        this.$emit('add-shadow-artist', this.shadowArtist)
        this.shadowArtist = {
          id: '',
          name: '',
          amazonStorage: true,
          photo: '',
        }
      } else {
        this.$nuxt.$emit('call-popup', {
          title: 'Missing required data',
          icon: 'error',
          message:
            "Arist's name is required and must be at least three characters long",
        })
      }
    },
    backgroundImage() {
      if (!this.shadowArtist.photo) return ''
      let base = ''
      if (this.shadowArtist.amazonStorage) {
        base = this.storageBaseUrl
      } else {
        base = this.tempStorageBaseUrl
      }
      return base + '/' + this.shadowArtist.photo
    },
    cropImg(url) {
      const eventName = 'event' + new Date()
      this.$nuxt.$emit('call-crop', {
        eventName,
        img: url,
      })
      this.$nuxt.$on(eventName, (payload) => {
        this.shadowArtist.photo = payload.data
        this.shadowArtist.amazonStorage = false
      })
    },
    toggleMedia() {
      this.isMedia = !this.isMedia
    },
    setRemoteShadowAvatar(payload) {
      this.shadowArtist.amazonStorage = true
      this.shadowArtist.photo = payload.path
      this.cropImg(this.backgroundImage())
      this.toggleMedia()
    },
    isValid(model) {
      if (model.length < 3) {
        return false
      } else {
        return true
      }
    },
  },
}
</script>

<style lang="scss">
.follow-list {
  user-select: none;
  &__item {
    & label {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    & input {
      display: none;
    }
  }
}
</style>
