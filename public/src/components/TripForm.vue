<template lang="html">
  <div class="trip form">
    <form method="post" @submit.prevent="onSubmit">
      <h2 class="subtitle" v-if="editing">Modify your search criteria</h2>
      <h2 class="subtitle" v-else>Tell us about the journey</h2>
      <div class="columns" v-if="!editing">
        <div class="column">
          <p class="control">
            <label class="label">Place of departure:</label>
            <auto-complete name="from" placeholder="Please enter a place..." @select="onSelectDeparture" />
          </p>
        </div>
        <div class="column">
          <p class="control">
            <label class="label">City, country or region of destination:</label>
            <auto-complete name="from" placeholder="Please enter a place..." @select="onSelectDestination" />
          </p>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <p class="control">
            <label class="label">Earliest date of departure:</label>
            <flatpickr class="input" name="availability-start" placeholder="Please enter a date..." v-model="startDate" :options="config.datePicker" />
          </p>
        </div>
        <div class="column">
          <p class="control">
            <label class="label">Latest date of return:*</label>
            <flatpickr class="input" name="availability-end" placeholder="Please enter a date..." v-model="endDate" :options="config.datePicker" />
          </p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-half">
          <p class="control">
            <label class="label">Budget alert:*</label>
            <input class="input" placeholder="Flight price in €" type="number" name="buget" v-model="budget">
            <span class="help">Are you on a budget? Tell us here an we'll shoot you a message as soon as we find something according to your expectations.</span>
          </p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-clearfix">
          <p class="control is-pulled-left">
            Fields marked with a <strong>*</strong> are optional and don't have to be filled in.
          </p>
          <p class="control is-pulled-right">
            <input type="button" class="button is-medium is-danger" value="Remove trip" v-if="editing" @click="onRemove" />
            <input type="submit" class="button is-medium is-primary" value="Modify trip" v-if="editing">
            <input type="submit" class="button is-medium is-primary" value="Create trip" v-else>
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-env browser */
import moment from 'moment'

import router from '../router'
import eventBus from '../event-bus'

import Flatpickr from 'vue-flatpickr'
import AutoComplete from './forms/AutoComplete.vue'

function showError (message) {
  eventBus.$emit('notification', { type: 'error', message })
}

export default {
  props: ['trip'],
  components: { Flatpickr, AutoComplete },
  data () {
    return {
      editing: !!this.trip,
      startDate: this.trip ? moment(this.trip.startDate).format('YYYY-MM-DD') : null,
      endDate: this.trip && this.trip.endDate ? moment(this.trip.endDate).format('YYYY-MM-DD') : null,
      config: {
        datePicker: {
          minDate: 'today',
          utc: true
        }
      }
    }
  },
  methods: {
    onSubmit () {
      const trip = {
        departure: this.trip ? this.trip.departure : this.departure,
        destination: this.trip ? this.trip.destination : this.destination,
        startDate: new Date(this.startDate).toJSON(),
        endDate: this.endDate ? new Date(this.endDate).toJSON() : null,
        budget: this.budget
      }

      const request = this.editing
        ? this.$http.put(`trips/${this.$route.params.tripId}`, trip)
        : this.$http.post('trips', trip)

      request
        .then(res => res.json())
        .then(res => {
          router.replace('/')
          eventBus.$emit('notification', {
            type: 'info', message: 'OK, we\'ll keep an eye out! :)'
          })
        })
        .catch(err => Array.isArray(err.body)
          ? err.body.forEach(({ message }) => showError(message))
          : showError(err.message)
        )
    },
    onSelectDeparture (place) {
      this.departure = place
    },
    onSelectDestination (place) {
      this.destination = place
    },
    onRemove () {
      if (confirm('Are you sure you want to delete this?')) {
        alert('Not yet implemented')
      }
    }
  }
}
</script>
