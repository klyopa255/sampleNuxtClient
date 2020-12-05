<template>
  <section class="main__container">
    <div class="main__about-info about-info about-info--high-top">
      <h1 class="about-info__title about-info__title--faq">Privacy policy</h1>
      <p class="about-info__text about-info__text--lot-text">
        We build a range of services that help millions of people daily to
        explore and interact with the world in new ways. Our services include:
      </p>
      <p class="about-info__text about-info__text--lot-text">
        Google apps, sites, and devices, like Search, YouTube, and Google Home
        Platforms like the Chrome browser and Android operating system <br />
        Products that are integrated into third-party apps and sites, like ads
        and embedded Google Maps
      </p>
      <p class="about-info__text about-info__text--lot-text">
        You can use our services in a variety of ways to manage your privacy.
        For example, you can sign up for a Google Account if you want to create
        and manage content like emails and photos, or see more relevant search
        results. And you can use many Google services when you’re signed out or
        without creating an account at all, like searching on Google or watching
        YouTube videos. You can also choose to browse the web privately using
        Chrome in Incognito mode. And across our services, you can adjust your
        privacy settings to control what we collect and how your information is
        used.
      </p>
      <p
        class="about-info__text about-info__text--lot-text about-info__text--lot-text--last"
      >
        To help explain things as clearly as possible, we’ve added examples,
        explanatory videos, and definitions for key terms. And if you have any
        questions about this Privacy Policy, you can contact us.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  auth: false,
  head() {
    return {
      title: 'Staj | Policy',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Privacy Policy',
        },
      ],
    }
  },
}
</script>
