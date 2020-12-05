<template>
  <div
    class="user-form-wrapper user-form-wrapper--black"
    @mousedown.stop="$nuxt.$emit('close-group-popup-click')"
  >
    <section class="user-form user-form--small-pt" @mousedown.stop @click.stop>
      <form
        id="add-group-form"
        action="#"
        method="POST"
        class="user-form__form user-form__form--no-mb"
      >
        <legend class="user-form__legend">
          {{ mode.slice(0, 1).toUpperCase() + mode.slice(1) }} group
        </legend>
        <label
          class="user-form__label user-form__label--border user-form__label--flex"
          for="group-name"
          >Name of Group
          <input
            id="group-name"
            v-model="groupName"
            class="user-form__input"
            :class="isInvalidName ? 'user-form__input--invalid' : ''"
            placeholder="Name"
            type="text"
            :readonly="isMyEvent"
            :tabindex="isMyEvent ? -1 : 0"
            :disabled="isMyEvent"
            name="group-name"
          />
          <div class="user-form__fieldset user-form__fieldset--fixed-height">
            <ul class="user-form__artist-list">
              <li
                v-for="(artist, index) in currentGroup.users"
                :key="artist.name + index"
                class="follow-list__item follow-list__item--pad-left follow-list__item--no-border follow-list__item--hover section-flexline"
              >
                <div
                  class="section-flexline__left-block section-flexline__left-block--ai-canter section-flexline__left-block--flex"
                >
                  <nuxt-link
                    :to="'/profile/' + artist.id"
                    class="section-flexline__avatar-link section-flexline__avatar-link--mar-right section-flexline__avatar-link--small48"
                    ><img
                      :src="
                        artist.photo
                          ? $nuxt.context.env.storageBaseUrl +
                            '/' +
                            artist.photo
                          : require('@/assets/img/defaultAva.png')
                      "
                      alt=""
                      class="section-flexline__avatar"
                    /> </nuxt-link
                  ><nuxt-link
                    :to="'/profile/' + artist.id"
                    class="section-flexline__name-link"
                    >{{ artist.name }}</nuxt-link
                  >
                </div>
                <div
                  class="section-flexline__right-block section-flexline__right-block--flex"
                >
                  <div
                    class="section-flexline__more-btn section-flexline__more-btn--red section-flexline__more-btn--align-center more-btn"
                  >
                    <button
                      v-if="
                        user.id === currentGroup.owner_id
                          ? artist.id !== user.id
                          : artist.id === user.id
                      "
                      class="more-btn__button more-btn__button--red"
                      type="button"
                      @click="removeMember(artist.id)"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div></label
        >
        <label
          v-if="!isMyEvent"
          class="user-form__label user-form__label--flex user-form__label--pos-rel"
          ><input
            id="search-artist"
            v-model="queryText"
            class="user-form__input user-form__input--no-mb user-form__input--gray"
            placeholder="Search artist"
            type="text"
            name="search-artist"
            @input="searchHandler"
          />
        </label>
        <div
          v-if="!isMyEvent"
          class="user-form__fieldset user-form__fieldset--fixed-height"
        >
          <ul v-if="foundArtists" class="user-form__artist-list">
            <li
              v-for="(artist, index) in foundArtists"
              :key="artist.name + index"
              class="follow-list__item follow-list__item--pad-left follow-list__item--no-border follow-list__item--hover section-flexline"
            >
              <div
                class="section-flexline__left-block section-flexline__left-block--ai-canter section-flexline__left-block--flex"
              >
                <nuxt-link
                  :to="'/profile/' + artist.id"
                  class="section-flexline__avatar-link section-flexline__avatar-link--mar-right section-flexline__avatar-link--small48"
                  ><img
                    :src="
                      artist.photo
                        ? $nuxt.context.env.storageBaseUrl + '/' + artist.photo
                        : require('@/assets/img/defaultAva.png')
                    "
                    alt=""
                    class="section-flexline__avatar"
                  /> </nuxt-link
                ><nuxt-link
                  :to="'/profile/' + artist.id"
                  class="section-flexline__name-link"
                  >{{ artist.name }}</nuxt-link
                >
              </div>
              <div
                class="section-flexline__right-block section-flexline__right-block--flex"
              >
                <div
                  v-if="artist.group.length === 0 && user.id !== artist.id"
                  class="section-flexline__more-btn section-flexline__more-btn--red section-flexline__more-btn--align-center more-btn"
                >
                  <button
                    v-if="
                      creationArtists.includes(artist.id) ||
                      (artist.invitation &&
                        artist.invitation.group_id === group.id)
                    "
                    class="more-btn__button more-btn__button--gray"
                    type="button"
                    @click="disinviteMember(artist.id)"
                  >
                    <span class="section-flexline__follow-marker">Invited</span>
                  </button>

                  <button
                    v-else
                    class="more-btn__button more-btn__button--red"
                    type="button"
                    @click="inviteNewMember(artist.id)"
                  >
                    Invite
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <fieldset class="user-form__fieldset user-form__fieldset--border-top">
          <div
            class="user-form__fieldset-wrapper user-form__fieldset-wrapper--padding"
          >
            <button
              type="button"
              class="user-form__submit-btn user-form__submit-btn--right"
              :disabled="isMyEvent"
              @click="deleteGroup"
            >
              Delete Group
            </button>
            <button
              :disabled="isMyEvent"
              class="user-form__submit-btn user-form__submit-btn--right"
              type="button"
              @click="handleClick"
            >
              {{ mode.slice(0, 1).toUpperCase() + mode.slice(1) }} Group
            </button>
          </div>
        </fieldset>
      </form>
      <button
        class="user-form__close-btn"
        type="button"
        @click="$nuxt.$emit('close-group-popup-click')"
      >
        <span class="visually-hidden">Close</span>
      </button>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      queryText: '',
      groupName: '',
      isInvalidName: false,
      creationArtists: [],
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    isMyEvent() {
      return (
        this.user.id !== this.currentGroup.owner_id && this.mode !== 'create'
      )
    },
    foundArtists() {
      return this.$store.getters['groups/getArtists'].data.filter((artist) =>
        this.group
          ? this.group.users.every((it) => it.id !== artist.id)
          : artist
      )
    },
    group() {
      return this.$store.getters['groups/getGroups']
    },
    myArtists() {
      return this.$store.getters['groups/getGroups'].users
    },
    currentGroup() {
      return this.$store.getters['groups/getCurrentGroup']
    },
  },
  beforeMount() {
    if (this.mode === 'edit' && this.group) {
      this.groupName = this.group.name
      this.$store.dispatch('groups/getGroupById', this.group.id)
    }
  },
  methods: {
    removeMember(id) {
      this.$privAPI
        .$delete(
          '/remove_user/groups?' +
            'group_id=' +
            this.group.id +
            '&' +
            'user_id=' +
            id,
          {
            headers: { Authorization: this.$auth.getToken('local') },
          }
        )
        .then(() => {
          this.$store.dispatch('groups/getGroupById', this.group.id)
          this.$store.dispatch('groups/fetchGroups', `?user_id=${this.user.id}`)
          if (this.queryText.length > 0) {
            this.searchHandler()
          }
        })
    },
    disinviteMember(id) {
      if (this.mode === 'create') {
        this.creationArtists = this.creationArtists.filter((it) => it !== id)
      } else {
        this.$privAPI
          .$delete(
            '/invitations/groups?' +
              'group_id=' +
              this.group.id +
              '&' +
              'user_id=' +
              id,
            {
              headers: { Authorization: this.$auth.getToken('local') },
            }
          )
          .then((resp) => {
            if (resp.status === 'success') {
              this.searchHandler()
            }
          })
      }
    },
    inviteNewMember(id) {
      if (this.mode === 'create') {
        this.creationArtists.push(id)
      } else {
        this.$privAPI
          .$post(
            '/groups/invitations',
            {
              group_id: this.group.id,
              user_id: id,
            },
            {
              headers: { Authorization: this.$auth.getToken('local') },
            }
          )
          .then((resp) => {
            if (resp.status === 'success') {
              this.searchHandler()
            }
          })
      }
    },
    groupNameValidation() {
      return this.groupName.length > 0 && this.groupName.length < 101
    },
    searchHandler() {
      const query = `?name=${this.queryText}`
      this.$store.dispatch('groups/fetchArtists', query)
    },
    handleClick() {
      if (this.groupNameValidation()) {
        this.isInvalidName = false
        if (this.mode === 'create') {
          this.createGroup()
        } else {
          this.editGroup()
        }
      } else {
        this.isInvalidName = true
      }
    },
    createGroup() {
      this.$privAPI
        .$post(
          '/groups',
          {
            name: this.groupName,
            artists: this.creationArtists,
          },
          {
            headers: { Authorization: this.$auth.getToken('local') },
          }
        )
        .then((resp) => {
          if (resp.status === 'success') {
            this.updateGroupData()
            this.searchHandler()
            this.$nuxt.$emit('close-group-popup-click')
          } else {
            // eslint-disable-next-line no-console
            console.error(resp)
          }
        })
    },
    editGroup() {
      this.$privAPI
        .$put(
          '/groups',
          {
            name: this.groupName,
            group_id: this.group.id,
          },
          {
            headers: { Authorization: this.$auth.getToken('local') },
          }
        )
        .then((resp) => {
          if (resp.status === 'success') {
            this.updateGroupData()
            this.$nuxt.$emit('close-group-popup-click')
          } else {
            // eslint-disable-next-line no-console
            console.error(resp)
          }
        })
    },
    deleteGroup() {
      this.$privAPI
        .$delete('/groups' + '/' + String(this.group.id), {
          headers: { Authorization: this.$auth.getToken('local') },
        })
        .then((resp) => {
          if (resp.status === 'success') {
            this.updateGroupData()
            this.$nuxt.$emit('close-group-popup-click')
          } else {
            // eslint-disable-next-line no-console
            console.error(resp)
          }
        })
    },
    updateGroupData() {
      this.$store.dispatch('groups/fetchGroups', `?user_id=${this.user.id}`)
    },
  },
}
</script>
