<template lang="html">
  <div class="section">
    <div class="container">
      <div v-if="loading">
        Loading...
      </div>
      <div v-else>
        <div class="tabs">
          <ul>
            <router-link tag="li" to="/TODO" active-class="is-active">
              <a>Status</a>
            </router-link>
            <router-link tag="li" :to="{name: 'tripNotes', params: {tripId: this.id} }" active-class="is-active">
              <a>Notes</a>
            </router-link>
            <router-link tag="li" :to="{name: 'tripEdit', params: {tripId: this.id} }" active-class="is-active">
              <a>Edit</a>
            </router-link>
          </ul>
        </div>
        <h1 class="title">You're viewing your trip to {{trip.destination | readableLocation}}.</h1>
        <router-view :trip="trip" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: this.$route.params.tripId,
      trip: null,
      loading: true
    }
  },
  created () {
    this.$http.get(`trips/${this.$route.params.tripId}`)
      .then(res => res.json())
      .then(res => {
        this.trip = res
        this.loading = false
      })
  }
}
</script>

<style lang="css">
</style>
