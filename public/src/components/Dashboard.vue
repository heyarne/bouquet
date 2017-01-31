<template lang="html">
  <div class="dashboard content">
    <header class="hero is-primary is-bold" v-if="user">
      <div class="hero-body">
        <div class="container">
          <p class="title">Hello {{ user.email }}!</p>
          <p class="subtitle" v-if="!trips.length">Thanks for trying out bouquet.</p>
          <div v-if="!trips.length">
            <p>
              We help you take trips you never really got around taking. Describe your trip and what you're willing to spend, we'll keep an eye open for you and notify you about suitable offers. <em>It seems like you have not created any trips yet.</em>
            </p>
            <p>
              <router-link to="/trip/new" class="button is-white is-outlined">Plan a new trip</router-link>
            </p>
          </div>
          <p class="subtitle" v-else>
            You currently have <strong>{{trips.length}} {{trips.length | pluralize('trip')}}</strong> planned.
          </p>
        </div>
      </div>
    </header>
    <section class="section">
      <div class="container">
        <div v-if="loading">Loading...</div>

        <article class="message is-warning" v-if="error">
          <div class="message-body">{{ error.message }}</div>
        </article>

        <div class="user" v-if="user">
          <div class="columns">
            <div class="column is-one-third" v-for="trip in trips">
              <trip-card :trip="trip"></trip>
            </div>
          </div>
          <div class="columns">
            <div class="column clearfix">
              <p class="control is-pulled-right">
                <router-link to="/trip/new" class="button is-medium is-primary">Plan new trip</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
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
