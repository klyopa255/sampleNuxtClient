<template>
  <article class="profile-info__post feed-post">
    <div class="feed-post__header section-flexline">
      <div
        class="section-flexline__left-block section-flexline__left-block--flex"
      >
        <nuxt-link
          :to="`/profile/${reposted.owner.id}`"
          class="section-flexline__avatar-link"
        >
          <img
            class="section-flexline__img"
            width="60"
            height="60"
            :src="repostAuthorAvatar"
            :alt="reposted.owner.name"
          />
        </nuxt-link>
        <div class="section-flexline__wrapper">
          <h3 class="section-flexline__title">
            <nuxt-link
              :to="`/profile/${reposted.owner.id}`"
              class="section-flexline__title-link"
              >{{ reposted.owner.name }}</nuxt-link
            >
            <span>posted a {{ type }}</span>
          </h3>
          <time
            class="section-flexline__time"
            :datetime="reposted.updated_at"
            >{{ $moment(reposted.updated_at).format('LLL') }}</time
          >
        </div>
      </div>
    </div>
    <div class="post_content">
      <ul
        v-if="type === 'post' && reposted.media && reposted.media.length"
        class="feed-post__img-wrapper"
      >
        <li
          v-for="(pic, index) in reposted.media"
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
      <ul v-else-if="type === 'photo'" class="feed-post__img-wrapper">
        <li class="feed-post__img" @click.prevent="callMediaPopup">
          <img
            :src="$nuxt.context.env.storageBaseUrl + '/' + reposted.path"
            alt=""
          />
        </li>
      </ul>
      <p v-if="type === 'post' && reposted.text" class="feed-post__text">
        {{ reposted.text }}
      </p>
    </div>

    <MediaLibraryPopup
      v-if="isMediaPopup"
      :file-id="type === 'post' ? clickedPictureId : reposted.id"
      :media="
        type === 'post'
          ? reposted.media
          : [
              {
                id: reposted.id,
                path: reposted.path,
                user_id: reposted.user_id,
              },
            ]
      "
      @click-outside-popover="isMediaPopup = false"
      @click-outside-popover-deleted="isMediaPopup = false"
    />
  </article>
</template>

<script>
export default {
  props: {
    reposted: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data: () => {
    return {
      clickedPictureId: null,
      isMediaPopup: false,
    }
  },
  computed: {
    repostAuthorAvatar() {
      return this.reposted.owner.photo
        ? this.$nuxt.context.env.storageBaseUrl +
            '/' +
            this.reposted.owner.photo
        : require('@/assets/img/defaultAva.png')
    },
  },
  methods: {
    callMediaPopup(e) {
      this.clickedPictureId = Number(e.target.dataset.id)
      this.isMediaPopup = true
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
</style>
