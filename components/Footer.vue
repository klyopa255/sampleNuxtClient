<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <div class="footer__top">
        <div class="footer__soc-wrapper">
          <p class="footer__copyright">
            Copyright © {{ new Date().getFullYear() }}. All rights reserved.
          </p>
          <ul class="footer__socials socials">
            <li class="socials__item">
              <a
                href="https://twitter.com/onstaj"
                target="_blank"
                class="socials__link"
              >
                <span class="visually-hidden">Twitter</span>
                <svg-icon
                  name="icn_share_twitter"
                  width="44"
                  height="44"
                  class="socials__icon"
                />
              </a>
            </li>
            <li class="socials__item">
              <a
                href="https://www.instagram.com/onstaj"
                target="_blank"
                class="socials__link"
              >
                <span class="visually-hidden">instagram</span>
                <svg-icon
                  name="icn_share_instagram"
                  width="44"
                  height="44"
                  class="socials__icon"
                />
              </a>
            </li>
            <li class="socials__item">
              <a
                href="https://www.facebook.com/onstaj"
                target="_blank"
                class="socials__link"
              >
                <span class="visually-hidden">facebook</span>
                <svg-icon
                  name="icn_share_facebook"
                  width="44"
                  height="44"
                  class="socials__icon"
                />
              </a>
            </li>
            <li class="socials__item">
              <a
                href="https://www.linkedin.com/company/stajinc"
                target="_blank"
                class="socials__link"
              >
                <span class="visually-hidden">messenger</span>
                <svg-icon
                  name="icn_share_linkedin"
                  width="44"
                  height="44"
                  class="socials__icon"
                />
              </a>
            </li>
          </ul>
        </div>
        <SecondaryNavbar />
        <section class="footer__subscribe subscribe subscribe--footer">
          <p class="subscribe__title subscribe__title--footer">
            Want to be in touch?
          </p>
          <SubscribeForm :classes="'footer'" />
          <Popup />
          <CropImg />
        </section>
      </div>
      <p class="footer__bottom">
        The information contained in this website is for general information
        purposes only. The information is provided by Staj Inc. and while we
        endeavour to keep the information up to date and correct, we make no
        representations or warranties of any kind, express or implied, about the
        completeness, accuracy, reliability, suitability or availability with
        respect to the website or the information, products, services, or
        related graphics contained on the website for any purpose. Any reliance
        you place on such information is therefore strictly at your own risk.
      </p>
      <img
        class="footer__devvela"
        src="~assets/img/devvela.png"
        alt="Devvela"
      />
    </div>
  </footer>
</template>
