<template>
  <section>
    <div class="map-section__wrapper">
      <div
        ref="map"
        class="map-section__map"
        frameborder="0"
        allowfullscreen=""
        hspace="0"
        style="border: 0"
        aria-hidden="false"
        tabindex="0"
      ></div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    markerIcon: {
      type: String,
      default: '',
    },
    address: {
      type: Object,
      default: () => ({
        address: '',
        coords: {
          lat: 0,
          lng: 0,
        },
      }),
    },
    hideMapCallback: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      currentMarker: null,
      currentLocation: {},
      mapStyle: ['Gray Staj'],
      grayStyle: require('@/assets/json/map-style.json'),
      map: null,
    }
  },
  mounted() {
    const execute = () => {
      this.getLocation()
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
    setMapMarker() {
      this.currentMarker = new this.$google.maps.Marker({
        position: new this.$google.maps.LatLng(
          this.address.coords.lng,
          this.address.coords.lat
        ),
        map: this.map,
        icon: this.markerIcon,
      })
    },
    getLocation() {
      if (this.address.coords) {
        this.map = new this.$google.maps.Map(this.$refs.map, {
          center: new this.$google.maps.LatLng(
            this.address.coords.lng,
            this.address.coords.lat
          ),
          zoom: 6,
          styles: this.grayStyle,
        })

        this.setMapMarker()
      } else {
        this.hideMapCallback()
      }
    },
  },
}
</script>
