<template>
  <div class="aside-info aside-info--right">
    <div v-if="activeTab !== 'media'" class="aside-info__media media">
      <SidebarMedia />
    </div>
    <div
      v-if="!$route.params.id && user.account_type === 'artist'"
      class="aside-info__list-wrapper"
    >
      <div v-if="false">
        <h2 class="aside-info__title aside-info__title--small">
          Two Door Cinema Club
        </h2>
        <button
          class="aside-info__btn aside-info__btn--transparent"
          @click="toggleGroupPopup"
        >
          Edit group
        </button>
      </div>
      <div>
        <h2 class="media__title media__title--black">
          {{ group && group.name ? group.name : 'Group' }}
        </h2>
        <button
          class="aside-info__btn aside-info__btn--transparent"
          @click="toggleGroupPopup"
        >
          {{ !group ? 'Create' : 'Edit' }}
        </button>

        <ul
          v-if="group && group.users && group.users.length > 0"
          class="aside-info__list"
        >
          <li
            v-for="(groupUser, index) in group.users"
            :key="groupUser.name + index"
            class="aside-info__item"
          >
            <nuxt-link
              class="aside-info__link"
              :to="'/profile/' + groupUser.id"
            >
              <div class="aside-info__list-img-wrapper">
                <img
                  :src="
                    groupUser.photo
                      ? $nuxt.context.env.storageBaseUrl + '/' + groupUser.photo
                      : require('@/assets/img/defaultAva.png')
                  "
                  width="48"
                  height="48"
                  :alt="groupUser.name"
                />
              </div>
              {{ groupUser.name }}</nuxt-link
            >
          </li>
        </ul>
        <p v-else class="">You haven't group yet...</p>
      </div>
    </div>
    <GroupForm v-if="isGroupPopupOpen" :mode="!group ? 'create' : 'edit'" />
  </div>
</template>

<script>
export default {
  props: {
    activeTab: {
      type: [String],
      default() {
        return ''
      },
    },
  },
  data() {
    return {
      isGroupPopupOpen: false,
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    group() {
      return this.$store.getters['groups/getGroups']
    },
  },
  beforeMount() {
    if (this.$auth.loggedIn) {
      this.$store.dispatch('groups/fetchGroups', `?user_id=${this.user.id}`)
    }
  },
  methods: {
    toggleGroupPopup() {
      this.isGroupPopupOpen = !this.isGroupPopupOpen
      this.$nuxt.$on('close-group-popup-click', () => {
        this.isGroupPopupOpen = false
      })
    },
  },
}
</script>
