<template lang="html">
    <article class="card">
      <div class="card-content">
        <p>
         From <strong>{{trip.departure | readableLocation}}</strong> to <strong>{{trip.destination | readableLocation}}</strong><span v-if="trip.endDate || trip.duration"> and back</span>.<br>
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
        <a :href="trip.lastResult.url" class="card-footer-item" v-if="trip.lastResult">→ To Skyscanner</a>
      </div>
    </article>
</template>

<script>
export default {
  props: ['trip']
}
</script>
