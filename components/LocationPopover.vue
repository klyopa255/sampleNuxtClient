<template>
  <ul class="user-nav__pop-over pop-over--visible pop-over" @click.stop>
    <li class="pop-over__item">
      <button class="pop-over__link pop-over__link--space-between">
        Search by city
        <svg-icon
          class="user-nav__icn user-nav__icn--white pop-over__icn"
          name="icn_close-small"
        />
      </button>
    </li>
    <li class="pop-over__item">
      <button class="pop-over__link pop-over__link--space-between">
        Current Location
        <svg-icon class="user-nav__icn pop-over__icn" name="icn_location" />
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.pop-over {
  display: none;

  @include list-reset();

  padding: 4px 0;
  background-color: #292929;
  border: 1px solid #fff;
  border-radius: 6px;
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.25);
  min-width: 220px;
  z-index: 100500;
  overflow: hidden;
  color: #fff;

  &__title {
    display: block;
    margin: 0 auto;
    font-family: Jost, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 35px;
    text-align: center;
    color: #fff;
    margin-bottom: 10px;
  }

  &__label {
    font-family: Jost, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 23px;
    color: #fff;
    padding-left: 8px;
  }

  &__copy-link {
    margin: 0 8px;
    margin-bottom: 8px;
    padding: 4px;
    padding-top: 10px;
    padding-bottom: 9px;
    max-width: 100%;
    border: 1px solid #a8a8a8;
    border-radius: 4px;
    font-family: Jost, sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 29px;
    color: #925ffe;
    text-align: right;
  }

  &__share-button {
    @include button-reset();

    display: flex;
    width: 100%;
    max-width: calc(100% - 16px);
    margin: 0 8px;
    margin-bottom: 8px;
    padding: 10px;
    text-align: center;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    position: relative;
    font-family: Jost, sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 29px;
    color: #fff;

    &--skyblue {
      background: #00a2ee;
    }

    &--pink {
      background: #ff496d;
    }

    &--blue {
      background: #1778f2;
    }

    &:last-child {
      margin-bottom: 4px;
    }
  }

  &__icon {
    position: absolute;
    fill: #fff;
    left: 10px;
  }

  &__icn {
    width: 32px;
    height: 32px;
    fill: #fff;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    width: 310px;
    margin: 0 auto;
    margin-bottom: 15px;
  }

  &__button {
    @include button-reset();

    background-repeat: no-repeat;
    width: 32px;
    height: 32px;
    background-color: transparent;
    background-size: 32px 32px;

    &--prev {
      background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 9.88L13.8192 16L20 22.12L18.0972 24L10 16L18.0972 8L20 9.88Z' fill='white'/%3E%3C/svg%3E%0A");
    }

    &--next {
      background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 9.88L18.1808 16L12 22.12L13.9028 24L22 16L13.9028 8L12 9.88Z' fill='white'/%3E%3C/svg%3E%0A");
    }
  }

  &__select {
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
    color: #fff;
    background-color: transparent;
    width: 160px;
    padding-left: 20px;
    appearance: none;
    list-style: none;
    border: none;
    background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25.3329 11.9976H6.66602L15.9994 19.9976L25.3329 11.9976Z' fill='white'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: 106% 50%;
    background-size: 32px 32px;
  }

  &__item {
    width: 100%;
    margin: 4px 0;

    &--flex {
      display: flex;
      flex-wrap: wrap;
    }
  }

  &__name {
    text-transform: capitalize;
    display: flex;
    font-family: Jost, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 28px;
    color: #fff;
    width: 50%;
    padding-left: 14px;
  }

  &__link {
    padding: 6px 0;
    background-color: transparent;
    color: #fff;
    padding-left: 14px;
    display: flex;
    align-items: center;
    width: 100%;
    border: none;

    &--active,
    &:hover {
      background-color: #000;
    }

    &--space-between {
      justify-content: space-between;
      padding-right: 5px;
    }

    &--button {
      margin: 0;
      padding: 0;
      border: none;
      display: flex;
      align-items: center;
      width: 50%;
      text-align: left;
      padding-left: 16px;
      position: relative;
      font-family: Jost, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 28px;
      color: #fff;

      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
      }

      &::after {
        position: absolute;
        content: '';
        width: 12px;
        height: 12px;
        border: 2px solid white;
        background-color: transparent;
        border-right-color: transparent;
        border-top-color: transparent;
        top: 10px;
        right: 16px;
        z-index: 5;
        transform: rotateZ(135deg);
      }
    }

    &--no-hover {
      &:hover {
        background-color: #292929;
      }
    }
  }

  &__notes-count {
    display: block;
    width: 22px;
    height: 22px;
    padding-top: 2px;
    margin-left: auto;
    margin-right: 16px;
    border-radius: 50%;
    font-weight: bold;
    font-size: 15px;
    line-height: 19px;
    text-align: center;
    color: #fff;

    &--purple {
      background-color: #925ffe;
    }

    &--pink {
      background-color: #ff496d;
    }
  }

  &__day-list {
    @include list-reset();

    color: #a8a8a8;
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    font-size: 12px;
    padding: 0 20px;
    width: 100%;
    position: relative;

    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 1px;
      background-color: #515151;
      left: 0;
      top: calc(100% - 2px);
    }
  }

  &__date-list {
    @include list-reset();

    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 0 10px;
    padding-right: 9px;
    padding-top: 15px;
    margin-bottom: 48px;
  }

  &__date-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 36px;
    text-align: center;
    font-weight: normal;
    font-size: 14px;
    margin: 0 2px;
    margin-bottom: 6px;
    color: #8b8b8b;
    border-radius: 20px;

    &--current-month {
      color: #fff;
    }

    &--current-date {
      border: 1px solid #a8a8a8;
    }

    &--event-date {
      background-color: #d6a94f;
      color: #000;
    }
  }

  &__list-wrapper {
    position: relative;
    min-height: 40px;
    overflow: hidden;
  }

  &__fast-date {
    position: absolute;

    @include list-reset();

    display: flex;
    width: 100%;
    padding: 0 8px;
  }

  &__fast-date-item {
    border: 1px solid #a8a8a8;
    border-radius: 3px;
    font-weight: 500;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
    color: #fff;
    padding: 6px;
    padding-left: 15px;
    padding-right: 16px;
    margin-right: 6px;
    white-space: nowrap;
  }

  &__avatar-wrapper {
    display: flex;
    font-family: Jost, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 28px;
    color: #fff;
    width: 50%;
    padding-left: 14px;

    & img {
      border-radius: 50%;
      margin-right: 10px;
    }
  }

  &--calendar {
    width: 344px;
    padding-top: 23px;
  }

  &--visible {
    display: block;
  }
}
</style>
