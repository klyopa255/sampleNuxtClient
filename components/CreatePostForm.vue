<template>
  <div
    class="user-form-wrapper"
    :class="!isDetailedForm ? ' user-form-wrapper--pos-stat ' : ''"
  >
    <form
      v-if="!isDetailedForm && tab === 'posted'"
      class="profile-info__post-form post-form"
      @click="isDetailedForm = true"
    >
      <label class="post-form__legend" for="post-text"
        >What do you want to share in the post?</label
      >
      <input
        id="post-text"
        v-model="postText"
        class="post-form__input"
        type="text"
        name="post-text"
        placeholder="Put your text here"
      />
      <ul class="post-form__controls">
        <li class="post-form__controls-item">
          <button class="post-form__button" type="button">
            <span class="visually-hidden">Add link</span>
            <svg-icon
              name="icn_link"
              width="32"
              height="32"
              class="post-form__icon"
            />
          </button>
        </li>
        <li class="post-form__controls-item">
          <button class="post-form__button" type="button">
            <span class="visually-hidden">Add picture</span>
            <svg-icon
              name="icn_image"
              width="32"
              height="32"
              class="post-form__icon"
            />
          </button>
        </li>
        <li class="post-form__controls-item">
          <button class="post-form__button" type="button">
            <span class="visually-hidden">Add file</span>
            <svg-icon
              name="icn_attach-file"
              width="32"
              height="32"
              class="post-form__icon"
            />
          </button>
        </li>
      </ul>
      <button type="submit" class="visually-hidden">Send message</button>
    </form>
    <section
      v-else-if="isDetailedForm && !isMediaLibraryMedia"
      class="user-form user-form--create-post"
      @click.stop
    >
      <form
        id="create-post-form"
        action="#"
        method="POST"
        class="user-form__form user-form__form--bor-bot"
      >
        <legend class="user-form__legend">
          What do you want to share in the post?
        </legend>
        <textarea
          v-model="postText"
          type="text"
          class="user-form__input user-form__input--textarea user-form__input--gray"
          rows="8"
          placeholder="What's new?"
        ></textarea>
        <legend class="user-form__legend">Media</legend>
        <ul class="user-form__img-list">
          <li
            v-for="(pic, index) of mediaSelected"
            :key="index + 's'"
            class="user-form__img-item"
          >
            <div class="user-form__img-wrapper">
              <img
                :src="$nuxt.context.env.storageBaseUrl + '/' + pic.path"
                alt=""
                width="188"
                height="90"
                class="user-form__img"
              />
            </div>
            <button
              type="button"
              class="user-form__del-pic-btn"
              @click="removeFile('mediaSelected', index)"
            >
              <span class="visually-hidden">Delete picture</span>
            </button>
          </li>
          <li
            v-for="(pic, index) of mediaUploaded"
            :key="index + 'u'"
            class="user-form__img-item"
          >
            <div class="user-form__img-wrapper">
              <img
                :src="$nuxt.context.env.storageServerBaseUrl + '/' + pic"
                alt=""
                width="188"
                height="90"
                class="user-form__img"
              />
            </div>
            <button
              type="button"
              class="user-form__del-pic-btn"
              @click="removeFile('mediaUploaded', index)"
            >
              <span class="visually-hidden">Delete picture</span>
            </button>
          </li>
          <li class="user-form__img-item">
            <label
              class="user-form__file-input-label"
              for="pic-input"
              @click.prevent="toggleMedia"
              ><input
                id="pic-input"
                class="visually-hidden"
                type="file"
                name="pic-input"
            /></label>
          </li>
        </ul>
        <fieldset class="user-form__fieldset">
          <div
            class="user-form__fieldset-wrapper user-form__fieldset-wrapper--padding"
          >
            <ul v-if="false" class="user-form__controls">
              <li class="user-form__controls-item">
                <button class="user-form__button" type="button">
                  <span class="visually-hidden">Add link</span>
                  <svg-icon
                    width="32"
                    height="32"
                    class="user-form__icon"
                    name="icn_link"
                  />
                </button>
              </li>
              <li class="user-form__controls-item">
                <button class="user-form__button" type="button">
                  <span class="visually-hidden">Add picture</span>
                  <svg-icon
                    width="32"
                    height="32"
                    class="user-form__icon"
                    name="icn_image"
                  />
                </button>
              </li>
              <li class="user-form__controls-item">
                <button class="user-form__button" type="button">
                  <span class="visually-hidden">Add file</span>
                  <svg-icon
                    width="32"
                    height="32"
                    class="user-form__icon"
                    name="icn_attach-file"
                  />
                </button>
              </li>
            </ul>
            <button
              class="user-form__submit-btn user-form__submit-btn--right"
              form="create-post-form"
              type="submit"
              @click.prevent="sendData"
            >
              Publish
            </button>
          </div>
        </fieldset>
      </form>
      <button
        class="user-form__close-btn"
        type="button"
        @click.stop="closePopup"
      >
        <span class="visually-hidden">Close</span>
      </button>
    </section>
    <Media
      v-if="isDetailedForm && isMediaLibraryMedia"
      page="post"
      target="post-media"
      mode="multiple"
      @click="toggleMedia"
      @post-media="postMedia"
    />
  </div>
</template>

<script>
export default {
  props: {
    tab: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      id: null,
      isDetailedForm: false,
      isMediaLibraryMedia: false,
      mode: 'create', // create/edit
      postText: '',
      mediaUploaded: [],
      mediaSelected: [],
    }
  },
  mounted() {
    this.$nuxt.$on('post-media', (payload) => {
      this.mediaUploaded.push(payload)
    })
    this.$nuxt.$on('post-media-delete', (payload) => {
      this.mediaUploaded.splice(this.mediaUploaded.indexOf(payload), 1)
    })
    this.$nuxt.$on('edit-post', (payload) => {
      this.isDetailedForm = true
      this.mode = 'edit'
      this.id = payload.id
      this.postText = payload.posted.text
      payload.posted.media.forEach((el) => {
        this.mediaSelected.push(el)
      })
    })
  },
  methods: {
    toggleMedia(e) {
      this.isMediaLibraryMedia = !this.isMediaLibraryMedia
    },
    postMedia(imgArr) {
      if (Array.isArray(imgArr)) {
        imgArr.forEach((el) => {
          this.mediaSelected.push(el)
        })
      }
      this.toggleMedia()
    },
    removeFile(list, index) {
      if (list === 'mediaUploaded') {
        this.$privAPI.$delete(
          this.$privAPI.defaults.baseURL +
            '/media/delete_temp/' +
            this[list][index],
          {
            headers: {
              Authorization: this.$auth.getToken('local'),
            },
          }
        )
      }
      this[list].splice(index, 1)
    },
    sendData() {
      const data = {
        type: 'post',
        text: this.postText,
        media_uploaded: this.mediaUploaded,
      }
      const mediaSelected = []
      this.mediaSelected.forEach((el) => {
        mediaSelected.push(el.id)
      })
      data.media_selected = mediaSelected
      if (this.mode === 'edit') {
        data.id = this.id
      }
      if (this.mode === 'create') {
        this.$privAPI
          .$post(this.$privAPI.defaults.baseURL + '/posts', data, {
            headers: { Authorization: this.$auth.getToken('local') },
          })
          .then(
            (resp) => {
              this.successHahdler(resp)
            },
            (e) => {
              this.errorHandler(e)
            }
          )
      } else if (this.mode === 'edit') {
        this.$privAPI
          .$put(this.$privAPI.defaults.baseURL + '/posts', data, {
            headers: { Authorization: this.$auth.getToken('local') },
          })
          .then(
            (resp) => {
              this.successHahdler(resp)
            },
            (e) => {
              this.errorHandler(e)
            }
          )
      }
    },
    successHahdler(resp) {
      this.closePopup()
      this.$store.dispatch('posts/getPosts', {
        queryId: `?user id=${this.$auth.user.id}`,
      })
      this.$store.dispatch('favorites/fetchFavorites')
    },
    errorHandler(e) {
      // to do: error handling
      // eslint-disable-next-line
      console.log(e)
    },
    clearModel() {
      this.mode = 'create'
      this.postText = ''
      this.mediaUploaded = []
      this.mediaSelected = []
    },
    closePopup() {
      this.clearModel()
      this.isDetailedForm = false
    },
  },
}
</script>
