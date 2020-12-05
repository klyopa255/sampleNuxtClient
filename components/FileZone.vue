<template>
  <section class="dropzone">
    <Dropzone
      id="foo"
      ref="el"
      :options="options"
      :destroy-dropzone="false"
    ></Dropzone>
  </section>
</template>

<script>
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'

export default {
  components: {
    Dropzone,
  },
  props: {
    page: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // See https://rowanwins.github.io/vue-dropzone/docs/dist/index.html#/props
      options: {
        url: this.$privAPI.defaults.baseURL + '/media/upload',
        addRemoveLinks: true,
        acceptedFiles: '.jpg, .jpeg, .png, .webp',
        maxFilesize: 8,
        resizeWidth: 1200,
        resizeHeight: 1200,
        resizeMethod: 'contain',
        resizeQuality: 1.0,
        maxFiles: this.mode === 'single' ? 1 : null,
        headers: {
          Authorization: this.$auth.getToken('local'),
        },
        params: {
          path: 'photo',
        },
      },
    }
  },
  mounted() {
    const dZinstance = this.$refs.el.dropzone
    const path = {}
    dZinstance.on('success', (file, resp) => {
      path[file.upload.uuid] = resp.data
      switch (this.page) {
        case 'media':
          this.$emit('image-uploaded', resp.data)
          break
        case 'user':
          this.$nuxt.$emit('profile-edit', resp.data)
          break
        case 'event':
          this.$nuxt.$emit('event-edit', resp.data)
          break
        case 'artist':
          this.$nuxt.$emit('artist-edit', resp.data)
          break
        case 'artist-ava-change':
          this.$nuxt.$emit('artist-ava-change', resp.data)
          break
        case 'post':
          this.$nuxt.$emit('post-media', resp.data)
          break
      }
    })
    dZinstance.on('removedfile', (file) => {
      this.$privAPI.$delete(
        this.$privAPI.defaults.baseURL +
          '/media/delete_temp/' +
          path[file.upload.uuid],
        {
          headers: {
            Authorization: this.$auth.getToken('local'),
          },
        }
      )
      switch (this.page) {
        case 'event':
          this.$nuxt.$emit('event-edit-delete', path[file.upload.uuid])
          break
        case 'post':
          this.$nuxt.$emit('post-media-delete', path[file.upload.uuid])
          break
      }
      if (this.page === 'user') {
        this.$emit('image-deleted')
      }
    })
  },
}
</script>
