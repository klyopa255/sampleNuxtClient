<template>
  <div class="event-form__rich-text-wrapper">
    <tiptap-vuetify
      v-model="content"
      :value="value"
      :extensions="extensions"
      @input="$emit('input', arguments[0])"
    />
  </div>
</template>
<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image,
} from 'tiptap-vuetify'
export default {
  components: { TiptapVuetify },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    content: '',
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      Bold,
      Link,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
      Image,
    ],
  }),
  mounted() {
    this.content = this.value
  },
}
</script>
