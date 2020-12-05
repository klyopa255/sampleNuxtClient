<template>
  <div class="creare-event">
    <button class="flat-button" @click="isForm = !isForm">Create event</button>
    <form v-if="isForm" class="fullwidth" @submit.prevent="createEvent">
      <div class="flex">
        <div class="third">
          <div class="formgroup">
            <label>Event name</label>
            <input v-model="name" type="text" placeholder="name" />
          </div>
          <div class="formgroup">
            <label>Event type</label>
            <select v-model="typeId">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div class="formgroup">
            <label>Event subtype</label>
            <select v-model="categoryId">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div class="formgroup half">
            <label>Date begin</label>
            <input v-model="beginDate" type="date" />
            <label>Time begin</label>
            <input v-model="beginTime" type="time" />
          </div>
          <div class="formgroup half">
            <label>Date end</label>
            <input v-model="endDate" type="date" />
            <label>Time end</label>
            <input v-model="endTime" type="time" />
          </div>
          <div class="formgroup">
            <label>Place</label>
            <input v-model="place" type="text" placeholder="Name of venue" />
          </div>
          <div class="formgroup">
            <label>Place</label>
            <textarea
              v-model="adress"
              cols="30"
              rows="10"
              placeholder="adress"
            ></textarea>
          </div>
          <div class="formgroup">
            <label>Adress</label>
            <input v-model="eventbrite" type="text" placeholder="eventbrite" />
          </div>
        </div>
        <div class="third">
          <div class="formgroup">
            <label>Short description</label>
            <textarea
              v-model="shortDescr"
              cols="30"
              rows="10"
              placeholder="short description"
            ></textarea>
          </div>
          <div class="formgroup">
            <label>Description</label>
            <textarea
              v-model="descr"
              cols="30"
              rows="10"
              placeholder="description"
            ></textarea>
          </div>
          <div class="formgroup">
            <label>Tags</label>
            <input v-model="tags" type="text" placeholder="tags" />
          </div>
        </div>
        <div class="third">
          <button
            type="button"
            class="flat-button"
            @click.prevent="toggleArtistsList"
          >
            Choose Artist
          </button>
          <ul v-if="isList" class="artists-list">
            <li v-for="artist in artists" :key="artist.id">
              <input
                :id="'artist-' + artist.id"
                v-model="checkedArtists"
                type="checkbox"
                name="artists"
                :value="artist.id"
              />
              <label for="'artist-'+artist.id">{{ artist.name }}</label>
            </li>
          </ul>
        </div>
      </div>
      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    isForm: false,
    isList: false,
    name: '',
    typeId: '',
    categoryId: '',
    beginDate: '',
    beginTime: '',
    endDate: '',
    endTime: '',
    adress: '',
    eventbrite: '',
    shortDescr: '',
    descr: '',
    tags: '',
    place: '',
    checkedArtists: [],
  }),
  computed: {
    artists() {
      return this.$store.getters['createEvent/getArtists']
    },
  },
  methods: {
    toggleArtistsList() {
      this.isList = !this.isList
      if (!this.artists.length) {
        this.$store.dispatch('createEvent/getArtists', this.token)
      }
    },
    createEvent() {
      const data = {
        title: this.name,
        begin_at: this.beginDate + this.beginTime,
        end_at: this.endDate + this.endTime,
        place: this.place,
        address: this.adress,
        eventbrite: this.eventbrite,
        short_description: this.shortDescr,
        description: this.descr,
        user_id: this.$store.getters['auth/currentUser'].id,
        frequency: 'once',
        type_id: this.typeId,
        category_id: this.categoryId,
        tags: this.tags,
        status: 'public',
      }
      if (this.checkedArtists.length) {
        data.artists = JSON.stringify(this.checkedArtists)
      }
      this.$privAPI.$post(this.$privAPI.defaults.baseURL + '/events', data)
    },
  },
}
</script>
