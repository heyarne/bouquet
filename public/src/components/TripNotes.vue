<template lang="html">
  <form @submit.prevent="saveNotes">
    <div class="content is-medium">
      <wysiwyg
        placeholder="Take some notes and remind yourself what to do. Just start typing..."
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
            }" value="Save note">
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
      this.loading = true
      this.$http.put(`trips/${this.$route.params.tripId}`, { notes: this.notes })
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

<style lang="css">
</style>
