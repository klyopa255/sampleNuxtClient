<template>
  <div v-show="popupHide" class="user-form-wrapper user-form-wrapper--popup">
    <div class="overlay-popup" @mousedown.prevent="closePopup"></div>
    <section class="user-form">
      <vue-cropper
        ref="cropper"
        :aspect-ratio="1 / 1"
        :viewMode="1"
        :background="false"
        :minCropBoxWidth="68"
        :minCropBoxHeight="68"
        :autoCropArea="1"
      />
      <div class="flex-container">
        <button
          type="submit"
          class="subscribe__submit-btn"
          @click.prevent="emitResult(true)"
        >
          Ok
        </button>
        <button
          type="submit"
          class="subscribe__submit-btn"
          @click.prevent="emitResult(false)"
        >
          Proceed wihtout crop
        </button>
      </div>
      <button
        class="user-form__close-btn"
        type="button"
        @click.prevent="closePopup"
      >
        <span class="visually-hidden">Close</span>
      </button>
    </section>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  components: {
    VueCropper,
  },
  data: () => ({
    popupHide: false,
    eventName: '',
    img: '',
    cropImg: '',
    data: null,
  }),
  computed: {
    cropper() {
      return this.$refs.cropper
    },
  },
  mounted() {
    this.$nuxt.$on('call-crop', (popupData) => {
      this.popupHide = true
      this.img = popupData.img
      this.eventName = popupData.eventName
      const scope = this.cropper
      const refError = setInterval(function () {
        if (scope !== undefined) {
          scope.replace(popupData.img)
          clearInterval(refError)
        }
      }, 500)
    })
  },
  methods: {
    closePopup() {
      this.popupHide = false
    },
    emitResult(result) {
      if (
        result &&
        this.$refs.cropper &&
        this.$refs.cropper.getCroppedCanvas()
      ) {
        this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
          const data = new FormData()
          data.append('path', 'photo')
          data.append('file', blob)

          this.$privAPI
            .$post(this.$privAPI.defaults.baseURL + '/media/upload', data, {
              headers: {
                Authorization: this.$auth.getToken('local'),
                'Content-Type': 'multipart/form-data',
              },
            })
            .then(
              (resp) => {
                this.$nuxt.$emit(this.eventName, resp)
              },
              (e) => {
                this.errorHandler(e)
              }
            )
        })
      }
      this.closePopup()
    },
  },
}
</script>

<style lang="scss" scoped>
.flex-container {
  padding-top: 35px;
  display: flex;
  justify-content: space-around;
  align-items: stretch;
}

.subscribe {
  &__submit-btn {
    display: block;
    background: #d6a94f;
    border-radius: 4px;
    width: 142px;
    border: none;
    font-family: Jost, sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 29px;
    text-align: center;
    color: #000;
  }
}
</style>
