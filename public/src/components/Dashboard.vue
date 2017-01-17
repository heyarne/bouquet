<template lang="html">
  <div class="dashboard content">
    <div class="message loading" v-if="loading">
      <div class="message-header">Loading...</div>
    </div>

    <article class="message is-warning" v-if="error">
      <div class="message-body">{{ error.message }}</div>
    </article>

    <div class="user" v-if="user">
      <h2>Hello {{ user.email }}!</h2>
      <div v-if="!trips.length">
        <p>
          Thanks for trying out bouquet.<br>
          The idea is that you can save trips you never really got around taking. Tell us when you want to go and what your budget is more or less and we'll alert you as soon as we find something.
        </p>
        <p>
          It seems like you don't have created any trips yet. Do you want to <router-link to="/trip/new">create a new one?</router-link>
        </p>
      </div>
      <p v-else>
        You currently have <strong>{{trips.length}} {{trips.length | pluralize('trip')}}</strong> planned.
      </p>
      <div class="columns">
        <div class="column is-one-third" v-for="trip in trips">
          <trip-card :trip="trip"></trip>
        </div>
      </div>
      <p class="control">
        <router-link to="/trip/new" class="button is-primary">Add trip</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import TripCard from './TripCard.vue'

export default {

  components: { TripCard },

  // Initial data
  data () {
    return {
      loading: false,
      user: null,
      trips: null,
      error: null
    }
  },

  // Will be called when the component is created
  created () {
    this.loading = true

    Promise.all([
      this.$http.get('users/me'),
      this.$http.get('trips/me')
    ])
      .then(([ user, trips ]) => {
        this.loading = false
        this.user = user.body
        this.trips = trips.body
      })
      .catch(err => {
        this.loading = false
        this.error = err
      })
  }
}
</script>
