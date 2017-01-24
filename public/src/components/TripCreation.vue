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
    <form method="post" @submit.prevent="onSubmit">
      <h2 class="subtitle">Tell us about the journey</h2>
      <div class="columns">
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
            <label class="label">Maximum trip duration in days:*</label>
            <input class="input" type="text" name="duration" placeholder="If you don't want to go back, it's fine :)" v-model="duration">
          </p>
        </div>
        <div class="column is-half">
          <p class="conrtol">
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
        departure: this.departure,
        destination: this.destination,
        startDate: new Date(this.startDate).toJSON(),
        endDate: this.endDate ? new Date(this.endDate).toJSON() : null,
        duration: this.duration,
        budget: this.budget
      }

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
    },
    onSelectDeparture (place) {
      this.departure = place
    },
    onSelectDestination (place) {
      this.destination = place
    }
  }
}
</script>
