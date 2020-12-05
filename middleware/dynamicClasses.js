export default ({ route, store }) => {
  if (route.name === 'index') {
    store.dispatch('classes/dispatchHeaderClasses', '')
    store.dispatch('classes/dispatchHeaderSearchClasses', '')
    store.dispatch('classes/dispatchMainClasses', '')
    store.dispatch('classes/dispatchNavbarClasses', '')
    store.dispatch('classes/dispatchNavbarIconClasses', '')
  } else {
    store.dispatch(
      'classes/dispatchNavbarIconClasses',
      ' user-nav__icn--black '
    )
    store.dispatch('classes/dispatchHeaderClasses', 'header--transparent')
    store.dispatch(
      'classes/dispatchHeaderSearchClasses',
      'header__search-form--transparent'
    )
    store.dispatch(
      'classes/dispatchNavbarClasses',
      'header__nav--transparent user-nav user-nav--transparent'
    )
    if (route.name === 'team') {
      store.dispatch(
        'classes/dispatchMainClasses',
        'main--white main--static main--no-slider'
      )
    } else if (route.name === 'events-id') {
      store.dispatch(
        'classes/dispatchMainClasses',
        'main main--white main--event main--no-slider'
      )
    } else if (route.name === 'feed') {
      store.dispatch(
        'classes/dispatchMainClasses',
        'main--white main--feed main--no-slider'
      )
    } else {
      store.dispatch(
        'classes/dispatchMainClasses',
        'main--white main--static-white main--static main--no-slider'
      )
    }
  }
}
