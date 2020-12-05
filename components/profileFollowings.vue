<template>
  <section class="profile-info__events-section">
    <form class="profile-info__form" @submit.prevent="getFollows">
      <label class="profile-info__label" for="name">
        <svg-icon
          name="icn_search-gray"
          width="32"
          height="32"
          class="profile-info__input-icon"
        />
      </label>
      <input
        id="name"
        v-model="followingSearch"
        class="profile-info__input"
        type="text"
        placeholder="Search followers"
      />
      <button
        type="button"
        class="event-form__input-button"
        @click.prevent="getFollows"
      >
        Find
      </button>
    </form>
    <ul v-if="followings" class="profile-info__follow-list follow-list">
      <li
        v-for="(user, index) in followings"
        :key="'us' + index"
        class="follow-list__item section-flexline"
      >
        <div
          class="section-flexline__left-block section-flexline__left-block--flex"
        >
          <nuxt-link
            class="section-flexline__avatar-link section-flexline__avatar-link--mar-right"
            style="width: 60px; height: 60px; overflow: hidden"
            :to="`/profile/${user.user_id}`"
          >
            <img
              :src="
                user.photo
                  ? $nuxt.context.env.storageBaseUrl + '/' + user.photo
                  : require('@/assets/img/defaultAva.png')
              "
              :alt="user.id"
              width="100%"
              height="auto"
              style="border-radius: 0"
              class="section-flexline__avatar"
            />
          </nuxt-link>
          <nuxt-link
            class="section-flexline__name-link"
            :to="`/profile/${user.user_id}`"
          >
            {{ user.name }}
          </nuxt-link>
        </div>
        <div
          class="section-flexline__right-block section-flexline__right-block--flex"
        >
          <span
            class="section-flexline__follow-marker"
            @click="followAction(index)"
            >{{ user.is_following.length ? 'Unfollow' : 'Follow' }}</span
          >
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    followingType: {
      type: String,
      required: true,
    },
    followingId: {
      type: Number,
      required: true,
    },
  },
  data: () => {
    return {
      followings: [],
      followingSearch: '',
    }
  },
  watch: {
    followingType: {
      immediate: true,
      handler(newVal, oldVal) {
        this.getFollows()
      },
    },
    beforeMount() {
      this.getFollows()
    },
  },
  methods: {
    followAction(index) {
      if (this.$auth.loggedIn) {
        if (this.followings[index].is_following.length) {
          this.$privAPI
            .$delete(
              this.$privAPI.defaults.baseURL +
                '/followers/' +
                this.followings[index].user_id,
              {
                headers: { Authorization: this.$auth.getToken('local') },
              }
            )
            .then(
              (resp) => {
                this.followings[index].is_following = []
                this.$auth.fetchUser()
              },
              (e) => {
                this.error()
              }
            )
        } else {
          this.$privAPI
            .$post(
              this.$privAPI.defaults.baseURL + '/followers',
              {
                user_id: this.followings[index].user_id,
              },
              {
                headers: { Authorization: this.$auth.getToken('local') },
              }
            )
            .then(
              (resp) => {
                this.followings[index].is_following = ['one']
                this.$auth.fetchUser()
              },
              (e) => {
                this.error()
              }
            )
        }
      } else {
        this.$nuxt.$emit('please-login', {
          message: 'Please sign in to follow this user.',
        })
      }
    },
    error() {
      this.$nuxt.$emit('call-popup', {
        title: 'Error',
        icon: 'error',
        message: 'Something went wrong. Try again later.',
      })
    },
    getFollows() {
      let query = '?'
      query += this.$auth.loggedIn ? `following_id=${this.$auth.user.id}` : ''
      query += this.followingSearch ? `&name=${this.followingSearch}` : ''
      this.$pubAPI
        .$get(
          this.$pubAPI.defaults.baseURL +
            `/${this.followingType}/` +
            this.followingId +
            query
        )
        .then(
          (resp) => {
            this.followings = resp.data
          },
          (e) => {}
        )
    },
  },
}
</script>

<style lang="scss" scoped>
.section-flexline {
  &__follow-marker {
    cursor: pointer;
  }
}
</style>
