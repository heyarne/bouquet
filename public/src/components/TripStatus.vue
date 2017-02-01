<template lang="html">
  <div class="container">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-5">Searching since <strong>{{trip.createdAt | dateFormat}}</strong></p>
        </div>
        <div class="level-item" v-if="trip.results.length">
          <spark-lines :data="trip.results.map(r => r.price)" />
        </div>
      </div>
      <div class="level-right">
        <div class="level-item" v-if="trip.budget">
          <p class="subtitle is-5">Your Budget: <strong>{{trip.budget}} EUR</strong></p>
        </div>
        <div class="level-item" v-if="trip.results.length">
          <p class="subtitle is-5">
            Current price:
            <span v-if="trip.results[0].price < trip.budget">
              <strong class="is-primary"><a :href="trip.results[0].url">{{trip.results[0].price}} EUR ↗</a></strong>
            </span>
            <span v-else>{{trip.results[0].price}} EUR <a :href="trip.results[0].url">↗</a></span>
          </p>
        </div>
      </div>
    </div>
    <hr>
    <h2 class="subtitle is-4">Notes</h2>
    <trip-notes :trip="this.trip"></trip-notes>
  </div>
</template>

<script>
import SparkLines from './SparkLines.vue'
import TripNotes from './TripNotes.vue'

export default {
  props: ['trip'],
  components: { SparkLines, TripNotes }
}
</script>
