<template>
  <form
    id="event-form"
    class="event-form"
    autocomplete="off"
    @submit.prevent=""
  >
    <section class="section-flexline event-form__header">
      <h1 class="event-form__title section-flexline__left-block">
        Event creation
      </h1>
      <span class="event-form__page-count">{{ tabCount + 1 }}/3</span>
    </section>
    <div v-if="tabCount === 0 || tabCount === 2">
      <fieldset class="event-form__fieldset">
        <div class="event-form__fieldset-wrapper">
          <label
            for="event-name"
            class="event-form__label event-form__label--three-quarters-width"
            >Name of Event
            <input
              id="event-name1"
              v-model.trim="$v.name.$model"
              class="event-form__input form-group"
              :class="{ 'form-group--error': $v.name.$error }"
              type="text"
              name="event-name"
              placeholder="Name of Event"
              data-name="title"
              required
              @input="setName($event.target.value)"
            />
            <span v-if="!$v.name.required" class="error">Name is required</span>
            <span v-if="!$v.name.minLength" class="error">
              Name must have at least
              {{ $v.name.$params.minLength.min }} letters.
            </span>
          </label>
          <div class="event-form__checkbox-wrapper">
            <input
              id="isVirtual"
              v-model="status"
              type="checkbox"
              class="fake-checkbox__input"
              name="virtual-event"
            />
            <label for="isVirtual" class="fake-checkbox__wrapper"
              >Virtual event</label
            >
          </div>
        </div>
      </fieldset>

      <fieldset class="event-form__fieldset">
        <div class="event-form__fieldset-wrapper">
          <label
            for="event-type"
            class="event-form__label event-form__label--half-width"
            >Type
            <select
              id="event-type"
              v-model="eventType"
              name="event-type"
              class="event-form__input event-form__input--select user-form__capitalize"
              required
              @change="initSubtype(eventType)"
            >
              <option
                v-for="eventType in eventTypes"
                :key="eventType.id + 'eventType'"
                :value="eventType.id"
              >
                {{ eventType.name }}
              </option>
            </select>
          </label>
          <label
            v-if="eventSubtypes.length"
            for="event-category"
            class="event-form__label event-form__label--half-width"
            >Category
            <select
              id="event-category"
              v-model="eventSubtype"
              name="event-category"
              class="event-form__input event-form__input--select"
              required
            >
              <option
                v-for="eventSubtype in eventSubtypes"
                :key="eventSubtype.id + 'eventSubtype'"
                :value="eventSubtype.id"
              >
                {{ eventSubtype.name }}
              </option>
            </select>
          </label>
        </div>
      </fieldset>
      <label
        for="event-tags"
        class="event-form__label event-form__label--mar-bot event-form__label--tags"
        >Tags
        <vue-tags-input
          v-model="tag"
          :tags="tags"
          @tags-changed="(newTags) => (tags = newTags)"
        />
      </label>
      <label for="venue-name" class="event-form__label"
        >Name of Venue
        <input
          id="venue-name"
          v-model="place"
          class="event-form__input form-group"
          :class="{ 'form-group--error': $v.place.$error }"
          type="text"
          name="venue-name"
          placeholder="Name of Venue"
          data-name="place"
          required
          @input="setPlace($event.target.value)"
        />
        <span v-if="!$v.place.required" class="error">
          Name of Venue is required
        </span>
        <span v-if="!$v.place.minLength" class="error">
          Name of Venue must have at least
          {{ $v.place.$params.minLength.min }} letters.
        </span>
      </label>
      <AddressInput
        :address="addressData.address"
        :address-callback="addressCallback"
      />
      <fieldset class="event-form__fieldset">
        <div class="event-form__fieldset-wrapper">
          <!-- Date begin -->
          <v-dialog
            ref="dialogBegin"
            v-model="modalBeginDate"
            :return-value.sync="beginDate"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="beginDate"
                label="Date from"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="beginDate" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalBeginDate = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.dialogBegin.save(beginDate)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
          <!-- Time begin -->
          <v-dialog
            ref="dialogTimeBegin"
            v-model="modalBeginTime"
            :return-value.sync="beginTime"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="$americanTime(beginTime)"
                label="Time begin"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                required
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="modalBeginTime"
              v-model="beginTime"
              full-width
              ampm-in-title
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalBeginTime = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.dialogTimeBegin.save(beginTime)"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
          <!-- Date end -->
          <v-dialog
            ref="dialogEnd"
            v-model="modalEndDate"
            :return-value.sync="endDate"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="endDate"
                label="Date to"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="endDate" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalEndDate = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.dialogEnd.save(endDate)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
          <!-- Time end -->
          <v-dialog
            ref="dialogTimeEnd"
            v-model="modalEndTime"
            :return-value.sync="endTime"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="$americanTime(endTime)"
                label="Time end"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                required
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker v-if="modalEndTime" v-model="endTime" full-width>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalEndTime = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.dialogTimeEnd.save(endTime)"
              >
                OK
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </div>
      </fieldset>
      <fieldset class="event-form__fieldset">
        <div class="event-form__fieldset-wrapper">
          <label
            for="event-frequency"
            class="event-form__label event-form__label--half-width"
            >Frequency
            <select
              id="event-frequency"
              v-model="frequency"
              name="event-frequency"
              class="event-form__input event-form__input--select user-form__capitalize"
              required
            >
              <option
                v-for="frequency in eventFrequency"
                :key="frequency"
                :value="frequency"
              >
                {{ frequency }}
              </option>
            </select>
          </label>
          <label
            for="event-link"
            class="event-form__label event-form__label--half-width"
            >Event link
            <input
              id="event-link"
              v-model="eventbrite"
              class="event-form__input event-form__input--link"
              value="http://twodoorcinemaclub.com"
              type="text"
              name="event-link"
              placeholder="Event link"
              required
            />
          </label>
        </div>
      </fieldset>
    </div>
    <div v-if="tabCount === 1 || tabCount === 2">
      <label
        class="event-form__label event-form__label--button"
        data-name="background"
        @click.prevent="toggleMediaBackground"
      >
        <svg-icon
          name="icn_camera_black"
          width="32"
          height="32"
          style="display: block; margin: 0 20px 0 0"
        />
        Upload event background
      </label>
      <img
        v-if="backgroundImage"
        class="prewiew-image"
        :src="backgroundImage"
        alt=""
      />
      <Media
        v-if="isMediaLibraryBackground"
        page="event"
        target="event-background"
        mode="single"
        @click="toggleMediaBackground"
        @event-background="setRemoteBackground"
      />
      <label
        class="event-form__label event-form__label--button"
        @click.prevent="toggleMedia"
      >
        <svg-icon
          name="icn_camera_black"
          width="32"
          height="32"
          style="display: block; margin: 0 20px 0 0"
        />
        Upload event media
      </label>
      <ul
        v-if="mediaFromLibrary.length || mediaUploaded.length"
        class="preview-images__list"
      >
        <li
          v-for="(pic, index) in mediaFromLibrary"
          :key="pic.id + 'pic.id'"
          class="preview-images__item"
        >
          <v-btn
            depressed
            elevation="2"
            icon
            outlined
            raised
            rounded
            color="white"
            class="preview-images__close"
            @click="deleteMedia('mediaFromLibrary', index)"
          >
            <svg-icon name="icn_close-small" width="24" height="24" />
          </v-btn>
          <img :src="storageBaseUrl + '/' + pic.path" alt="" />
        </li>
        <li
          v-for="(pic, index) in mediaUploaded"
          :key="index + 'mediaUploaded'"
          class="preview-images__item"
        >
          <v-btn
            depressed
            elevation="2"
            icon
            outlined
            raised
            rounded
            color="white"
            class="preview-images__close"
            @click="deleteMedia('mediaUploaded', index)"
          >
            <svg-icon name="icn_close-small" width="24" height="24" />
          </v-btn>
          <img :src="tempStorageBaseUrl + '/' + pic" alt="" />
        </li>
      </ul>
      <Media
        v-if="isMediaLibraryMedia"
        page="event"
        target="event-media"
        mode="multiple"
        @click="toggleMedia"
        @event-media="setMediaFromLibrary"
      />
      <label for="venue-name" class="event-form__label"
        >Short Description
        <textarea
          id="address1"
          v-model="shortDescr"
          class="event-form__input event-form__input--textarea"
          placeholder="Short Description"
          name="address"
          cols="30"
          rows="5"
        >
Hailing from Bangor and Donaghadee, Northern Ireland, Two Door Cinema Club features singer/guitarist/programmer Alex Trimble, guitarist/singer Sam Halliday, and bassist/singer Kevin Baird. Trimble and Halliday met in school, and then hooked up with Baird through mutual friends. The trio began playing as Two Door Cinema Club in 2007 and skipped going to university to focus on the band.</textarea
        >
      </label>
      <label class="event-form__label event-form__label--no-mb"
        >Long Description
      </label>
      <TextEditor :value="descr" @input="updateLongDescription" />
      <section class="event-form__label event-form__label--margin-top">
        <ul
          v-if="artists.length || shadowArtists.length"
          class="event-form__chosen-artist-list"
        >
          <li
            v-for="(artist, i) in artists"
            :key="i + artist.name"
            class="event-form__chosen-artist-item"
          >
            <button
              type="button"
              class="event-form__chosen-artist-edit"
              @click.prevent="initChangeAva('artists', i)"
            >
              Media
            </button>
            <div
              class="event-form__chosen-artist-wrapper"
              style="
                background-color: #000;
                width: 48px;
                height: 48px;
                overflow: hidden;
              "
            >
              <img
                :src="artistAvatar(artist.photo, artist.amazonStorage)"
                width="100%"
                height="auto"
                :alt="artist.name"
                class="event-form__chosen-artist-avatar"
              />
            </div>
            <span class="event-form__chosen-artist-name">{{
              artist.name
            }}</span>
            <button
              type="button"
              class="event-form__chosen-artist-button"
              @click.prevent="deleteArtist(i)"
            >
              <span class="visually-hidden">Delete</span>
            </button>
          </li>
          <li
            v-for="(artist, i) in shadowArtists"
            :key="i + artist.id"
            class="event-form__chosen-artist-item"
          >
            <div
              class="event-form__chosen-artist-wrapper"
              style="
                background-color: #000;
                width: 48px;
                height: 48px;
                overflow: hidden;
              "
            >
              <button
                type="button"
                class="event-form__chosen-artist-edit"
                @click.prevent="initChangeAva('shadowArtists', i)"
              >
                Change ava
              </button>
              <img
                :src="artistAvatar(artist.photo, artist.amazonStorage)"
                width="100%"
                height="auto"
                :alt="artist.name"
                class="event-form__chosen-artist-avatar"
              />
            </div>
            <span class="event-form__chosen-artist-name">{{
              artist.name
            }}</span>
            <button
              type="button"
              class="event-form__chosen-artist-button"
              @click.prevent="deleteShadowArtist(i)"
            >
              <span class="visually-hidden">Delete</span>
            </button>
          </li>
        </ul>
        <Media
          v-if="isOwnArtistAva"
          page="artist-ava-change"
          target="ava-change"
          :artist="avaChangeParams.artistId"
          mode="single"
          @click="toggleAvaChange"
          @ava-change="setAva"
        />
        <button
          v-if="!isAddingArtist"
          class="event-form__button event-form__button--full-width"
          type="button"
          @click.prevent="isAddingArtist = true"
        >
          Add Artist
        </button>
        <AddArtist
          v-if="isAddingArtist"
          :artists-prop="artists"
          @change-artists-list="updateArtistsList"
          @add-shadow-artist="addShadowArtists"
          @close-add-artist="isAddingArtist = false"
        />
      </section>
    </div>
    <div
      class="event-form__fieldset-wrapper event-form__fieldset-wrapper--buttons"
    >
      <nuxt-link
        to="/profile"
        class="event-form__button"
        :class="tabCount > 0 ? 'event-form__button--cancel' : ''"
        >Cancel</nuxt-link
      >
      <button
        v-if="tabCount > 0"
        class="event-form__button"
        type="button"
        @click="mutateTabCount(-1)"
      >
        Back
      </button>
      <button
        v-scroll-to="tabCount > 2 ? '' : '#event-form'"
        class="event-form__button event-form__button--next"
        :type="tabCount === 2 ? 'submit' : 'button'"
        @click.prevent="mutateTabCount(1)"
      >
        {{ tabCount === 2 ? 'Publish' : 'Next' }}
      </button>
    </div>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  data: () => ({
    mode: 'creation', // creation, edit
    modalBeginDate: false,
    modalBeginTime: false,
    modalEndDate: false,
    modalEndTime: false,
    tabCount: 0,
    isMediaLibraryBackground: false,
    isSBackrgound: false,
    isMediaLibraryMedia: false,
    isAddingArtist: false,
    isOwnArtistAva: false,
    avaChangeParams: {
      list: 'artists', // artists, shadowArtists
      index: 0,
      artistId: 0,
    },
    eventSubtypes: [],
    eventFrequency: ['once', 'weekly', 'monthly', 'yearly'],
    name: '',
    status: false,
    eventType: '',
    eventSubtype: '',
    background: '',
    mediaFromLibrary: [],
    mediaUploaded: [],
    beginDate: new Date().toISOString().substr(0, 10),
    beginTime: '18:00',
    endDate: new Date().toISOString().substr(0, 10),
    endTime: '19:00',
    addressData: {
      address: '',
      coords: {
        lng: '',
        lat: '',
      },
    },
    eventbrite: '',
    artists: [],
    shadowArtists: [],
    shortDescr: '',
    descr: '',
    tag: '',
    tags: [],
    place: '',
    frequency: '',
    editingEventData: {},
    error: {},
  }),
  validations: {
    name: {
      required,
      minLength: minLength(3),
    },
    place: {
      required,
      minLength: minLength(3),
    },
  },
  computed: {
    user() {
      return this.$auth.user
    },
    eventTypes() {
      return this.$store.getters['eventTypes/getTypes']
    },
    storageBaseUrl() {
      return this.$nuxt.context.env.storageBaseUrl
    },
    tempStorageBaseUrl() {
      return this.$nuxt.context.env.storageServerBaseUrl
    },
    backgroundImage() {
      if (!this.background) return ''
      let base = ''
      if (this.isSBackrgound) {
        base = this.storageBaseUrl
      } else {
        base = this.tempStorageBaseUrl
      }
      if (typeof this.background === 'string') {
        return base + '/' + this.background
      } else {
        return base + '/' + this.background.path
      }
    },
  },
  beforeMount() {
    if (!this.$store.getters['eventTypes/getTypes'].length) {
      this.$store.dispatch('eventTypes/getEventTypes').then(() => {
        this.eventType = this.eventTypes[0].id
        if (this.eventTypes[0].type.length) {
          this.eventSubtypes = this.eventTypes[0].type
          this.eventSubtype = this.eventSubtypes[0].id
        }
      })
    } else {
      this.eventType = this.eventTypes[0].id
      if (this.eventTypes[0].type.length) {
        this.eventSubtypes = this.eventTypes[0].type
        this.eventSubtype = this.eventSubtypes[0].id
      }
    }
    this.frequency = this.eventFrequency[0]
    this.place = this.user.name
    this.addressData.address = this.user.address || ''
    if (this.$route.query.edit) {
      this.mode = 'edit'
      this.isSBackrgound = true
      this.getEditingEvent(this.$route.query.edit).then(() => {
        this.name = this.editingEventData.title
        this.status = this.editingEventData.status === 'virtual'
        this.addressData.address = this.editingEventData.address
        this.background = {
          path: this.editingEventData.background,
          id: this.editingEventData.background_id,
        }
        this.eventType = this.editingEventData.event_type_id.id
        if (this.editingEventData.event_category_id) {
          this.eventSubtypes = this.eventTypes.find((el) => {
            return el.id === this.eventType
          }).type
          this.eventSubtype = this.editingEventData.event_category_id.id
        } else {
          this.eventSubtype = ''
          this.eventSubtypes = []
        }
        if (this.editingEventData.tags.length) {
          this.editingEventData.tags.forEach((el, i, arr) => {
            this.tags.push({
              text: el,
              tiClasses: ['ti-valid'],
            })
          })
        }
        this.place = this.editingEventData.organizer_info.name
        this.frequency = this.editingEventData.frequency
        this.eventbrite = this.editingEventData.eventbrite_link
        if (Array.isArray(this.editingEventData.media)) {
          this.mediaFromLibrary = this.editingEventData.media
        } else {
          this.mediaFromLibrary = []
        }
        this.shortDescr = this.editingEventData.short_description || ''
        this.descr = this.editingEventData.description || ''
        if (Array.isArray(this.editingEventData.artists)) {
          this.editingEventData.artists.forEach((el) => {
            el.amazonStorage = true
            if (el.id) {
              this.artists.push(el)
            } else {
              el.id = -1
              this.shadowArtists.push(el)
            }
          })
        }
        this.beginDate = this.editingEventData.begin_date
        this.beginTime = this.editingEventData.begin_time
        this.endDate = this.editingEventData.end_date
        this.endTime = this.editingEventData.end_time
      })
    }
  },
  mounted() {
    this.$nuxt.$on('event-edit', this.setLocalImage)
    this.$nuxt.$on('event-edit-delete', this.deleteLocalImage)
    this.$nuxt.$on('artist-ava-change', (payload) => {
      this[this.avaChangeParams.list][
        this.avaChangeParams.index
      ].photo = payload
      this[this.avaChangeParams.list][
        this.avaChangeParams.index
      ].amazonStorage = false
      this.toggleAvaChange()
      this.cropImg(this.tempStorageBaseUrl + '/' + payload)
    })
    this.addressCallback = this.addressCallback.bind(this)
  },
  methods: {
    addressCallback(newAddress) {
      this.addressData.address = newAddress.address
      this.addressData.coords.lat = newAddress.coords.lng
      this.addressData.coords.lng = newAddress.coords.lat
    },
    createEvent() {
      const data = {
        title: this.name,
        begin_at: this.beginDate + ' ' + this.beginTime,
        end_at: this.endDate + ' ' + this.endTime,
        place: this.place,
        address: this.addressData.address,
        location: this.addressData.coords,
        eventbrite_link: this.eventbrite,
        short_description: this.shortDescr,
        description: this.descr,
        frequency: this.frequency,
        type_id: this.eventType,
        category_id: this.eventSubtype,
        tags: [],
        media_uploaded: this.mediaUploaded,
        media_selected: [],
        status: this.status ? 'virtual' : 'public',
      }
      if (this.mode === 'edit') {
        data.id = this.editingEventData.id
      }
      if (this.background.length) {
        data.background = this.background
      } else if (Object.keys(this.background).length) {
        data.background = this.background.id
      } else {
        data.background = ''
      }

      data.artists = this.artists.concat(this.shadowArtists)

      this.mediaFromLibrary.forEach((el) => {
        data.media_selected.push(el.id)
      })

      if (this.tags.length) {
        const tagsArr = []
        this.tags.forEach((el) => {
          tagsArr.push(el.text)
        })
        data.tags = tagsArr
      }

      if (this.mode === 'creation') {
        this.$privAPI
          .$post(this.$privAPI.defaults.baseURL + '/events', data, {
            headers: { Authorization: this.$auth.getToken('local') },
          })
          .then(
            (resp) => {
              this.$router.push('/events/' + resp.data.id)
            },
            (e) => {
              this.errorHandling(e)
            }
          )
      } else {
        this.$privAPI
          .$put(this.$privAPI.defaults.baseURL + '/events', data, {
            headers: { Authorization: this.$auth.getToken('local') },
          })
          .then(
            (resp) => {
              this.$router.push('/events/' + resp.data.id)
            },

            (e) => {
              this.errorHandling(e)
            }
          )
      }
    },
    toggleMediaBackground() {
      this.isMediaLibraryBackground = !this.isMediaLibraryBackground
    },
    toggleMedia() {
      this.isMediaLibraryMedia = !this.isMediaLibraryMedia
    },
    toggleAvaChange() {
      this.isOwnArtistAva = !this.isOwnArtistAva
    },
    toggleArtistsList() {
      this.isList = !this.isList
      if (!this.artists.length) {
        this.$store.dispatch('createEvent/getArtists', this.token)
      }
    },
    mutateTabCount(i) {
      if (this.tabCount === 2 && i > 0) {
        this.createEvent()
      }
      if (this.tabCount === 1 && i > 0 && !this.background) {
        this.$nuxt.$emit('call-popup', {
          title: 'Missing required data',
          icon: 'error',
          message: 'Event background is required.',
        })
      } else {
        this.tabCount = this.tabCount + i
      }

      if (this.tabCount > 2) {
        this.tabCount = 2
      }
    },
    initSubtype(typeName) {
      const eventSubtype = this.eventTypes.find((el) => {
        return el.id === this.eventType
      })
      this.eventSubtypes = eventSubtype.type
      if (this.eventSubtypes.length) {
        this.eventSubtype = this.eventSubtypes[0].id
      } else {
        this.eventSubtype = ''
      }
    },
    updateLongDescription(longDescription) {
      this.descr = longDescription
    },
    setRemoteBackground(data) {
      this.isSBackrgound = true
      this.background = data
      this.toggleMediaBackground()
    },
    setLocalImage(data) {
      if (this.isMediaLibraryBackground) {
        this.isSBackrgound = false
        this.background = data
        this.toggleMediaBackground()
      } else {
        this.mediaUploaded.push(data)
      }
    },
    deleteLocalImage(data) {
      this.mediaUploaded.splice(this.mediaUploaded.indexOf(data), 1)
    },
    setMediaFromLibrary(data) {
      data.forEach((el, i, arr) => {
        this.mediaFromLibrary.push(el)
      })
      this.toggleMedia()
    },
    deleteMedia(array, i) {
      if (array === 'mediaUploaded') {
        this.$privAPI.$delete(
          this.$privAPI.defaults.baseURL +
            '/media/delete_temp/' +
            this[array][i],
          {
            headers: {
              Authorization: this.$auth.getToken('local'),
            },
          }
        )
      }
      this[array].splice(i, 1)
    },
    updateArtistsList({ data }) {
      const artistIndex = this.artists.findIndex((el) => {
        return el.id === data.id
      })
      if (artistIndex >= 0) {
        this.artists.splice(artistIndex, 1)
      } else {
        this.artists.push({
          id: data.id,
          name: data.name,
          amazonStorage: true,
          photo: data.photo,
        })
      }
    },
    artistAvatar(artistPhoto, storageBase) {
      const base = storageBase ? this.storageBaseUrl : this.tempStorageBaseUrl
      return artistPhoto
        ? base + '/' + artistPhoto
        : require('@/assets/img/defaultAva.png')
    },
    deleteArtist(index) {
      this.artists.splice(index, 1)
      this.$nuxt.$emit('delete-artist-from-event', this.artists)
    },
    deleteShadowArtist(index) {
      this.shadowArtists.splice(index, 1)
    },
    addShadowArtists(payload) {
      this.shadowArtists.push(payload)
    },
    initChangeAva(list, index) {
      this.avaChangeParams.list = list
      this.avaChangeParams.index = index
      this.avaChangeParams.artistId =
        list === 'artists' ? this[list][index].id : -1
      this.toggleAvaChange()
    },
    setAva(payload) {
      this[this.avaChangeParams.list][this.avaChangeParams.index].photo =
        payload.path
      this[this.avaChangeParams.list][
        this.avaChangeParams.index
      ].amazonStorage = true
      this.toggleAvaChange()
      this.cropImg(this.storageBaseUrl + '/' + payload.path)
    },
    cropImg(url) {
      const eventName = 'event' + new Date()
      this.$nuxt.$emit('call-crop', {
        eventName,
        img: url,
      })
      this.$nuxt.$on(eventName, (payload) => {
        this[this.avaChangeParams.list][this.avaChangeParams.index].photo =
          payload.data
        this[this.avaChangeParams.list][
          this.avaChangeParams.index
        ].amazonStorage = false
      })
    },
    async getEditingEvent(eventId) {
      await this.$pubAPI
        .$get(this.$pubAPI.defaults.baseURL + '/events/' + eventId)
        .then((resp) => {
          this.editingEventData = resp.data
        })
    },
    setName(value) {
      this.name = value
      this.$v.name.$touch()
    },
    setPlace(value) {
      this.place = value
      this.$v.place.$touch()
    },
    errorHandling(e) {
      if (e.response.status === 400 || e.response.status === 422) {
        let errors = ''
        for (const key in e.response.data.errors) {
          errors +=
            key.charAt(0).toUpperCase() +
            key.slice(1) +
            ': ' +
            e.response.data.errors[key] +
            '<br />'
        }

        const popupData = {
          title: e.response.data.message,
          icon: 'error',
          message: errors,
        }
        this.$nuxt.$emit('call-popup', popupData)
      } else {
        this.$nuxt.$emit('call-popup', {
          title: 'Something went wrong!',
          icon: 'error',
          message: 'Please try again later.',
        })
      }
    },
  },
  middleware({ $auth, error }) {
    if (!$auth.user || $auth.user.account_type !== 'organizer') {
      error({ statusCode: 403, message: 'Forbidden' })
    }
  },
}
</script>

<style scoped lang="scss">
.v-picker__title,
.v-time-picker-title {
  color: #000;
}
.prewiew-image {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
}
.preview-images {
  &__list {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin-left: -2%;
  }
  &__item {
    position: relative;
    width: 23%;
    margin-left: 2%;

    & img {
      width: 100%;
      height: auto;
    }
  }
  &__close {
    position: absolute;
    top: 0;
    right: -0;
    background-color: white;
  }
}
.event-form {
  &__checkbox-wrapper {
    margin: 0 auto;
    padding-top: 33px;
  }
  &__chosen-artist-item {
    position: relative;
    padding-top: 15px;
  }
  &__chosen-artist-edit {
    position: absolute;
    top: 0;
    left: 22px;
    margin: 0;
    padding: 2px 5px;
    font-size: 12px;
    line-height: 13px;
  }
  .form-group {
    &--error {
      border: 1px solid red;
      &:focus {
        outline-color: red;
      }
    }
  }
  .error {
    font-size: 16px;
    color: red;
  }
}
</style>
