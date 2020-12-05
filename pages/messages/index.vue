<template>
  <div class="chat">
    <h1 class="visually-hidden">Chat page</h1>
    <section class="chat__section">
      <div
        class="chat__wrapper chat__wrapper--pad16 chat__wrapper--border-bottom chat__wrapper--border-right"
      >
        <input
          type="text"
          placeholder="Search messages"
          class="chat__search-input"
        />
      </div>
      <ul
        class="chat__wrapper chat__wrapper--no-pad chat__wrapper--no-bottom-pad chat__wrapper--border-right follow-list"
      >
        <li
          class="chat__item chat__item--active follow-list__item--no-border section-flexline"
        >
          <div
            class="section-flexline__left-block section-flexline__left-block--flex"
          >
            <a
              href="#"
              class="section-flexline__avatar-link section-flexline__avatar-link--mar-right"
            >
              <img
                src="~assets/img/Avatar.png"
                alt=""
                class="section-flexline__avatar section-flexline__avatar--small"
              />
              <svg
                width="24"
                height="24"
                class="section-flexline__icon section-flexline__icon--small"
              >
                <use xlink:href="img/sprite.svg#icn_subscription"></use>
              </svg>
            </a>
            <a href="#" class="section-flexline__name-link"> Kevin Baird </a>
          </div>
        </li>
      </ul>
      <ul
        class="chat__wrapper chat__wrapper--scroll chat__wrapper--no-top-pad chat__wrapper--no-pad chat__wrapper--border-right follow-list"
      >
        <li class="chat__item follow-list__item--no-border section-flexline">
          <div
            class="section-flexline__left-block section-flexline__left-block--flex"
          >
            <a
              href="#"
              class="section-flexline__avatar-link section-flexline__avatar-link--mar-right"
            >
              <img
                src="~assets/img/Avatar.png"
                alt=""
                class="section-flexline__avatar section-flexline__avatar--small"
              />
            </a>
            <a href="#" class="section-flexline__name-link"> Sam Halliday </a>
          </div>
        </li>
        <li class="chat__item follow-list__item--no-border section-flexline">
          <div
            class="section-flexline__left-block section-flexline__left-block--flex"
          >
            <a
              href="#"
              class="section-flexline__avatar-link section-flexline__avatar-link--mar-right"
            >
              <img
                src="~assets/img/Avatar.png"
                alt=""
                class="section-flexline__avatar section-flexline__avatar--small"
              />
            </a>
            <a href="#" class="section-flexline__name-link">
              Marvin McKinney
            </a>
          </div>
        </li>
        <li class="chat__item follow-list__item--no-border section-flexline">
          <div
            class="section-flexline__left-block section-flexline__left-block--flex"
          >
            <a
              href="#"
              class="section-flexline__avatar-link section-flexline__avatar-link--mar-right"
            >
              <img
                src="~assets/img/Avatar.png"
                alt=""
                class="section-flexline__avatar section-flexline__avatar--small"
              />
            </a>
            <a href="#" class="section-flexline__name-link">
              Brooklyn Simmons
            </a>
          </div>
        </li>
        <li class="chat__item follow-list__item--no-border section-flexline">
          <div
            class="section-flexline__left-block section-flexline__left-block--flex"
          >
            <a
              href="#"
              class="section-flexline__avatar-link section-flexline__avatar-link--mar-right"
            >
              <img
                src="~assets/img/Avatar.png"
                alt=""
                class="section-flexline__avatar section-flexline__avatar--small"
              />
            </a>
            <a href="#" class="section-flexline__name-link"> Annette Black </a>
          </div>
        </li>
        <li class="chat__item follow-list__item--no-border section-flexline">
          <div
            class="section-flexline__left-block section-flexline__left-block--flex"
          >
            <a
              href="#"
              class="section-flexline__avatar-link section-flexline__avatar-link--mar-right"
            >
              <img
                src="~assets/img/Avatar.png"
                alt=""
                class="section-flexline__avatar section-flexline__avatar--small"
              />
            </a>
            <a href="#" class="section-flexline__name-link"> Dianne Russell </a>
          </div>
        </li>
        <li class="chat__item follow-list__item--no-border section-flexline">
          <div
            class="section-flexline__left-block section-flexline__left-block--flex"
          >
            <a
              href="#"
              class="section-flexline__avatar-link section-flexline__avatar-link--mar-right"
            >
              <img
                src="~assets/img/Avatar.png"
                alt=""
                class="section-flexline__avatar section-flexline__avatar--small"
              />
            </a>
            <a href="#" class="section-flexline__name-link"> Kevin Baird </a>
          </div>
        </li>
        <li class="chat__item follow-list__item--no-border section-flexline">
          <div
            class="section-flexline__left-block section-flexline__left-block--flex"
          >
            <a
              href="#"
              class="section-flexline__avatar-link section-flexline__avatar-link--mar-right"
            >
              <img
                src="~assets/img/Avatar.png"
                alt=""
                class="section-flexline__avatar section-flexline__avatar--small"
              />
            </a>
            <a href="#" class="section-flexline__name-link"> Kevin Baird </a>
          </div>
        </li>
        <li class="chat__item follow-list__item--no-border section-flexline">
          <div
            class="section-flexline__left-block section-flexline__left-block--flex"
          >
            <a
              href="#"
              class="section-flexline__avatar-link section-flexline__avatar-link--mar-right"
            >
              <img
                src="~assets/img/Avatar.png"
                alt=""
                class="section-flexline__avatar section-flexline__avatar--small"
              />
            </a>
            <a href="#" class="section-flexline__name-link"> Kevin Baird </a>
          </div>
        </li>
        <li class="chat__item follow-list__item--no-border section-flexline">
          <div
            class="section-flexline__left-block section-flexline__left-block--flex"
          >
            <a
              href="#"
              class="section-flexline__avatar-link section-flexline__avatar-link--mar-right"
            >
              <img
                src="~assets/img/Avatar.png"
                alt=""
                class="section-flexline__avatar section-flexline__avatar--small"
              />
            </a>
            <a href="#" class="section-flexline__name-link">
              Leslie Alexander
            </a>
          </div>
        </li>
      </ul>
    </section>
    <section class="chat__section chat__section--w100 chat__section--flex-col">
      <div
        class="chat__wrapper chat__wrapper--pb8 chat__wrapper--border-bottom section-flexline"
      >
        <h2
          class="chat__title section-flexline__left-block section-flexline__left-block--flex"
        >
          Kevin Baird
          <time class="chat__time" datetime="2020-10-12 12:00"
            >last seen 1h ago</time
          >
        </h2>
        <button class="chat__more-button section__flex-line__right-block">
          <span class="visually-hidden">Options</span>
          <svg class="chat__more-icon">
            <use xlink:href="img/sprite.svg#icn_more"></use>
          </svg>
        </button>
      </div>
      <ul class="chat__message-area">
        <li class="chat__message-item">
          <a
            href="#"
            class="section-flexline__avatar-link section-flexline__avatar-link--mar-right"
          >
            <img
              src="~assets/img/Avatar.png"
              alt=""
              class="section-flexline__avatar"
            />
            <svg width="24" height="24" class="section-flexline__icon">
              <use xlink:href="img/sprite.svg#icn_subscription"></use>
            </svg>
          </a>
          <p class="chat__message-text">
            <time class="chat__time">1h ago</time>
            Did you hear? Our concert tried to cancel. Because of Covid... Bad
            feelings.
          </p>
        </li>
        <li class="chat__message-item chat__message-item--my">
          <p class="chat__message-text">
            <time class="chat__time">1h ago</time>
            No way, man! Everything'll be good! I'm telling you!
          </p>
        </li>
        <li class="chat__message-item">
          <a
            href="#"
            class="section-flexline__avatar-link section-flexline__avatar-link--mar-right"
          >
            <img
              src="~assets/img/Avatar.png"
              alt=""
              class="section-flexline__avatar"
            />
            <svg width="24" height="24" class="section-flexline__icon">
              <use xlink:href="img/sprite.svg#icn_subscription"></use>
            </svg>
          </a>
          <p class="chat__message-text">
            <time class="chat__time">1h ago</time>
            Oh... Hope so, man!
          </p>
        </li>
      </ul>
      <form class="chat__post-form post-form" action="#" method="POST">
        <input
          class="post-form__input"
          type="text"
          name="post-text"
          id="post-text"
          placeholder="Put your text here"
        />
        <ul class="post-form__controls">
          <li class="post-form__controls-item">
            <button class="post-form__button" type="button">
              <span class="visually-hidden">Add link</span>
              <svg-icon
                name="icn_link"
                width="32"
                height="32"
                class="post-form__icon"
              />
            </button>
          </li>
          <li class="post-form__controls-item">
            <button class="post-form__button" type="button">
              <span class="visually-hidden">Add picture</span>
              <svg-icon
                name="icn_image"
                width="32"
                height="32"
                class="post-form__icon"
              />
            </button>
          </li>
          <li class="post-form__controls-item">
            <button class="post-form__button" type="button">
              <span class="visually-hidden">Add file</span>
              <svg-icon
                name="icn_attach-file"
                width="32"
                height="32"
                class="post-form__icon"
              />
            </button>
          </li>
        </ul>
        <button type="submit" class="visually-hidden">Send message</button>
      </form>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.section-flexline {
  &__avatar-link {
    flex-shrink: 0;
  }
}
.post-form {
  &__input {
    padding-right: 135px;
  }
}
</style>
