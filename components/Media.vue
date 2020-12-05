<template>
  <div class="user-form-wrapper" @click.stop="$emit('click')">
    <section class="media-library" @click.stop>
      <div class="media-library__header">
        <h1 class="media-library__title">Media library</h1>
        <button
          class="media-library__close-button"
          @click.prevent="$emit('click')"
        >
          <span class="visually-hidden">Close</span>
        </button>
      </div>
      <ul class="media-library__tabs-list">
        <li
          :class="
            'media-library__tabs-item media-library__tabs-item' +
            isCurrent('myMedia')
          "
          @click.prevent="changeMedia('myMedia')"
        >
          <a href="#" class="media-library__tabs-link">Images</a>
        </li>
        <li
          v-if="artist > 0"
          :class="
            'media-library__tabs-item media-library__tabs-item' +
            isCurrent('artistMedia')
          "
          @click.prevent="changeMedia('artistMedia')"
        >
          <a href="#" class="media-library__tabs-link">Artist images</a>
        </li>
        <li v-if="false" class="media-library__tabs-item">
          <a href="#" class="media-library__tabs-link">Videos (0)</a>
        </li>
        <li
          v-if="!isFileZone || mode === 'multiple'"
          class="media-library__tabs-item media-library__tabs-item--button"
        >
          <button
            class="media-library__button media-library__button--orange"
            :disabled="isOkDisabled"
            @click.prevent="emitImage"
          >
            Ok
          </button>
        </li>
        <li class="media-library__tabs-item media-library__tabs-item--button">
          <button
            class="media-library__button media-library__button--blue"
            @click.prevent="toggleFileZone"
          >
            {{ isFileZone ? 'My media' : 'Upload' }}
          </button>
        </li>
      </ul>

      <section class="media-library__section media-library__section--grow">
        <FileZone
          v-if="isFileZone"
          :page="page"
          :mode="mode"
          @image-uploaded="setImage"
          @image-deleted="clearUploaded"
        />
        <ul v-if="!isFileZone" class="media-library__pic-list">
          <li
            v-for="pic in userMedia"
            :key="pic.id"
            class="media-library__pic-item"
            :class="
              isSelectedPicture(pic) ? 'media-library__pic-item--selected' : ''
            "
          >
            <label>
              <img
                class="media-library__pic"
                width="210"
                height="210"
                :src="storageBaseUrl + '/' + pic.path"
              />
              <input
                v-model="selectedPicture"
                :type="mode === 'multiple' ? 'checkbox' : 'radio'"
                name="selected-picture"
                class="media-library__input media-library__input--hidden"
                :value="pic"
              />
            </label>
          </li>
        </ul>
        <ul
          v-if="isFileZone && uploadedPicture"
          class="media-library__pic-list"
        >
          <li class="media-library__pic-item media-library__pic-item--selected">
            <label>
              <img
                class="media-library__pic"
                width="210"
                height="210"
                :src="storageServerBaseUrl + '/' + uploadedPicture"
              />
              <input
                v-model="uploadedPicture"
                type="radio"
                name="selected-picture"
                class="media-library__input media-library__input--hidden"
                :value="uploadedPicture"
                checked
              />
            </label>
          </li>
        </ul>
        <button
          v-if="!isFileZone && pagen !== lastPage"
          type="button"
          class="main__more-button"
          @click.prevent="getUserMedia"
        >
          Explore More
        </button>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    target: {
      type: String,
      default: '',
    },
    page: {
      type: String,
      requared: true,
      default: '',
    },
    mode: {
      type: String,
      default: 'multiple', // single, multiple
    },
    artist: {
      type: Number,
      default: 0,
    },
  },
  data: () => {
    return {
      isFileZone: false,
      $on: '',
      selectedPicture: '',
      mediaTarget: 'myMedia', // myMedia, artistMedia
    }
  },
  computed: {
    userMedia() {
      return this.$store.getters['userMedia/getUserMedia']
    },
    storageBaseUrl() {
      return this.$nuxt.context.env.storageBaseUrl
    },
    storageServerBaseUrl() {
      return this.$nuxt.context.env.storageServerBaseUrl
    },
    pagen() {
      return this.$store.getters['userMedia/getPage']
    },
    lastPage() {
      return this.$store.getters['userMedia/getLastPage']
    },
    perPage() {
      return this.$store.getters['userMedia/getPerPage']
    },
    total() {
      return this.$store.getters['userMedia/getTotal']
    },
    idForMediaGet() {
      return this.mediaTarget === 'myMedia' ? this.$auth.user.id : this.artist
    },
    isOkDisabled() {
      let result = true
      if (this.isFileZone) {
        result = false
      } else if (this.mode === 'multiple') {
        if (this.selectedPicture.length) {
          result = false
        }
      } else if (this.selectedPicture) {
        result = false
      }
      return result
    },
  },
  beforeMount() {
    if (!this.pagen || this.userMedia.length < this.pagen * this.perPage) {
      this.getUserMedia()
    }
    if (this.mode === 'multiple') {
      this.selectedPicture = []
    }
    this.clearMediaState()
    this.getUserMedia()
  },
  methods: {
    getUserMedia() {
      this.$store.dispatch(
        'userMedia/getUserMedia',
        'user_id=' + this.idForMediaGet
      )
    },
    toggleFileZone() {
      this.clearSelected()
      this.clearUploaded()
      this.isFileZone = !this.isFileZone
    },
    clearSelected() {
      this.selectedPicture = ''
    },
    clearUploaded() {
      this.uploadedPicture = ''
    },
    setImage(data) {
      this.uploadedPicture = data
    },
    clearMediaState() {
      this.$store.dispatch('userMedia/clearState')
    },
    isSelectedPicture(pic) {
      if (this.mode === 'multiple') {
        return this.selectedPicture.find((el, i, arr) => {
          return el.id === pic.id
        })
      } else {
        return this.selectedPicture.id === pic.id
      }
    },
    emitImage() {
      const filePath = this.selectedPicture || this.uploadedPicture || []
      this.$emit(this.target, filePath)
    },
    isCurrent(name) {
      return this.mediaTarget === name ? '--current' : ''
    },
    changeMedia(name) {
      this.mediaTarget = name
      this.clearSelected()
      this.clearUploaded()
      this.clearMediaState()
      this.getUserMedia()
    },
  },
}
</script>
