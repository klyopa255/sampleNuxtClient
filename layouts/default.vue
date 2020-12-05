<template class="my">
  <div class="template" @click="$nuxt.$emit('click-outside-popover')">
    <Header />
    <main :class="'main ' + mainClasses" data-app>
      <div class="main__wrapper">
        <Nuxt />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
export default {
  middleware: 'dynamicClasses',
  computed: {
    mainClasses() {
      return this.$store.getters['classes/getMainClasses']
    },
  },
}
</script>
