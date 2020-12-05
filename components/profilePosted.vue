<template>
  <div>
    <section class="info-tabs__filters filters">
      <h2 class="visually-hidden">Filters</h2>
      <div class="filters__wrapper">
        <ul v-if="false" class="filters__list filters__list--justify">
          <li class="filters__item">
            <select
              name="types"
              class="filters__label filters__label--select filters__label--select--long"
            >
              <option value="all-types" selected>All types</option>
            </select>
          </li>
          <li class="filters__item">
            <button
              type="button"
              class="filters__label filters__label--select filters__label--button"
            >
              By Date
            </button>
            <div class="filters__popover pop-over pop-over--calendar">
              <div class="pop-over__wrapper">
                <button class="pop-over__button pop-over__button--prev">
                  <span class="visually-hidden">Previous</span>
                </button>
                <select id="pop-over-date" class="pop-over__select" name="date">
                  <option value="2019-10">October 2019</option>
                </select>
                <button class="pop-over__button pop-over__button--next">
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
              <ul class="pop-over__day-list">
                <li class="pop-over__day-item">Mon</li>
                <li class="pop-over__day-item">Tue</li>
                <li class="pop-over__day-item">Wed</li>
                <li class="pop-over__day-item">Thu</li>
                <li class="pop-over__day-item">Fri</li>
                <li class="pop-over__day-item">Sat</li>
                <li class="pop-over__day-item">Sun</li>
              </ul>
              <ul class="pop-over__date-list">
                <li class="pop-over__date-item">30</li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  1
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  2
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  3
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  4
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  5
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  6
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  7
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  8
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  9
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-date pop-over__date-item--current-month"
                >
                  10
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  11
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  12
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  13
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  14
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  15
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--event-date pop-over__date-item--current-month"
                >
                  16
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  17
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  18
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  19
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  20
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  21
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  22
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  23
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  24
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  25
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  26
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  27
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  28
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  29
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  30
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  31
                </li>
                <li class="pop-over__date-item">1</li>
                <li class="pop-over__date-item">2</li>
                <li class="pop-over__date-item">3</li>
              </ul>
              <div class="pop-over__list-wrapper">
                <ul class="pop-over__fast-date">
                  <li class="pop-over__fast-date-item">Today</li>
                  <li class="pop-over__fast-date-item">Yestarday</li>
                  <li class="pop-over__fast-date-item">This Week</li>
                  <li class="pop-over__fast-date-item">Last Week</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <CreatePostForm v-if="$route.name === 'profile'" tab="posted" />
    <section class="profile-info__events-section">
      <ul
        v-if="posts.data && posts.data.length"
        class="profile-info__events-list profile-info__events-list--mg-top"
      >
        <li
          v-for="post in posts.data"
          :key="'MP-' + post.id + post.favorited + post.liked"
          class="profile-info__event-item"
        >
          <Post
            current-line="posts"
            :post-data="post"
            :user-data="{
              name: user.name,
              photo: user.photo,
            }"
          />
        </li>
      </ul>
      <button
        v-if="isNextPage"
        class="main__more-button"
        type="button"
        @click.prevent="nextPage"
      >
        Explore More
      </button>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    posts() {
      return this.$store.getters['posts/getPosts']
    },
    isNextPage() {
      return this.posts.current_page !== this.posts.last_page
    },
    queryAuthId() {
      return this.$auth.loggedIn ? `&auth_id=${this.$auth.user.id}` : ''
    },
  },
  beforeMount() {
    this.$store.dispatch('posts/getPosts', {
      queryId: `?user_id=${this.user.id}`,
      queryAuthId: this.queryAuthId,
    })
  },
  methods: {
    nextPage() {
      if (this.isNextPage) {
        this.$store.dispatch('posts/getPosts', {
          queryId: `?user_id=${this.user.id}`,
          queryPage: '&page=' + (Number(this.posts.current_page) + 1),
          queryAuthId: this.queryAuthId,
        })
      }
    },
  },
}
</script>
