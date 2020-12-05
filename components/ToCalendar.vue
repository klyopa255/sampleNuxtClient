<template>
  <button
    type="button"
    class="to-calendar"
    :class="' ' + modifier"
    @click.stop="showToCalendarPopover"
  >
    <svg-icon
      width="32"
      height="32"
      class="to-calendar__icon"
      name="icn-calendar"
    />
    To Calendar
    <ul
      v-if="isCalendarPopoverOpened"
      class="to-calendar__popover pop-over pop-over--visible"
    >
      <li class="pop-over__item">
        <a
          :href="
            $nuxt.context.env.storageServerBaseUrl +
            '/ics/' +
            eventData.id +
            '.ics'
          "
          download
          class="pop-over__link"
          >To Calendar</a
        >
      </li>
      <li class="pop-over__item">
        <a
          :href="googleCalendarLink ? googleCalendarLink : ''"
          class="pop-over__link"
          target="_blank"
          >To Google Calendar</a
        >
      </li>
    </ul>
  </button>
</template>

<script>
export default {
  props: {
    modifier: {
      type: String,
      default: '',
    },
    eventData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isCalendarPopoverOpened: false,
    }
  },
  computed: {
    googleCalendarLink() {
      const event = this.eventData

      return `https://www.google.com/calendar/render?action=TEMPLATE&text=${event.title.replace(
        ' ',
        '+'
      )}&dates=${this.$stringifyToISO(event.begin_at).replace(
        /-|:|\.\d\d\d/g,
        ''
      )}/${this.$stringifyToISO(event.end_at).replace(
        /-|:|\.\d\d\d/g,
        ''
      )}&details=${
        event.short_description ? event.short_description.replace(' ', '+') : ''
      }+Event+link:+${this.$pubAPI.defaults.baseURL}/events/${
        event.id
      }&location=${
        event.place ? event.place.replace(' ', '+') : ''
      }&sf=true&output=xml`
    },
  },
  mounted() {
    this.$nuxt.$on('click-outside-popover', this.closeToCalendarPopover)
  },
  methods: {
    closeToCalendarPopover() {
      this.isCalendarPopoverOpened = false
    },
    showToCalendarPopover() {
      this.isCalendarPopoverOpened = true
    },
  },
}
</script>
