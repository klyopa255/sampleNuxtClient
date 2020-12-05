<template>
  <div>
    <section class="info-tabs__filters filters">
      <h2 class="visually-hidden">Filters</h2>
      <div class="filters__wrapper">
        <ul class="filters__list filters__list--justify">
          <li class="filters__item">
            <select
              name="types"
              class="filters__label filters__label--select filters__label--select--long"
            >
              <option value="all-types" selected>All types</option>
            </select>
          </li>
          <li class="filters__item">
            <button
              type="button"
              class="filters__label filters__label--select filters__label--button"
            >
              By Date
            </button>
            <div class="filters__popover pop-over pop-over--calendar">
              <div class="pop-over__wrapper">
                <button class="pop-over__button pop-over__button--prev">
                  <span class="visually-hidden">Previous</span>
                </button>
                <select id="pop-over-date" class="pop-over__select" name="date">
                  <option value="2019-10">October 2019</option>
                </select>
                <button class="pop-over__button pop-over__button--next">
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
              <ul class="pop-over__day-list">
                <li class="pop-over__day-item">Mon</li>
                <li class="pop-over__day-item">Tue</li>
                <li class="pop-over__day-item">Wed</li>
                <li class="pop-over__day-item">Thu</li>
                <li class="pop-over__day-item">Fri</li>
                <li class="pop-over__day-item">Sat</li>
                <li class="pop-over__day-item">Sun</li>
              </ul>
              <ul class="pop-over__date-list">
                <li class="pop-over__date-item">30</li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  1
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  2
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  3
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  4
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  5
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  6
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  7
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  8
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  9
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-date pop-over__date-item--current-month"
                >
                  10
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  11
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  12
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  13
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  14
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  15
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--event-date pop-over__date-item--current-month"
                >
                  16
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  17
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  18
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  19
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  20
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  21
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  22
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  23
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  24
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  25
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  26
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  27
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  28
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  29
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  30
                </li>
                <li
                  class="pop-over__date-item pop-over__date-item--current-month"
                >
                  31
                </li>
                <li class="pop-over__date-item">1</li>
                <li class="pop-over__date-item">2</li>
                <li class="pop-over__date-item">3</li>
              </ul>
              <div class="pop-over__list-wrapper">
                <ul class="pop-over__fast-date">
                  <li class="pop-over__fast-date-item">Today</li>
                  <li class="pop-over__fast-date-item">Yestarday</li>
                  <li class="pop-over__fast-date-item">This Week</li>
                  <li class="pop-over__fast-date-item">Last Week</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="profile__events-section">
      <h2 class="visually-hidden">My Feed</h2>
      <ul class="profile-info__events-list profile-info__events-list--mg-top">
        <li class="profile-info__event-item">
          <article class="profile-info__post feed-post">
            <div class="feed-post__header section-flexline">
              <div
                class="section-flexline__left-block section-flexline__left-block--flex"
              >
                <a href="#" class="section-flexline__avatar-link">
                  <img
                    class="section-flexline__img"
                    width="60"
                    height="60"
                    src="~assets/img/Avatar-11.jpg"
                    srcset="~assets/img/Avatar@2x.jpg"
                    alt="Your avatar"
                  />
                </a>
                <div class="section-flexline__wrapper">
                  <h3 class="section-flexline__title">
                    <a href="#" class="section-flexline__title-link"
                      >Kevin Baird</a
                    >
                  </h3>
                  <time
                    class="section-flexline__time"
                    datetime="2020-10-05 09:57"
                    >just posted a photo</time
                  >
                </div>
              </div>
              <div
                class="section-flexline__right-block section-flexline__right-block--flex section-flexline__right-block--pad-top"
              >
                <p class="section-flexline__advertising">Advertizing</p>
                <div class="section-flexline__more-btn more-btn">
                  <button
                    class="more-btn__button more-btn__button--pop-over"
                    type="button"
                  >
                    <span class="visually-hidden">More</span>
                    <svg-icon
                      name="icn_more"
                      class="more-btn__icon more-btn__icon--black"
                      width="32"
                      height="32"
                    />
                  </button>
                  <ul class="more-btn__pop-over pop-over pop-over--visible">
                    <li class="pop-over__item">
                      <a href="#" class="pop-over__link">Report post</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="feed-post__img-wrapper">
              <img
                class="feed-post__img"
                src="~assets/img/feed-post-pic.jpg"
                srcset="~assets/img/feed-post-pic@2x.jpg 2x"
                alt="description"
              />
            </div>
            <div class="feed-post__controls section-flexline">
              <div class="section-flexline__left-block">
                <ul class="section-flexline__list">
                  <li class="section-flexline__item">
                    <button class="section-flexline__button">
                      <svg-icon
                        name="icn_like-black"
                        class="section-flexline__icon"
                        width="32"
                        height="32"
                      />
                    </button>
                  </li>
                  <li class="section-flexline__item">
                    <button class="section-flexline__button">
                      <svg-icon
                        name="icn_comment"
                        class="section-flexline__icon"
                        width="32"
                        height="32"
                      />
                    </button>
                  </li>
                  <li class="section-flexline__item">
                    <button class="section-flexline__button">
                      <svg-icon
                        name="icn_added-to-favorites"
                        class="section-flexline__icon"
                        width="32"
                        height="32"
                      />
                    </button>
                  </li>
                </ul>
              </div>
              <div class="section-flexline__right-block">
                <button class="section-flexline__button">
                  <svg-icon
                    name="icn_share-black"
                    class="section-flexline__icon"
                    width="32"
                    height="32"
                  />
                </button>
              </div>
            </div>
            <form class="feed-post__form" action="#" method="POST">
              <legend class="visually-hidden">Comment</legend>
              <label
                class="feed-post__label feed-post__form-link"
                for="comment-text"
              >
                <img
                  width="60"
                  height="60"
                  class="feed-post__form-img"
                  src="~assets/img/av.jpg"
                  srcset="~assets/img/av@2x.jpg 2x"
                  alt="description"
                />
              </label>
              <input
                id="comment-text"
                class="feed-post__input"
                type="text"
                name="comment-text"
                placeholder="Put your comment here"
              />
              <button type="submit" class="visually-hidden">
                Send message
              </button>
            </form>
          </article>
        </li>
        <li class="profile-info__event-item">
          <article class="profile-info__post feed-post">
            <div class="feed-post__header section-flexline">
              <div
                class="section-flexline__left-block section-flexline__left-block--flex"
              >
                <a href="#" class="section-flexline__avatar-link">
                  <img
                    class="section-flexline__img"
                    width="60"
                    height="60"
                    src="~assets/img/Avatar-11.jpg"
                    srcset="~assets/img/Avatar@2x.jpg"
                    alt="Your avatar"
                  />
                </a>
                <div class="section-flexline__wrapper">
                  <h3 class="section-flexline__title">
                    <a href="#" class="section-flexline__title-link"
                      >Sam Halliday</a
                    >
                  </h3>
                  <time
                    class="section-flexline__time"
                    datetime="2020-10-05 09:57"
                    >just posted a post</time
                  >
                </div>
              </div>
              <div
                class="section-flexline__right-block section-flexline__right-block--flex section-flexline__right-block--pad-top"
              >
                <div class="section-flexline__more-btn more-btn">
                  <button class="more-btn__button" type="button">
                    <span class="visually-hidden">More</span>
                    <svg-icon
                      name="icn_more"
                      class="more-btn__icon more-btn__icon--black"
                      width="32"
                      height="32"
                    />
                  </button>
                  <ul class="more-btn__pop-over pop-over">
                    <li class="pop-over__item">
                      <a href="#" class="pop-over__link">Report post</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="feed-post__img-wrapper">
              <img
                class="feed-post__img"
                src="~assets/img/feed-post-pic-1.jpg"
                srcset="~assets/img/feed-post-pic-1@2x.jpg 2x"
                alt="description"
              />
            </div>
            <p class="feed-post__text">
              Hailing from Bangor and Donaghadee, Northern Ireland, Two Door
              Cinema Club features singer/guitarist/programmer Alex Trimble,
              guitarist/singer Sam Halliday, and bassist/singer Kevin Baird.
              Trimble and Halliday met in school, and then hooked up with Baird
              through mutual friends. The trio began playing as Two Door Cinema
              Club in 2007 and skipped going to university to focus on the band.
              Fortunately, the gamble paid off -- the band's debut EP.
            </p>
            <div class="feed-post__controls section-flexline">
              <div class="section-flexline__left-block">
                <ul class="section-flexline__list">
                  <li class="section-flexline__item">
                    <button class="section-flexline__button">
                      <svg-icon
                        name="icn_like-black"
                        class="section-flexline__icon"
                        width="32"
                        height="32"
                      />
                    </button>
                  </li>
                  <li class="section-flexline__item">
                    <button class="section-flexline__button">
                      <svg-icon
                        name="icn_comment"
                        class="section-flexline__icon"
                        width="32"
                        height="32"
                      />
                    </button>
                  </li>
                  <li class="section-flexline__item">
                    <button class="section-flexline__button">
                      <svg-icon
                        name="icn_added-to-favorites"
                        class="section-flexline__icon"
                        width="32"
                        height="32"
                      />
                    </button>
                  </li>
                </ul>
              </div>
              <div class="section-flexline__right-block">
                <button class="section-flexline__button">
                  <svg-icon
                    name="icn_share-black"
                    class="section-flexline__icon"
                    width="32"
                    height="32"
                  />
                </button>
              </div>
            </div>
            <form class="feed-post__form" action="#" method="POST">
              <legend class="visually-hidden">Comment</legend>
              <label
                class="feed-post__label feed-post__form-link"
                for="comment-text"
              >
                <img
                  width="60"
                  height="60"
                  class="feed-post__form-img"
                  src="~assets/img/av.jpg"
                  srcset="~assets/img/av@2x.jpg 2x"
                  alt="description"
                />
              </label>
              <input
                id="comment-text"
                class="feed-post__input"
                type="text"
                name="comment-text"
                placeholder="Put your comment here"
              />
              <button type="submit" class="visually-hidden">
                Send message
              </button>
            </form>
          </article>
        </li>
        <li class="profile-info__event-item">
          <article class="profile-info__post feed-post">
            <div class="feed-post__header section-flexline">
              <div
                class="section-flexline__left-block section-flexline__left-block--flex"
              >
                <a href="#" class="section-flexline__avatar-link">
                  <img
                    class="section-flexline__img"
                    width="60"
                    height="60"
                    src="~assets/img/Avatar-11.jpg"
                    srcset="~assets/img/Avatar@2x.jpg"
                    alt="Your avatar"
                  />
                </a>
                <div class="section-flexline__wrapper">
                  <h3 class="section-flexline__title">
                    <a href="#" class="section-flexline__title-link"
                      >Alex Trimble</a
                    >
                  </h3>
                  <time
                    class="section-flexline__time"
                    datetime="2020-10-05 09:57"
                    >just posted a photo</time
                  >
                </div>
              </div>
              <div
                class="section-flexline__right-block section-flexline__right-block--flex section-flexline__right-block--pad-top"
              >
                <p class="section-flexline__advertising">Advertizing</p>
                <div class="section-flexline__more-btn more-btn">
                  <button
                    class="more-btn__button more-btn__button--pop-over"
                    type="button"
                  >
                    <span class="visually-hidden">More</span>
                    <svg-icon
                      name="icn_more"
                      class="more-btn__icon more-btn__icon--black"
                      width="32"
                      height="32"
                    />
                  </button>
                  <ul class="more-btn__pop-over pop-over pop-over--visible">
                    <li class="pop-over__item">
                      <a href="#" class="pop-over__link">Report post</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="feed-post__img-wrapper">
              <article
                class="feed-post__event event event--in-post event--no-hover-no-height"
              >
                <h3 class="event__title">
                  <a href="#" class="event__title-link">Of Monsters and Men</a>
                </h3>
                <a href="#" class="event__img-link">
                  <img
                    src="~assets/img/profile-event-pic-1.jpg"
                    srcset="~assets/img/profile-event-pic-1@2x.jpg 2x"
                    alt="Lana Del Rey"
                    width="780"
                    height="320"
                    class="event__img"
                  />
                </a>
                <svg-icon
                  name="icn_music"
                  class="event__type-icon event__type-icon--low event__type-icon--music"
                  width="32"
                  height="32"
                  aria-label="Event type"
                />
                <ToCalendar
                  modifier="event__to-calendar--low"
                  :event-data="event"
                />
                <div class="event__one-line-wrapper">
                  <p class="event__time-price event__time-price--inline">
                    <time class="event__time" datetime="2020-09-20 20:00"
                      >20.09 - 22:00</time
                    >
                    <span v-if="event.price" class="event__price">$50</span>
                  </p>
                  <a href="#" class="event__host event__host--inline"
                    >Uptown Theatre</a
                  >
                </div>
                <ul class="event__addition event__addition--flex">
                  <li class="event__addition-item">
                    <a href="#" class="event__addition-link">
                      <img
                        src="~assets/img/Avatar-11.jpg"
                        srcset="~assets/img/Avatar@2x.jpg 2x"
                        alt="Toyota Amphitheatre"
                        width="48"
                        height="48"
                        class="event__addition-img"
                      />
                      <span class="event__addition-name"
                        >Nanna Bryndís Hilmarsdóttir</span
                      >
                    </a>
                  </li>
                </ul>
              </article>
            </div>
            <div class="feed-post__controls section-flexline">
              <div class="section-flexline__left-block">
                <ul class="section-flexline__list">
                  <li class="section-flexline__item">
                    <button class="section-flexline__button">
                      <svg-icon
                        name="icn_like-black"
                        class="section-flexline__icon"
                        width="32"
                        height="32"
                      />
                    </button>
                  </li>
                  <li class="section-flexline__item">
                    <button class="section-flexline__button">
                      <svg-icon
                        name="icn_comment"
                        class="section-flexline__icon"
                        width="32"
                        height="32"
                      />
                    </button>
                  </li>
                  <li class="section-flexline__item">
                    <button class="section-flexline__button">
                      <svg-icon
                        name="icn_added-to-favorites"
                        class="section-flexline__icon"
                        width="32"
                        height="32"
                      />
                    </button>
                  </li>
                </ul>
              </div>
              <div class="section-flexline__right-block">
                <button class="section-flexline__button">
                  <svg-icon
                    name="icn_share-black"
                    class="section-flexline__icon"
                    width="32"
                    height="32"
                  />
                </button>
              </div>
            </div>
            <h4 class="visually-hidden">Commnets</h4>
            <ul class="feed-post__comments comments">
              <li class="comments__item">
                <a href="#" class="comments__avatar-link">
                  <img
                    width="60"
                    height="60"
                    src="~assets/img/Avatar-11.jpg"
                    srcset="~assets/img/Avatar@2x.jpg 2x"
                    alt="User name"
                    class="comments__avatar"
                  />
                </a>
                <div class="comments__comment-wrapper">
                  <h5 class="comments__author-name">
                    <a href="#" class="comments__author-link">Robert Fox</a>
                  </h5>
                  <time class="comments__time" datetime="2020-10-05 12:21"
                    >1h ago</time
                  >
                  <p class="comments__comment-text">
                    Sach nice news! Want to be there, and even Corona can't stop
                    me.
                  </p>
                </div>
              </li>
            </ul>

            <form class="feed-post__form" action="#" method="POST">
              <legend class="visually-hidden">Comment</legend>
              <label
                class="feed-post__label feed-post__form-link"
                for="comment-text"
              >
                <img
                  width="60"
                  height="60"
                  class="feed-post__form-img"
                  src="~assets/img/av.jpg"
                  srcset="~assets/img/av@2x.jpg 2x"
                  alt="description"
                />
              </label>
              <input
                id="comment-text"
                class="feed-post__input"
                type="text"
                name="comment-text"
                placeholder="Put your comment here"
              />
              <button type="submit" class="visually-hidden">
                Send message
              </button>
            </form>
          </article>
        </li>
      </ul>
      <button class="main__more-button" type="button">Explore More</button>
    </section>
  </div>
</template>
