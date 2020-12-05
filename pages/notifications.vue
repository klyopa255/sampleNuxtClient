<template>
  <section class="notifications">
    <h1 class="visually-hidden">Notifications</h1>
    <div class="notifications__section">
      <input
        id="notifications"
        class="notifications__search-input"
        placeholder="Search notifications"
        type="text"
        name="notifications"
      />
    </div>
    <ul v-if="Object.keys(invitation).length > 0" class="notifications__list">
      <li class="notifications__item notifications__item--aqua">
        <div class="notifications__section">
          <nuxt-link
            :to="'/profile/' + invitation.group"
            class="notifications__avatar-wrapper"
            ><img
              :src="
                invitation.group.owner_for_notification.photo
                  ? $nuxt.context.env.storageBaseUrl +
                    '/' +
                    invitation.group.owner_for_notification.photo
                  : require('@/assets/img/defaultAva.png')
              "
              width="48"
              height="48"
              alt="name"
              class="notification__avatar"
          /></nuxt-link>
          <h2 class="notifications__title">
            <nuxt-link
              :to="'/profile/' + invitation.group.owner_id"
              class="notifications__title-link"
              >{{ invitation.group.owner_for_notification.name }}</nuxt-link
            >
          </h2>
          <span class="notifications__action">invited you in a group</span>
          <time class="notifications__time" :datetime="invitation.created_at">{{
            stringifyTimeIntoReadableFormat(invitation.created_at)
          }}</time>
        </div>
        <div class="notifications__section notifications__section--pad-top">
          <a class="notifications__place">{{ invitation.group.name }}</a>
          <button
            class="notifications__button notifications__button--orange notifications__button--first"
            @click="refuseGroup"
          >
            Decline
          </button>
          <button
            class="notifications__button notifications__button--green"
            @click="joinGroup"
          >
            Accept
          </button>
        </div>
      </li>
    </ul>
    <ul
      v-if="storedNotifications && storedNotifications.length > 0"
      class="notifications__list"
    >
      <li
        v-for="(note, index) of storedNotifications"
        :key="index"
        class="notifications__item"
      >
        <div class="notifications__section">
          <nuxt-link
            :to="'/profile/' + note.user_id"
            class="notifications__avatar-wrapper"
          >
            <img
              :src="
                note.photo
                  ? $nuxt.context.env.storageBaseUrl + '/' + note.photo
                  : require('@/assets/img/defaultAva.png')
              "
              width="48"
              height="48"
              alt="name"
              class="notification__avatar"
            />
          </nuxt-link>
          <h2 class="notifications__title">
            <nuxt-link
              :to="'/profile/' + note.user_id"
              class="notifications__title-link"
              >{{ note.name }}</nuxt-link
            >
          </h2>
          <span class="notifications__action">{{
            getNotitficationTextByType(note.type)
          }}</span>
          <time class="notifications__time" :datetime="note.created_at">{{
            stringifyTimeIntoReadableFormat(note.created_at)
          }}</time>
        </div>
      </li>
    </ul>
    <p v-else>There are no notifications yet</p>
  </section>
</template>

<script>
import moment from 'moment-timezone'
export default {
  data() {
    return {
      storedNotifications: [],
    }
  },
  computed: {
    notifications() {
      return this.$store.getters['notifications/notifications']
    },
    invitation() {
      return this.$store.getters['notifications/invitation']
    },
    group() {
      return this.$store.getters['groups/getGroups']
    },
  },
  beforeMount() {
    this.$store.dispatch('notifications/fetchNotifications').then(() => {
      this.notifications.data.forEach((it) => {
        this.storedNotifications.push(it)
      })
    })
  },
  methods: {
    refuseGroup() {
      this.$privAPI
        .$delete(
          '/invitations/groups?' +
            'group_id=' +
            this.invitation.group.id +
            '&user_id=' +
            this.$auth.user.id,
          {
            headers: { Authorization: this.$auth.getToken('local') },
          }
        )
        .then(() => {
          this.$store.dispatch('notifications/fetchNotifications').then(() => {
            this.notifications.data.forEach((it) => {
              this.storedNotifications.push(it)
            })
          })
        })
    },
    joinGroup() {
      this.$privAPI
        .$post(
          '/groups/users',
          {
            group_id: this.invitation.group.id,
          },
          {
            headers: { Authorization: this.$auth.getToken('local') },
          }
        )
        .then(() => {
          this.$store.dispatch('notifications/fetchNotifications').then(() => {
            this.notifications.data.forEach((it) => {
              this.storedNotifications.push(it)
            })
          })
          this.$store.dispatch(
            'groups/fetchGroups',
            '?user_id=' + this.$auth.user.id
          )
        })
    },
    stringifyTimeIntoReadableFormat(time) {
      const resp = moment(time).format('D MMMM hh:mm')
      return resp
    },
    getNotitficationTextByType(type) {
      switch (true) {
        case type === 'event':
          return 'posted an event'
        case type === 'photo':
          return 'posted a photo'
        case type === 'subscription':
          return 'subscribed on you'
        case type === 'post':
          return 'created a post'
        case type.endsWith('s'):
          return `posted ${type}`
        default:
          return type
      }
    },
  },
  head() {
    return {
      title: 'Staj | Notifications',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
      ],
    }
  },
}
</script>
