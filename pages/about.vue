<template>
  <div>
    <section class="main__container static-banner">
      <h1 class="static-banner__title">About us</h1>
    </section>
    <section class="main__container">
      <div class="main__about-info about-info">
        <p class="about-info__text">
          Here at Staj, we believe the performing arts serve as the universal
          language of the world. Music, dance, visual arts, comedy, and theater
          are all things we enjoy no matter our race, gender, or background. Our
          vision for Staj is that we unite people from all walks of life to come
          enjoy local performing arts events, as well as putting all of our
          differences aside to realize we have more things in common than we may
          know.
        </p>
        <div class="about-info__img-wrapper">
          <img
            src="~assets/img/about-us-pic.jpg"
            srcset="~assets/img/about-us-pic@2x.jpg 2x"
            alt="description"
            width="900"
            height="500"
          />
        </div>
        <p class="about-info__text about-info__text--last">
          There have been many different technology platforms available for
          artists to use, but none of them have been very effective. Our mission
          at Staj is to provide people with an all-in-one platform focused on
          supporting local artists. With Staj being built by artists, we’ve
          focused on how to create value for not just artists, but for arts
          lovers and organizers who keep the arts alive.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  auth: false,
  head() {
    return {
      title: 'Staj | About',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'We are helping local artists and events',
        },
      ],
    }
  },
}
</script>
