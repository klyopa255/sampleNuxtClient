<template>
  <div
    class="user-form-wrapper user-form-wrapper--black"
    @click.self="$emit('click-outside-popover')"
  >
    <article
      class="user-form-wrapper__post feed-post feed-post--no-border media-popup-container"
    >
      <div ref="imageWrapper" class="feed-post__out-img-wrapper">
        <button
          class="feed-post__pic-button feed-post__pic-button--prev"
          @click="togglePicture('prev')"
        >
          <span class="visually-hidden">Previous</span>
        </button>
        <img
          ref="image"
          :src="storageBaseUrl + '/' + currentFile.path"
          alt="qweqweqwe"
          class="feed-post__out-img"
        />
        <button
          class="feed-post__pic-button feed-post__pic-button--next"
          @click="togglePicture('next')"
        >
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div class="feed-post__white-bg-wrapper media-popup-user-side">
        <div class="feed-post__header section-flexline">
          <div
            class="section-flexline__left-block section-flexline__left-block--flex"
          >
            <nuxt-link
              class="section-flexline__avatar-link"
              :to="`/profile/${socialData.owner.id}`"
            >
              <img
                class="section-flexline__img"
                :src="
                  isOwnPost
                    ? userAvatar
                    : socialData.owner
                    ? $nuxt.context.env.storageBaseUrl +
                      '/' +
                      socialData.owner.photo
                    : require('@/assets/img/defaultAva.png')
                "
                :alt="socialData.owner.name"
              />
            </nuxt-link>
            <div class="section-flexline__wrapper">
              <h3 class="section-flexline__title">
                <nuxt-link
                  class="section-flexline__title-link"
                  :to="`/profile/${socialData.owner.id}`"
                >
                  {{ socialData.owner.name }}
                </nuxt-link>
              </h3>
              <time
                class="section-flexline__time"
                :datetime="socialData.updated_at"
                >posted a photo<br />
                {{ $moment(socialData.updated_at).format('LLL') }}</time
              >
            </div>
          </div>
          <div
            class="section-flexline__right-block section-flexline__right-block--flex section-flexline__right-block--pad-top"
          >
            <div class="section-flexline__more-btn more-btn">
              <button
                class="more-btn__button more-btn__button--pop-over"
                type="button"
                @click.stop.prevent="togglePopoverMenu"
              >
                <span class="visually-hidden">More</span>
                <svg-icon
                  name="icn_more"
                  class="more-btn__icon more-btn__icon--black"
                  width="32"
                  height="32"
                />
              </button>
              <ul
                :class="isPopoverOpened ? ' pop-over--visible' : ''"
                class="more-btn__pop-over pop-over"
              >
                <li class="pop-over__item">
                  <a href="#" class="pop-over__link">Report post</a>
                </li>
                <li
                  v-if="$auth.loggedIn && $auth.user.id === currentFile.user_id"
                  class="pop-over__item"
                >
                  <a class="pop-over__link" @click.prevent="deleteFile()"
                    >Delete</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="feed-post__controls section-flexline">
          <div class="section-flexline__left-block">
            <ul class="section-flexline__list">
              <li class="section-flexline__item social-item">
                <button
                  class="section-flexline__button"
                  :disabled="isLikebuttonDisabled"
                  @click.prevent="like"
                >
                  <svg-icon
                    :name="
                      socialData.liked ? 'icn_liked-black' : 'icn_like-black'
                    "
                    class="section-flexline__icon"
                    width="32"
                    height="32"
                  />
                </button>
                <span v-if="socialData.likes_count" class="count">{{
                  socialData.likes_count
                }}</span>
              </li>
              <li class="section-flexline__item social-item">
                <button class="section-flexline__button">
                  <svg-icon
                    name="icn_comment"
                    class="section-flexline__icon"
                    width="32"
                    height="32"
                  />
                </button>
                <span v-if="commentsCount" class="count">{{
                  commentsCount
                }}</span>
              </li>
              <li class="section-flexline__item social-item">
                <button
                  class="section-flexline__button"
                  :disabled="isFavButtonDisabled"
                  @click.prevent="favorites"
                >
                  <svg-icon
                    :name="isFav ? 'icn_added-to-fav' : 'icn_add-to-fav'"
                    class="section-flexline__icon"
                    width="32"
                    height="32"
                    fill="#000"
                  />
                </button>
              </li>
            </ul>
          </div>
          <div class="section-flexline__right-block">
            <button class="section-flexline__button">
              <svg-icon
                name="icn_share-black"
                class="section-flexline__icon"
                width="32"
                height="32"
                @click.stop="isShareListOpened = !isShareListOpened"
              />
            </button>
            <div class="share__wrapper share__wrapper--media">
              <ShareItList
                :class="isShareListOpened ? ' pop-over--visible' : ''"
                :reposted="{
                  id: currentFile.id,
                  type: 'photo',
                }"
              />
            </div>
          </div>
        </div>
        <h4 class="visually-hidden">Commnets</h4>
        <Comments
          v-if="isSocialDataReady"
          :commented-object="{
            id: socialData.id,
            type: 'photo',
            comments: socialData.comments,
            commentsCount: socialData.comments_count,
            updateCountEventName: updateCountEventName,
          }"
          v-on="{ [updateCountEventName]: updateCommentsCount }"
        />
        <button
          type="button"
          class="feed-post__close-button"
          @click="$emit('click-outside-popover')"
        >
          <span class="visually-hidden">Close</span>
        </button>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    fileId: {
      type: Number,
      default: null,
    },
    media: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentFileId: this.fileId,
      isPopoverOpened: false,
      socialData: {
        owner: {},
      },
      isLikebuttonDisabled: false,
      isSocialDataReady: false,
      commentsCount: 0,
      isFavButtonDisabled: false,
      isFav: undefined,
      isShareListOpened: false,
    }
  },
  computed: {
    storageBaseUrl() {
      return this.$nuxt.context.env.storageBaseUrl
    },
    isOwnEvent() {
      return this.$auth.loggedIn
        ? this.media[0].user_id === this.$auth.user.id
        : false
    },
    currentFile() {
      return this.media.find((el) => {
        return el.id === this.currentFileId
      })
    },
    isOwnPost() {
      return (
        this.$auth.loggedIn && this.$auth.user.id === this.currentFile.user_id
      )
    },
    userAvatar() {
      return this.$nuxt.context.env.storageBaseUrl + '/' + this.$auth.user.photo
    },
    updateCountEventName() {
      return `photo-${this.socialData.id}-count-updated`
    },
  },
  watch: {
    // eslint-disable-next-line
    currentFileId: function (newVal, oldVal) {
      this.getsocialData()
    },
  },
  beforeMount() {
    this.getsocialData()
  },
  mounted() {
    this.$nuxt.$on('click-outside-popover', this.hidePopoverMenu)
    this.getImgWrapperModifier()
  },
  updated() {
    this.getImgWrapperModifier()
  },
  methods: {
    getImgWrapperModifier() {
      if (this.$refs.image.offsetHeight > this.$refs.image.offsetWidth) {
        this.clearImgWrapperModifiers()
        this.$refs.imageWrapper.classList.add(
          'feed-post__out-img-wrapper--height'
        )
      } else {
        this.clearImgWrapperModifiers()
        this.$refs.imageWrapper.classList.add(
          'feed-post__out-img-wrapper--width'
        )
      }
    },
    clearImgWrapperModifiers() {
      const containsModifiers =
        this.$refs.imageWrapper.classList.contains(
          'feed-post__out-img-wrapper--height'
        ) ||
        this.$refs.imageWrapper.classList.contains(
          'feed-post__out-img-wrapper--width'
        )

      if (containsModifiers) {
        this.$refs.imageWrapper.classList.remove(
          'feed-post__out-img-wrapper--height'
        )
        this.$refs.imageWrapper.classList.remove(
          'feed-post__out-img-wrapper--width'
        )
      }
    },
    async deleteFile() {
      const resp = await this.$privAPI.$delete(
        this.$privAPI.defaults.baseURL +
          '/media/delete_file/' +
          this.currentFile.path,
        {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        }
      )
      if (resp.status === 'success') {
        this.$emit('click-outside-popover-deleted')
      }
    },
    async getsocialData() {
      this.isSocialDataReady = false
      const query = this.$auth.loggedIn ? `?user_id=${this.$auth.user.id}` : ''
      try {
        const resp = await this.$pubAPI.$get(
          this.$privAPI.defaults.baseURL +
            `/media/photos/${this.currentFileId + query}`
        )
        this.socialData = resp.data
        this.commentsCount = resp.data.comments_count
        this.isFav = resp.data.favorited
        this.isSocialDataReady = true
      } catch (e) {
        // eslint-disable-next-line
        console.log(e)
        this.errorHandler()
      }
    },
    hidePopoverMenu() {
      this.isPopoverOpened = false
      this.isShareListOpened = false
    },
    togglePopoverMenu() {
      this.isPopoverOpened = !this.isPopoverOpened
    },
    togglePicture(mode = 'next') {
      let prevArrayIndex = -1
      this.media.find((file, index) => {
        if (this.currentFile.id === file.id) {
          prevArrayIndex = mode === 'next' ? index + 1 : index - 1
          return file
        }
      })

      if (prevArrayIndex >= 0 && prevArrayIndex < this.media.length) {
        this.currentFileId = this.media[prevArrayIndex].id
      }
    },
    like() {
      if (this.$auth.loggedIn) {
        this.isLikebuttonDisabled = true
        if (!this.socialData.liked) {
          this.$privAPI
            .$post(
              this.$privAPI.defaults.baseURL + '/media/likes',
              {
                media_photo_id: this.currentFileId,
              },
              {
                headers: { Authorization: this.$auth.getToken('local') },
              }
            )
            .then(
              (resp) => {
                this.likeSuccesHandler(resp.data, 'like')
              },
              (e) => {
                // eslint-disable-next-line
                console.log(e)
                this.errorHandler()
              }
            )
        } else {
          this.$privAPI
            .$delete(
              this.$privAPI.defaults.baseURL +
                `/media/likes/${this.currentFileId}`,
              {
                headers: { Authorization: this.$auth.getToken('local') },
              }
            )
            .then(
              (resp) => {
                this.likeSuccesHandler(resp.data, 'unlike')
              },
              (e) => {
                // eslint-disable-next-line
                console.log(e)
                this.errorHandler()
              }
            )
        }
      } else {
        this.$nuxt.$emit('please-login', {
          message: 'Please sign in to like this photo.',
        })
      }
    },
    likeSuccesHandler(count, type) {
      this.socialData.likes_count = count
      this.socialData.liked = type === 'like'
      this.isLikebuttonDisabled = false
    },
    errorHandler() {
      this.$nuxt.$emit('call-popup', {
        title: 'Error',
        icon: 'error',
        message: 'Something went wrong. Please try again later.',
      })
    },
    updateCommentsCount(count) {
      this.commentsCount = count
    },
    favorites() {
      this.isFavButtonDisabled = true
      const data = {
        favorites_id: this.socialData.id,
        favorites_type: 'photo',
      }
      if (this.isFav) {
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
              this.isFav = false
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
              this.isFav = true
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
.social-item {
  display: flex;
  align-items: center;
}
.count {
  font-size: 26px;
  padding-top: 3px;
  margin-left: 6px;
}
.media-popup-container {
  position: absolute;
  top: calc(50% + 150px);
  left: 50%;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  transform: translate(-50%, calc(-50% - 100px));
  align-items: center;
  max-height: calc(100vh - 200px);
}
.media-popup-user-side {
  max-height: calc(100vh - 200px);
}
.share__wrapper {
  position: relative;
  &--media .share-buttons__pop-over {
    top: -40px;
    left: -270px;
  }
}
</style>
