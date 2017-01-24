<template lang="html">
    <article class="card">
      <div class="card-content">
        <p>
         From <strong>{{trip.departure | readableLocation}}</strong> to <strong>{{trip.destination | readableLocation}}</strong>.<br>
         <span v-if="trip.lastResult">
           Current price: {{trip.lastResult.price}}€
           <small>Seen on {{trip.lastResult.quoteDate | dateFormat('MMMM Do') }}</small>
         </span>
         <span v-else>
           No results yet. <small>Searching since {{trip.createdAt | dateFormat}}</small>.
         </span>
        </p>
      </div>
      <div class="card-footer">
        <router-link :to="'/trip/' + trip._id" class="card-footer-item">Details</router-link>
        <a :href="trip.lastResult.url" class="card-footer-item" v-if="trip.lastResult">View result</a>
      </div>
    </article>
</template>

<script>
import moment from 'moment'

export default {
  props: ['trip'],
  filters: {
    dateFormat (date, format = 'MMMM Do Y') {
      return moment(date).format(format)
    }
  }
}
</script>
