<template>
  <div></div>
</template>

<script>
import inViewport from 'vue-in-viewport-mixin'

export default {
  mixins: [inViewport],
  props: {
    watched: {
      type: Object,
      required: true,
      default: () => {
        return {}
      },
    },
  },
  data: () => {
    return {
      isMounted: false,
    }
  },
  watch: {
    // eslint-disable-next-line
    'inViewport.now': function (visible) {
      if (visible) {
        this.sendWatched()
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.isMounted = true
    })
  },
  methods: {
    sendWatched() {
      if (this.isMounted) {
        const data = {
          type: this.watched.type,
          promo_id: this.watched.id,
        }
        this.$privAPI.$post(
          this.$pubAPI.defaults.baseURL + '/last_seen_promo',
          data,
          {
            headers: { Authorization: this.$auth.getToken('local') },
          }
        )
      }
    },
  },
}
</script>
