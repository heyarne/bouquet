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
      <p v-if="!trips.length">
        It seems like you don't have created any trips yet. Do you want to <router-link to="/trip/new">create a new one?</router-link>
      </p>
      <p v-else>
        You currently have <strong>{{trips.length}} trip<span v-if="trips.length !== 1">s</span></strong> planned.
      </p>
      <ul>
        <li v-for="trip in trips">
          <trip-card v-bind:trip="trip"></trip>
        </li>
      </ul>
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
