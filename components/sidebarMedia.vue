<template>
  <div>
    <h2 class="media__title media__title--black">Artist Spotlight</h2>
    <ul v-if="userMedia.length > 0" class="media__list media__list--profile">
      <li
        v-for="(image, key) in userMedia"
        :key="String(key)"
        :data-key="image.id"
        class="media__item media__item--profile"
        @click.prevent="setCurrentFileId(image.id)"
      >
        <a href="#" class="media__link">
          <img
            :src="storageBaseUrl + '/' + image.path"
            alt="media name"
            width="95"
            height="95"
            class="media__img"
          />
        </a>
      </li>
    </ul>
    <p v-else>No media yet...</p>
    <MediaLibraryPopup
      v-if="isMediaLibraryPopup"
      :media="userMedia"
      :file-id="currentFileId"
      @click-outside-popover="closeMediaLibraryPopup"
      @click-outside-popover-deleted="closeMediaLibraryPopupDelete"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMediaLibraryPopup: false,
      currentFileId: null,
    }
  },
  computed: {
    storageBaseUrl() {
      return this.$nuxt.context.env.storageBaseUrl
    },
    userMedia() {
      return this.$store.getters['userMedia/getUserMedia'].slice(0, 6)
    },
    userId() {
      let id
      if (this.$route.name === 'profile') {
        id = this.$auth.user.id
      } else if (this.$route.name === 'profile-id') {
        id = this.$route.params.id
      }
      return id
    },
  },
  beforeMount() {
    this.updateUserMedia()
  },
  methods: {
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
    updateUserMedia() {
      this.$store.dispatch('userMedia/clearState')
      this.getUserMedia()
    },
    getUserMedia() {
      this.$store.dispatch('userMedia/getUserMedia', 'user_id=' + this.userId)
    },
  },
}
</script>
