<template>
  <section class="main__search-section">
    <h1 class="main__title">Find local artists & events</h1>
    <form class="main__search main-search" action="#" method="GET">
      <input
        class="main-search__input"
        type="text"
        placeholder="City or ZIP Code"
        list="search-list"
        maxlength="5"
        minlength="5"
        required
      />
      <button class="main-search__btn" type="submit">Search</button>
    </form>
  </section>
</template>
