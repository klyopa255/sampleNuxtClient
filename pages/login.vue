<template>
  <div>
    <div class="loader-wrapper">
      <div
        style="position: absolute; top: calc(40vh - 3em); left: calc(50% - 3em)"
      >
        <div class="loader-15"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    token() {
      return this.$route.query.token
    },
    id() {
      return this.$route.query.id
    },
  },
  mounted() {
    try {
      this.$pubAPI
        .$post('/auth', {
          token: this.token,
          id: this.id,
        })
        .then((resp) => {
          this.$auth.setUserToken(resp.accessToken)
          this.$router.push('/')
        })
    } catch (e) {
      this.$router.push('/?error=' + e.response.message)
    }
  },
  middleware({ query, redirect, error }) {
    if (query.message) {
      redirect('/?target=registerPopup&message=' + query.message)
    } else if (query.error) {
      redirect('/?target=errorPopup&message=' + query.error)
    } else if (!query.message && !query.error && !query.token) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>
<style scoped lang="scss">
.loader-15 {
  background: #fff;
  position: relative;
  animation: loader-15 0.6s ease-in-out infinite;
  animation-delay: 0.1s;
  width: 1em;
  height: 2em;
  margin: 0 2em;
  &::before {
    content: '';
    position: absolute;
    width: inherit;
    height: inherit;
    background: inherit;
    animation: inherit;
    right: 2em;
    animation-delay: 0.2s;
  }
  &::after {
    content: '';
    position: absolute;
    width: inherit;
    height: inherit;
    background: inherit;
    animation: inherit;
    left: 2em;
    animation-delay: 0.6s;
  }
}

@keyframes loader-15 {
  0%,
  100% {
    box-shadow: 0 0 0 #fff, 0 0 0 #fff;
  }
  50% {
    box-shadow: 0 -0.25em 0 #fff, 0 0.25em 0 #fff;
  }
}
.loader-wrapper {
  background: linear-gradient(to top, black 0, black 1px, transparent 535px),
    linear-gradient(
      rgba(0, 0, 0, 0.25) 0,
      #68030d 758px,
      #68030d 758px,
      #fff 1031px,
      rgba(255, 255, 255, 0.25) 100%
    ),
    url('../assets/img/Rectangle1.jpg');
  min-height: 57vh;
  background-position: center bottom;
  background-repeat: no-repeat;
  position: absolute;
  width: 100vw;
  left: calc((100vw - 1440px) * -1 / 2);
}
@media screen and (max-width: 1439px) {
  .loader-wrapper {
    left: 0;
  }
}
</style>
