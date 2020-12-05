<template>
  <div>
    <div class="comments__paginate-button">
      <button v-if="page !== 'last'" @click="getNextPage">
        Load more comments
      </button>
    </div>
    <ul
      v-if="Array.isArray(comments) && comments.length"
      class="feed-post__comments comments"
    >
      <li
        v-for="(comment, i) in comments"
        :key="Number(new Date()) + i"
        class="comments__item"
      >
        <nuxt-link
          class="comments__avatar-link"
          :to="`/profile/${comment.user.id}`"
        >
          <img
            width="60"
            height="60"
            :src="CommentAuthorAvatar(comment.user.photo)"
            :alt="comment.user.name"
            class="comments__avatar"
          />
        </nuxt-link>
        <div class="comments__comment-wrapper">
          <header class="comment-header">
            <div class="comment-props">
              <h5 class="comments__author-name">
                <nuxt-link
                  class="comments__author-link"
                  :to="`/profile/${comment.user.id}`"
                >
                  {{ comment.user.name }}</nuxt-link
                >
              </h5>
              <time class="comments__time" :datetime="comment.updated_at">{{
                $moment(comment.updated_at).format('LLL')
              }}</time>
            </div>
            <button
              v-if="isMyComment(comment.user.id)"
              class="comments__delete-button"
              @click.prevent="deleteComment(comment.id, comment.user.id)"
            >
              Delete
            </button>
          </header>
          <p class="comments__comment-text">
            {{ comment.comment_text }}
          </p>
        </div>
      </li>
    </ul>
    <form class="feed-post__form" @submit.prevent="postComment">
      <legend class="visually-hidden">Comment</legend>
      <label class="feed-post__label" for="comment-text-1">
        <nuxt-link
          v-if="$auth.loggedIn"
          :to="'/profile/' + $auth.user.id"
          class="feed-post__form-link"
        >
          <img
            width="60"
            height="60"
            class="feed-post__form-img"
            :src="userAvatar"
            alt="description"
          />
        </nuxt-link>
        <img
          v-else
          width="60"
          height="60"
          class="feed-post__form-img"
          :src="userAvatar"
          alt="description"
        />
      </label>
      <textarea
        id="comment-text-1"
        v-model="comment"
        class="feed-post__input comments__textarea"
        type="text"
        name="comment-text"
        placeholder="Put your comment here"
        :style="{ height: textAreaHeight, resize: 'none' }"
        @input="setTextAreaHeight"
      />
      <button type="submit" class="comment-submit" :disabled="isCommentValid">
        Send
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    commentedObject: {
      type: Object,
      required: true,
    },
  },
  data: () => {
    return {
      comment: '',
      textAreaHeight: 2,
      comments: [],
      page: 0,
    }
  },
  computed: {
    userAvatar() {
      return this.$auth.loggedIn && this.$auth.user.photo
        ? this.$nuxt.context.env.storageBaseUrl + '/' + this.$auth.user.photo
        : require('@/assets/img/defaultAva.png')
    },
    isCommentValid() {
      return /((\r\n|\n|\r)$)|(^(\r\n|\n|\r))|^\s*$/gm.test(this.comment)
    },
  },
  beforeMount() {
    this.commentedObject.comments.forEach((el) => {
      this.comments.push(el)
    })
    this.comments = this.comments.reverse()
    this.page =
      this.commentedObject.commentsCount > this.commentedObject.comments.length
        ? 1
        : 'last'
  },
  methods: {
    postComment() {
      if (this.$auth.loggedIn) {
        const data = {
          type: this.commentedObject.type,
          id: this.commentedObject.id,
          comment_text: this.comment,
        }
        if (this.comment.length <= 1500) {
          this.$privAPI
            .$post(this.$privAPI.defaults.baseURL + '/comments', data, {
              headers: { Authorization: this.$auth.getToken('local') },
            })
            .then(
              (resp) => {
                if (
                  resp.data.data &&
                  Array.isArray(resp.data.data) &&
                  resp.data.data.length
                ) {
                  this.comment = ''
                  this.textAreaHeight = 'auto'
                  this.page =
                    resp.data.last_page === resp.data.current_page
                      ? 'last'
                      : resp.data.current_page
                  this.comments = resp.data.data.reverse()
                  this.$emit(
                    this.commentedObject.updateCountEventName,
                    resp.data.total
                  )
                }
              },
              (e) => {
                if (e.response.status === 400 || e.response.status === 422) {
                  this.validationErrorHandler(e)
                } else {
                  this.novalidationErrorHandler()
                }
                // eslint-disable-next-line
                console.log(e.response)
              }
            )
        } else {
          this.$nuxt.$emit('call-popup', {
            title: 'The given data was invalid.',
            icon: 'error',
            message:
              'Comment_text: The comment text may not be greater than 1500 characters.',
          })
        }
      } else {
        this.$nuxt.$emit('please-login', {
          message: 'Please sign in to comment this post.',
        })
      }
    },
    deleteComment(commentId, ownerId) {
      if (this.isMyComment(ownerId)) {
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
          message: 'Are you sure you want to remove this comment?',
        })
        this.$nuxt.$on(eventName, () => {
          this.$privAPI
            .$delete(
              this.$privAPI.defaults.baseURL +
                `/comments/${commentId}?type=${this.commentedObject.type}`,
              {
                headers: { Authorization: this.$auth.getToken('local') },
              }
            )
            .then(
              (resp) => {
                if (resp.data.data && Array.isArray(resp.data.data)) {
                  this.page =
                    resp.data.last_page === resp.data.current_page
                      ? 'last'
                      : resp.data.current_page
                  this.comments = resp.data.data.reverse()
                  this.$emit(
                    this.commentedObject.updateCountEventName,
                    resp.data.total
                  )
                }
              },
              (e) => {
                this.novalidationErrorHandler()
                // eslint-disable-next-line
                console.log(e.response)
              }
            )
        })
      }
    },
    getNextPage() {
      this.$pubAPI
        .$get(
          this.$pubAPI.defaults.baseURL +
            `/comments?type=${this.commentedObject.type}&id=${
              this.commentedObject.id
            }&page=${this.page + 1}`
        )
        .then(
          (resp) => {
            if (
              resp.data.data &&
              Array.isArray(resp.data.data) &&
              resp.data.data.length
            ) {
              this.page =
                resp.data.last_page === resp.data.current_page
                  ? 'last'
                  : resp.data.current_page
              resp.data.data.forEach((el) => {
                this.comments.unshift(el)
              })
            }
          },
          (e) => {
            this.novalidationErrorHandler()
            // eslint-disable-next-line
            console.log(e.response)
          }
        )
    },
    setTextAreaHeight(e) {
      this.textAreaHeight = 'auto'
      let height
      this.$nextTick(() => {
        if (e.target.scrollHeight > 60) {
          height = e.target.scrollHeight
        } else {
          height = 60
        }
        this.textAreaHeight = height + 'px'
      })
    },
    CommentAuthorAvatar(path) {
      return path
        ? this.$nuxt.context.env.storageBaseUrl + '/' + path
        : require('@/assets/img/defaultAva.png')
    },
    isMyComment(ownerId) {
      return this.$auth.loggedIn && ownerId === this.$auth.user.id
    },
    validationErrorHandler(e) {
      let errors = ''
      for (const key in e.response.data.errors) {
        errors +=
          key.charAt(0).toUpperCase() +
          key.slice(1) +
          ': ' +
          e.response.data.errors[key] +
          '<br />'
      }
      const popupData = {
        title: e.response.data.message,
        icon: 'error',
        message: errors,
      }
      this.$nuxt.$emit('call-popup', popupData)
    },
    novalidationErrorHandler() {
      this.$nuxt.$emit('call-popup', {
        title: 'Something went wrong!',
        icon: 'error',
        message: 'Please try again later.',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.comment-submit {
  background: #00b876;
  border-radius: 4px;
  padding: 0 10px;

  &:disabled {
    background: transparent;
  }
}
.comments {
  max-height: calc(100vh - 600px);
  overflow-y: auto;
  padding-top: 30px;
  &__paginate-button {
    position: relative;
    & button {
      appearance: none;
      display: block;
      margin: 0 auto;
      margin-bottom: -18px;
      background-color: #fff;
      border: 1px solid #000;
      padding: 0 5px;
      border-radius: 13px;
    }
  }
  &__item {
    margin-bottom: 15px;
  }
  &__avatar-link {
    flex-shrink: 0;
    border-radius: 50%;
    overflow: hidden;
    width: 60px;
    height: 60px;
  }
  &__comment-wrapper {
    flex-grow: 1;
  }
  &__delete-button {
    margin-left: auto;
    color: red;
    font-size: 16px;
  }
  &__comment-text {
    word-break: break-word;
  }
  &__textarea {
    max-height: 190px;
  }
}
.comment-header {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  margin-bottom: 10px;
  width: 100%;
}
.comment-props {
  display: flex;
  flex-wrap: wrap;
}
</style>
