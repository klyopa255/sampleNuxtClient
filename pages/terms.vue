<template>
  <section class="main__container">
    <div class="main__about-info about-info about-info--high-top">
      <h1 class="about-info__title about-info__title--faq">Terms of use</h1>
      <p class="about-info__text about-info__text--lot-text">
        We know it’s tempting to skip these Terms of Service, but it’s important
        to establish what you can expect from us as you use Google services, and
        what we expect from you.
      </p>
      <p class="about-info__text about-info__text--lot-text">
        These Terms of Service reflect the way Google’s business works, the laws
        that apply to our company, and certain things we’ve always believed to
        be true. As a result, these Terms of Service help define Google’s
        relationship with you as you interact with our services. For example,
        these terms include the following topic headings:
      </p>
      <p class="about-info__text about-info__text--lot-text">
        What you can expect from us, which describes how we provide and develop
        our services<br />What we expect from you, which establishes certain
        rules for using our services<br />Content in Google services, which
        describes the intellectual property rights to the content you find in
        our services — whether that content belongs to you, Google, or others<br />
        In case of problems or disagreements, which describes other legal rights
        you have, and what to expect in case someone violates these terms <br />
        Understanding these terms is important because, by using our services,
        you’re agreeing to these terms. <br />
      </p>
      <p class="about-info__text about-info__text--lot-text">
        Besides these terms, we also publish a Privacy Policy. Although it’s not
        part of these terms, we encourage you to read it to better understand
        how you can update, manage, export, and delete your information.
      </p>
      <p class="about-info__text about-info__text--lot-text">
        Service provider <br />
        Google services are provided by, and you’re contracting with:
      </p>
      <p class="about-info__text about-info__text--lot-text">
        Google LLC <br />organized under the laws of the State of Delaware, USA,
        and operating under the laws of the USA
      </p>
      <p class="about-info__text about-info__text--lot-text">
        1600 Amphitheatre Parkway <br />
        Mountain View, California 94043 <br />
        USA <br />
      </p>
      <p class="about-info__text about-info__text--lot-text">
        Age requirements <br />
        If you’re under the age required to manage your own Google Account, you
        must have your parent or legal guardian’s permission to use a Google
        Account. Please have your parent or legal guardian read these terms with
        you.
      </p>
      <p class="about-info__text about-info__text--lot-text">
        If you’re a parent or legal guardian, and you allow your child to use
        the services, then these terms apply to you and you’re responsible for
        your child’s activity on the services.
      </p>
      <p class="about-info__text about-info__text--lot-text">
        Some Google services have additional age requirements as described in
        their service-specific additional terms and policies.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  auth: false,
  head() {
    return {
      title: 'Staj | Terms',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Terms of Use',
        },
      ],
    }
  },
}
</script>
