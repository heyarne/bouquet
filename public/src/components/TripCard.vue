<template lang="html">
  <router-link :to="'/trip/' + trip._id" class="box">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img src="http://bulma.io/images/placeholders/128x128.png" alt="Image">
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
           From <strong>{{trip.departure | readableLocation}}</strong> to <strong>{{trip.destination | readableLocation}}</strong>.<br>
           Current estimated price: {{trip.lastResult.price}}€
           <small>Seen on {{trip.lastResult.quoteDate | dateFormat('MMMM Do') }}</small><br>
           <small>Searching since {{trip.createdAt | dateFormat }}.</small>
          </p>
        </div>
        <div class="level"></div>
      </div>
    </article>
  </router-link>
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
