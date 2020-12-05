<template class="my">
  <div class="template" @click="$nuxt.$emit('click-outside-popover')">
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
export default {
  middleware: 'dynamicClasses',
}
</script>
