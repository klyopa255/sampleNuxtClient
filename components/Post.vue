<template>
  <article class="profile-info__post feed-post">
    <div class="feed-post__header section-flexline">
      <div
        class="section-flexline__left-block section-flexline__left-block--flex"
      >
        <nuxt-link
          :to="`/profile/${postData.user_id}`"
          class="section-flexline__avatar-link"
        >
          <img
            class="section-flexline__img"
            width="60"
            height="60"
            :src="postAuthorAvatar"
            alt="Your avatar"
          />
        </nuxt-link>
        <div class="section-flexline__wrapper">
          <h3 class="section-flexline__title">
            <nuxt-link
              :to="`/profile/${postData.user_id}`"
              class="section-flexline__title-link"
              >{{ userData.name }}</nuxt-link
            >
            <span>{{ postedTypeObj.headString }}</span>
          </h3>
          <time
            class="section-flexline__time"
            :datetime="postData.updated_at"
            >{{ $moment(postData.updated_at).format('LLL') }}</time
          >
        </div>
      </div>
      <div
        class="section-flexline__right-block section-flexline__right-block--flex section-flexline__right-block--pad-top"
      >
        <p v-if="postData.isPromo" class="section-flexline__advertising">
          Advertizing
        </p>
        <div v-if="$auth.loggedIn" class="section-flexline__more-btn more-btn">
          <button
            class="more-btn__button"
            type="button"
            @click.stop="togglePopover"
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
            v-if="isPostActionsPopup"
            class="more-btn__pop-over pop-over pop-over--visible"
          >
            <li class="pop-over__item">
              <a
                href="#"
                class="pop-over__link"
                @click.prevent="callReportPopup"
                >Report post</a
              >
            </li>
            <li v-if="postData.favorite_id" class="pop-over__item">
              <a href="#" class="pop-over__link" @click.prevent="favorites"
                >Remove from favorites</a
              >
            </li>
            <li class="pop-over__item">
              <a
                v-if="isMyPost && postedTypeObj.type === 'post'"
                href="#"
                class="pop-over__link"
                @click.prevent="editPost"
                >Edit post</a
              >
            </li>
            <li class="pop-over__item">
              <a
                v-if="isMyPost"
                href="#"
                class="pop-over__link"
                @click.prevent="deletePost"
                >Delete post</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="postedTypeObj.type === 'post'" class="post_content">
      <ul
        v-if="
          postData.posted &&
          postData.posted.media &&
          postData.posted.media.length
        "
        class="feed-post__img-wrapper"
      >
        <li
          v-for="(pic, index) in postData.posted.media"
          :key="'PM' + pic.id"
          class="feed-post__img"
          :class="index !== 0 ? 'feed-post__img--small' : ''"
          @click.prevent="callMediaPopup"
        >
          <img
            :src="$nuxt.context.env.storageBaseUrl + '/' + pic.path"
            alt=""
            :data-id="pic.id"
          />
        </li>
      </ul>
      <ul v-else-if="postData.type === 'photo'" class="feed-post__img-wrapper">
        <li class="feed-post__img" @click.prevent="callMediaPopup">
          <img
            :src="$nuxt.context.env.storageBaseUrl + '/' + postData.path"
            alt=""
          />
        </li>
      </ul>
      <p
        v-if="postData.type === 'post' && postData.posted.text"
        class="feed-post__text"
      >
        {{ postData.posted.text }}
      </p>
    </div>
    <div v-if="postedTypeObj.type === 'repost'" class="repost_content">
      <Event
        v-if="postedTypeObj.reposted === 'event' && postData.posted"
        :event="postData.posted"
      />
      <Repost
        v-if="
          postedTypeObj.reposted === 'post' ||
          postedTypeObj.reposted === 'photo'
        "
        :reposted="postData.posted"
        :type="postedTypeObj.reposted"
      />
    </div>
    <IsInViewport
      v-if="postData.isPromo"
      :in-viewport-once="true"
      :watched="{
        type: 'post',
        id: postData.promo_id,
      }"
    />
    <div class="feed-post__controls section-flexline">
      <div class="section-flexline__left-block">
        <ul class="section-flexline__list">
          <li class="section-flexline__item social-item">
            <button class="section-flexline__button" @click.prevent="like">
              <svg-icon
                :name="isLiked ? 'icn_liked-black' : 'icn_like-black'"
                class="section-flexline__icon"
                width="32"
                height="32"
              />
            </button>
            <span v-if="likesCount" class="count">{{ likesCount }}</span>
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
            <span v-if="commentsCount" class="count">{{ commentsCount }}</span>
          </li>
          <li class="section-flexline__item social-item">
            <button class="section-flexline__button" @click.prevent="favorites">
              <svg-icon
                :name="isFav ? 'icn_added-to-fav' : 'icn_add-to-fav'"
                class="section-flexline__icon"
                width="32"
                height="32"
                :disabled="isFavButtonDisabled"
              />
            </button>
          </li>
        </ul>
      </div>
      <div class="section-flexline__right-block">
        <Promotion
          v-if="isMyPost && postData.type !== 'photo'"
          :data="postData"
          type="post"
        />
        <button v-if="$auth.loggedIn" class="section-flexline__button">
          <svg-icon
            name="icn_share-black"
            class="section-flexline__icon"
            width="32"
            height="32"
            @click.stop="isShareListOpened = !isShareListOpened"
          />
        </button>
        <div class="share__wrapper share__wrapper--post">
          <ShareItList
            :class="isShareListOpened ? ' pop-over--visible' : ''"
            :reposted="{
              id: postData.id,
              type: postData.type,
            }"
          />
        </div>
      </div>
    </div>
    <Comments
      :commented-object="{
        id: postData.id,
        type: postData.type === 'photo' ? 'photo' : 'post',
        comments: postData.comments,
        commentsCount: postData.comments_count,
        updateCountEventName: updateCountEventName,
      }"
      v-on="{ [updateCountEventName]: updateCommentsCount }"
    />
    <ChoosePopup
      v-if="isReportChoosePopup"
      :question="'Why do you want to report this post?'"
      :choose-list="['spam', 'inappropriate content']"
      :additional-data="{ postId: postData.id }"
      @close="isReportChoosePopup = false"
      @confirm-choose="confirmHandler"
    />
    <MediaLibraryPopup
      v-if="isMediaPopup"
      :file-id="postData.type === 'post' ? clickedPictureId : postData.id"
      :media="
        postData.type === 'post'
          ? postData.posted.media
          : [
              {
                id: postData.id,
                path: postData.path,
                user_id: postData.user_id,
              },
            ]
      "
      @click-outside-popover="isMediaPopup = false"
      @click-outside-popover-deleted="isMediaPopup = false"
    />
  </article>
</template>

<script>
import moment from 'moment-timezone'
export default {
  props: {
    currentLine: {
      type: String,
      required: true,
    },
    postData: {
      type: Object,
      default: () => {
        return {}
      },
    },
    userData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data: () => {
    return {
      isPostActionsPopup: false,
      isReportChoosePopup: false,
      isMediaPopup: false,
      clickedPictureId: null,
      isLikeButtonDisabled: false,
      isFavButtonDisabled: false,
      likesCount: 0,
      commentsCount: 0,
      isLiked: undefined,
      isFav: undefined,
      isShareListOpened: false,
    }
  },
  computed: {
    postAuthorAvatar() {
      return this.userData.photo
        ? this.$nuxt.context.env.storageBaseUrl + '/' + this.userData.photo
        : require('@/assets/img/defaultAva.png')
    },
    isMyPost() {
      return this.$auth.loggedIn
        ? this.postData.user_id === this.$auth.user.id
        : false
    },
    queryAuthId() {
      return this.$auth.loggedIn ? `&auth_id=${this.$auth.user.id}` : ''
    },
    updateCountEventName() {
      return `post-${this.postData.id}-count-updated`
    },
    postedTypeObj() {
      return this.postData.type === 'post'
        ? {
            type: 'post',
            posted: 'post',
            headString: 'posted a post',
            likesRoute: 'posts',
          }
        : this.postData.type === 'repost_post'
        ? {
            type: 'repost',
            reposted: 'post',
            headString: 'reposted a post',
            likesRoute: 'posts',
          }
        : this.postData.type === 'repost_event'
        ? {
            type: 'repost',
            reposted: 'event',
            headString: 'reposted an event',
            likesRoute: 'posts',
          }
        : this.postData.type === 'repost_photo'
        ? {
            type: 'repost',
            reposted: 'photo',
            headString: 'reposted a photo',
            likesRoute: 'posts',
          }
        : {
            type: 'post',
            posted: 'media',
            headString: 'posted a photo',
            likesRoute: 'media',
          }
    },
  },
  beforeMount() {
    this.$nuxt.$on('click-outside-popover', () => {
      if (this.isPostActionsPopup) {
        this.isPostActionsPopup = false
      }
    })
    this.likesCount = this.postData.likes_count
    this.isLiked = this.postData.liked
    this.isFav = this.postData.favorited
    this.commentsCount = this.postData.comments_count
  },
  mounted() {
    this.$nuxt.$on('click-outside-popover', () => {
      this.isShareListOpened = false
    })
  },
  methods: {
    stringifyTimeIntoReadableFormat(time) {
      const resp = moment(time, 'MMM DD YYYY hh:mm').format('D MMMM hh:mm')
      return resp
    },
    favorites() {
      this.isFavButtonDisabled = true
      const data = {
        favorites_id: this.postData.id,
        favorites_type: this.postData.type === 'photo' ? 'photo' : 'post',
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
              this.noValidationErrorHandler()
              // eslint-disable-next-line
              console.log(e.response)
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
              this.noValidationErrorHandler()
              // eslint-disable-next-line
              console.log(e.response)
            }
          )
      }
    },
    togglePopover() {
      this.isPostActionsPopup = !this.isPostActionsPopup
    },
    deletePost() {
      this.isPostActionsPopup = false
      const eventName = 'event' + new Date()
      this.$nuxt.$emit('call-popup', {
        eventName,
        // Popup type (alert/dialog)
        type: 'dialog',
        // Popup title text
        title: 'Confirmation',
        // Name of icon (name of svg file in '~assets/svg' folder)
        icon: 'error',
        // Text of popup message
        message: 'Are you sure you want to remove the post?',
      })
      this.$nuxt.$on(eventName, () => {
        const routeName =
          this.postData.type === 'photo' ? '/media/delete_file/' : '/posts/'
        const path =
          this.postData.type === 'photo' ? this.postData.path : this.postData.id
        this.$privAPI
          .$delete(this.$privAPI.defaults.baseURL + routeName + path, {
            headers: { Authorization: this.$auth.getToken('local') },
          })
          .then(
            (resp) => {
              if (this.currentLine === 'posts') {
                this.$store.dispatch('posts/getPosts', {
                  queryId: `?user_id=${this.$auth.user.id}`,
                  queryAuthId: this.queryAuthId,
                })
              } else if (this.currentLine === 'favorites') {
                this.$store.dispatch('favorites/fetchFavorites')
              }

              this.isPostActionsPopup = !this.isPostActionsPopup
            },
            (e) => {
              alert(e.message)
            }
          )
      })
    },
    editPost() {
      this.$nuxt.$emit('edit-post', this.postData)
      this.isPostActionsPopup = false
    },
    callReportPopup() {
      this.isReportChoosePopup = true
      this.isPostActionsPopup = false
    },
    confirmHandler(payload) {
      const data = {
        id: this.$auth.user.id,
        post_id: payload.additionalData.postId,
        message: payload.choosenVar,
      }
      this.$privAPI
        .$post(this.$privAPI.defaults.baseURL + '/complain', data, {
          headers: { Authorization: this.$auth.getToken('local') },
        })
        .then(
          (resp) => {
            this.isReportChoosePopup = false
            this.$nuxt.$emit('call-popup', {
              title: 'Success',
              icon: 'envelop',
              message: 'Thank you for letting us know',
            })
          },
          (e) => {
            this.isReportChoosePopup = false
            this.$nuxt.$emit('call-popup', {
              title: 'Error',
              icon: 'error',
              message: 'Something went wrong. Please try again later.',
            })
          }
        )
    },
    callMediaPopup(e) {
      this.clickedPictureId = Number(e.target.dataset.id)
      this.isMediaPopup = true
    },
    like() {
      if (this.$auth.loggedIn) {
        const routeName = this.postedTypeObj.likesRoute
        const idName =
          this.postedTypeObj.likesRoute === 'media'
            ? 'media_photo_id'
            : 'post_id'
        this.isLikeButtonDisabled = true
        if (!this.isLiked) {
          this.$privAPI
            .$post(
              this.$privAPI.defaults.baseURL + `/${routeName}/likes`,
              {
                [idName]: this.postData.id,
              },
              {
                headers: { Authorization: this.$auth.getToken('local') },
              }
            )
            .then(
              (resp) => {
                this.successHandler(resp.data, 'like')
              },
              (e) => {
                this.noValidationErrorHandler()
                // eslint-disable-next-line
                console.log(e.response)
              }
            )
        } else {
          this.$privAPI
            .$delete(
              this.$privAPI.defaults.baseURL +
                `/${routeName}/likes/${this.postData.id}`,
              {
                headers: { Authorization: this.$auth.getToken('local') },
              }
            )
            .then(
              (resp) => {
                this.successHandler(resp.data, 'unlike')
              },
              (e) => {
                this.noValidationErrorHandler()
                // eslint-disable-next-line
                console.log(e)
              }
            )
        }
      } else {
        this.$nuxt.$emit('please-login', {
          message: 'Please sign in to like this post.',
        })
      }
    },
    successHandler(likesCount, type) {
      this.likesCount = likesCount
      if (type === 'like') {
        this.isLiked = true
      } else {
        this.isLiked = false
      }
      this.isLikeButtonDisabled = true
    },
    noValidationErrorHandler() {
      this.$nuxt.$emit('call-popup', {
        title: 'Error',
        icon: 'error',
        message: 'Something went wrong. Please try again later.',
      })
    },
    updateCommentsCount(count) {
      this.commentsCount = count
    },
  },
}
</script>

<style lang="scss" scoped>
.feed-post {
  background-color: #fff;
  &__img-wrapper {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    margin-right: -1.2%;
    list-style: none;
  }
  &__img {
    width: 100%;
    height: auto;

    & img {
      width: 100%;
      height: auto;
      cursor: pointer;
    }

    &--small {
      position: relative;
      width: 100%;
      max-width: 180px;
      height: 100px;
      margin-right: 1.2%;
      margin-bottom: 1.7%;
      overflow: hidden;
      border: 1px solid black;
      & img {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
.comments {
  &__avatar-link {
    overflow: hidden;
    border-radius: 50%;
    min-width: 60px;
    min-height: 60px;
    align-self: flex-start;
    position: relative;

    img {
      position: absolute;
      width: 60px;
      height: 60px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.social-item {
  display: flex;
  align-items: center;
}
.count {
  font-size: 26px;
  padding-top: 3px;
  margin-left: 6px;
}
.share__wrapper {
  position: relative;

  &--post .share-buttons__pop-over {
    top: -15px;
    left: -300px;
  }
}
.repost_content {
  padding: 5px;
  margin-bottom: 20px;
}
.section-flexline__right-block {
  display: flex;
}
</style>
