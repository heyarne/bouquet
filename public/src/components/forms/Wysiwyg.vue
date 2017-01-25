<template lang="html">
  <div></div>
</template>

<script>
import Quill from 'quill'

const toolbar = [
  [{ 'header': 1 }, { 'header': 2 }],
  ['bold', 'italic', 'strike'],
  ['blockquote', { 'list': 'ordered' }, { 'list': 'bullet' }],
  ['link', 'image'],
  ['clean']
]

export default {
  props: ['placeholder', 'focus', 'contents'],
  mounted () {
    const quill = new Quill(this.$el, {
      placeholder: this.placeholder,
      theme: 'bubble',
      modules: { toolbar: toolbar }
    })

    this.quill = quill
    this.$emit('quill-referece', quill)

    if (this.contents.ops.length === 1 && this.focus) {
      quill.focus()
    }

    quill.setContents(this.contents)
    quill.on('text-change', _ => this.$emit('input', quill.getContents()))
  },
  watch: {
    value (value) {
      // populate with data from the database and focus only the empty editor
      const contents = JSON.parse(value)
      console.log('got content', contents)
      this.quill.setContents(contents)
      if (contents.ops[0].length > 1 || contents.ops[0].insert !== '\n') {
        this.quill.focus(false)
      }
    }
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

  .ql-editor {
    padding-left: 0 !important;
    padding-right: 0 !important
  }

  .ql-tooltip {
    z-index: 99
  }
</style>
