<template lang="html">
  <div class="trip-detail">
    <div v-if="!loading">
      <leaflet :geojson="trip.destination" />
      <div class="section">
        <div class="container">
          <h1 class="title">You're viewing your trip from <strong>{{trip.departure | readableLocation}}</strong> to <strong>{{trip.destination | readableLocation}}</strong>.</h1>
          <div class="tabs">
            <ul>
              <router-link tag="li" :to="{name: 'tripStatus', params: {tripId: id} }" active-class="is-active">
                <a>Overview</a>
              </router-link>
              <router-link tag="li" :to="{name: 'tripEdit', params: {tripId: id} }" active-class="is-active">
                <a>Edit</a>
              </router-link>
            </ul>
          </div>
          <router-view :trip="trip" />
        </div>
      </div>
    </div>
    <div class="section" v-else>
      <div class="container">
        Loading...
      </div>
    </div>
  </div>
</template>

<script>
import Leaflet from './Leaflet.vue'

export default {
  components: { Leaflet },
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
