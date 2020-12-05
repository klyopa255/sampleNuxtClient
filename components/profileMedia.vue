<template>
  <div>
    <section class="info-tabs__filters filters">
      <h2 class="visually-hidden">Filters</h2>
      <div v-if="mode === 'my-media'" class="filters__wrapper">
        <ul class="filters__list filters__list--justify">
          <li class="filters__item">
            <label
              class="filters__label filters__label--purple filters__label--long"
              @click="toggleFileLoader"
              >{{ !isFileLoader ? 'Add media' : 'Ok' }}</label
            >
          </li>
        </ul>
      </div>
    </section>
    <FileZone
      v-if="isFileLoader && mode === 'my-media'"
      page="media"
      @image-uploaded="setImage"
    />
    <section class="profile-info__events-section">
      <h2 class="visually-hidden">My Media</h2>
      <ul
        class="profile-info__events-list profile-info__events-list--mg-top gallery"
      >
        <li
          v-for="(image, key) in userMedia"
          :key="String(key)"
          :data-key="image.id"
          class="gallery__item"
          @click.prevent="setCurrentFileId(image.id)"
        >
          <a href="#" class="gallery__link">
            <img
              :src="storageBaseUrl + '/' + image.path"
              class="gallery__img"
            />
          </a>
        </li>
      </ul>
      <button
        v-if="pagen !== lastPage"
        class="main__more-button"
        type="button"
        @click.prevent="getUserMedia"
      >
        Explore More
      </button>
    </section>
    <MediaLibraryPopup
      v-if="isMediaLibraryPopup"
      :file-id="currentFileId"
      :media="userMedia"
      @click-outside-popover="closeMediaLibraryPopup"
      @click-outside-popover-deleted="closeMediaLibraryPopupDelete"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFileLoader: false,
      isMediaLibraryPopup: false,
      currentFileId: null,
      uploadedPicture: { items: [] },
    }
  },
  computed: {
    mode() {
      let mode
      if (this.$route.name === 'profile') {
        mode = 'my-media'
      } else if (this.$route.name === 'profile-id') {
        mode = 'media'
      }
      return mode
    },
    userId() {
      return this.mode === 'my-media'
        ? this.$auth.user.id
        : this.$route.params.id
    },
    userMedia() {
      return this.$store.getters['userMedia/getUserMedia']
    },
    storageBaseUrl() {
      return this.$nuxt.context.env.storageBaseUrl
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
  },
  beforeMount() {
    this.updateUserMedia()
  },
  methods: {
    getUserMedia() {
      this.$store.dispatch('userMedia/getUserMedia', 'user_id=' + this.userId)
    },
    confirmUpload() {
      this.$store.dispatch('userMedia/confirmUploadMedia', this.uploadedPicture)
      this.uploadedPicture.items = []
    },
    updateUserMedia() {
      this.$store.dispatch('userMedia/clearState')
      this.getUserMedia()
    },
    toggleFileLoader() {
      if (this.isFileLoader) {
        this.confirmUpload()
      }
      this.isFileLoader = !this.isFileLoader
    },
    closeMediaLibraryPopup() {
      this.isMediaLibraryPopup = false
    },
    closeMediaLibraryPopupDelete() {
      this.closeMediaLibraryPopup()
      this.updateUserMedia()
    },
    showMediaLibraryPopup() {
      this.isMediaLibraryPopup = true
    },
    setCurrentFileId(id) {
      this.currentFileId = id
      this.showMediaLibraryPopup()
    },
    setImage(data) {
      this.uploadedPicture.items.push(data)
    },
  },
}
</script>
