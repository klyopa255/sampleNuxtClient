<template>
  <div>
    <HeroSection />
    <HeroSectionAuth />
    <SubscribeSection />
    <EventsListSection :title="'Featured'" />
    <EventsListSection :title="'This Weekend'" />
    <EventsListSection :title="'Free Events'" />
    <AboutSection />
  </div>
</template>
