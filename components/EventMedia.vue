<template>
  <div
    class="event-banner__media media"
    :class="isFull ? ' media--width-100' : ''"
  >
    <h2 v-if="media && media.length > 0" class="media__title">
      Event Spotlight
    </h2>
    <ul v-if="media && media.length > 0" class="media__list">
      <li
        v-for="(pic, index) in media"
        :key="index"
        class="media__item"
        @click.prevent="setCurrentFileId(pic.id)"
      >
        <a href="#" class="media__link">
          <img
            :src="storageBaseUrl + '/' + pic.path"
            :alt="pic.id"
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
      :media="media"
      :file-id="currentFileId"
      @click-outside-popover="closeMediaLibraryPopup"
      @click-outside-popover-deleted="closeMediaLibraryPopupDelete"
    />
  </div>
</template>

<script>
export default {
  props: {
    media: {
      type: Array,
      default: () => [],
    },
    isFull: {
      type: Boolean,
      default: false,
    },
  },
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
  },
  methods: {
    closeMediaLibraryPopup() {
      this.isMediaLibraryPopup = false
      this.$nuxt.$emit('media-popup')
    },
    closeMediaLibraryPopupDelete() {
      this.closeMediaLibraryPopup()
    },
    showMediaLibraryPopup() {
      this.isMediaLibraryPopup = true
    },
    setCurrentFileId(id) {
      this.currentFileId = id
      this.showMediaLibraryPopup()
      this.$nuxt.$emit('media-popup')
    },
  },
}
</script>
