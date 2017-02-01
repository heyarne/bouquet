<template lang="html">
  <form @submit.prevent="saveNotes">
    <div class="content is-medium">
      <wysiwyg
        placeholder="Write down what you want to remind yourself to do. You can add images, links, lists... Just start typing!"
        :contents="trip.notes && JSON.parse(trip.notes)"
        :focus="true"
        @input="updateNotes" />
    </div>
    <div class="columns">
      <div class="column is-clearfix">
        <p class="controls is-pulled-right">
          <input type="submit" :class="{
            'button': true,
            'is-medium': true,
            'is-primary': true,
            'is-loading': loading
            }" value="Save">
        </p>
      </div>
    </div>
  </form>
</template>

<script>
import Wysiwyg from './forms/Wysiwyg.vue'
import eventBus from '../event-bus'

export default {
  props: ['trip'],
  components: { Wysiwyg },
  data () {
    return {
      notes: null,
      loading: false
    }
  },
  methods: {
    saveNotes () {
      const { notes } = this
      this.loading = true
      this.$http.put(`trips/${this.$route.params.tripId}/notes`, { notes })
        .then(_ => {
          eventBus.$emit('notification', {
            message: 'Note saved'
          })
          this.loading = false
        })
        .catch(err => {
          if (err.status === 413) {
            eventBus.$emit('notification', {
              type: 'error',
              message: 'Your note is too big. Try removing some images.'
            })
          }
          console.log(err)
          this.loading = false
        })
    },
    updateNotes (notes) {
      this.notes = JSON.stringify(notes) // This is our way of "escaping" the wysiwyg-editors deltas
    }
  }
}
</script>

<style>
.ql-editor {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
