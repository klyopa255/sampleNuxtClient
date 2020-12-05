<template>
  <div>
    <section class="main__container">
      <div class="main__about-info about-info about-info--high-top">
        <h1 class="about-info__title">How it works</h1>
        <div class="about-info__tabs info-tabs">
          <ul class="info-tabs__list">
            <li
              v-for="(tab, key) in tabs"
              :key="tab + key"
              class="info-tabs__item"
            >
              <a
                href="#"
                data-name="info"
                class="info-tabs__link"
                :class="currentTab === key ? ' info-tabs__link--current' : ''"
                @click.prevent="setTab(key)"
                >{{ tab.text }}</a
              >
            </li>
          </ul>
        </div>
        <div v-if="currentTab === 'user'" class="about-info__hiw-tab">
          <ul class="about-info__hiw-list">
            <li class="about-info__hiw-item">
              <div class="about-info__hiw-img-wrapper">
                <img src="~assets/img/001-selfie.svg" alt="icon" />
              </div>
              <h2 class="about-info__hiw-title">Create your profile</h2>
              <p class="about-info__hiw-text">
                Get started using Staj today - the easiest way to find local
                arts events and connect with local artists. For those who love
                the arts, there will always be an event on Staj just for you.
              </p>
            </li>
            <li class="about-info__hiw-item">
              <div class="about-info__hiw-img-wrapper">
                <img src="~assets/img/006-schedule.svg" alt="icon" />
              </div>
              <h2 class="about-info__hiw-title">Manage your events</h2>
              <p class="about-info__hiw-text">
                We make it easy for you to see all of the arts events and venues
                in your city by using our venue locator, and browsing through
                our different arts categories.
              </p>
            </li>
            <li class="about-info__hiw-item">
              <div class="about-info__hiw-img-wrapper">
                <img src="~assets/img/004-review.svg" alt="icon" />
              </div>
              <h2 class="about-info__hiw-title">Interact with followers</h2>
              <p class="about-info__hiw-text">
                Keep up with the events, artists, and organizers you love by
                saving them as your favorites
              </p>
            </li>
          </ul>
          <div style="display: none" class="about-info__video-wrapper">
            <iframe
              width="675"
              height="480"
              src="https://www.youtube.com/embed/7X8II6J-6mU"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div v-if="currentTab === 'artist'" class="about-info__hiw-tab">
          <ul class="about-info__hiw-list">
            <li class="about-info__hiw-item">
              <div class="about-info__hiw-img-wrapper">
                <img src="~assets/img/002-music.svg" alt="icon" />
              </div>
              <h2 class="about-info__hiw-title">Create your profile</h2>
              <p class="about-info__hiw-text">
                Get started using Staj today — the easiest way to find local
                arts events and connect with local artists. For those who love
                the arts, there will always be an event on Staj just for you.
              </p>
            </li>
            <li class="about-info__hiw-item">
              <div class="about-info__hiw-img-wrapper">
                <img src="~assets/img/Group.svg" alt="icon" />
              </div>
              <h2 class="about-info__hiw-title">Manage your events</h2>
              <p class="about-info__hiw-text">
                We make it easy for you to see all of the arts events and venues
                in your city by using our venue locator, and browsing through
                our different arts categories.
              </p>
            </li>
            <li class="about-info__hiw-item">
              <div class="about-info__hiw-img-wrapper">
                <img src="~assets/img/004-review.svg" alt="icon" />
              </div>
              <h2 class="about-info__hiw-title">Interact with followers</h2>
              <p class="about-info__hiw-text">
                Stay engaged with your followers, and interact with other local
                artists and organizers by posting pictures and videos on your
                timeline.
              </p>
            </li>
            <li class="about-info__hiw-item">
              <div class="about-info__hiw-img-wrapper">
                <img src="~assets/img/003-video-advertising.svg" alt="icon" />
              </div>
              <h2 class="about-info__hiw-title">Create custom ads</h2>
              <p class="about-info__hiw-text">
                Reach a wider audience with the ability to create ads promoting
                your posts and events.
              </p>
            </li>
          </ul>
          <div style="display: none" class="about-info__video-wrapper">
            <iframe
              width="675"
              height="480"
              src="https://www.youtube.com/embed/7X8II6J-6mU"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div v-if="currentTab === 'organizer'" class="about-info__hiw-tab">
          <ul class="about-info__hiw-list">
            <li class="about-info__hiw-item">
              <div class="about-info__hiw-img-wrapper">
                <img src="~assets/img/007-stage-2.svg" alt="icon" />
              </div>
              <h2 class="about-info__hiw-title">Create your profile</h2>
              <p class="about-info__hiw-text">
                Get started using Staj today - the easiest way to promote your
                arts events and connect with fans. Whether you are a venue, an
                arts organization, or a promoter, we have a platform that is
                just for you.
              </p>
            </li>
            <li class="about-info__hiw-item">
              <div class="about-info__hiw-img-wrapper">
                <img src="~assets/img/006-schedule.svg" alt="icon" />
              </div>
              <h2 class="about-info__hiw-title">Manage your events</h2>
              <p class="about-info__hiw-text">
                We make it easy for you to see all of the arts events and venues
                in your city by using our venue locator, and browsing through
                our different arts categories.
              </p>
            </li>
            <li class="about-info__hiw-item">
              <div class="about-info__hiw-img-wrapper">
                <img src="~assets/img/004-review.svg" alt="icon" />
              </div>
              <h2 class="about-info__hiw-title">Interact with followers</h2>
              <p class="about-info__hiw-text">
                Stay engaged with your followers, and interact with other local
                artists and organizers by posting pictures and videos on your
                timeline.
              </p>
            </li>
            <li class="about-info__hiw-item">
              <div class="about-info__hiw-img-wrapper">
                <img src="~assets/img/005-ads.svg" alt="icon" />
              </div>
              <h2 class="about-info__hiw-title">Create custom ads</h2>
              <p class="about-info__hiw-text">
                Reach a wider audience with the ability to create ads promoting
                your posts and events.
              </p>
            </li>
          </ul>
          <div style="display: none" class="about-info__video-wrapper">
            <iframe
              width="675"
              height="480"
              src="https://www.youtube.com/embed/7X8II6J-6mU"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      currentTab: 'user',
      tabs: {
        user: {
          text: 'For Users',
        },
        artist: {
          text: 'For Artists',
        },
        organizer: {
          text: 'For Organizers',
        },
      },
    }
  },
  methods: {
    setTab(tab) {
      this.currentTab = tab
    },
  },
  head() {
    return {
      title: 'Staj | How It Works',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'How Staj works',
        },
      ],
    }
  },
}
</script>
