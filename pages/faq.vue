<template>
  <section class="main__container">
    <div class="main__about-info about-info about-info--high-top">
      <h1 class="about-info__title about-info__title--faq">Staj FAQs</h1>
      <details class="about-info__text about-info__text--details">
        <summary class="about-info__text-title">What is Staj?</summary>
        Staj, pronounced “stage”, is a new and easier way for arts lovers to
        find local arts events. We want users to always keep up with your
        favorite artists and organizers. We also provide artists and organizers
        with an all-in-one platform for managing and marketing events.
      </details>
      <details class="about-info__text about-info__text--details">
        <summary class="about-info__text-title">
          How much does it cost to use Staj?
        </summary>
        Staj is completely free to use. Create your account and get started
        using Staj today!
      </details>
      <details class="about-info__text about-info__text--details">
        <summary class="about-info__text-title">
          What’s the difference between user, artists, and organizer accounts?
        </summary>
        <ul class="about-info__list">
          <li class="about-info__list-item">
            Users - someone who wants to find local arts events, buy tickets to
            events, and follow their favorite artists and organizers.
          </li>
          <li class="about-info__list-item">
            Artists - someone who has regularly scheduled events and makes a
            living as an artist. This includes, but is not limited to: musicians
            (instrumental and vocal), actors, dancers, visual artists, and
            comedians.
          </li>
          <li class="about-info__list-item">
            Organizers - someone who hosts arts events at their own venue or a
            different venue. We define organizer accounts as venues, promoters,
            and non-profit arts organizations.
          </li>
        </ul>
      </details>
      <details class="about-info__text about-info__text--details">
        <summary class="about-info__text-title">
          How can I create an event?
        </summary>
        Organizers are the only account type that can create events. On your
        organizer profile, select “create event”, and enter all of the
        information about your event in our event creation form.
      </details>
      <details class="about-info__text about-info__text--details">
        <summary class="about-info__text-title">
          How do I add artists to an event?
        </summary>
        For organizers that are creating events, select “add artists”, and
        search for the artists you are looking for. Make sure to always invite
        the artists featured in your events to create a Staj account.
      </details>
      <details class="about-info__text about-info__text--details">
        <summary class="about-info__text-title">
          Can I create virtual events?
        </summary>
        Yes! When creating an event, select “virtual event” and then enter the
        link that is needed for users to attend the event.
      </details>
      <details class="about-info__text about-info__text--details">
        <summary class="about-info__text-title">
          Can I sell tickets on Staj?
        </summary>
        Though we do not have any features that enable organizers to sell
        tickets, we allow you to insert the link where users can click to buy
        tickets to your event.
      </details>
      <details class="about-info__text about-info__text--details">
        <summary class="about-info__text-title">
          How can I change or reset my password?
        </summary>
        Select the “sign in” button in the top right-hand corner, and select
        “Forgot Password?” We will send you an email to your associated email
        where you will be able to create a new password.
      </details>
    </div>
  </section>
</template>

<script>
export default {
  auth: false,
  head() {
    return {
      title: 'Staj | FAQ',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Frequently Asked Questions`,
        },
      ],
    }
  },
}
</script>
