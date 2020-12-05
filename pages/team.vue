<template>
  <div>
    <section class="main__container static-banner">
      <h1 class="static-banner__title static-banner__title--margin-bottom">
        Our Team
      </h1>
    </section>
    <section class="main__container">
      <h2 class="about-info__title about-info__title--team">
        Joshua H. Ross | Founder & CEO, Staj Inc.
      </h2>
      <div class="about-info__wrapper about-info__wrapper--team">
        <div class="about-info__img-wrapper about-info__img-wrapper--team">
          <img src="~assets/img/team-main.jpg" alt="description" />
        </div>
        <p class="about-info__text about-info__text--team">
          Born and raised in Chicago, multi-instrumentalist Josh Ross has 15+
          years of experience as a professional musician. Ross was a member of
          The Chicago High School for the Arts inaugural graduating class. He
          obtained his Bachelor’s of Science in Marketing from the UIC College
          of Business Administration in 2017. He discovered his love for tech
          when he began working with Discover Music Discover Life, Inc. as an IT
          Support Specialist and The Chicago Jazz Philharmonic as a Production
          Assistant.
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
      title: 'Staj | Team',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'About Staj Team',
        },
      ],
    }
  },
}
</script>
