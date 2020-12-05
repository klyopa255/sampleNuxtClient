<template>
  <div>
    <HeroSection v-if="!isAuth" />
    <HeroSlider v-if="!isAuth" />
    <SubscribeForm v-if="!isAuth" />
    <HeroSectionAuth v-if="isAuth" />
    <EventsListSection :title="'This Weekend'" />
    <EventsListSection :title="'Free Events'" />
    <AboutSection />
  </div>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch('mainPageEvents/fetchMainPageEvents')
  },
  computed: {
    isAuth() {
      return this.$auth.loggedIn
    },
  },
  head() {
    return {
      title: 'Staj',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Find local artists and events',
        },
      ],
    }
  },
  auth: false,
}
</script>
