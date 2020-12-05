<template>
  <section class="main__about about">
    <div class="about__wrapper">
      <h2 class="visually-hidden">About us</h2>
      <div class="about__logo-wrapper logo">
        <a class="logo__link">
          <img
            src="~assets/img/logo-footer.svg"
            width="146"
            height="40"
            alt="Staj logo"
          />
        </a>
      </div>
      <p class="about__text">
        Staj (pronounced “stage”) is an event-tech company developing a modern
        day solution for finding local arts events.
      </p>
      <p class="about__text">
        Our goal is that our platform will be the largest online directory for
        local arts events, artists and organizers <br />
        (venues, promoters, and arts organizations).
      </p>
      <nuxt-link class="about__link" to="/events">Explore All Events</nuxt-link>
    </div>
  </section>
</template>
