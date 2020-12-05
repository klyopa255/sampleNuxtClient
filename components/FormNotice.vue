<template>
  <div>
    <!-- eslint-disable-next-line -->
    <p class="message" v-html="message"></p>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'error',
    },
    message: {
      type: String,
      default: 'Somesing went wrong.',
    },
  },
}
</script>
