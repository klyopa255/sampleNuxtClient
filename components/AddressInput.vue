<template>
  <label for="address" class="event-form__label"
    >Address
    <input
      ref="addressInput"
      :value="address"
      type="text"
      class="event-form__input event-form__input--textarea"
      autocomplete="nope"
      placeholder="Address"
      @input="sendAddress"
    />
  </label>
</template>

<script>
export default {
  props: {
    address: {
      type: String,
      default: '',
    },
    addressCallback: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      addressData: {
        address: '',
        coords: {
          lng: '',
          lat: '',
        },
      },
      autocomplete: null,
      geocoder: null,
    }
  },
  computed: {
    autocompleteResults() {
      return this.autocomplete.gm_accessors_.place
    },
  },
  mounted() {
    const execute = () => {
      this.geocoder = new this.$google.maps.Geocoder()
      this.setAutocomplete()
    }

    if (this.$google) {
      execute()
    } else {
      const callback = () => {
        execute()
        window.removeEventListener('maps-module:loaded', callback)
      }
      window.addEventListener('maps-module:loaded', callback)
    }
  },
  methods: {
    async getLocation() {
      await this.geocoder.geocode(
        { address: this.addressData.address },
        (results, status) => {
          if (status === 'OK') {
            this.addressData.coords.lat = results[0].geometry.location.lat()
            this.addressData.coords.lng = results[0].geometry.location.lng()
          }
        }
      )
    },
    sendAddress(e) {
      if (e) {
        this.addressData.address = e.target.value
        this.getLocation()
      }

      this.addressCallback(this.addressData)
    },
    setAutocomplete() {
      this.autocomplete = new this.$google.maps.places.Autocomplete(
        this.$refs.addressInput,
        { types: ['address'], componentRestrictions: { country: 'us' } }
      )
      this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete.getPlace()

        this.addressData.address = place.formatted_address
        this.addressData.coords = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }

        this.sendAddress()
      })

      this.$google.maps.event.addDomListener(
        this.$refs.addressInput,
        'focus',
        (e) => e.target.setAttribute('autocomplete', 'nope')
      )
    },
  },
}
</script>
