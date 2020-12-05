<template>
  <button class="flat-button" @click="logout">Logout</button>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    },
  },
}
</script>
