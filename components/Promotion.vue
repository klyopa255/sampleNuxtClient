<template>
  <button
    type="button"
    class="promote-button"
    :class="
      (!isPromotionPopupOpened ? ' promote-button--z' : '') +
      (type === 'post' ? ' promote-button--post' : ' promote-button--event')
    "
    :disabled="isPromotionPopupOpened ? true : false"
    @click.stop="togglePromotionPopup"
  >
    Ads application
    <div
      v-if="isPromotionPopupOpened"
      class="user-form-wrapper"
      @click.stop="togglePromotionPopup"
    >
      <section class="user-form" @click.stop @keypress.stop>
        <p class="user-form__text user-form__text--mar-bot">
          Advertising for the {{ type === 'post' ? 'post' : 'event' }}
        </p>
        <form action="#" method="POST" class="user-form__form">
          <label v-if="type === 'event'" class="user-form__label" for="link"
            >Link to the event</label
          >
          <input
            v-if="type === 'event'"
            id="link"
            v-model="eventLinkUrl"
            type="text"
            class="user-form__input"
            name="link"
            readonly="readonly"
          />
          <div
            class="user-form__fieldset user-form__fieldset--flex user-form__fieldset--flex-row user-form__fieldset--mar-top"
          >
            <div class="user-form__info-wrapper user-form__info-wrapper--img">
              <img
                :src="
                  data.background && data.background.path
                    ? $nuxt.context.env.storageBaseUrl +
                      '/' +
                      data.background.path
                    : data.media && data.media.length > 0
                    ? $nuxt.context.env.storageBaseUrl +
                      '/' +
                      data.media[0].path
                    : require('@/assets/img/defaultBackground.png')
                "
                :alt="data.title"
                width="170"
                height="100"
              />
            </div>
            <div class="user-form__info-wrapper">
              <p class="user-form__text user-form__text--al">
                Your {{ type === 'post' ? 'post' : 'event' }},
                <time
                  class="user-form__event-time"
                  :datetime="
                    data.begin_at
                      ? $stringifyToISO(data.begin_at)
                      : data.created_at
                  "
                  >{{
                    data.begin_at ? data.begin_at : data.created_at.slice(0, 10)
                  }}</time
                >
              </p>
              <h2 v-if="data.title" class="user-form__title">
                {{ data.title }}
              </h2>
              <p class="user-form__text user-form__text--place">
                {{ data.place ? data.place : data.text }}
              </p>
            </div>
          </div>
          <label class="user-form__label" for="message">Contact with us</label>
          <textarea
            id="message"
            v-model="userMessage"
            class="user-form__input user-form__input--textarea"
            name="message"
            rows="6"
            placeholder="Text"
          >
          </textarea>
        </form>
        <button
          class="user-form__submit-btn"
          form="sign-in-form"
          type="button"
          @click="requestAdvertising"
        >
          Request Advertising
        </button>
        <button
          class="user-form__close-btn"
          type="button"
          @click="togglePromotionPopup"
        >
          <span class="visually-hidden">Close</span>
        </button>
      </section>
    </div>
  </button>
</template>

<script>
import * as moment from 'moment-timezone'
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isPromotionPopupOpened: false,
      userMessage: '',
      eventLink: '/events/' + this.data.id,
    }
  },
  computed: {
    eventLinkUrl() {
      return (
        window.location.protocol +
        '//' +
        window.location.hostname +
        (window.location.port ? ':' + window.location.port : '') +
        this.eventLink
      )
    },
  },
  methods: {
    togglePromotionPopup() {
      this.isPromotionPopupOpened = !this.isPromotionPopupOpened
    },
    async requestAdvertising() {
      const endDate = new Date()
      endDate.setDate(endDate.getDate() + 1)
      try {
        await this.$privAPI.$post(
          this.$privAPI.defaults.baseURL + '/promotions',
          {
            start_of_promotion: this.formatTime(
              new Date(),
              'YYYY-MM-DD hh mm ss Z'
            ),
            end_of_promotion: this.formatTime(endDate, 'YYYY MM DD hh mm ss Z'),
            id: this.data.id,
            user_id: this.$auth.user.id,
            message: this.userMessage,
            type: this.type,
          },
          {
            headers: { Authorization: this.$auth.getToken('local') },
          }
        )
        this.isPromotionPopupOpened = false
        this.$nuxt.$emit('call-popup', {
          title: 'Success',
          icon: 'envelop',
          message:
            'Thank you for the order, we will contact you as soon as possible.',
        })
      } catch (e) {
        if (e.response.status === 422) {
          this.$nuxt.$emit('call-popup', {
            title: e.response.data.message,
            icon: 'error',
            message: this.buildValidationErrorMessage(e),
          })
        } else {
          this.$nuxt.$emit('call-popup', {
            title: 'Error',
            icon: 'error',
            message: 'Something went wrong. Please try again later.',
          })
        }
      }
    },
    formatTime(time, format = 'MMM DD, hh:mm') {
      return moment(time, format).format('YYYY-MM-DD')
    },
    buildValidationErrorMessage(e) {
      let errors = ''
      for (const key in e.response.data.errors) {
        errors +=
          key.charAt(0).toUpperCase() +
          key.slice(1) +
          ': ' +
          e.response.data.errors[key] +
          '<br />'
      }
      return errors
    },
  },
}
</script>
