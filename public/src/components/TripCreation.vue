<template lang="html">
  <div class="trip creation">
    <h1 class="title">Create a new trip</h1>
    <p>
      Use this form to give us some information about where you want to go. We will use it to continously check whether we'll find something you may like. If we do, we'll remind you with an e-mail that you had some plans.
    </p>
    <p>
      None of this is going to be shared or published, no worries.
    </p>
    <hr>
    <form method="post" @submit.prevent="handleSubmit">
      <h2 class="subtitle">Tell us about the journey&hellip;</h2>
      <div class="columns">
        <div class="column">
          <p class="control">
            <label class="label">Place of departure:</label>
            <input class="input" type="text" name="from" placeholder="Please enter a place..." v-model="trip.departure">
          </p>
        </div>
        <div class="column">
          <p class="control">
            <label class="label">Destination:</label>
            <input class="input" type="text" name="to" placeholder="Please enter a place..." v-model="trip.destination">
          </p>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <p class="control">
            <label class="label">Place of departure:</label>
            <auto-complete />
          </p>
        </div>
      </div>
      <h2 class="subtitle">When would be a good time?</h2>
      <div class="columns">
        <div class="column">
          <p class="control">
            <label class="label">Earliest start:</label>
            <flatpickr class="input" name="availability-start" placeholder="Please enter a date..." v-model="trip.startDate" :options="config.datePicker" />
          </p>
        </div>
        <div class="column">
          <p class="control">
            <label class="label">Latest date of return:*</label>
            <flatpickr class="input" name="availability-end" placeholder="Please enter a date..." v-model="trip.endDate" :options="config.datePicker" />
            <span class="help">* Optional</span>
            <!-- TODO: Add additional timeframes -->
          </p>
        </div>
      </div>
      <h2 class="subtitle">For how long do you want to travel?</h2>
      <div class="columns">
        <div class="column is-half">
          <p class="control">
            <label class="label">Maximum trip duration in days:*</label>
            <input class="input" type="text" name="duration" v-model="trip.duration">
            <span class="help">* Optional</span>
          </p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-clearfix">
          <p class="control is-pulled-right">
            <input type="submit" class="button is-medium is-primary" value="Create trip">
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-env browser */
import router from '../router'
import eventBus from '../event-bus'

import Flatpickr from 'vue-flatpickr'
import AutoComplete from './forms/AutoComplete.vue'

export default {
  components: { Flatpickr, AutoComplete },
  data () {
    return {
      trip: {
        departure: null,
        destination: null,
        startDate: null,
        endDate: null,
        openEnd: null
      },
      config: {
        datePicker: {
          minDate: 'today',
          utc: true
        }
      }
    }
  },
  methods: {
    handleSubmit () {
      const trip = this.trip
      trip.startDate = new Date(trip.startDate).toJSON()
      trip.endDate = trip.endDate ? new Date(trip.endDate).toJSON() : null

      this.$http.post('trips', trip)
        .then(res => res.json())
        .then(res => {
          router.replace('/')
          eventBus.$emit('notification', {
            type: 'info', message: 'OK, we\'ll keep an eye out! :)'
          })
        })
        .catch(err => eventBus.$emit('notification', {
          type: 'error', message: err.body.message
        }))
    }
  }
}
</script>
