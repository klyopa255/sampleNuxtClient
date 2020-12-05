<template>
  <div class="share-buttons__pop-over pop-over" @click.stop>
    <p class="pop-over__title">Share Post</p>
    <span v-if="reposted.type === 'event'" class="pop-over__label">link</span>
    <p v-if="reposted.type === 'event'" class="pop-over__copy-link">
      {{ eventLink }}
    </p>
    <a
      class="promote-button promote-button--z promote-button--post staj"
      @click="repost"
    >
      <svg-icon name="icn_logo" width="23" height="16" />
      STAJ
    </a>
    <share-it
      v-if="reposted.type === 'event'"
      :text="message"
      :targets="['facebook', 'linkedin', 'twitter']"
      :url="eventLink"
    />
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: '',
    },
    reposted: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      eventLink: '',
    }
  },
  mounted() {
    this.eventLink =
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '') +
      this.$route.fullPath
  },
  methods: {
    repost() {
      this.$privAPI
        .$post(this.$privAPI.defaults.baseURL + '/repost', this.reposted, {
          headers: { Authorization: this.$auth.getToken('local') },
        })
        .then(
          (resp) => {
            // eslint-disable-next-line
            this.$nuxt.$emit('call-popup', {
              title: 'Succes',
              icon: 'success',
              message: 'Publication was reposted.',
            })
          },
          (e) => {
            this.$nuxt.$emit('call-popup', {
              title: 'Error',
              icon: 'error',
              message: 'Something went wrong. Please try again later.',
            })
            // eslint-disable-next-line
            console.log(e)
          }
        )
    },
  },
}
</script>
<style lang="scss">
.share-buttons {
  &__pop-over {
    & .vue-share-it-wrapper {
      display: flex;
      & a.share-button[data-v-3e74bce9] {
        display: block;
        padding: 0 7px;
        margin-bottom: 8px;
        width: 100%;
        min-width: 100%;

        & label {
          font-family: Jost, sans-serif;
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          line-height: 29px;
        }

        & .vue-share-it-button {
          width: 100%;
          margin: 0;
        }
      }
    }
  }
}
.staj {
  display: block;
  margin: 7px;
  position: static;
  text-align: center;
  cursor: pointer;
}
</style>
