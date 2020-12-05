<template>
  <ul class="summary-artist-info__pop-over pop-over pop-over--visible">
    <li class="pop-over__item">
      <a href="#" class="pop-over__link" @click="$emit('click-toggle-edit')"
        >Edit Profile</a
      >
    </li>
    <li class="pop-over__item visible-mobile-menu">
      <a href="#" class="pop-over__link" @click.prevent="$logout">Log out</a>
    </li>
  </ul>
</template>
