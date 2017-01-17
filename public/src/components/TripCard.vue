<template lang="html">
    <article class="card">
      <div class="card-content">
        <p>
         From <strong>{{trip.departure | readableLocation}}</strong> to <strong>{{trip.destination | readableLocation}}</strong>.<br>
         Current price: {{trip.lastResult.price}}€
         <small>Seen on {{trip.lastResult.quoteDate | dateFormat('MMMM Do') }}</small>
        </p>
      </div>
      <div class="card-footer">
        <router-link :to="'/trip/' + trip._id" class="card-footer-item">Detail</router-link>
        <a :href="trip.lastResult.url" class="card-footer-item">View result</a>
      </div>
    </article>
</template>

<script>
import moment from 'moment'

export default {
  props: ['trip'],
  filters: {
    dateFormat (date, format = 'MMMM Do Y') {
      console.log('dateFormat args:', arguments, format)
      return moment(date).format(format)
    }
  }
}
</script>
