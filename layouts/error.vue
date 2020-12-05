<template>
  <section class="main__container">
    <div class="main__about-info about-info about-info--404">
      <h1 class="about-info__title about-info__title--404">
        {{ error.message }}
      </h1>
      <p class="about-info__text about-info__text--bold">
        Error {{ error.statusCode }}.
      </p>
      <p class="about-info__text about-info__text--404">
        The link you clicked may be broken or the page my have been removed.
        Visit the
        <nuxt-link to="/" class="about-info__link">Home Page</nuxt-link>
        or
        <nuxt-link to="/contact-us" class="about-info__link"
          >Contact us</nuxt-link
        >
        about the problem.
      </p>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
