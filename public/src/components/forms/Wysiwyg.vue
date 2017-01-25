<template lang="html">
  <div></div>
</template>

<script>
import Quill from 'quill'

const toolbar = [
  ['bold', 'italic'],
  ['blockquote', { 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'header': [1, 2, false] }],
  ['link', 'image'],
  ['clean']
]

export default {
  props: ['placeholder', 'focus'],
  data () {
    return { raw: '' }
  },
  mounted () {
    const quill = new Quill(this.$el, {
      placeholder: this.placeholder,
      theme: 'bubble',
      modules: { toolbar }
    })
    if (this.focus) quill.focus()
  }
}
</script>

<style lang="css">
  .ql-container {
    font-size: inherit !important
  }

  .ql-editor.ql-blank::before {
    font-style: normal !important
  }

  .ql-tooltip {
    z-index: 99
  }
</style>
